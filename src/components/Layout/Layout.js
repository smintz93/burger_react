// functional comp
import React, { Component }  from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: true,

	}

	sideDrawerClosed = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggle = () => {
		// setting state this way bc in this case it depends on old state // 
		this.setState( (prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer}
		})
	}
	


	render(){
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sideDrawerToggle}/>
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