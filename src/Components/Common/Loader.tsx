import React from 'react'
import classes from './Loader.module.css';
const Loader:React.FC = () => {
  return (
    <div className={classes.imgContent}>
         <img src="/src/assets/pokeball-loader.gif" alt="" className={classes.img} />
    </div>
  )
}

export default Loader
