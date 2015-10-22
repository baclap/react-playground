'use strict';

import { React, Base } from './components/base'
import { render, findDOMNode } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import classnames from 'classnames'

class Menu extends Base {
    render() {
        return (
            <ul className="menu">
                {this.props.children}
            </ul>
        )
    }
}

class MenuItem extends Base {
    render() {
        return (
            <li className={classnames([
                    'menu-item',
                    {'active': this.props.to == this.props.currentPath}
                ])}>
                <Link to={this.props.to}>{this.props.children}</Link>
            </li>
        )
    }
}

class App extends Base {
    render() {
        return (
            <div className="app-body">
                <Menu>
                    <MenuItem to="/example-a" currentPath={this.props.location.pathname}>
                        Example A
                    </MenuItem>
                    <MenuItem to="/example-b" currentPath={this.props.location.pathname}>
                        Example B
                    </MenuItem>
                </Menu>
                <p>
                    {this.props.children}
                </p>
            </div>
        )
    }
}

class ExampleA extends Base {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }
    componentDidMount() {
        console.log('A is mounting...')
        const link = findDOMNode(this.refs.link);
        $(link).button()
    }
    componentWillUnmount() {
        console.log('A is unmounting...')
    }
    handleClick(e) {
        e.preventDefault();
        let newCount = this.state.count + 1;
        this.setState({
            count: newCount
        })
    }
    render() {
        return (
            <a href="#" ref="link" onClick={this.handleClick}>{this.state.count}</a>
        )
    }
}

class ExampleB extends Base {
    render() {
        return (
            <span>this is b</span>
        )
    }
}

render((
    <Router>
        <Route path="/" component={App}>
            <Route path="example-a" component={ExampleA} />
            <Route path="example-b" component={ExampleB} />
        </Route>
    </Router>
), document.querySelector('#app'))
