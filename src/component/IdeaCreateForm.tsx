import React from 'react';
import {Idea} from '../domain/Idea';

const url = process.env.REACT_APP_API_URL;

type IdeaCreateFormState = {
    idea: Idea
}

export class IdeaCreateForm extends React.Component<any, IdeaCreateFormState> {

    constructor(props: any) {
        super(props);

        this.state = {idea: Idea.getDefault()};

        this.onCreate = this.onCreate.bind(this);
        this.cleanUpForm = this.cleanUpForm.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    onCreate(): void {
        const urlForIdeas = `${url}/ideas`;
        console.debug('IdeaCreateForm.onCreate via url: ', urlForIdeas);
        const {idea} = this.state;
        const accessToken = localStorage.getItem('access_token');
        fetch(urlForIdeas, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                title: idea.title,
                description: idea.description,
                category: idea.category,
                voters: []
            })
        })
            .then(
                (result) => {
                    console.log(result);
                    this.cleanUpForm();
                },
                (error) => {
                    console.error(error);
                }
            );

    }

    cleanUpForm(): void {
        console.debug('IdeaCreateForm.cleanUpForm');
        this.setState({idea: Idea.getDefault()});
    }

    handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const idea = this.state.idea;
        idea.title = e.currentTarget.value;
        this.setState({idea: idea});
    }

    handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const idea = this.state.idea;
        idea.category = e.currentTarget.value;
        this.setState({idea: idea});
    }

    handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        const idea = this.state.idea;
        let textContent = e.currentTarget.value;
        idea.description = textContent ? textContent : '';
        this.setState({idea: idea});
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.debug('IdeaCreateForm.handleSubmit');
        this.onCreate();
    }

    handleReset() {
        this.cleanUpForm();
    }

    render() {
        const {idea} = this.state;
        console.debug('render: ', idea);
        return (<div>
            <div style={{'backgroundColor': 'lightGrey', 'marginBottom': '25px', 'padding': '15px'}}
                 className="border rounded shadow-sm">
                <h3>Share a new idea:</h3>
                <form onSubmit={this.handleSubmit} onReset={this.handleReset}>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputTitle">Title</label>
                            <input type="text" className="form-control" id="inputTitle"
                                   placeholder="Enter idea title" value={idea.title} onChange={this.handleTitleChange}/>
                            <small id="titleHelp" className="form-text text-muted">Give a meaningful title that
                                gives a hint what is your idea about.
                            </small>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCategory">Category</label>
                            <input type="text" className="form-control" id="inputCategory"
                                   placeholder="Select idea category" value={idea.category}
                                   onChange={this.handleCategoryChange}/>
                            <small id="titleHelp" className="form-text text-muted">
                                Select idea categories.
                            </small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDescription">Description</label>
                        <textarea className="form-control" id="inputDescription"
                                  placeholder="Enter idea description" rows={3} value={idea.description}
                                  aria-valuetext={idea.description}
                                  onChange={this.handleDescriptionChange}/>
                        <small id="descriptionHelp" className="form-text text-muted">Try to clearly express your
                            idea in few words.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Load a picture to illustrate your idea:</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                    <div className="form-row">
                        <button type="submit" className="btn btn-primary">Share</button>
                        <button type="reset" style={{'marginLeft': '5px'}} className="btn btn-secondary">Clean</button>
                    </div>
                </form>
            </div>
        </div>);
    }
}