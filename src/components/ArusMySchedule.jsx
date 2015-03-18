import React from 'react';
import rbootstrap from 'react-bootstrap';
import moment from 'moment';
import _ from 'underscore';
import Card from './Card/Card.jsx';
import Loader from 'react-loader';

/* eslint-disable */


var {Panel, Input, Col, Button, ListGroupItem, ListGroup} = rbootstrap;
/* eslint-enable */

var ArusMySchedule = React.createClass({


	render() {
		/**
		 * Set currentTerm
		 */
		let loader = null;

		if (this.props.schedule.terms==undefined){
			loader = <Loader/>;
		}

		//loader = <Loader/>;

		let currentTerm = {};
		let currentTime = moment().format('YYYY-MM-DD');

		if (this.props.schedule.terms !== undefined) {
			for (let i = 0; i < this.props.schedule.terms.length; ++i) {
				let term = this.props.schedule.terms[i];
				let termBegin = moment(term.termBeginDate);
				let termEnd = moment(term.termEndDate);

				if (moment(currentTime).isBetween(termBegin, termEnd)) {
					currentTerm = term;
					break;
				}
			}
		}

		console.log('current term', currentTerm.termName);

		/**
		 * Initialize day names and day abbreviations.
		 */
		let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		let dayAbbrevs = ['M', 'T', 'W', 'R', 'F', 'S', 'U'];
		let dayPanels = {};


		if (currentTerm.courses) {
			/**
			 * For each day parse each course's sessions to see if they occur on the
			 * current day and if they do then push them into an array of unsorted
			 * sessions. Then sort that array in order of ascending session start
			 * time.
			 */
			for (let i = 0; i < dayAbbrevs.length; ++i) {
				let unsortedSessions = [];
				let startTimes = [];

				currentTerm.courses.map((course) => {

					course.sessions.map((session) => {

						if (session.daysTimes.indexOf(dayAbbrevs[i]) > -1) {
							/**
							 * If dayPanels doesn't have an entry for this day, then create
							 * one.
							 */
							if (!dayPanels[days[i]]) {
								dayPanels[days[i]] = [];
							}

							let time = null;// 'MWF: 12:00am - 12:01am';

							if (session.daysTimes!=='F: Invalid Time - Invalid Time') {

								try {
									time = /[A-Z]+: ([\d: \-(?:am|pm)]+)/.exec(session.daysTimes)[1];
									//time = /[A-Z]+: ([\d: \-(?:am|pm)]+)/.exec(session.daysTimes == 'F: Invalid Time - Invalid Time' ? 'MWF: 11:00am - 12:00pm' : session.daysTimes  )[1];
								} catch (err) {
									console.error(err);
									//time= 'MWF: 11:00am - 12:00pm'
								}

								let start = /([\d:(?:am|pm)]+)/.exec(time)[1];

								startTimes.push( moment(start, 'hh:mma').format('HH:mm'));

								let courseItem = (
									<Card className='Card-notification'  type="course" title={course.desc}>

										{course.course}
										<br />
										{session.instructor}
										<br />
										{time}
										<br />
										{session.room}
								</Card>
								);

								unsortedSessions.push(courseItem);
							}

						}
					});
				});

				if (startTimes.length > 0) {
					/**
					 * Calculate Session Order
					 */
					let order = [];

					for (let j = 0; j < startTimes.length; ++j) {
						order.push(0);
						for (let k = 0; k < startTimes.length; ++k) {
							if (j !== k && startTimes[j] > startTimes[k]) {
								++order[j];
							}
						}
					}

					/**
					 * Apply Session Order
					 */
					for (let j = 0; j < order.length; ++j) {
						dayPanels[days[i]][order[j]] = unsortedSessions[j];
					}
				}
			}
		}

		let myStyle = {
			fontWeight: 'bold'
		}

		let schedule = days.map((day) => {
			if (!_.isEmpty(dayPanels[day])) {
				return (
					<Col sm={12} >
						<h4>{day}</h4>
						{dayPanels[day]}
					</Col>
				);
			}
		});

		return (
			<div className='daySchedule'>
				<h3>{currentTerm.termName}</h3>
				<hr/>
				{loader}
				{schedule}
			</div>
		);
	}

});

module.exports = ArusMySchedule;
