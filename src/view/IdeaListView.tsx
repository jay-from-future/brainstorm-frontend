import React from 'react';
import {Idea} from '../domain/Idea';
import {IdeaComponent} from '../component/IdeaComponent';

const url = process.env.REACT_APP_API_URL;

type IdeaListViewState = {
    ideas: Idea[]
}

export class IdeaListView extends React.Component<any, IdeaListViewState> {

    _isMounted = false;

    constructor(props: any) {
        super(props);

        this.state = {
            ideas: []
        };

        this.loadIdeas = this.loadIdeas.bind(this);
    }

    loadIdeas(): void {
        const urlForIdeas = `${url}/ideas`;
        console.debug('IdeaListView.loadIdeas via url:', urlForIdeas);
        const accessToken = localStorage.getItem('access_token');
        fetch(urlForIdeas, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => {
            console.debug(response);
            return response.json()
        }).then(result => {
            console.debug(result);
            const ideas = result._embedded.ideas.map((i: any) => {
                const links = i._links;
                return new Idea(
                    links.self.href,
                    i.title,
                    i.description,
                    i.category,
                    new Date(i.createdDate),
                    new Date(i.lastModifiedDate)
                );
            });
            if (this._isMounted) {
                this.setState({
                    ideas: ideas
                });
            }
        }, error => {
            console.error(error)
        });
    }

    componentWillMount(): void {
        // load ideas
        this._isMounted = true;
        this.loadIdeas();
    }

    componentWillUnmount(): void {
        //
        this._isMounted = false;
    }

    render() {
        const {ideas} = this.state;
        const ideaComponents = ideas.map(idea => {
            return (<IdeaComponent idea={idea}/>)
        });

        return (
            <div>
                {ideaComponents}
            </div>
        );
    }
}