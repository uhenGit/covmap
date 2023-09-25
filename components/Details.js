import React, { useEffect, useState } from 'react';
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

async function getFormDetails(date = null) {
	const country = User.getDetails().toLowerCase();
	const countryCovidDataByDay = date
		? await covid.getCovidDataByDay(country, date)
		: covid.covidData.find(
			(covidDataItem) => covidDataItem.country.toLowerCase() === country,
		);

	if (countryCovidDataByDay && Object.keys(countryCovidDataByDay).length > 0 && ('errorMsg' in countryCovidDataByDay)) {
		return [
			{
				label: 'Select another date',
				value: date,
				empty: true,
			}
		];
	}

	const formattedCountryCovidDataByDay = setFormattedDate(countryCovidDataByDay);
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
	return {
		...covidData,
		day:  new Date(covidData.day),
	};
}

function hideModal() {
	User.dropDetails();
	User.toggleShow();
}

// @todo fix component unmounting
const Details = observer(() => {
	const [ details, setDetails ] = useState([]);
	useEffect(() => autorun(() => {
		getFormDetails()
			.then((formDetails) => {
				setDetails(formDetails)
			})
			.catch((err) => {
				console.error('data by day error: ', err); });
	}), []);

	function setNewDate(date) {
		const isoDate = formatDateToISOString(date);
		getFormDetails(isoDate)
			.then((formDetails) => {
				setDetails(formDetails);
			})
			.catch((err) => {
				console.error('set new date error: ', err);
			});
	}

	const innerStyle = details // empty array is truthy
		? `${DetailsStyle.inner} ${DetailsStyle.active}`
		: `${DetailsStyle.inner}`;

	if (covid.status === 'error') {
		return (
			<div className={ DetailsStyle.outer }>
				<div className={ innerStyle }>
					<button onClick={ hideModal }>Close</button>
					<Error error={ covid.error }/>
				</div>
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
		<div className={ DetailsStyle.outer }>
			<div className={ innerStyle }>
				<button
					className={ DetailsStyle.closeBtn }
					onClick={ hideModal }
				>
					close
				</button>
				<div className={ 'flex f-column f-center' }>
					<h2>Details</h2>
					<h4>Click on date to select another day</h4>
					<table className={ TableStyle.covTable }>
						<tbody>
							{ content }
						</tbody>
					</table>
				</div>
			</div>
		</div>)
});

export default Details;
