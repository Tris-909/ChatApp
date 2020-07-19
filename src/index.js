import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
import firebase from './firebase';

//** COMPONENTS */
import App from './components/App';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

class Root extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/');
            }
        });
    } 

    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />   
                <Route  path="/login" component={Login} />   
                <Route  path="/signup" component={SignUp} />   
            </Switch>
        );
    }
}

const RootWithAuth = withRouter(Root);

ReactDOM.render(<Router><RootWithAuth /></Router>, document.getElementById('root'));
registerServiceWorker();
