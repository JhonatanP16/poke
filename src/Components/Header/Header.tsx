import React from 'react'
import classes from './Header.module.css';
import Logo from '../../assets/Pokeball.png';
import Search from '../Search/Search';
import DarkTheme from './DarkTheme';
import { Link } from 'react-router-dom';

const Header:React.FC = () => {
  return (
    <nav className={classes.nav}>
        <div className={classes.logoContent}>
            <Link to='/'><img src={Logo} alt="" /></Link>
            <h1>Pokedex</h1>
        </div>
        <Search/>
        <DarkTheme/>
    </nav>
  )
}

export default Header
