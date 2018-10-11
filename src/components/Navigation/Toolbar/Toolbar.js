import React from 'react';
import classes from './Toolbar.css'

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/navItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavItems />
		</nav>
	</header>
);

export default toolbar;