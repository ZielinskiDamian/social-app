import { NavLink } from 'react-router-dom';


import './AppNav.css';
const AppNav = () => {
	return (
		<nav className='mainNav'>
			<ul>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
			</ul>
			<ul>
				<li>
					<NavLink to='/login'>Login</NavLink>
				</li>
			</ul>
			<ul>
				<li>
					<NavLink to='/signup'>SignUp</NavLink>
				</li>
			</ul>
		</nav>
	);
};
export default AppNav;
