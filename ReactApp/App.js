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

    componentWillUnmount() {

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

                    <TouchableOpacity style={{
                        backgroundColor: 'red', height: 50, width: 100,
                        alignItems: 'center', alignContent: 'center', borderColor: 'gray', borderWidth: 1
                    }}
                        onPress={() => this.startPoll()}>
                        <Text style={{ flex: 1, textAlignVertical: 'center' }}>
                            Start Poll
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        backgroundColor: 'gray', height: 50, width: 100,
                        alignItems: 'center', alignContent: 'center', borderColor: 'gray', borderWidth: 1
                    }}
                        onPress={() => this.stopPoll()}>
                        <Text style={{ flex: 1, textAlignVertical: 'center' }}>
                            Stop Poll
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