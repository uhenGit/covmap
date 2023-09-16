import React, { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import LiDate from './Lidate.js';
import covid from '../store/covStore.js';
import User from '../store/userStore.js';
import DetailsStyle from '../styles/details.module.css';

function getFormDetails() {
	const formFields = [ 'day', 'country', 'population', 'new' ];
	const currentCountryCovidData = covid.covidData.find(
		(covidDataItem) => covidDataItem.country === User.getDetales(),
	);

	return formFields.map((field) => {
		if (field === 'new') {
			return {
				label: 'new cases',
				value: currentCountryCovidData.cases.new || '0',
				type: 'text',
				handler: () => changeDate(field),
			};
		}

		return {
			label: field,
			value: currentCountryCovidData[field],
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
	covid.dropDataByDay();
}

const Details = observer(() => {
	const [ details, setDetails ] = useState([]);
	useEffect(() => autorun(() => {
		const formDetails = getFormDetails();
		setDetails(formDetails);
		/* if (User.getDetales() !== '' && !covid.covidDataByDay[0]) {
			// console.log('true: ', formDetails);
		} else {
			console.log('false: ', covid.covidDataByDay)
			setDetails(covid.covidDataByDay[0]);
		} */
	}), []);
	console.log('state 1: ', details);

	const innerStyle = details // empty object is truthy
		? `${DetailsStyle.inner} ${DetailsStyle.active}`
		: `${DetailsStyle.inner}`;

	let content;

	if (covid.status === 'error') {
		content = <ul>
			<LiDate details={{ details, inter: true, simpleLi: false }} />
		</ul>
		return (
			<div className={ DetailsStyle.outer }>
				<div className={ innerStyle }>
					<button onClick={ hideModal }>Close</button>
					<h3 className='flex f-center f-column'>{ covid.loadCovidDataError.message }</h3>
					{ content }
				</div>
			</div>)
	}

	if (details.length > 0) {
		content = details.map((detail) => (
			<div key={ detail.label }>
				<span className={ DetailsStyle.detailLabel }>{ detail.label }</span>
				-
				<input
					type={ detail.type }
					value={ detail.value }
					onChange={ detail.handler }
				/>
			</div>
		))
	}
    
	return (
		<div className={ DetailsStyle.outer }>
			<div className={ innerStyle }>
				<button onClick={ hideModal }>Close</button>
				<div>
					<h2>Details</h2>
					<h4>Click on date to select another day</h4>
					{ details && content }
				</div>
			</div>
		</div>)
});

export default Details;
