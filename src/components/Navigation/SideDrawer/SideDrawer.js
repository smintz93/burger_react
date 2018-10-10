import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/navItems';
import classes from './SideDrawer.css';
const sideDrawer = () => {

	return (
		<div className={classes.SideDrawer}>
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavItems />
			</nav>
		</div>
	);

};


export default sideDrawer;