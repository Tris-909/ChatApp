import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions/index';

export class Channels extends Component {
    state = {
        activeChannel: '', 
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '', 
        modal: false,
        firstLoad: true,
        channelsRef: firebase.database().ref('channels')
    }
    
    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addListeners = () => {
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
        });
    }

    removeListeners = () => {
        this.state.channelsRef.off();
    }

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel);
            this.setState({
                activeChannel: firstChannel.id
            });
        }
        this.setState({ firstLoad: false });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addChannel();
        }
    }

    addChannel = () => {
        const { user, channelsRef, channelName, channelDetails } = this.state;

        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        channelsRef.child(key).update(newChannel)
        .then(() => {
            this.setState({
                channelName: '',
                channelDetails: ''
            });
            this.closeModal();
            console.log('channel added');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
    }

    setActiveChannel = channel => {
        this.setState({
            activeChannel: channel.id
        });
    }

    openModal  = () => {
        this.setState({
            modal: true
        });
    }

    closeModal = () => {
        this.setState({
            modal: false
        });
    }

    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                active={channel.id === this.state.activeChannel}
                style={{ opacity: 0.7 }}>
                    # {channel.name}
            </Menu.Item>
        ))
    );

    render() {
        const { channels, modal } = this.state;

        return (
            <React.Fragment> 
            <Menu.Menu style={{ paddingBottom: '2em' }}>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> CHANNELS
                    </span>{" "}
                    ({ channels.length }) <Icon name="add" onClick={this.openModal} />
                </Menu.Item>
                {/* Channels */}
                {this.displayChannels(channels)}
            </Menu.Menu>

            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>
                    Add a Channel
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Input 
                                fluid 
                                label="Name of Channel"
                                name="channelName"
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Input 
                                fluid 
                                label="About the channel"
                                name="channelDetails"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button color="red" onClick={this.closeModal} inverted>
                        <Icon name="remove" /> Cancel
                    </Button>

                    <Button color="green" onClick={this.handleSubmit} inverted>
                        <Icon name="checkmark" /> Add
                    </Button>
                </Modal.Actions>
            </Modal>
            </React.Fragment>
        );
    }
}

export default connect(null, { setCurrentChannel })(Channels);