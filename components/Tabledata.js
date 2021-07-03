import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import Content from './Tr.js';
import TableStyle from '../styles/covtable.module.css';
import Country from '../store/countryStore.js';
import Cov from '../store/covStore.js';

const TableData = observer(() => {
	let population, cases, countryTr, siblingsTr, itemsArr = [];
	let geoData = Country.getGeoData();
	if (Object.keys(geoData).length > 0) {
		let siblings = Country.getAllSiblings();
		let covData = Cov.getData();
		let countryName = geoData.countryName.split(' ').join('-');
		if (covData.length > 0) {
			const covEl = covData.find(covEl => covEl.country.toLowerCase() === countryName.toLowerCase());
			if (covEl) {
				population = covEl.population;
				cases = covEl.cases.new;
				const country = covEl.country;
				const continentName = covEl.continent;
				const data = [{continentName, country, population, cases}];
				countryTr = <Content data={data} />;
			} else {
				countryTr = <Content data={{error: true, msg: `There's no virus data for the ${countryName} location`}} />
			}
			if (siblings.length !== 0) {
				for (let sibItem of siblings) {
					covData.forEach(covItem => {
						if (covItem.country.toLowerCase() === sibItem.countryName.toLowerCase()) {
							let itemObj = {
								continentName: sibItem.continentCode,
								country: covItem.country,
								population: covItem.population,
								cases: covItem.cases.new
							};
							itemsArr.push(itemObj);
						}
					})
				}
				siblingsTr = <Content data={itemsArr}/>
			} else {
				console.log(siblings);
				console.log(toJS(Country.error));
			}
		}
	};
	if (toJS(Country.getState()) === 'error') {
		countryTr = <Content data={(toJS(Country.getError()))} />
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
