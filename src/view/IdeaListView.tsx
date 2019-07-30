import React from 'react';
import {Idea} from '../domain/Idea';
import {IdeaComponent} from '../component/IdeaComponent';

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
        const url = 'http://localhost:8080/ideas';
        console.debug('IdeaListView.loadIdeas via url:', url);
        fetch(url)
            .then(response => {console.debug(response); return response.json()})
            .then(result => {
                console.debug(result);
                const ideas = result._embedded.ideas.map((i: any) => {
                    const links = i._links;
                    return new Idea(
                        links.self.href,
                        i.title,
                        i.description);
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
        const ideaComponents = ideas.map(i => {
            return (<IdeaComponent title={i.title} description={i.description}/>)
        });

        return (
            <div>
                <p>List of all ideas: </p>
                {ideaComponents}
            </div>
        );
    }
}