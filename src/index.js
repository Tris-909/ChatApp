import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'

//** COMPONENTS */
import App from './components/App';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />   
            <Route  path="/login" component={Login} />   
            <Route  path="/signup" component={SignUp} />   
        </Switch>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
