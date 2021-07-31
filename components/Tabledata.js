import { observer } from 'mobx-react-lite';
import Content from './Tr.js';
import TableStyle from '../styles/covtable.module.css';
import Country from '../store/countryStore.js';
import Cov from '../store/covStore.js';
import sibCovArr from '../store/covInSib';

const TableData = observer(() => {
	let countryTr, siblingsTr, itemsArr = [];
	let geoData = Country.getGeoData();
	if (Object.keys(geoData).length > 0) {
		let siblings = Country.getAllSiblings();
		let covData = Cov.getData();
		let countryName = geoData.countryName.split(' ').join('-');
		if (covData.length > 0) {
			const covEl = covData.find(covEl => covEl.country.toLowerCase() === countryName.toLowerCase());
			if (Country.getState() === 'processing...') {
				countryTr = <Content data={{fetching: true, msg: 'Fetching data...'}} />;
			}
			if (covEl) {
				const data = [{
					continentName: covEl.continent, 
					country: covEl.country, 
					population: covEl.population, 
					cases: covEl.cases
				}];
				countryTr = <Content data={data} />;
			} else {
				countryTr = <Content data={{error: true, msg: `There's no virus data for the ${countryName} location`}} />
			}
			if (siblings.length !== 0) {
				itemsArr = sibCovArr()
				siblingsTr = <Content data={itemsArr} sibs={siblings}/>
			} else if (siblings.length === 0 && Country.getState() === 'processing...') {
				siblingsTr = <Content data={{fetching: true, msg: 'Fetching data...'}} />
			} else {
				siblingsTr = <Content data={{error: true, msg: `${countryName} has no land borders`}} />
			}
		}
	};
	if (Country.getState() === 'error') {
		countryTr = <Content data={Country.getError()} />
	};	
	return (countryTr !== undefined ?
		<table className={TableStyle.covTable}>
			<thead>
				<tr>
					<th>Continent</th>
					<th>Country Name</th>
					<th>Population</th>
					<th>Cases</th>
				</tr>
			</thead>
			<tbody>
				<tr className={TableStyle.tabHeader}>
					<td colSpan='4'>Current country Data</td>
				</tr>
				{countryTr}
				<tr className={TableStyle.tabHeader}>
					<td colSpan='4'>Siblings Data</td>
				</tr>
				{siblingsTr}
			</tbody>
		</table> : null)
});
export default TableData;
