import React from 'react';

export default class HomeView extends React.Component {
    render() {
        return (
            <div className="home-view">
                <h1>Home</h1>
                { this.props.username ?
                    <p>Welcome, {this.props.username}.</p> :
                    <p>No user logged in.</p>
                }
            </div>
        )
    }
}
