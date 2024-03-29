import React from "react";
import { observer } from 'mobx-react-lite';
import Search from './Search.js';
import TableData from './TableData.js';
import Details from './Details.js';
import Loader from './Loader.js';
import covid from '../store/covStore.js';
import User from '../store/userStore.js';

const Table = observer(() => {
	return (
		<div className='flex f-center f-column'>
			<h2>Table</h2>
			<Search />
			{
				covid.covidData.length !== 0
					? <TableData />
					: <Loader spinDiameter={50}/>
			}
			{ User.isShow() && <Details /> }
		</div>)
});

export default Table;
