var React = require('react');
var _ = require('underscore');
var rbootstrap = require('react-bootstrap');
var { Button, Label } = rbootstrap;

require('./Card.css');

var Card = React.createClass({

  propTypes: {
    type: React.PropTypes.oneOf(['empty']).isRequired
  },

  render() {
    switch (this.props.type) {
      case "notification":

        return (
          <div className={"bs-callout bs-callout-danger Card Card-" + this.props.type}>


            <h4>{this.props.title}</h4>



            {this.props.children}
          </div>
        );
        case "success":

          return (
            <div className={"bs-callout bs-callout-success Card Card-" + this.props.type}>


              <h4>{this.props.title} <Label className="pull-right">New</Label></h4>



              {this.props.children}

            </div>
          );
          case "warning":

            return (
              <div className={"bs-callout bs-callout-warning Card Card-" + this.props.type}>


                <h4>{this.props.title}</h4>



                {this.props.children}

              </div>
            );
      case "empty":

        return (
          <div className={"Card Card-" + this.props.type}>
  {/*
            <div className="Card-icon">
              <i className="fa fa-calendar fa-2x"></i>
            </div>
            */}
            {this.props.children}
          </div>
        );

        case "course":

          return (
            <div className={"bs-callout bs-callout-default Card Card-" + this.props.type}>
    {/*
              <div className="Card-icon">
                <i className="fa fa-calendar fa-2x"></i>
              </div>
              */}
              <h4>{this.props.title}</h4>



              {this.props.children}

            </div>
          );

      default:

        return (
          <div>some card</div>
        );

    }

  }

});

module.exports = Card;
