import React, { Component } from 'react'
import { Modal, Input, Button, Icon, ModalActions } from 'semantic-ui-react';

export class FileModal extends Component {
    render() {
        const { modal, closeModal } = this.props;

        return (
            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Select An Image</Modal.Header>
                <Modal.Content>
                    <Input
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
