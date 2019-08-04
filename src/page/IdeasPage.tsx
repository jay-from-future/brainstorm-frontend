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
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
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
                    new Date(i.lastModifiedDate),
                    i.thumbUp,
                    i.thumbDown
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

    onCreate(idea: Idea): void {
        const urlForIdeas = `${url}/ideas`;
        console.debug('IdeaCreateForm.onCreate via url: ', urlForIdeas);
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
                thumbUp: idea.thumbUp,
                thumbDown: idea.thumbUp
            })
        })
            .then(
                (result) => {
                    console.log(result);
                    this.loadIdeas();
                },
                (error) => {
                    console.error(error);
                }
            );

    }

    onUpdate(idea: Idea): void {
        console.debug("updating ides: ", idea);
        const accessToken = localStorage.getItem('access_token');
        fetch(idea.self, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                title: idea.title,
                description: idea.description,
                category: idea.category,
                thumbUp: idea.thumbUp,
                thumbDown: idea.thumbDown
            })
        })
            .then(
                (result) => {
                    console.log(result);
                    this.loadIdeas();
                },
                (error) => {
                    console.error(error);
                }
            );

    }

    render() {
        const {ideas} = this.state;
        return (
            <main role='main' className='flex-shrink-0'>
                <div className="container">
                    <IdeaCreateForm onCreate={this.onCreate}/>
                    <IdeaListView ideas={ideas} onUpdate={this.onUpdate}/>
                </div>
            </main>
        )
    }
}

export default IdeasPage;