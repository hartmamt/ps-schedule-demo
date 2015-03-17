import React from 'react';

import PSConnector from '../arus-ps-connector';

/* Flux stuff */
import Reflux from 'reflux';
import BlackLion from '../utils/BlackLion.js';
import {ScheduleStore, ScheduleActions } from '../utils/BlackLion.js';

//SET SIS CONNECTOR!!!!!!
BlackLion.SetSISConnector(PSConnector);
/* End Flux stuff */

import ArusScheduleWeek from './ArusMySchedule.jsx';

var ArusScheduleContainer = React.createClass({

	mixins: [
		Reflux.connect(ScheduleStore, 'schedule')
	],

	getInitialState() {
		return {
			schedule: {}
		};
	},

	componentDidMount(){
		ScheduleActions.load();
	},

	render() {

		return (
			<ArusScheduleWeek schedule={this.state.schedule} />
		);
	}

});

React.render(<ArusScheduleContainer/>, document.getElementById('arus'));

module.exports = Arus;
