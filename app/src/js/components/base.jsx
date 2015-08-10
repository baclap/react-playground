'use strict';

const React = require('react');

/**
 * Custom base class for building React components using
 * ES6 classes. Brings back autobinding this to functions
 * in the way React.createClass did.
 *
 * Based on: https://github.com/SimonDegraeve/react-class-helper/blob/master/lib/component.js
 */
class Base extends React.Component {
    constructor(props, shouldAutoBind = true) {
        super(props);

        // If options `shouldAutoBind` is true (default),
        // bind all methods to class instance
        if (shouldAutoBind) {
            this.autoBind();
        }
    }

    /**
     * Bind an array of method name to class instance
     * @param {Array} methods An array of function names to bind
     */
    bind(methods) {
        methods.forEach(method => {
            this[method] = this[method].bind(this);
        });
    }

    /**
     * Bind all methods to class instance
     */
    autoBind() {
        this.bind(
            Object.getOwnPropertyNames(this.constructor.prototype).filter(prop => {
                if (typeof this[prop] === 'function') {
                    return true;
                }
            })
        );
    }
}

exports.Base = Base;
exports.React = React;
