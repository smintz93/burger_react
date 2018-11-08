import React from 'react';

const withErrorHandler = (WrapperComponent) => {
	return (props) => {
		return (
			<WrapperComponent {...props }/>
		);
	}
}

export default withErrorHandler;