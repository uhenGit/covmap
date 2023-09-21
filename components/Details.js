import React, { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import Error from "./Error";
import covid from '../store/covStore.js';
import User from '../store/userStore.js';
import DetailsStyle from '../styles/details.module.css';

async function getFormDetails(country, date = null) {
	const countryCovidDataByDay = date
		? await covid.getCovidDataByDay(country, date)
		: covid.covidData.find(
			(covidDataItem) => covidDataItem.country === country,
		);

	if ('errorMsg' in countryCovidDataByDay) {
		return [ countryCovidDataByDay ];
	}

	const formFields = [ 'day', 'country', 'population', 'new' ];

	return formFields.map((field) => {
		if (field === 'new') {
			return {
				label: 'new cases',
				value: countryCovidDataByDay.cases.new || '0',
				type: 'text',
				handler: () => changeDate(field),
			};
		}

		return {
			label: field,
			value: countryCovidDataByDay[field],
			type: (field === 'day')
				? field
				: 'text',
			handler: () => changeDate(field),
		}
	})
}

function changeDate(field) {
	if (field !== 'day') {
		return;
	}
	console.log('RUN');
}

function hideModal() {
	User.dropDetales();
	User.toggleShow();
}

const Details = observer(() => {
	const [ details, setDetails ] = useState([]);
	useEffect(() => autorun(() => {
		const country = 'USA';
		getFormDetails(country)
			.then((formDetails) => {
				setDetails(formDetails)
			})
			.catch((err) => {
				console.log('data by day error: ', err); });
	}), []);

	function setNewDate() {
		getFormDetails('US', '2023-08-19')
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

	const content = details.map((detail) => {
		if ('errorMsg' in detail) {
			return (
				<div key={ detail.errorMsg }>{ detail.errorMsg }</div>
			)
		}

		return (
			<div key={ detail.label }>
				<span className={ DetailsStyle.detailLabel }>{ detail.label }</span>
				-
				<input
					type={ detail.type }
					value={ detail.value }
					onChange={ detail.handler }
				/>
			</div>
		);
	});
    
	return (
		<div className={ DetailsStyle.outer }>
			<div className={ innerStyle }>
				<button className={ DetailsStyle.closeBtn } onClick={ hideModal }>close</button>
				<div>
					<h2>Details</h2>
					<h4>Click on date to select another day</h4>
					{ content }
				</div>
				<button onClick={ setNewDate }>New Date</button>
			</div>
		</div>)
});

export default Details;
