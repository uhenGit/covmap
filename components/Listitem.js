import React from "react";
import { observer } from 'mobx-react-lite';
import country from '../store/countryStore.js';

const ListItem = observer((props) => {
	const setItem = async () => {
		await country.setCountry(props.item);
		country.dropCountryName();
		props.onSelectItem();
	}
	return (
		<li onClick={ setItem }>
			{ props.item.countryCode } - { props.item.countryName }
		</li>
	)
});

export default ListItem;
