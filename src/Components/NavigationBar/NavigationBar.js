import React from 'react';

import './NavigationBar.css';

export default class NavigationBar extends React.Component {
    render() {
        if (!this.props.username) {
            return (
                <div className="navigation-bar">
                    <a href="#" onClick={this.props.homeClicked}>Home</a>
                    <a href="#" onClick={this.props.loginClicked}>Login</a>
                    <a href="#" onClick={this.props.registerClicked}>Register</a>
                </div>
            )
        } else {
            return (
                <div className="navigation-bar">
                    <a href="#" onClick={this.props.homeClicked}>Home</a>
                    <a href="#" onClick={this.props.booksClicked}>Books</a>
                    <a href="#" onClick={this.props.createBookClicked}>CreateBook</a>
                    <a href="#" onClick={this.props.logoutClicked}>Logout</a>
                </div>
            )
        }
    }
}
