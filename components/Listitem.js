import { observer } from 'mobx-react-lite';
import Country from '../store/countryStore.js';

const ListItem = observer((props) => {
	const getItem = () => {
		Country.setCountry(props.item);
		Country.dropCountryName();
	}
	return (
		<li onClick={getItem}>
			{props.item.countryCode} - {props.item.countryName}
		</li>
	)
});
export default ListItem;
