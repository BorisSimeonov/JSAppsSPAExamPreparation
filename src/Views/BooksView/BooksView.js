import React from 'react';

export default class BooksView extends React.Component {
    render() {
        let bookRows = this.props.books.map(book =>
            <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description || 'N/A'}</td>
                <td>
                    {this.getBookActions(book)}
                </td>
            </tr>);

        return (
            <table className="books-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookRows}
                </tbody>
            </table>
        )
    }

    getBookActions(book) {
        return <div>
            <button onClick={this.props.onedit.bind(this, book._id)}>Edit</button>
            <button onClick={this.props.ondelete.bind(this, book._id)}>Delete</button>
        </div>
    }
}
