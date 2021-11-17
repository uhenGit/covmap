import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Table from './Table.js';
import MapWrap from './Map.js';
import Graph from './Graph.js';
import Country from '../store/countryStore.js';

import contentStyle from '../styles/content.module.css';

const Content = observer(() => {
	useEffect(() => {
		// console.log(Country.getGeoData());
		if (!('geonameId' in Country.getGeoData())) Country.getCurrentCoords();
	}, []);
	const [activeTab, setActiveTab] = useState('table');
	const handleInput = e => {
		setActiveTab(e.target.value);
	};
	const activeTable = (activeTab === 'table') ? `${contentStyle.active}` : '';
	const tableStyle = `${contentStyle.tabLabel} ${activeTable}`;
	const activeMap = (activeTab === 'map') ? `${contentStyle.active}` : '';
	const mapStyle = `${contentStyle.tabLabel} ${activeMap}`;
	const activeGraph = (activeTab === 'graph') ? `${contentStyle.active}` : '';
	const graphStyle = `${contentStyle.tabLabel} ${activeGraph}`;
	return (
		<main>
			<div className='flex tabs'>
				<label className={tableStyle}>
					<input type='radio' name='tab' value='table' onChange={handleInput} className={contentStyle.tabInput}/>
					<span>Table</span>
				</label>
				<label className={mapStyle}>
					<input type='radio' name='tab' value='map' onChange={handleInput} className={contentStyle.tabInput}/>
					<span>Map</span>
				</label>
				<label className={graphStyle}>
					<input type='radio' name='tab' value='graph' onChange={handleInput} className={contentStyle.tabInput}/>
					<span>Graphical</span>
				</label>
			</div>
			{(activeTab === 'table') && <Table />}
			{(activeTab === 'map') && <MapWrap />}
			{(activeTab === 'graph') && <Graph />}
		</main>
	);
});
export default Content;
