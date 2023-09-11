import React from "react";
import { observer } from 'mobx-react-lite';
import TableRow from './TableRow.js';
import WaitOrError from './WaitOrErr.js';
import country from '../store/countryStore.js';
import { getCovidDataByCountry, setCovidDataToSiblings } from '../utils/countryHandler.js';
import TableStyle from '../styles/covtable.module.css';

const TableData = observer(() => {
	let countryTableRow;
	let siblingsTableRow;
	const { countryName } = country.countryGeoData;

	if (countryName) {
		const { siblings } = country;
		const countryCovidData = getCovidDataByCountry(countryName);
			
		if (countryCovidData) {
			const { continent, day, population, cases, deaths } = countryCovidData;
			const countryCovidItems = [
				{ continent, day, country: countryName, population, cases, deaths },
			];
			countryTableRow = <TableRow data={ countryCovidItems } />;
		} else {
			const message = `There's no virus data for the ${countryName} location`;
			countryTableRow = <TableRow error={{ message }} />
		}

		if (siblings?.length !== 0) {
			const siblingsCovidItems = setCovidDataToSiblings();
			siblingsTableRow = <TableRow data={ siblingsCovidItems } siblings={ siblings }/>
		}
	}

	if (country.status === 'error') {
		siblingsTableRow = <TableRow error={ country.error } />
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
					<td colSpan='6'>Current country Data</td>
				</tr>
				{country.isLoading
					? (<tr><td colSpan='6'><WaitOrError /></td></tr>)
					: countryTableRow
				}
				<tr className={ TableStyle.tabHeader }>
					<td colSpan='6'>Siblings Data</td>
				</tr>
				{country.isLoading
					? (<tr><td colSpan='6'><WaitOrError /></td></tr>)
					: siblingsTableRow
				}
			</tbody>
		</table>
	)
});

export default TableData;
