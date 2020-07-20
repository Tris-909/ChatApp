import React, { Component } from 'react'
import {Segment, Button, Input} from 'semantic-ui-react';
import firebase from '../../firebase';

export class MessageForm extends Component {
    state = {
        message: '',
        loading: false,
        channel: this.props.channel,
        user: this.props.user,
        errors: []
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    createMessage = () => {
        const message = {
            content: this.state.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            } 
        }
        return message; 
    }

    sendMessages = () => {
        const { messagesRef } = this.props;
        const { message, channel } = this.state;

        if (message) {
            this.setState({
                loading: true
            });
            messagesRef.child(channel.id).push().set(this.createMessage())
            .then(() => {
                this.setState({
                    loading: false,
                    message: '',
                    errors: []
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    errors: this.state.errors.concat(err)
                });
            })
        } else {
            this.setState({
                errors: this.state.errors.concat({ message: 'Add a message' })
            });
        }

    }

    render() {
        const { errors, message, loading } = this.state;

        return (
            <Segment className="message__form">
                <Input 
                    fluid 
                    name="message" 
                    style={{ marginBottom: '0.7em' }} 
                    label={<Button icon={'add'} />} 
                    onChange={this.handleChange}
                    labelPosition="left" 
                    value={message}
                    className = {
                        errors.some(error => error.includes('message')) ? 'error': ''
                    }
                    placeholder="Write your message"
                />
                <Button.Group icon widths="2">
                    <Button 
                        onClick = {this.sendMessages}
                        disabled={loading}
                        color="orange" 
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                    />
                    <Button 
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />
                </Button.Group>
            </Segment>
        )
    }
}

export default MessageForm
