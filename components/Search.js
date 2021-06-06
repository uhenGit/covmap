import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import PureInput from './Pureinput.js';
import SearchResult from './Searchresult.js';
// import TableData from './Tabledata.js';
import Country from '../store/countryStore.js';

const Search = observer(()=>{
	const initStr = '';
	const [searchStr, setSearchStr] = useState(initStr);
	const inputHandle = e => {
		setSearchStr(e.target.value);
		// Country.dropCurrentGeoData();
		if (searchStr.length > 1) {
			Country.getCountryName(searchStr)
		}
	};
	return (
		<>
			<PureInput inputType='text' name='Search Your Country' placeholder='start typing' inputName='search' val={searchStr} inputFunc={inputHandle} />
			{(toJS(Country.countryName).length > 0 && searchStr.length > 0) ? <SearchResult /> : null}
		</>
	)
})
export default Search;
