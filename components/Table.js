import { observer } from 'mobx-react-lite';
// import { toJS } from 'mobx';
import { useEffect } from 'react';
import Search from './Search.js';
import TableData from './Tabledata.js';
import Detales from './Detales.js';
import Country from '../store/countryStore.js'; 
import User from '../store/userStore.js';

const Table = observer(() => {
	return (
		<div>
			<h2>Table</h2>
			<Search />
			<TableData />
			{User.isShow() && <Detales />}
		</div>)
});
export default Table;
