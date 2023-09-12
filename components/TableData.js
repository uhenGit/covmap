import React from "react";
import { observer } from 'mobx-react-lite';
import TableRow from './TableRow.js';
import WaitOrError from './WaitOrErr.js';
import country from '../store/countryStore.js';
import { getCovidDataByCountry, setCovidDataToSiblings } from '../utils/countryHandler.js';
import TableStyle from '../styles/covtable.module.css';

const TableData = observer(() => {
	let countryTableRow;
	let siblingsTableRows;
	const { countryName } = country.countryGeoData;

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

	if (country.status === 'error') {
		// @todo return separate component for the errors, move this part on the top
		siblingsTableRows = <TableRow data={[ { error: { message: country.error } } ]} />
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
			<tbody>
				<tr className={ TableStyle.tabHeader }>
					<td colSpan={6}>Current country Data</td>
				</tr>
				{country.isLoading
					// @todo replace with the separate loader component
					? (<tr><td colSpan={6}><WaitOrError /></td></tr>)
					: countryTableRow
				}
				<tr className={ TableStyle.tabHeader }>
					<td colSpan={6}>Siblings Data</td>
				</tr>
				{country.isLoading
					// @todo replace with the separate component
					? (<tr><td colSpan={6}><WaitOrError /></td></tr>)
					: siblingsTableRows
				}
			</tbody>
		</table>
	)
});

export default TableData;
