import Country from '../store/countryStore.js';
import User from '../store/userStore.js';
import Detales from './Detales.js';

const Content = (props) => {
	function showDetales(e) {
		User.toggleShow();
		User.setDetales(e);
	};
	if ((Country.getState() === 'error') || props.data.error) {
		return (<tr><td colSpan='4'>{props.data.msg}</td></tr>);
	} else {
		return (props.data.map(item => {
			return (
			<tr key={item.country} onClick={() => showDetales(item.country)} title='Click for Detales'>
				<td>{item.continentName}</td>
				<td>{item.country}</td>
				<td>{item.population}</td>
				<td>{item.cases}</td>	
			</tr>)
		})
	)};
}
export default Content;
