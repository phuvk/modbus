import React from 'react';
import { View } from "react-native";
import {
    Container, Header, Content, Button,
    Text, Icon, Body, Left, Title, Right
} from 'native-base';

export default function DU200FOSettingScreen(props) {
    return (
        <Container>
            <Header>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ alignSelf: 'center' }}>DU200FO Settings</Title>
                </Body>
                <Right />
            </Header>
            <Content style={{ paddingLeft: 10, paddingRight: 10 }}>

            </Content>
        </Container>
    );
}