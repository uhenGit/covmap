import { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import LiDate from './Lidate.js';
import covid from '../store/covStore.js';
import User from '../store/userStore.js';
import DetalesStyle from '../styles/detales.module.css';

const Details = observer(() => {
	const [details, setDetales] = useState({});
	useEffect(() => autorun(() => {
		if (User.getDetales() !== '' && !covid.covidDataByDay[0]) {
			const currentCountryCovidData = covid.covidData.find(
        (covidDataItem) => covidDataItem.country === User.getDetales(),
      );
			setDetales(currentCountryCovidData);
		} else {
			setDetales(covid.covidDataByDay[0]);
		}
	}),[]);

	function toggle() {
		User.dropDetales();
		User.toggleShow();
		covid.dropDataByDay();
	}

	let innerStyle = details
    ? `${DetalesStyle.inner} ${DetalesStyle.active}`
    : `${DetalesStyle.inner}`;

	let content;

	if (covid.status === 'error') {
		content = <ul>
					<LiDate details={{details, inter: true, simpleLi: false}}/>
				</ul>
		return (
			<div className={ DetalesStyle.outer }>
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
		<div className={ DetalesStyle.outer }>
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
