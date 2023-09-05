import { useState } from 'react';
import covid from '../store/covStore.js';
// @todo Fix this component
const LiDate = ({ details }) => {
	if (details.simpleLi) {
		return (
      <li>
        <span>{ details.span }</span><span>{ details.info }</span>
      </li>
    )
	}
	const [inputType, setType] = useState('text');
	const [val, setValue] = useState(details.details.day);
	const setCovDate = (evt) => {
		covid.getCovidDataByDay(details.country, evt.target.value);
		setValue(evt.target.value);	
	}
	const msg = details.inter ? 'Try another date ' : 'Date ';

	return (
		<li>
      <span>{ msg }</span>
      <input
        type={ inputType }
        onFocus={ () => setType('date') }
        onBlur={ () => setType('text') }
        value={ val }
        onChange={ setCovDate }
      />
    </li>
	)
}

export default LiDate;
