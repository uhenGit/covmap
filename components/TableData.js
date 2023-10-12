import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import Modal from "./Modal.js";
import Loader from './Loader.js';
import Error from './Error.js';
import country from '../store/countryStore.js';
import { getCovidDataByCountry, setCovidDataToSiblings } from '../utils/countryHandler.js';

import TableStyle from '../styles/covtable.module.css';

const TableData = observer(() => {
	const [ selectedCountry, setSelectedCountry ] = useState('');
	const [ isShowDetails, setIsShowDetails ] = useState(false);
	const { countryName } = country.countryGeoData;

	if ((country.status === 'error') || !countryName) {
		return <Error error={ country.error } />
	}

	function closeModal() {
		setSelectedCountry('');
		setIsShowDetails(false);
	}

	function openModal(selectedCountry) {
		setSelectedCountry(selectedCountry.toLowerCase());
		setIsShowDetails(true);
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
			onClick={ () => openModal(countryName) }
			title='Click for Details'
		>
			{ countryDetails.cases.new || 'n/a' }
		</td>
		<td>{ countryDetails.deaths.total || 0 } ({ countryDetails.deaths.new || 0 })</td>
	</tr>);

	const siblingsContent = setCovidDataToSiblings();

	return (
		<div>
			{ country.isLoading
				? <Loader spinDiameter={ 30 }/>
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
						{ siblingsContent.map(({ country, continent, day, population, cases, deaths }) => {
							return (
								<tr key={ country }>
									<td>{ continent }</td>
									<td>{ day }</td>
									<td>
										{ country }
									</td>
									<td>{ population }</td>
									<td
										onClick={ () => openModal(country) }
										title='Click for Details'
									>
										{ cases.new || 'n/a' }
									</td>
									<td>{ deaths.total } ({ deaths.new || 0 })</td>
								</tr>)
						})
						}
					</tbody>
				</table>
			}

			<Modal
				isShowModalContent = { isShowDetails }
				closeModal = { closeModal }
				selectedCountry={ selectedCountry }
			/>
		</div>
	)
});

export default TableData;
