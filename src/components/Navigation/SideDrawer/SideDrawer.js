import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/navItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
const sideDrawer = () => {

	return (
		<Aux>
			<Backdrop show/>
			<div className={classes.SideDrawer}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavItems />
				</nav>
			</div>
		</Aux>
	);

};


export default sideDrawer;