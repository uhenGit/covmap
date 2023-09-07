import React, { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import LiDate from './Lidate.js';
import covid from '../store/covStore.js';
import User from '../store/userStore.js';
import DetailsStyle from '../styles/details.module.css';

const Details = observer(() => {
	const [ details, setDetails ] = useState({});
	useEffect(() => autorun(() => {
		if (User.getDetales() !== '' && !covid.covidDataByDay[0]) {
			const currentCountryCovidData = covid.covidData.find(
				(covidDataItem) => covidDataItem.country === User.getDetales(),
			);
			setDetails(currentCountryCovidData);
		} else {
			setDetails(covid.covidDataByDay[0]);
		}
	}),[]);

	function toggle() {
		User.dropDetales();
		User.toggleShow();
		covid.dropDataByDay();
	}

	let innerStyle = details
		? `${DetailsStyle.inner} ${DetailsStyle.active}`
		: `${DetailsStyle.inner}`;

	let content;

	// @todo investigate always false condition
	if (covid.status === 'error') {
		content = <ul>
			<LiDate details={{details, inter: true, simpleLi: false}}/>
		</ul>
		return (
			<div className={ DetailsStyle.outer }>
				<div className={ innerStyle }>
					<button onClick={ toggle }>Close</button>
					<h3 className='flex f-center f-column'>{ covid.loadCovidDataError.message }</h3>
					{ content }
				</div>
			</div>)
	}

	if (details && details.cases) {
		content = <ul>
			<LiDate details={{ span: 'Country', info: details.country, simpleLi: true} }/>
			<LiDate details={{ details, inter: false, simpleLi: false }} />
			<LiDate details={{ span: 'Population', info: details.population, simpleLi: true }}/>
			<LiDate details={{ span: 'New Cases', info: details.cases.new, simpleLi: true }}/>
		</ul>
	}
    
	return (
		<div className={ DetailsStyle.outer }>
			<div className={ innerStyle }>
				<button onClick={ toggle }>Close</button>
				<div>
					<h2>Details</h2>
					<h4>Click on date to select another day</h4>
					{ details && content }
				</div>
			</div>
		</div>)
});

export default Details;
