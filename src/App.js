import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './App.css';

import Footer from './Components/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar';

import BooksView from './Views/BooksView/BooksView';
import CreateBookView from './Views/CreateBookView/CreateBookView';
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

    componentDidMount() {
        $(document).on({
            ajaxStart: function () { $('#loadingBox').show() },
            ajaxStop: function () { $('#loadingBox').hide() }
        });

        $(document).ajaxError(this.handleAjaxError.bind(this));
    }

    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }

    render() {
        return (
            <div className="App">
                <header>
                    <NavigationBar
                        booksClicked={this.showBooksView.bind(this)}
                        createBookClicked={this.showCreateBookView.bind(this)}
                        homeClicked={this.showHomeView.bind(this)}
                        loginClicked={this.showLoginView.bind(this)}
                        logoutClicked={this.logout.bind(this)}
                        registerClicked={this.showRegisterView.bind(this)}

                        username={this.state.username}
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

    showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function() {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg).show();
    }

    showView(reactComponent) {
        ReactDOM.render(
            reactComponent,
            document.getElementById('main')
        );

        $('#errorBox').hide();
    }

    showHomeView() {
        this.showView(<HomeView
            username={this.state.username}
        />);
    }

    showLoginView() {
        this.showView(<LoginView />);
    }

    showRegisterView() {
        this.showView(<RegisterView />);
    }

    showBooksView() {
        this.showView(<BooksView />);
    }

    showCreateBookView() {
        this.showView(<CreateBookView />);
    }

    logout() {
        //TODO: change and implement logout
    }
}
