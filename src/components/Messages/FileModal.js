import React, { Component } from 'react'
import { Modal, Input, Button, Icon, ModalActions } from 'semantic-ui-react';
import firebase from '../../firebase';
import mime from 'mime-types';

export class FileModal extends Component {
    state = {
        file: null,
        authorized: ['image/jpeg', 'image/png']
    }
    
    addFile = event => {
        const file = event.target.files[0];
        if (file) {
            this.setState({
                file: file
            });
        }
        console.log(file);
    }

    sendFile = () => {
        const { file } = this.state;
        const { uploadFile, closeModal } = this.props;
        if (file !== null) {
            if (this.isAuthorized(file.name)) {
                const metaData = { contentType: mime.lookup(file.name) };
                uploadFile(file, metaData);
                closeModal();
                this.clearFile();
            }
        }

    }

    clearFile = () => {
        this.setState({
            file: null
        });
    }

    isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));

    render() {
        const { modal, closeModal } = this.props;

        return (
            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Select An Image</Modal.Header>
                <Modal.Content>
                    <Input
                        onChange={this.addFile}
                        fluid
                        label="File type: jpg, png"
                        name="file"
                        type="file"
                    />
                </Modal.Content>
                <ModalActions>
                    <Button
                        color="red"
                        inverted
                        onClick={closeModal}
                    >
                        <Icon name="remove"/> Cancel    
                    </Button>

                    <Button
                        onClick={this.sendFile}
                        color="green"
                        inverted
                    >
                        <Icon name="checkmark"/> Send
                    </Button>
                </ModalActions>
            </Modal>
        )
    }
}

export default FileModal;
