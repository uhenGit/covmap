import React from "react";
import PropTypes from "prop-types";

export function WaitOrError({ data }) {
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
