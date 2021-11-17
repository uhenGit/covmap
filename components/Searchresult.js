import ListItem from './Listitem.js';
import {WaitOrError} from './WaitOrErr.js';
import Country from '../store/countryStore.js';

import SearchResStyle from '../styles/searchres.module.css';

const SearchResult = () => {
	if (!Country.getIsLoading()) return (<WaitOrError />)
	return(
		<ul className={SearchResStyle.listWrap}>
			<h3>Search result</h3>
			{Country.countryName.map(item => <ListItem key={item.geonameId} item={item}/>)}
		</ul>
	)
}
export default SearchResult;
