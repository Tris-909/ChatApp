import React, { Component } from 'react'
import firebase from '../../firebase';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    formValid = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            // one of these fields is empty
            error = { message: "Please fill in all your information" }
            this.setState({
                errors: errors.concat(error)
            });
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            // password didn't match with confirmPassword
            error = { message: "Password is not valid, please try again" }
            this.setState({
                errors: errors.concat(error)
            });
            return false;
        } else {
            // form is valid
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, confirmPassword }) => {
        //? username.length : Check for username length 
        //? !username.length : Check for if username length > 0 

        return !username.length || !email.length || !password.length || !confirmPassword.length;
    }

    isPasswordValid = ({ password, confirmPassword }) => {
        //? rules 1: password and confirmPassword both have length > 6
        //? rules 2: password and confirmPassword must match

        if (password.length < 6 || confirmPassword.length < 6) {
            return false;
        } else if (password !== confirmPassword) { 
            return false;
        } else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, index) => (<p key={index}>{error.message}</p>));

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        if (this.formValid()) {
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
            });
        }
    }

    render() {
        const { username, email, password, confirmPassword, errors } = this.state;

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
                        </Segment>
                    </Form>
                    {errors.length > 0 ? (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    ): null}
                    <Message>Already have an account ? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default SignUp
