import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';

const serviceUri = require('../../../host').core + '/v1/core/fabrics';
const empty = {
    code: '',
    name: ''
}

'use strict';

export default class FabricAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, FabricAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.code} - ${this.name}`;
        };
        this.setState({ value: initialValue, options: options });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        return (
            <AutoSuggestReact
                value={this.state.value}
                onChange={this.props.onChange}
                options={this.state.options}
                />
        );
    }
}

FabricAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

FabricAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (text) {
            return fetch(serviceUri).then(results => results.json()).then(json => {
                return json.data.map(fabric => {
                    fabric.toString = function () {
                        return `${this.code} - ${this.name}`;
                    }
                    fabric.uom = fabric.uom || { unit: '' };
                    fabric.uom.toString = function () {
                        return this.unit;
                    }
                    return fabric;
                })
            })
        }
    }
};