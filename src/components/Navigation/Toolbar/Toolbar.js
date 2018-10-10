import React from 'react';
import classes from './Toolbar.css'

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/navItems'

const toolbar = () => (
	<header className={classes.Toolbar}>
		<div>MENU</div>
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav>
			<NavItems />
		</nav>
	</header>
);

export default toolbar;