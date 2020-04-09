import React from 'react';
import {
    Container, Header, Content, Button,
    Text, Icon, Body, Left, Title, Right
} from 'native-base';
import { ParametersSetup } from 'variable';

export default function ParametersSetupScreen(props) {
    generateButtons = () => {
        return ParametersSetup.map(child => {
            return (
                <Button key={child.name} block
                    style={{ marginTop: 10 }}
                    onPress={() => props.navigation.navigate(child.name)}
                >
                    <Text uppercase={false} >{child.name}</Text>
                </Button>
            )
        })
    };

    return (
        <Container>
            <Header>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => props.navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body style={{flexGrow: 2}}>
                    <Title style={{ alignSelf: 'center' }}>Parameters Setup</Title>
                </Body>
                <Right />
            </Header>
            <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
                {generateButtons()}
            </Content>
        </Container>
    );
}