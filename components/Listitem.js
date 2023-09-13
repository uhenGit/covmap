import React from "react";
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import country from '../store/countryStore.js';

const ListItem = observer(({ item, onSelectItem }) => {
	const { countryCode, countryName } = item;
	const setItem = async () => {
		await country.setCountry(item);
		country.dropCountryName();
		onSelectItem();
	}
	return (
		<li onClick={ setItem }>
			{ countryCode } - { countryName }
		</li>
	)
});

ListItem.propTypes = {
	item: PropTypes.object,
	onSelectItem: PropTypes.func,
}

export default ListItem;
