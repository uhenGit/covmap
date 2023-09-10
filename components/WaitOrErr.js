import React from "react";
import PropTypes from "prop-types";

function WaitOrError({ data }) {
	return(
		<>
			<span>Wait please...</span>
			{ data && <p>{ data.msg }</p> }
		</>
        
	)
}

WaitOrError.propTypes = {
	data: PropTypes.object,
}

export default WaitOrError;
