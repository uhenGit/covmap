import React from "react";
import PropTypes from "prop-types";

const PureInput = (props) => {
	const { name, inputName, inputType, inputFunc, val, placeholder } = props;
	return ((inputType !== "textarea")
		? (<label className="flex f-column">
			<p>{ name }</p>
			<input
				type={ inputType }
				name={ inputName }
				placeholder={ placeholder }
				onChange={ inputFunc }
				value={ val } />
		</label>)
		: (<label className="flex f-column">
			<p>{ name }</p>
			<textarea
				name={ inputName }
				placeholder={ placeholder }
				onChange={ inputFunc }
				value={ val }></textarea>
		</label>)
	);
}

PureInput.propTypes = {
	name: PropTypes.string,
	inputType: PropTypes.string,
	inputName: PropTypes.string,
	placeholder: PropTypes.string,
	inputFunc:  PropTypes.func,
	val: PropTypes.string,
}

export default PureInput;
