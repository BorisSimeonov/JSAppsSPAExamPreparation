import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import Footer from './Components/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar';

import BooksView from './Views/BooksView/BooksView';
import CreateBookView from './Views/CreateBookView/CreateBookView';
import EditBookView from  './Views/EditBookView/EditBookView';
import HomeView from './Views/HomeView/HomeView';
import LoginView from './Views/LoginView/LoginView';
import RegisterView from './Views/RegisterView/RegisterView';

import $ from 'jquery';
import KinveyRequester from './AJAXFunctions/kinveyRequester';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem('username'),
            userId: sessionStorage.getItem('userId')
        }
    }

    componentDidMount() {
        $(document).on({
            ajaxStart: function () {
                $('#loadingBox').show()
            },
            ajaxStop: function () {
                $('#loadingBox').hide()
            }
        });

        $(document).ajaxError(this.handleAjaxError.bind(this));
        $('#errorBox').on('click', function () {
            $(this).hide();
        });
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
        setTimeout(function () {
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
        this.showView(<HomeView username={this.state.username}/>);
    }

    showLoginView() {
        this.showView(<LoginView onsubmit={this.login.bind(this)}/>);
    }

    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)}/>);
    }

    showBooksView() {
        KinveyRequester.loadBooks()
            .then(bookLoadSuccess.bind(this));

        function bookLoadSuccess(booksArray) {
            this.showInfo('Books loaded.');
            this.showView(<BooksView books={booksArray}
            onedit={this.showEditBookView.bind(this)}
            ondelete={this.deleteBook.bind(this)}/>);
        }
    }

    editBook(bookId, title, author, description) {
        KinveyRequester.editBook(bookId, title, author, description)
            .then(editSuccess.bind(this));
        function editSuccess() {
            this.showInfo('Book edited.');
            this.showBooksView();
        }
    }

    deleteBook(bookId) {
        console.log('delete');
        KinveyRequester.deleteBook(bookId)
            .then(deleteSuccess.bind(this));
        function deleteSuccess() {
            console.log('success');
            this.showInfo('Book deleted.');
            this.showBooksView();
        }
    }

    showCreateBookView() {
        this.showView(<CreateBookView onsubmit={this.createBook.bind(this)}/>);
    }

    showEditBookView(bookId) {
        this.showView(<EditBookView
            onsubmit={this.editBook.bind(this, bookId)}/>);
    }

    createBook(title, author, description) {
        KinveyRequester.createNewBook(title, author, description)
            .then(createNewBookSuccess.bind(this));
        function createNewBookSuccess() {
            this.showInfo('BookPosted');
            this.showBooksView();
        }
    }

    login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(loggedUser) {
            this.saveAuthInSession(loggedUser);
            this.showBooksView();
            this.showInfo('Login successful');
        }
    }

    logout() {
        KinveyRequester.logoutUser();
        sessionStorage.clear();
        this.setState({
            username: null,
            userId: null
        });
        this.showHomeView();
        this.showInfo('Logout successful.')
    }

    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);

        this.setState({
            username: userInfo.username,
            userId: userInfo._id
        });
    }

    register(username, password) {
        KinveyRequester.registerUser(username, password)
            .then(userRegistrationSuccess.bind(this));
        console.log(this);

        function userRegistrationSuccess() {
            console.log(this);
            this.showLoginView();
            this.showInfo('Registration successful.');
        }
    }


}
