import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Table from './Table.js';
import MapWrap from './Map.js';
import Graph from './Graph.js';
import country from '../store/countryStore.js';

import contentStyle from '../styles/content.module.css';

const Content = observer(() => {
	useEffect(() => {
		const { countryGeoData } = country;

		if (!('geonameId' in countryGeoData)) {
			country.getCurrentCoords();
		}
	}, []);
	const [ activeTab, setActiveTab ] = useState('table');
	const handleInput = (evt) => {
		setActiveTab(evt.target.value);
	};
	const activeTable = (activeTab === 'table') ? `${contentStyle.active}` : '';
	const tableStyle = `${contentStyle.tabLabel} ${activeTable}`;
	const activeMap = (activeTab === 'map') ? `${contentStyle.active}` : '';
	const mapStyle = `${contentStyle.tabLabel} ${activeMap}`;
	const activeGraph = (activeTab === 'graph') ? `${contentStyle.active}` : '';
	const graphStyle = `${contentStyle.tabLabel} ${activeGraph}`;
	return (
		<main>
			<div className={'flex tabs'}>
				<label className={ tableStyle }>
					<input
						type='radio'
						name='tab'
						value='table'
						className={ contentStyle.tabInput }
						onChange={ handleInput }
					/>
					<span>Table</span>
				</label>
				<label className={ mapStyle }>
					<input
						type='radio'
						name='tab'
						value='map'
						className={ contentStyle.tabInput }
						onChange={ handleInput }
					/>
					<span>Map</span>
				</label>
				<label className={ graphStyle }>
					<input
						type='radio'
						name='tab'
						value='graph'
						className={ contentStyle.tabInput }
						onChange={ handleInput }
					/>
					<span>Graphical</span>
				</label>
			</div>
			{ (activeTab === 'table') && <Table /> }
			{ (activeTab === 'map') && <MapWrap /> }
			{ (activeTab === 'graph') && <Graph /> }
		</main>
	);
});

export default Content;
