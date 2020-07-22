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
        messages: [],
        numbOfUniqueUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: []
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
            this.countUniqueUsers(loadedMessages);
        });
    }
 
    countUniqueUsers = (messages) => {
        const uniqueUser = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);
        const numberOfUniqueUsers = uniqueUser.length > 1 ? `${uniqueUser.length} users` : `${uniqueUser.length} user`;
        this.setState({
            numbOfUniqueUsers: numberOfUniqueUsers
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

    handleSearchChange = (event) => {
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        }, () => this.handleSearchMessages());
    }

    handleSearchMessages = () => {
        const channelMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, 'gi');
        const searchResults = channelMessages.reduce((acc, message) => {
            if (message.content && message.content.match(regex)) {
                acc.push(message);
            }
            console.log(acc);
            return acc;
        }, []);
        this.setState({ searchResults });
    }

    render() {
        const { messagesRef, messages, messagesLoading, channel, user, numbOfUniqueUsers, searchResults, searchTerm } = this.state;
        return(
            <React.Fragment>
                <MessagesHeader channel={channel} numbOfUniqueUsers={numbOfUniqueUsers} handleSearchChange={this.handleSearchChange}/>
                <Segment>
                    <Comment.Group style={{maxWidth: '100%'}} className="messages">
                    {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages) } 
                    </Comment.Group>
                </Segment>
                <MessageForm messagesRef = {messagesRef} channel={channel} user={user} />
            </React.Fragment>
        );
    }
}

export default Messages;