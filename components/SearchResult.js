import React from "react";
import PropTypes from "prop-types";
import ListItem from './Listitem.js';
import Loader from './Loader.js';
import country from '../store/countryStore.js';

import SearchResStyle from '../styles/searchres.module.css';

const SearchResult = ({ onSelect }) => {
	if (country.isLoading) {
		return <Loader spinDiameter={30}/>;
	}

	return(
		<ul className={ SearchResStyle.listWrap }>
			<h3>Search results</h3>
			{ country.loadedCountries.map(
				(item) => <ListItem key={ item.geonameId } item={ item } onSelectItem={ () => onSelect() }/>
			)}
		</ul>
	)
}

SearchResult.propTypes = {
	onSelect: PropTypes.func,
}

export default SearchResult;
