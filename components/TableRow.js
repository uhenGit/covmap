import React from "react";
import PropTypes from "prop-types";
import country from '../store/countryStore.js';
import User from '../store/userStore.js';
import { covidCountryNameToGeo } from '../utils/countryHandler';
import { useMediaQ } from './hooks/useMediaQuery.js';

const TableRow = ({ data, siblings, error }) => {
	if (useMediaQ('(max-width: 500px)')) console.log('window object:');

	if (error) {
		return(
			<tr>
				<td colSpan='6'>{ error.message }</td>
			</tr>
		)
	}

	function showDetails(evt) {
		User.toggleShow();
		User.setDetales(evt);
	}

	async function setToMain(currentCountry) {
		if (siblings.length === 0) {
			return;
		}
    
		const alterName = covidCountryNameToGeo(currentCountry).toLowerCase();
		const selectedSibling = siblings
			.find(({ countryName }) => (
				(countryName.toLowerCase() === currentCountry.toLowerCase()) || (countryName.toLowerCase() === alterName)
			));
		await country.setCountry(selectedSibling);
	}

	return (data.map((item) => (
		<tr key={ item.country }>
			<td>{ item.continent }</td>
			<td>{ item.day }</td>
			<td
				onClick={ () => setToMain(item.country) }
				title='Click to set the Country to the top'
			>
				{ item.country }
			</td>
			<td>{ item.population }</td>
			<td
				onClick={ () => showDetails(item.country) }
				title='Click for Details'
			>
				{ item.cases.new || 'n/a' }
			</td>
			<td>{ item.deaths.total } ({ item.deaths.new || 0 })</td>
		</tr>)
	)
	);
}

TableRow.propTypes = {
	data: PropTypes.array,
	siblings: PropTypes.array,
	error: PropTypes.object,
}

export default TableRow;
