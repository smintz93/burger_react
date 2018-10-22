// functional comp
import React, { Component }  from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false

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