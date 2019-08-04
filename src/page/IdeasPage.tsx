import React from 'react';
import {IdeaListView} from '../component/IdeaListView';
import {IdeaCreateForm} from '../component/IdeaCreateForm';
import {Idea} from '../domain/Idea';

const url = process.env.REACT_APP_API_URL;

type IdeasPageState = {
    ideas: Idea[]
}

export class IdeasPage extends React.Component<any, IdeasPageState> {

    _isMounted = false;

    constructor(props: any) {
        super(props);

        this.state = {
            ideas: []
        };

        this.loadIdeas = this.loadIdeas.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;
        this.loadIdeas();
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    loadIdeas(): void {
        const urlForIdeas = `${url}/ideas?sort=createdDate,desc`;
        console.debug('IdeasPage.loadIdeas via url:', urlForIdeas);
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

    render() {
        const {ideas} = this.state;
        return (
            <main role='main' className='flex-shrink-0'>
                <div className="container">
                    <IdeaCreateForm onCreate={this.loadIdeas}/>
                    <IdeaListView ideas={ideas}/>
                </div>
            </main>
        )
    }
}

export default IdeasPage;