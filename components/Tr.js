import Country from '../store/countryStore.js';
import User from '../store/userStore.js';
import Detales from './Detales.js';

const Content = (props) => {
	function showDetales(e) {
		User.toggleShow();
		User.setDetales(e);
	};
	function setToMain(i) {
		let alterName;
		switch (i) {
			case 'USA':
				alterName = 'United States'
				break;
		
			default:
				alterName = 'china'
				break;
		}
		props.sibs.forEach(el => {
			if (el.countryName.toLowerCase() === i.toLowerCase() || el.countryName.toLowerCase() === alterName.toLowerCase()) {
				Country.setCountry(el)
			}
		});
	}
	if (props.data.fetching || props.data.error) {
		return (<tr><td colSpan='4'>{props.data.msg}</td></tr>);
	} else {
		return (props.data.map(item => {
			return (
			<tr key={item.country}>
				<td>{item.continentName}</td>
				<td onClick={() => setToMain(item.country)} title='Click to push the Country on top'>{item.country}</td>
				<td>{item.population}</td>
				<td onClick={() => showDetales(item.country)} title='Click for Detales'>{item.cases.new}</td>	
			</tr>)
		})
	)};
}
export default Content;
