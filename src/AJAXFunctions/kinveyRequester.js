import $ from 'jquery';

let KinveyRequester = (function () {
    const app_key = 'kid_ByfiqqTWe',
        app_secret = '4ec08a01f0254ad1bc6457bb96f1158e',
        base_url = 'https://baas.kinvey.com/',
        authHeaders = {
            'Authorization': 'Basic ' +
            btoa(`${app_key}:${app_secret}`)
        };

    let registerUser = function (username, password) {
        return $.ajax({
            method: 'POST',
            url: base_url + 'user/' + app_key + '/',
            headers: authHeaders,
            data: JSON.stringify({username, password}),
            contentType: 'application/json'
        })
    };

    let loginUser = function (username, password) {
        return $.ajax({
            method: 'POST',
            url: base_url + 'user/' +
                app_key + '/login',
            headers: authHeaders,
            data: JSON.stringify({username, password}),
            contentType: 'application/json'
        });
    };

    let logoutUser = function () {
        return $.ajax({
            method: 'POST',
            url: base_url + 'user/' +
                app_key + '/_logout',
            headers: getKinveyAuthHeaders()
        });
    };

    let loadBooks = function () {
        return $.get({
            url: base_url + 'appdata/' +
                app_key + '/spa-books',
            headers: getKinveyAuthHeaders()
        })
    };
    
    let createNewBook = function (title, author, description) {
        return $.ajax({
            method: 'POST',
            url: base_url + 'appdata/' +
                app_key + '/spa-books',
            headers: getKinveyAuthHeaders(),
            data: {title, author, description}
        })
    };

    let editBook = function (bookId, title, author, description) {
        return $.ajax({
            method: 'PUT',
            url: base_url + 'appdata/' +
            app_key + '/spa-books/' + bookId,
            headers: getKinveyAuthHeaders(),
            data: {title, author, description}
        })
    };

    function getKinveyAuthHeaders() {
        return {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
    }

    function deleteBook(bookId) {
        console.log('kinvey');
        return $.ajax({
            method: 'DELETE',
            url: base_url + 'appdata/' + app_key +
                '/spa-books/' + bookId,
            headers: getKinveyAuthHeaders()
        })
    }

    return {
        loginUser,
        logoutUser,
        registerUser,
        createNewBook,
        loadBooks,
        editBook,
        deleteBook
    }
})();

export default KinveyRequester;
