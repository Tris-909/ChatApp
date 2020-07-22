import React, { Component } from 'react'
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

export class MessagesHeader extends Component {
    render() {
        const {channel, numbOfUniqueUsers, handleSearchChange} = this.props;
        return (
            <Segment clearing>

                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                    <span>
                        {channel !== null ? channel.name : null}
                        <Icon name={'star outline'} color="black" /> 
                    </span>
                    <Header.Subheader>
                        {numbOfUniqueUsers}
                    </Header.Subheader>
                </Header>

                <Header floated="right">
                    <Input 
                        onChange={handleSearchChange}
                        size="mini" 
                        icon="search" 
                        name="searchTerm" 
                        placeholder="Search Messages" />
                </Header>
                
            </Segment>
        )
    }
}

export default MessagesHeader
