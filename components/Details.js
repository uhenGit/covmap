import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import DatePicker from 'react-datepicker';
import Error from "./Error";
import Loader from "./Loader";
import covid from '../store/covStore.js';
import { formatDateToISOString } from '../utils/dateHandler.js';

import TableStyle from '../styles/covtable.module.css';
import DetailsStyle from '../styles/details.module.css';
import 'react-datepicker/dist/react-datepicker.css';

async function getFormDetails(selectedCountry, date = null) {
	const countryCovidDataByDay = date
		? await covid.getCovidDataByDay(selectedCountry, date)
		: covid.covidData.find(({ country }) => country.toLowerCase() === selectedCountry);

	if (countryCovidDataByDay && Object.keys(countryCovidDataByDay).length > 0 && ('errorMsg' in countryCovidDataByDay)) {
		return {
			field: 'Select another date',
			day: date,
			empty: true,
		};
	}

	return countryCovidDataByDay;
}

const Details = ({ selectedCountry }) => {
	const [ details, setDetails ] = useState({});
	useEffect(() => {
		getFormDetails(selectedCountry)
			.then((formDetails) => {
				setDetails(formDetails);
			})
			.catch((err) => {
				console.error('Set details error: ', err);
			});
	}, []);

	function setNewDate(date) {
		const isoDate = formatDateToISOString(date);
		getFormDetails(selectedCountry, isoDate)
			.then((formDetails) => {
				setDetails(formDetails);
			})
			.catch((err) => {
				console.error('Set new details date error: ', err);
			});
	}

	if (covid.status === 'error') {
		return (
			<div>
				<Error error={ covid.error }/>
			</div>
		);
	}

	if (covid.status === 'in-progress') {
		return (
			<div className={'flex f-center'}>
				<Loader spinDiameter={ 30 }/>
			</div>
		)
	}

	const formFields = [ 'day', 'country', 'population', 'new' ];
	const selectedDay = new Date(details.day);
	const content = details.empty
		? (
			<tr>
				<td className={DetailsStyle.detailLabel}>
					{ details.field }
				</td>
				<td className={DetailsStyle.pickerWrap}>
					<DatePicker selected={selectedDay} onChange={(date) => setNewDate(date)}/>
				</td>
			</tr>
		)
		: formFields.map((field) => {
			return (
				<tr key={field}>
					<td className={DetailsStyle.detailLabel}>
						{field}
					</td>
					{(field === 'day') && ('day' in details)
						? (<td className={DetailsStyle.pickerWrap}>
							<DatePicker selected={selectedDay} onChange={(date) => setNewDate(date)}/>
						</td>)
						: (<td>
							{((field === 'new' && 'cases' in details)) ? details.cases[field] : details[field]}
						</td>)
					}
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
};

Details.propTypes = {
	selectedCountry: PropTypes.string,
}

export default observer(Details);
