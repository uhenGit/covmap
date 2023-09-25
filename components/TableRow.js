import React from "react";
import PropTypes from "prop-types";
import country from '../store/countryStore.js';
import User from '../store/userStore.js';
import { covidCountryNameToGeo } from '../utils/countryHandler';
import { useMediaQ } from './hooks/useMediaQuery.js';

const TableRow = ({ data }) => {
	if (useMediaQ('(max-width: 500px)')) console.log('window object:');

	function showDetails(evt) {
		User.toggleShow();
		User.setDetails(evt);
	}

	async function setToMain(currentCountry) {
		const alterName = covidCountryNameToGeo(currentCountry).toLowerCase();
		const selectedSibling = country.siblings
			.find(({ countryName }) => (
				(countryName.toLowerCase() === currentCountry.toLowerCase()) || (countryName.toLowerCase() === alterName)
			));

		if (!selectedSibling) {
			return;
		}

		await country.setCountry(selectedSibling);
	}

	return (data.map((item) => {
		if ('error' in item) {
			return (
				<tr key={ item.country }>
					<td
						onClick={ () => setToMain(item.country) }
					>
						{ item.country }
					</td>
					<td colSpan={5}>{ item.error.message }</td>
				</tr>)
		}

		return (
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
	}));
}

TableRow.propTypes = {
	data: PropTypes.array,
}

export default TableRow;
