import { observer } from 'mobx-react-lite';
import Search from './Search.js';
import TableData from './Tabledata.js';
import Detales from './Detales.js';
import { WaitOrError } from './WaitOrErr.js';
import Cov from '../store/covStore.js';
import Country from '../store/countryStore.js';
import User from '../store/userStore.js';

const Table = observer(() => {
	return (
		<div className='flex f-center f-column'>
			<h2>Table</h2>
			<Search />
			{Cov.getData().length !== 0 ? <TableData /> : <WaitOrError/>}
			{User.isShow() && <Detales />}
		</div>)
});
export default Table;
