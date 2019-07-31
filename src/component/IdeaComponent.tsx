import React from 'react';
import {Idea} from '../domain/Idea';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsDown, faThumbsUp} from '@fortawesome/free-regular-svg-icons';

type IdeaProps = {
    idea: Idea
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
                    <span>
                            <button type="button" className="btn btn-light"><FontAwesomeIcon
                                icon={faThumbsUp}/></button>
                            <button type="button" className="btn btn-light"><FontAwesomeIcon
                                icon={faThumbsDown}/></button>
                        </span>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="200" height="250"
                         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
                         focusable="false" role="img" aria-label="Placeholder: Thumbnail">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c"/>
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                    </svg>
                </div>
            </div>
        );
    }
}