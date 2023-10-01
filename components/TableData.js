import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
// import TableRow from './TableRow.js';
import Modal from "./Modal.js";
import Loader from './Loader.js';
import Error from './Error.js';
import country from '../store/countryStore.js';
import { getCovidDataByCountry, setCovidDataToSiblings } from '../utils/countryHandler.js';

import TableStyle from '../styles/covtable.module.css';

const TableData = observer(() => {
	// let countryContent;
	// let siblingsContent;
	// const [ countryDetails, setCountryDetails ] = useState({});
	// const [ siblingsDetails, setSiblingsDetails ] = useState([]);
	const [ selectedCountry, setSelectedCountryData ] = useState({});
	const [ isShowDetails, setIsShowDetails ] = useState(false);
	// let countryTableRow;
	// let siblingsTableRows;
	const { countryName } = country.countryGeoData;
	console.log('geo data: ', countryName);

	if ((country.status === 'error') || !countryName) {
		return <Error error={ country.error } />
	}

	function toggleModal(selectedCountryData) {
		console.log('00: ', selectedCountryData);
		setSelectedCountryData(selectedCountryData);
		setIsShowDetails(!!selectedCountryData);
		console.log('0: ', isShowDetails);
		console.log('1: ', selectedCountry);
	}

	const countryDetails = getCovidDataByCountry(countryName);
	const countryContent = (<tr>
		<td>{ countryDetails.continent }</td>
		<td>{ countryDetails.day }</td>
		<td>
			{ countryName }
		</td>
		<td>{ countryDetails.population }</td>
		<td
			onClick={ () => toggleModal(countryDetails) }
			title='Click for Details'
		>
			{ countryDetails.cases.new || 'n/a' }
		</td>
		<td>{ countryDetails.deaths.total || 0 } ({ countryDetails.deaths.new || 0 })</td>
	</tr>);
	console.log('details: ', countryDetails);
	// setCountryDetails(countryCovidItems);

	const siblingsContent = setCovidDataToSiblings();
	// setSiblingsDetails(siblingsCovidItems);

	return (
		<div>
			{ country.isLoading
				? <Loader spinDiameter={30}/>
				:	<table className={ TableStyle.covTable }>
					<thead>
						<tr>
							<th>Continent</th>
							<th>Date</th>
							<th>Country Name</th>
							<th>Population</th>
							<th>New Cases</th>
							<th>Deaths Total (New)</th>
						</tr>
					</thead>
					<tbody className={ 'c-pointer' }>
						<tr className={ TableStyle.tabHeader }>
							<td colSpan={6}>Current country Data</td>
						</tr>
						{ countryContent }
						<tr className={ TableStyle.tabHeader }>
							<td colSpan={6}>Siblings Data</td>
						</tr>
						{ siblingsContent.map((sibling) => {
							return (
								<tr key={ sibling.country }>
									<td>{ sibling.continent }</td>
									<td>{ sibling.day }</td>
									<td>
										{ sibling.country }
									</td>
									<td>{ sibling.population }</td>
									<td
										onClick={ () => toggleModal(sibling) }
										title='Click for Details'
									>
										{ sibling.cases.new || 'n/a' }
									</td>
									<td>{ sibling.deaths.total } ({ sibling.deaths.new || 0 })</td>
								</tr>)
						})
						}
					</tbody>
				</table>
			}

			<Modal
				showDetails = { isShowDetails }
				countryData = { selectedCountry }
				closeDetails = { toggleModal }
			/>
		</div>
	)
});

export default TableData;
