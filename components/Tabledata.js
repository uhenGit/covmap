import { observer } from 'mobx-react-lite';
import Content from './Tr.js';
import { WaitOrError } from './WaitOrErr.js';
import TableStyle from '../styles/covtable.module.css';
import Country from '../store/countryStore.js';
import Cov from '../store/covStore.js';
import sibCovArr from '../store/covInSib';
import { geoCountryToCov } from '../public/scripts/helpers.js';

const TableData = observer(() => {
	let countryTr, siblingsTr, itemsArr = [];
	let geoData = Country.getGeoData();
	let covData = Cov.getData();
	if (Object.keys(geoData).length > 0) {
		let siblings = Country.getAllSiblings();
		let countryName = geoData.countryName;
		let alterName = geoCountryToCov(countryName);
			const covEl = covData.find(covEl => covEl.country.toLowerCase() === countryName.toLowerCase() || covEl.country.toLowerCase() === alterName.toLowerCase());
			if (covEl) {
				let data = [];
				const {continent, day, country, population, cases, deaths} = covEl;
				data.push({continent, day, country, population, cases, deaths});
				countryTr = <Content data={data} />;
			} else {
				countryTr = <Content data={{msg: `There's no virus data for the ${countryName} location`}} />
			}
			if (siblings.length !== 0) {
				itemsArr = sibCovArr();
				siblingsTr = <Content data={itemsArr} sibs={siblings}/>
			}
	};
	if (Country.getIsError()) {
		// console.log('new state element: ', Country.getIsError());
		siblingsTr = <Content data={Country.getError()} />
	};
	// if (Country.getIsLoading()) return <WaitOrError />
	return (
		<table className={TableStyle.covTable}>
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
				<tr className={TableStyle.tabHeader}>
					<td colSpan='6'>Current country Data</td>
				</tr>
				{Country.getIsLoading() ? (<tr><td colSpan='6'><WaitOrError /></td></tr>) : countryTr}
				<tr className={TableStyle.tabHeader}>
					<td colSpan='6'>Siblings Data</td>
				</tr>
				{Country.getIsLoading() ? (<tr><td colSpan='6'><WaitOrError /></td></tr>) : siblingsTr}
			</tbody>
		</table>
)});
export default TableData;
