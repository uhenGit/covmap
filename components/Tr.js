import Country from '../store/countryStore.js';
import User from '../store/userStore.js';
import { covCountryToGeo } from '../public/scripts/helpers.js';
import { useMediaQ } from './hooks/useMediaQuery';

const Content = ({data, sibs}) => {
	if (useMediaQ('(max-width: 500px)')) console.log('window object:');
	if (data.msg) return(
		<tr>
			<td colSpan='6'>{data.msg}</td>
		</tr>
	)
	function showDetales(e) {
		User.toggleShow();
		User.setDetales(e);
	};
	function setToMain(i) {
		if (!sibs) return;
		const alterName = covCountryToGeo(i);
		sibs.forEach((el) => {
			if (el.countryName.toLowerCase() === i.toLowerCase() || el.countryName.toLowerCase() === alterName.toLowerCase()) {
				Country.setCountry(el)
			}
		});
	}
	return (data.map((item) => {
		return (
		<tr key={item.country}>
			<td>{item.continent}</td>
			<td>{item.day}</td>
			<td onClick={() => setToMain(item.country)} title='Click to push the Country on top'>{item.country}</td>
			<td>{item.population}</td>
			<td onClick={() => showDetales(item.country)} title='Click for Detales'>{item.cases.new}</td>
			<td>{item.deaths.total} ({item.deaths.new})</td>	
		</tr>)
		})
	);
}
export default Content;
