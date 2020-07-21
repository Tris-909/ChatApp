import React, { Component } from 'react'
import uuidv4 from 'uuid/v4';
import {Segment, Button, Input} from 'semantic-ui-react';
import firebase from '../../firebase';
import FileModal from './FileModal';

export class MessageForm extends Component {
    state = {
        message: '',
        loading: false,
        channel: this.props.channel,
        user: this.props.user,
        errors: [],
        modal: false,
        uploadState: '',
        uploadTask: null,
        storageRef: firebase.storage().ref(),
        percentUploaded: 0
    }

    openModal = () => {
        this.setState({ modal: true });
    }

    closeModal = () => {
        this.setState({ modal: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleKeyPres = (event) => {
        if (event.key === 'Enter') {
            this.sendMessages();
        }
    }

    createMessage = (fileUrl = null) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            } 
        }
        if (fileUrl !== null) {
            message['image'] = fileUrl;
        } else {
            message['content'] = this.state.message;
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

    uploadFile = (file, metaData) => {
        const pathToUpload = this.state.channel.id;
        const ref = this.props.messagesRef;
        const filePath = `chat/public/${uuidv4()}.jpg`;

        this.setState({
            uploadState: 'uploading',
            uploadTask: this.state.storageRef.child(filePath).put(file, metaData)
        }, () => {
            this.state.uploadTask.on('state_changed', snap => {
                const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                this.setState({ percentUploaded: percentUploaded });
            }, 
                err => {
                    console.log(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        uploadState: 'error',
                        uploadTask: null
                    });
                },
                () => {
                    this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                        this.sendFileMessages(downloadUrl, ref, pathToUpload); 
                    }).catch(err => {
                        console.log(err);
                        this.setState({
                            errors: this.state.errors.concat(err),
                            uploadState: 'error',
                            uploadTask: null
                        });
                    })
                })
            })
    }

    sendFileMessages = (fileUrl, ref, pathToUpload) => {
        console.log('sendFileMessages fired')
        ref.child(pathToUpload).push().set(this.createMessage(fileUrl))
        .then(() => {
            this.setState({
                uploadState: 'done'
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                errors: this.state.errors.concat(err)
            })
        })
    }

    render() {
        const { errors, message, loading, modal } = this.state;

        return (
            <Segment className="message__form" >
                <Input 
                    fluid 
                    name="message" 
                    style={{ marginBottom: '0.7em' }} 
                    label={<Button icon={'add'} />} 
                    onChange={this.handleChange}
                    labelPosition="left" 
                    value={message}
                    onKeyPress={this.handleKeyPres}
                    // className = {
                    //     errors.some(error => error.message.includes('message')) ? 'error' : ''
                    // }   
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
                        onClick={this.openModal} 
                        labelPosition="right"
                        icon="cloud upload"
                    />
                    <FileModal 
                        modal={modal}
                        closeModal={this.closeModal}
                        uploadFile={this.uploadFile}
                    />
                </Button.Group>
            </Segment>
        )
    }
}

export default MessageForm
