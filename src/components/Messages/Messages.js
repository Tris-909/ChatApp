import React from 'react';
import {Segment, Comment} from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';
import firebase from '../../firebase';

class Messages extends React.Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user: this.props.user,
        messagesLoading: true,
        messages: []
    }
    
    componentDidMount() {
        const { channel, user } = this.state;
        
        if (channel && user) {
            this.addListener(channel.id);
        }
        this.displayMessages(this.state.messages);
    }

    addListener = channelID => {
        this.addMessageListener(channelID);
    }

    addMessageListener = channelID => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelID).on('child_added', snap => {
            loadedMessages.push(snap.val());
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            });
        });
    }
 
    displayMessages = messages => (
        messages.length > 0 && messages.map(message => (
            <Message 
                key={message.timestamp} 
                message={message} 
                user={this.state.user}
            />
        ))
    )

    render() {
        const { messagesRef, messages, messagesLoading, channel, user } = this.state;
        return(
            <React.Fragment>
                <MessagesHeader />
                <Segment>
                    <Comment.Group style={{maxWidth: '100%'}} className="messages">
                    {/* Message */}
                    {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>
                <MessageForm messagesRef = {messagesRef} channel={channel} user={user} />
            </React.Fragment>
        );
    }
}

export default Messages;