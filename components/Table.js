import { observer } from 'mobx-react-lite';
import Search from './Search.js';
import TableData from './Tabledata.js';
import Detales from './Detales.js';
import User from '../store/userStore.js';

const Table = observer(() => {
	return (
		<div className='flex f-center f-column'>
			<h2>Table</h2>
			<Search />
			<TableData />
			{User.isShow() && <Detales />}
		</div>)
});
export default Table;
