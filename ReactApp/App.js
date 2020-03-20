import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput
} from 'react-native';

import TcpSocket from 'react-native-tcp-socket';
import { NetworkInfo } from 'react-native-network-info';
import { ModbusMaster } from './src/modbusrtu'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.updateChatter = this.updateChatter.bind(this);
        this.state = { chatter: [] };
    }

    updateChatter(msg) {
        this.setState({
            chatter: this.state.chatter.concat([msg])
        });
    }

    startServer = () => {
        const serverPort = Number(9 + (Math.random() * 999).toFixed(0));
        const serverHost = "0.0.0.0";
        let server;
        server = TcpSocket.createServer((socket) => {
            this.updateChatter('server connected on ' + JSON.stringify(socket.address()));

            socket.on('data', (data) => {
                this.updateChatter('Server Received: ' + data);
                socket.write('Echo server\r\n');
            });

            socket.on('error', (error) => {
                this.updateChatter('server client error ' + error);
            });

            socket.on('close', (error) => {
                this.updateChatter('server client closed ' + (error ? error : ''));
            });
            this.socket = socket;
        }).listen({ port: serverPort, host: serverHost, reuseAddress: true }, (address) => {
            this.updateChatter('opened server on ' + JSON.stringify(address));
        });

        server.on('error', (error) => {
            this.updateChatter('Server error ' + error);
        });

        server.on('close', () => {
            this.updateChatter('server close');
        });

        this.server = server;
        this.serverPort = serverPort;
        this.serverHost = serverHost;
    }

    closeServer = () => {
        if (this.server) {
            this.server.close();
        }
        this.server = null;
    }

    startClient = () => {
        if (!this.serverIPAddress) {
            this.updateChatter('please type server address');
            return;
        }

        if (!this.port) {
            this.updateChatter('please type port number');
            return;
        }

        let client = TcpSocket.createConnection({
            port: this.port,
            host: this.serverIPAddress,
            localAddress: this.ipv4Address,
            reuseAddress: true,
            timeout: 3000,
            // localPort: 20000,
            // interface: "wifi"
        }, (address) => {
            this.updateChatter('opened client on ' + JSON.stringify(address));
            client.write('Hello, server! Love, Client.');
        });

        client.on('data', (data) => {
            this.updateChatter('Client Received: ' + data);
            //this.client.destroy(); // kill client after server's response
            //this.server.close();
        });

        client.on('error', (error) => {
            this.updateChatter('client error ' + error);
        });

        client.on('close', () => {
            this.updateChatter('client close');
        });

        this.client = client;
    }

    sendMessage = () => {
        if (!this.client) {
            this.updateChatter('Please start the client');
            return;
        }

        if (this.slaveNumber == undefined) {
            this.updateChatter('Please type slave number');
            return;
        }

        if (this.registerNumber == undefined) {
            this.updateChatter('Please type register number');
            return;
        }

        if (this.value == undefined) {
            this.updateChatter('Please type value');
            return;
        }

        const master = new ModbusMaster(this.client);

        //Read from slave with address 1 four holding registers starting from 0.
        // master.readHoldingRegisters(1, 1, 4).then((data) => {
        //     //promise will be fulfilled with parsed data
        //     console.log(data); //output will be [10, 100, 110, 50] (numbers just for example)
        // }, (err) => {
        //     //or will be rejected with error
        // });

        //Write to first slave into second register value 150.
        //slave, register, value
        master.writeSingleRegister(this.slaveNumber, this.registerNumber, this.value).then((success) => {
            this.updateChatter('Send Success');
        },
            (error) => {
                this.updateChatter(error);
            });
    }

    onIPAddress = (address) => {
        this.serverIPAddress = address;
    }

    onPortNumber = (port) => {
        this.port = port;
    }

    onSlaveNumber = (number) => {
        this.slaveNumber = parseInt(number);
    }

    onRegisterNumber = (number) => {
        this.registerNumber = parseInt(number);
    }

    onValue = (value) => {
        this.value = parseInt(value);
    }

    componentDidMount() {
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            this.ipv4Address = ipv4Address;
            this.updateChatter(ipv4Address);
        });
    }

    componentWillUnmount() {
        if (this.server) {
            this.server.close();
        }
        this.server = null;
    }

    render() {
        return (
            <>
                <StatusBar></StatusBar>
                <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                    {/* <TouchableOpacity style={{
                            backgroundColor: 'red', height: 50, width: 100, paddingBottom: 2,
                            alignItems: 'center', alignContent: 'center'
                        }}
                        onPress={() => this.startServer()}>
                        <Text>
                            Start Server
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                            backgroundColor: 'green', height: 50, width: 100, paddingBottom: 2,
                            alignItems: 'center', alignContent: 'center'
                        }}
                        onPress={() => this.closeServer()}>
                        <Text>
                            Stop Server
                        </Text>
                    </TouchableOpacity> */}
                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                        <TextInput
                            style={{ width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={(text) => this.onIPAddress(text)}
                            keyboardType="number-pad"
                            placeholder="server IP address"
                        />
                        <TextInput
                            style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 5 }}
                            onChangeText={(text) => this.onPortNumber(text)}
                            keyboardType="number-pad"
                            placeholder="port number"
                        />
                    </View>

                    <TouchableOpacity style={{
                        backgroundColor: 'yellow', height: 50, width: 100, marginBottom: 10,
                        alignItems: 'center', alignContent: 'center', borderColor: 'gray', borderWidth: 1
                    }}
                        onPress={() => this.startClient()}>
                        <Text style={{ flex: 1, textAlignVertical: 'center' }}>
                            Connect
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 20 }}>
                        <TextInput
                            style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={(text) => this.onSlaveNumber(text)}
                            keyboardType="number-pad"
                            placeholder="Slave"
                        />
                        <TextInput
                            style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 5 }}
                            onChangeText={(text) => this.onRegisterNumber(text)}
                            keyboardType="number-pad"
                            placeholder="Register"
                        />
                        <TextInput
                            style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 5 }}
                            onChangeText={(text) => this.onValue(text)}
                            keyboardType="number-pad"
                            placeholder="Value"
                        />
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: 'green', height: 50, width: 100,
                        alignItems: 'center', alignContent: 'center', borderColor: 'gray', borderWidth: 1
                    }}
                        onPress={() => this.sendMessage()}>
                        <Text style={{ flex: 1, textAlignVertical: 'center' }}>
                            Send Message
                        </Text>
                    </TouchableOpacity>
                    <ScrollView>
                        {this.state.chatter.map((msg, index) => {
                            return (
                                <Text key={index} style={styles.welcome}>
                                    {msg}
                                </Text>
                            );
                        })}
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
};

const styles = StyleSheet.create({
    welcome: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default App;