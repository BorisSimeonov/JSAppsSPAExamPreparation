import React from 'react';

import './HomeView.css';

export default class HomeView extends React.Component {
    render() {
        return (
            <div className="home-view">
                <h1>Home</h1>
                { this.props.username ?
                    <p>Welcome, {this.props.username}.</p> :
                    <p>Welcome to the book library.</p>
                }
            </div>
        )
    }
}
