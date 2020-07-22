import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';

export class UserPanel extends Component {
    state = {
        user: this.props.currentUser
    }

    dropDownOptions = () => [
        {
            key: 'user',
            text: <span> Signed In as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signOut',
            text: <span onClick={this.logOut}>Sign Out</span>
        }
    ];

    logOut = () => {
        firebase.auth().signOut()
        .then(() => console.log('signed out'));
    }

    render() {
        const { user } = this.state;

        return (
            <Grid style={{ background: "#4c3c4c" }}>
                <Grid.Column>
                    {/* HEADER */}
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        <Header inverted floated="left" as="h2">
                            <Icon name="code" />
                            <Header.Content>
                                ChatRoom
                            </Header.Content>
                        </Header>
                    {/* User DropDown */}
                    <Header as="h4" inverted style={{padding: '0.25em'}}>
                        <Dropdown 
                            trigger={
                                <span>
                                    <Image src={user.photoURL} spaced="right" avatar />
                                    {user.displayName}
                                </span>} 
                            options={this.dropDownOptions()} 
                        />
                    </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel;
