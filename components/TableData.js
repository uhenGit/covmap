import React from "react";
import { observer } from 'mobx-react-lite';
import TableRow from './TableRow.js';
import Loader from './Loader.js';
import Error from './Error.js';
import country from '../store/countryStore.js';
import { getCovidDataByCountry, setCovidDataToSiblings } from '../utils/countryHandler.js';
import TableStyle from '../styles/covtable.module.css';

const TableData = observer(() => {
	let countryTableRow;
	let siblingsTableRows;
	const { countryName } = country.countryGeoData;

	if (country.status === 'error') {
		return <Error error={ country.error } />
	}

	if (countryName) {
		const countryCovidData = getCovidDataByCountry(countryName);

		const countryCovidItems = [
			{
				...countryCovidData,
				country: countryName,
			},
		];
		countryTableRow = <TableRow data={ countryCovidItems } />;


		const siblingsCovidItems = setCovidDataToSiblings();

		if (siblingsCovidItems.length > 0) {
			siblingsTableRows = <TableRow data={ siblingsCovidItems }/>
		}
	}

	return (
		<table className={ TableStyle.covTable }>
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
				{country.isLoading
					? (<tr>
						<td colSpan={6}>
							<Loader spinDiameter={30}/>
						</td>
					</tr>)
					: countryTableRow
				}
				<tr className={ TableStyle.tabHeader }>
					<td colSpan={6}>Siblings Data</td>
				</tr>
				{country.isLoading
					? (<tr>
						<td colSpan={6}>
							<Loader spinDiameter={30}/>
						</td>
					</tr>)
					: siblingsTableRows
				}
			</tbody>
		</table>
	)
});

export default TableData;
