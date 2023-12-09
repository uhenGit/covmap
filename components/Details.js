import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import DatePicker from 'react-datepicker';
import Error from "./Error.js";
import Loader from "./Loader.js";
import covid from '../store/covStore.js';
import country from "../store/countryStore.js";
import { formatDateToISOString } from '../utils/dateHandler.js';
import { covidCountryNameToGeo } from "../utils/countryHandler.js";

import TableStyle from '../styles/covtable.module.css';
import DetailsStyle from '../styles/details.module.css';
import 'react-datepicker/dist/react-datepicker.css';

async function getFormDetails(selectedCountry, date = null) {
	const countryCovidDataByDay = date
		? await covid.getCovidDataByDay(selectedCountry, date)
		: covid.covidData.find(({ country }) => country.toLowerCase() === selectedCountry);
	console.log('get: ', selectedCountry, countryCovidDataByDay);

	if (countryCovidDataByDay && Object.keys(countryCovidDataByDay).length > 0 && ('errorMsg' in countryCovidDataByDay)) {
		return {
			field: 'Select another date',
			day: date,
			empty: true,
		};
	}

	return countryCovidDataByDay;
}

// @todo handle Today date if the user select current date (also tomorrow)
const Details = ({ selectedCountry, closeModal }) => {
	const [ details, setDetails ] = useState({});
	const [ selectedSibling, setSelectedSibling ] = useState({});
	useEffect(() => {
		const alterName = covidCountryNameToGeo(selectedCountry).toLowerCase();
		const sibling = country.siblings
			.find(({ countryName }) => (
				(countryName.toLowerCase() === selectedCountry) || (countryName.toLowerCase() === alterName)
			));
		setSelectedSibling(sibling);

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
				console.log('form: ', formDetails)
				setDetails(formDetails);
			})
			.catch((err) => {
				console.error('Set new details date error: ', err);
			});
	}

	async function setToMain() {
		await country.setCountry(selectedSibling);
		closeModal();
	}

	if (covid.status === 'error') {
		console.log('HERE: ', covid.status, { ...covid.error });
		return (
			<div>
				<Error error={ covid.error }/>
			</div>
		);
	}

	if (covid.status === 'in-progress') {
		return (
			<div className={ 'flex f-center' }>
				<Loader spinDiameter={ 30 }/>
			</div>
		)
	}

	const formFields = [ 'day', 'country', 'population', 'new' ];
	const selectedDay = new Date(details.day);
	const content = details.empty
		? (
			<tr>
				<td className={ DetailsStyle.detailLabel }>
					{ details.field }
				</td>
				<td className={ DetailsStyle.pickerWrap }>
					<DatePicker selected={ selectedDay } onChange={ (date) => setNewDate(date) }/>
				</td>
			</tr>
		)
		: formFields.map((field) => {
			return (
				<tr key={field}>
					<td className={ DetailsStyle.detailLabel }>
						{field}
					</td>
					{
						(field === 'day') && ('day' in details)
							? (<td className={ DetailsStyle.pickerWrap }>
								<DatePicker selected={ selectedDay } onChange={ (date) => setNewDate(date) }/>
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
			{
				selectedSibling
					? <button
						title={ 'Set the country to the first row in the table' }
						className={ DetailsStyle.setBtn }
						onClick={ setToMain }
					>
					Set to the top
					</button>
					: null
			}
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
	closeModal: PropTypes.func,
}

export default observer(Details);
