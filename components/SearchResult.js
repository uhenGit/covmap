import ListItem from './Listitem.js';
import { WaitOrError } from './WaitOrErr.js';
import country from '../store/countryStore.js';

import SearchResStyle from '../styles/searchres.module.css';

const SearchResult = ({ onSelect }) => {
	if (!country.isLoading) {
    return <WaitOrError />;
  }

	return(
		<ul className={ SearchResStyle.listWrap }>
			<h3>Search result</h3>
			{
        country
          .countryName
          .map((item) => <ListItem key={ item.geonameId } item={ item } onSelectItem={ () => onSelect() }/>)
      }
		</ul>
	)
}

export default SearchResult;
