var React = require('react');
require('./loader.css');

var Loading = React.createClass({

  render() {
    return <div className={'loader loader--' + this.props.type}></div>;
  }

});

module.exports = Loading;
