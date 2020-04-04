import TcpSocket from 'react-native-tcp-socket';
import { NetworkInfo } from 'react-native-network-info';
import { ModbusMaster } from 'modbusrtu'

class Polling {
    constructor() {
        /**
         * @private
         * [{name, host, master}]
         *  // master is null means that device is not connected
         */
        this.devices = [];

        /**
         * @private
         * [{master, promise, is resolved, reading function}]
         */
        this.masters = [];

        NetworkInfo.getIPV4Address().then(selfIPAddress => {
            this.selfIPAddress = selfIPAddress;
        });
    }

    /**
     * @private
     * two devices are the same if hosts are the same
     */
    isSameDevice = (host1, host2) => {
        return host1.IPAddress === host2.IPAddress && host1.port === host2.port;
    }

    /**
     * @public
     */
    createDevice = (info) => {
        // check if device is existed
        for (let device in this.devices) {
            if (this.isSameDevice(device.host, info.host)) {
                return device;
            }
        }

        let device = {
            name: info.name || 'no name', // name is not unique 
            host: info.host // host {port, IPAddress} must be unique
            // master: null // master will be created when opening socket
        };
        this.devices.push(device);
        return device;
    }

    /**
     * @private
     */
    attachMaster2Device = (master, host) => {
        for (let i in this.devices) {
            let device = this.devices[i];
            if (this.isSameDevice(device.host, host)) {
                device.master = master;
                break;
            }
        }
    }

    /**
     * @private
     */
    dettachMasterFromDevice = (master) => {
        for (let i in this.devices) {
            let device = this.devices[i];
            if (device.master === master) {
                device.master = null;
                break;
            }
        }
    }

    /**
     * @public
     */
    createMaster = (host) => {
        if (!this.selfIPAddress) {
            return;
        }

        let socket = TcpSocket.createConnection({
            port: host.port,
            host: host.IPAddress,
            localAddress: this.selfIPAddress,
            reuseAddress: true,
            timeout: host.timeout,
            // localPort: 5002,
            // interface: "wifi"
        }, (address) => {
            // create master when socket is opening
            const master = new ModbusMaster(socket);
            this.masters.push({
                master: master
            });
            this.attachMaster2Device(master, host);

            master.onSocketClose(() => {
                this.removeMaster(master); // self remove master if socket is closed
            });

            master.onSocketError((err) => {
                console.log(err); // TODO write to log
            })
        });
    }

    /**
     * @public
     */
    removeMaster = (master) => {
        if (master.master) {
            master.master.client().destroy(); // close socket
        }
        this.dettachMasterFromDevice(master.master);
        this.masters.remove(master);
    }

    /**
     * @public
     */
    startPolling = () => {
        this.stopPolling = false;
        (function loop() {
            if (this.stopPolling) {
                return; // polling is stopped in outside
            }

            const promises = [];

            // Push all returned promises into array
            for (let i in this.masters) {
                let master = this.masters[i];
                // don't send request again if it is not resolved
                if (!master.promise || master.isResolved) {
                    master.isResolved = false;

                    // TODO improve by reading function factory
                    master.promise = master.readHoldingRegisters(1, 0, 4).then(function (data) {
                        console.log('slave 1', data);
                        master.isResolved = true;
                    });
                }
                promises.push(master.promise);
            }

            // Wait at least one request is finished, and then restart loop() with 300ms timeout.
            Promise.race(promises).catch(function (err) {
                console.log(err); // catch all errors
            }).finally(function () {
                setTimeout(loop, 300);
            })
        })();
    }

    /**
     * @public
     */
    stopPolling = () => {
        this.stopPolling = true;
    }
}

const polling = new Polling();
export default polling; // module singleton