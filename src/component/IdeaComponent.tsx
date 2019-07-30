import React from 'react';

type IdeaProps = {
    title: string,
    description: string
}

export class IdeaComponent extends React.Component<IdeaProps> {

    render() {
        const {title, description} = this.props;
        return (
            <div>
                <p>Title: {title}</p>
                <p>Description: {description}</p>
            </div>
        );
    }
}