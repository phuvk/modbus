import React from 'react';
import {
    Container, Header, Content, Button,
    Text, Icon, Body, Left, Title, Right
} from 'native-base';

export default function StatusScreen(props) {
    return (
        <Container>
            <Header>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => props.navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ alignSelf: 'center' }}>Status</Title>
                </Body>
                <Right />
            </Header>
            <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
            </Content>
        </Container>
    );
}