// functional comp
import React from 'react';

import Aux from '../../hoc/Aux';

const layout = ( props ) => (
	 
		// Aux is used as a wrapping element (like div)
		<Aux>
			<div>toolbar, sidedrawer,backdrop</div>
			<main>
				{props.children}
			</main>
		</Aux>	

);

export default layout