import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import DatePicker from 'react-datepicker';
import Error from "./Error";
import covid from '../store/covStore.js';
import User from '../store/userStore.js';
import { formatDateToISOString } from '../utils/dateHandler';

import TableStyle from '../styles/covtable.module.css';
import DetailsStyle from '../styles/details.module.css';
import 'react-datepicker/dist/react-datepicker.css';

async function getFormDetails(country, date) {
	// const country = User.getDetails().toLowerCase();
	const countryCovidDataByDay = await covid.getCovidDataByDay(country, date)
	// console.log('data by day: ', country);

	if (countryCovidDataByDay && Object.keys(countryCovidDataByDay).length > 0 && ('errorMsg' in countryCovidDataByDay)) {
		return [
			{
				label: 'Select another date',
				value: date,
				empty: true,
			}
		];
	}

	return formatCovidData(countryCovidDataByDay);
}

function formatCovidData(covidData) {
	const formattedCountryCovidDataByDay = setFormattedDate(covidData);
	const formFields = [ 'day', 'country', 'population', 'new' ];

	return formFields.map((field) => {
		if (field === 'new') {
			return {
				label: 'new cases',
				value: formattedCountryCovidDataByDay.cases.new || '0',
			};
		}

		return {
			label: field,
			value: formattedCountryCovidDataByDay[field],
		}
	})
}

function setFormattedDate(covidData) {
	console.log('formatted: ', covidData);
	return {
		...covidData,
		day:  new Date(covidData.day),
	};
}

/* function hideModal() {
	User.dropDetails();
	User.toggleShow();
} */

const Details = observer(({ showDetails, countryData, closeDetails }) => {
	const [ details, setDetails ] = useState([]);

	/* const rawFormDetails = covid.covidData.find(
		(covidDataItem) => covidDataItem.country.toLowerCase() === country,
	); */
	const formattedCovidData = formatCovidData(countryData);
	setDetails(formattedCovidData);
	/* useEffect(() => autorun(() => {
		getFormDetails(country)
			.then((formDetails) => {
				setDetails(formDetails)
			})
			.catch((err) => {
				console.error('data by day error: ', err); });
	}), []); */

	function setNewDate(date) {
		const isoDate = formatDateToISOString(date);
		getFormDetails(countryData.country, isoDate)
			.then((formDetails) => {
				setDetails(formDetails);
			})
			.catch((err) => {
				console.error('set new date error: ', err);
			});
	}
	// const outerStyle = `${DetailsStyle.outer} ${DetailsStyle.active}`;

	if (covid.status === 'error') {
		return (
			<div>
				<button onClick={ () => closeDetails(null) }>close</button>
				<Error error={ covid.error }/>
			</div>
		);
	}

	const content = details.map(({ value, label, empty }, idx) => {
		if ((label === 'day') || empty) {
			const selectedDate = new Date(value);
			return (
				<tr key={ idx }>
					<td className={ DetailsStyle.detailLabel }>
						{ label }
					</td>
					<td className={ DetailsStyle.pickerWrap }>
						<DatePicker selected={ selectedDate } onChange={ (date) => setNewDate(date) } />
					</td>
				</tr>
			)
		}

		return (
			<tr key={ idx }>
				<td className={ DetailsStyle.detailLabel }>
					{ label }
				</td>
				<td>
					{ value }
				</td>
			</tr>
		);
	});

	return (
		<div className={ 'flex f-column f-center' }>
			<h2>Details</h2>
			<h4>Click on date to select another day</h4>
			<table className={ TableStyle.covTable }>
				<tbody>
					{ content }
				</tbody>
			</table>
		</div>
	)
});

Details.propTypes = {
	showDetails: PropTypes.bool,
	country: PropTypes.string,
	closeDetails: PropTypes.func,
}

export default Details;
