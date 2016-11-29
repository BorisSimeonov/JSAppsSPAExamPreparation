import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import Footer from './Components/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar';

import HomeView from './Views/HomeView/HomeView';
import LoginView from './Views/LoginView/LoginView';
import RegisterView from './Views/RegisterView/RegisterView';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            userId: null
        }
    }

    render() {
        return (
            <div className="App">
                <header>
                    <NavigationBar
                        username={this.state.username}
                        homeClicked={this.showHomeView.bind(this)}
                        loginClicked={this.showLoginView.bind(this)}
                        registerClicked={this.showRegisterView.bind(this)}
                    />
                    <div id="loadingBox">Loading msg</div>
                    <div id="infoBox">Info msg</div>
                    <div id="errorBox">Error msg</div>
                </header>
                <div id="main">Main app view.</div>
                <Footer />
            </div>
        );
    }

    showView(reactComponent) {
        ReactDOM.render(
            reactComponent,
            document.getElementById('main')
        )
    }

    showHomeView() {
        this.showView(<HomeView />);
    }

    showLoginView() {
        this.showView(<LoginView />);
    }

    showRegisterView() {
        this.showView(<RegisterView />);
    }
}
