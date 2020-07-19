import React, { Component } from 'react'
import firebase from '../../firebase';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import md5 from 'md5';

export class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
        loading: false,
        userRef: firebase.database().ref('users')
    }

    //** VALIDATION */

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

    //** DISPLAY ERRORS */

    displayErrors = errors => errors.map((error, index) => (<p key={index}>{error.message}</p>));

    //** HANDLER FUNCTIONS */

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.formValid()) {
            this.setState({
                errors: [],
                loading: true
            });
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser); 
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                    this.saveUser(createdUser).then(() => {
                        console.log('user saved');
                    });
                    this.setState({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        loading: false
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    });
                })    
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    errors: this.state.errors.concat(err) ,
                    loading: false
                });
            });
        }
    }

    saveUser = createdUser => {
        return this.state.userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    }

    handleInputErrors = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    render() {
        const { username, email, password, confirmPassword, errors, loading } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450}}>
                    <Header as="h1" icon color="black" textAlign="center">
                        <Icon name="puzzle piece" color="black"/>
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
                                className={this.handleInputErrors(errors, 'email')} 
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
                                className={this.handleInputErrors(errors, 'password')}  
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
                                className={this.handleInputErrors(errors, 'confirmPassword')}  
                                value={confirmPassword}
                                type="password" 
                            />

                            <Button 
                                color="black" 
                                fluid
                                size="large"
                                disabled={ loading }
                                className={loading ? 'loading' : ''} >
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
