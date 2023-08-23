import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import classes from './SkeletonDetails.module.css';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonDetails:React.FC = () => {
     const isDarkMode = () => {
        const darkMode = localStorage.getItem('darkPoke');
        if(darkMode) return true;
        else return false;
     }
  return (
    <SkeletonTheme baseColor={isDarkMode() ? '#202020' : '#ebebeb'} highlightColor={isDarkMode() ? '#444':'#f5f5f5'}>
              <div className={classes.content}>
                <div className={classes.containerDetails}>
                  <div className={classes.first}>
                    <div className={classes.top}>
                     <Skeleton height="100%" width="100%"/>
                    </div>
                    <div className={classes.bottom}>
                      <Skeleton height={20} width={300}/>
                      <Skeleton height={20} width={300}/>
                      <Skeleton height={20} width={300}/>
                      <Skeleton height={20} width={300}/>
                      <Skeleton height={20} width={300}/>
                      <Skeleton height={20} width={300}/>
                    </div>
                  </div>
                  <div className={classes.second}>
                   <Skeleton height={400} width={400} className={classes.skeleton}/>
                  </div>
                </div>
              </div>
    </SkeletonTheme>
  )
}

export default SkeletonDetails
