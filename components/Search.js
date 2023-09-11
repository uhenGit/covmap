import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import PureInput from './Pureinput.js';
import SearchResult from './SearchResult.js';
import country from '../store/countryStore.js';

const Search = observer(()=>{
	const [ searchStr, setSearchStr ] = useState('');
	const handleInput = async (evt) => {
		setSearchStr(evt.target.value);

		if (searchStr.length > 1) {
			await country.searchCountry(searchStr);
		}
	};

	return (
		<>
			<PureInput
				inputType='text'
				name='Find Your Country'
				placeholder='start typing here...'
				inputName='search'
				val={ searchStr }
				inputFunc={ handleInput }
			/>
			{
				(country.loadedCountries.length > 0 && searchStr.length > 0)
					? <SearchResult onSelect={ () => { setSearchStr('') } } />
					: null
			}
		</>
	)
});

export default Search;
