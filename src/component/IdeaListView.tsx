import React from 'react';
import {Idea} from '../domain/Idea';
import {IdeaComponent} from './IdeaComponent';

type IdeaListViewProps = {
    ideas: Idea[]
    onUpdate: { (idea: Idea): void }
}

export class IdeaListView extends React.Component<IdeaListViewProps> {

    render() {
        const {ideas, onUpdate} = this.props;
        console.debug('ideas: ', ideas);
        let ideaComponents;
        if (ideas) {
            ideaComponents = ideas.map(idea => {
                return (<IdeaComponent idea={idea} onUpdate={onUpdate}/>)
            });
        }
        return (
            <div>
                {ideaComponents}
            </div>
        );
    }
}