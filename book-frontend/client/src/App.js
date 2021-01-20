import React, {PropTypes, Component} from 'react';
import AppShell from './router/appshell';
import "./style/scss/common/index.scss"
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<AppShell/>);
    }
}

export default App;