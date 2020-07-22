import React, { Component } from 'react'
import firebase from '../../firebase';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false
    }

    isFormValid = ({ email , password }) => email && password;

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
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((signedInUser) => {
                console.log(signedInUser);
                this.setState({
                    loading: false
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: false,
                    errors: this.state.errors.concat(err)
                });
            })
        } else {
            let err = { message: "Email and Password must not be empty" }
            this.setState({
                errors: [err] 
            })
        }
    }

    handleInputErrors = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    render() {
        const {email, password, errors, loading } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450}}>
                    <Header as="h1" icon color="black" textAlign="center">
                        <Icon name="code branch" color="black"/>
                        Log In FreiiChatRoom
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
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
                    <Message>Don't have an account ? <Link to="/signup">Click Here</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;
