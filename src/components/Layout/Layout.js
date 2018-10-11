// functional comp
import React, { Component }  from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: true
	}

	sideDrawerClosed = () => {
		this.setState({showSideDrawer: false});
	}


	render(){
		return (
			<Aux>
				<Toolbar />
				<SideDrawer 
					open={this.state.showSideDrawer} 
					closed={this.sideDrawerClosed} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>	

		);
	}
}
	 
		// Aux is used as a wrapping element (like div)

export default Layout;