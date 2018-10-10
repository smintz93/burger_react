import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/navItems';
import classes from './SideDrawer.css';
const sideDrawer = () => {

	return (
		<div className={classes.SideDrawer}>
			<Logo />
			<nav>
				<NavItems />
			</nav>
		</div>
	);

};


export default sideDrawer;