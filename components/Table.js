import { observer } from 'mobx-react-lite';
import Search from './Search.js';
import TableData from './TableData.js';
import Details from './Details.js';
import { WaitOrError } from './WaitOrErr.js';
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
          : <WaitOrError/>
      }
			{ User.isShow() && <Details /> }
		</div>)
});

export default Table;
