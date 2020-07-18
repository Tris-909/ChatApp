import React, { Component } from 'react'
import firebase from '../../firebase';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            console.log(createdUser); 
        })
        .catch(err => {
            console.log(err);
        });
        this.setState({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    render() {
        const { username, email, password, confirmPassword } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450}}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange"/>
                        Register for FreiiChatRoom
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input 
                                fluid 
                                name="username" 
                                icon="user" 
                                iconPosition="left" 
                                placeholder="Username" 
                                onChange={this.handleChange} 
                                value={username}
                                type="text" 
                            />

                            <Form.Input 
                                fluid 
                                name="email" 
                                icon="mail" 
                                iconPosition="left" 
                                placeholder="Your Email" 
                                onChange={this.handleChange} 
                                value={email}
                                type="email" 
                            />

                            <Form.Input 
                                fluid 
                                name="password" 
                                icon="lock" 
                                iconPosition="left" 
                                placeholder="Your Password" 
                                onChange={this.handleChange} 
                                value={password}
                                type="password" 
                            />

                            <Form.Input 
                                fluid 
                                name="confirmPassword" 
                                icon="repeat" 
                                iconPosition="left" 
                                placeholder="Re-type Your Password" 
                                onChange={this.handleChange} 
                                value={confirmPassword}
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
