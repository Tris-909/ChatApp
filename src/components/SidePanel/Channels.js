import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';


export class Channels extends Component {
    state = {
        channels: [],
        channelName: '',
        channelDetails: '', 
        modal: false
    }
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
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
            </Menu.Menu>

            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>
                    Add a Channel
                </Modal.Header>
                <Modal.Content>
                    <Form>
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

                    <Button color="green" inverted>
                        <Icon name="checkmark" /> Add
                    </Button>
                </Modal.Actions>
            </Modal>
            </React.Fragment>
        );
    }
}

export default Channels;