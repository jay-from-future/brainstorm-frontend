import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {IdeaListView} from './view/IdeaListView';
import {IdeaCreateForm} from './component/IdeaCreateForm';

class App extends React.Component {

    render() {
        return (
            <div className="container">
                <IdeaCreateForm/>
                <IdeaListView/>
            </div>
        );
    }
}

export default App;