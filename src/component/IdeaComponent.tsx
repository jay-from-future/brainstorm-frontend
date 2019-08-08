import React from 'react';
import {Idea} from '../domain/Idea';
import {VoteButtonsComponent} from './VoteButtonsComponent';

type IdeaProps = {
    idea: Idea,
    onUpdate: { (idea: Idea): void }
}

type IdeaState = {
    showFullDescription: boolean
}

export class IdeaComponent extends React.Component<IdeaProps, IdeaState> {

    constructor(props: IdeaProps) {
        super(props);

        this.state = {showFullDescription: false};
        this.showShortIdeaDescription = this.showShortIdeaDescription.bind(this);
        this.showFullIdeaDescription = this.showFullIdeaDescription.bind(this);
        this.handleThumbUpClick = this.handleThumbUpClick.bind(this);
        this.handleThumbDownClick = this.handleThumbDownClick.bind(this);
    }

    showShortIdeaDescription(): void {
        this.setState({
            showFullDescription: false
        })
    }

    showFullIdeaDescription(): void {
        this.setState({
            showFullDescription: true
        })
    }


    handleThumbUpClick(): void {
        let idea = this.props.idea;
        idea.thumbUp += 1;
        this.props.onUpdate(idea);
    }

    handleThumbDownClick(): void {
        let idea = this.props.idea;
        idea.thumbDown += 1;
        this.props.onUpdate(idea);
    }

    render() {
        const {idea} = this.props;
        const {showFullDescription} = this.state;

        let shortDescription = idea.description;
        let showMoreOrLessLink;

        if (showFullDescription) {
            showMoreOrLessLink = <a href="#" onClick={this.showShortIdeaDescription}>Show less</a>;
        } else {
            // description for this preview component should be shortened if it requires
            if (idea.description.length > 255) {
                shortDescription = idea.description.substring(0, 255) + '...';
                showMoreOrLessLink = <a href="#" onClick={this.showFullIdeaDescription}>Show more</a>;
            }
        }

        return (
            <div
                className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-danger">{idea.category}</strong>
                    <h3 className="mb-0">{idea.title}</h3>
                    <div
                        className="mb-1 text-muted">{idea.updated.toLocaleDateString()} {idea.updated.toLocaleTimeString()}</div>
                    <p className="card-text mb-auto" style={{'wordWrap': 'break-word'}}>{shortDescription}</p>
                    {showMoreOrLessLink}
                    <br/>
                    <VoteButtonsComponent thumbUpCount={idea.thumbUp}
                                          handleThumbUpClick={this.handleThumbUpClick}
                                          thumbDownCount={idea.thumbDown}
                                          handleThumbDownClick={this.handleThumbDownClick}/>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img src={idea.picture} alt="Picture of the idea" width="200" height="250"/>
                </div>
            </div>
        );
    }
}