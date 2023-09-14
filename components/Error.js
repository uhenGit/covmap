import React from "react";
import PropTypes from "prop-types";

function Error({ error }) {
	return(
		<>
			<p>{ error.message }</p>
		</>
        
	)
}

Error.propTypes = {
	error: PropTypes.object,
}

export default Error;
