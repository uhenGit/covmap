import React from "react";
import PropTypes from "prop-types";

const PureInput = (props) => {
	return ((props.inputType !== "textarea")
		? (<label className="flex f-column">
			<p>{ props.name }</p>
			<input
				type={ props.inputType }
				name={ props.inputName }
				placeholder={ props.placeholder }
				onChange={ props.inputFunc }
				value={ props.val } />
		</label>)
		: (<label className="flex f-column">
			<p>{ props.name }</p>
			<textarea
				name={ props.inputName }
				placeholder={ props.placeholder }
				onChange={ props.inputFunc }
				value={ props.val }></textarea>
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
