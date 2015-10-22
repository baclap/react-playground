'use strict';

import { React, Base } from './components/base'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

class Hello extends Base {
    render() {
        return <p>hello world</p>
    }
}

class App extends Base {
    render() {
        return (
            <div className="app-body">
                <ul>
                    <li><Link to="/example-a">Example A</Link></li>
                    <li><Link to="/example-b">Example B</Link></li>
                </ul>
                <p>
                    {this.props.children}
                </p>
            </div>
        )
    }
}

class ExampleA extends Base {
    render() {
        return (
            <span>hello world</span>
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

// render((
//     <Router>
//         <Route path="/" component={App}>
//             <Route path="example-a" component={ExampleA} />
//             <Route path="example-b" component={ExampleB} />
//         </Route>
//     </Router>
// ), document.querySelector('#app'))

render(<Hello />, document.querySelector('#app'));
