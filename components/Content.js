import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Table from './Table.js';
import MapWrap from './Map.js';
import Graph from './Graph.js';
import Loader from "./Loader";
import country from '../store/countryStore.js';

import contentStyle from '../styles/content.module.css';
import covid from "../store/covStore";

const Content = observer(() => {
	const [ activeTab, setActiveTab ] = useState('table');

	if ((covid.covidData.length === 0) || !('geonameId' in { ...country.countryGeoData })) {
		return <Loader spinDiameter={50}/>;
	}

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
