import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="app">
                {/* <Route
                    path='/questions'
                    component={loadableQuestionList}
                    /> */}
                {/* <Route
                    path='/answers'
                    component={loadableAnswerList}
                    /> */}
                {/* <Route
                    path='/'
                    exact={ true }
                    render={ () => (
                        <Question />
                    )}
                    /> */}
            </div>
        );
    }
}

export default App;