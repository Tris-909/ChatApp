import React, { Component } from 'react'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export class SignUp extends Component {
    state = {

    }

    handleChange = (event) => {

    }

    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450}}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange"/>
                        Register for FreiiChatRoom
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input 
                                fluid 
                                name="username" 
                                icon="user" 
                                iconPosition="left" 
                                placeholder="Username" 
                                onChange={this.handleChange} 
                                type="text" 
                            />

                            <Form.Input 
                                fluid 
                                name="email" 
                                icon="mail" 
                                iconPosition="left" 
                                placeholder="Your Email" 
                                onChange={this.handleChange} 
                                type="email" 
                            />

                            <Form.Input 
                                fluid 
                                name="password" 
                                icon="lock" 
                                iconPosition="left" 
                                placeholder="Your Password" 
                                onChange={this.handleChange} 
                                type="password" 
                            />

                            <Form.Input 
                                fluid 
                                name="passwordConfirmation" 
                                icon="repeat" 
                                iconPosition="left" 
                                placeholder="Re-type Your Password" 
                                onChange={this.handleChange} 
                                type="password" 
                            />

                            <Button 
                                color="orange" 
                                fluid
                                size="large">
                                    Submit
                            </Button>    

                            <Message>Already have an account ? <Link to="/login">Login</Link></Message>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

export default SignUp
