import country from '../store/countryStore.js';
import User from '../store/userStore.js';
import { covCountryToGeo } from '../public/scripts/helpers.js';
import { useMediaQ } from './hooks/useMediaQuery.js';

const TableRow = ({ data, siblings, error }) => {
	if (useMediaQ('(max-width: 500px)')) console.log('window object:');

	if (error) {
    return(
      <tr>
        <td colSpan='6'>{ error.message }</td>
      </tr>
    )
  }

	function showDetales(evt) {
		User.toggleShow();
		User.setDetales(evt);
	}

	function setToMain(currentCountry) {
		if (!siblings) {
      return
    };
    
		const alterName = covCountryToGeo(currentCountry);
		siblings.forEach((sibling) => {
      const isCountryNameMatched = sibling.countryName.toLowerCase() === currentCountry.toLowerCase();
      const isAlterCountryNameMatched = sibling.countryName.toLowerCase() === alterName.toLowerCase();

			if (isCountryNameMatched || isAlterCountryNameMatched) {
				country.setCountry(sibling)
			}
		});
	}

	return (data.map((item) => {
		return (
      <tr key={ item.country }>
        <td>{ item.continent }</td>
        <td>{ item.day }</td>
        <td 
          onClick={ () => setToMain(item.country) }
          title='Click to set the Country to the top'
        >
          { item.country }
        </td>
        <td>{ item.population }</td>
        <td
          onClick={ () => showDetales(item.country) }
          title='Click for Detales'
        >
          { item.cases.new }
        </td>
        <td>{ item.deaths.total } ({ item.deaths.new })</td>	
      </tr>)
		})
	);
}

export default TableRow;
