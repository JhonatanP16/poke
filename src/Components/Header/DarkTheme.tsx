import React, { useEffect, useState } from 'react'
import classes from './DarkTheme.module.css';
import {BsSun,BsMoonFill} from 'react-icons/bs';
const DarkTheme:React.FC = () => {
  const [isDarkMode,setIsDarkmode] = useState<boolean>(() => {
    const darkMode = localStorage.getItem('darkPoke');
    if(darkMode) return true;
    else return false;
  });

  useEffect(() => {
    const html = document.querySelector<HTMLHtmlElement>('html')!;
    if(isDarkMode){
      html.classList.add('darkMode');
      localStorage.setItem('darkPoke',"true");
    }else{
      html.classList.remove('darkMode');
      localStorage.removeItem('darkPoke');
    }
  },[isDarkMode])

  const handleChangeTheme = () => {
    setIsDarkmode((prev) => !prev);
  }

  return (
    <div className={classes.content}>
      <button onClick={handleChangeTheme}>
        {isDarkMode ? <BsMoonFill title='Change Light Theme'/> :<BsSun title='Change Dark Theme'/>}
      </button>
    </div>
  )
}

export default DarkTheme
