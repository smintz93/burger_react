// functional comp
import React, { Component }  from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: true,
		showToolbar: false
	}

	sideDrawerClosed = () => {
		this.setState({showSideDrawer: false});
	}

	toolbarClosed = () => {
		this.setState({showToolbar: true});
		console.log('click')
	}
	


	render(){
		return (
			<Aux>
				<Toolbar open={this.state.showToolbar} closed={this.toolbarClosed} />
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