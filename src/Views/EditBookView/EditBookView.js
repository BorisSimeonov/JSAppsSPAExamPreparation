import React from 'react';

export default class EditBookView extends React.Component {
    render() {
        return (
            <form className="create-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Create Book</h1>
                <label>
                    <div>Title</div>
                    <input type="text" name="title" defaultValue={this.props.bookInstance.title} required
                           ref={e => this.titleField = e}/>
                </label>
                <label>
                    <div>Author</div>
                    <input type="text" name="author" defaultValue={this.props.bookInstance.author} required
                           ref={e => this.authorField = e}/>
                </label>
                <label>
                    <div>Description</div>
                    <textarea type="text" name="description" defaultValue={this.props.bookInstance.description}
                           ref={e => this.descriptionField = e}/>
                </label>
                <div>
                    <input type="submit" value="EditBook"/>
                </div>
            </form>
        )
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.titleField.value,
            this.authorField.value,
            this.descriptionField.value
        )
    }
}
