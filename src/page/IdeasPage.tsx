import React from 'react';
import {IdeaListView} from '../view/IdeaListView';
import {IdeaCreateForm} from '../component/IdeaCreateForm';

export const IdeasPage = () => {
    return (
        <main role='main' className='flex-shrink-0'>
            <div className="container">
                <IdeaCreateForm/>
                <IdeaListView/>
            </div>
        </main>
    );
};

export default IdeasPage;