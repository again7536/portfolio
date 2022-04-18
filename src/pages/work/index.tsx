import React, {useState, useEffect, useCallback} from 'react';
import useWindowSize from '../../components/hooks/useWindowSize';
import styles from './work.module.scss';

import Navbar from '../../components/home/navbar/navbar';
import Project from '../../components/home/project/project';
import { debounce, throttle } from 'lodash';

export default function Work() {
    const [circleTouchStart, setCircleTouchStart] = useState<number>(0);
    const [circleTouch, setCircleTouch] = useState<number>(0);
    const [projectTouchStart, setProjectTouchStart] = useState<number>(0);
    const [scrollCircle, setScrollCircle] = useState<number>(0);
    const [scrollProject, setScrollProject] = useState<number>(0);
    const windowSize = useWindowSize();

    //these will be replaced with DB data.
    const years = [2021, 2022, 2023];
    const images = [{year:2021, src:'/home/projects/project1.png'},
                    {year:2021, src:'/home/projects/project2.jpg'},
                    {year:2021, src:'/home/projects/project2.jpg'},];

    const rotationSpeed = 0.1;
    const offset = 180/years.length;
    const temp = Math.floor(Math.abs(scrollCircle*rotationSpeed+offset) / (360 / years.length)) % years.length;
    const yearIndex = scrollCircle*rotationSpeed+offset < 0 ? years.length - 1 - temp : temp;
    const minScrollProject = -(images.filter((data)=>data.year === years[yearIndex]).length * 0.4 - 0.92)* windowSize.outerHeight;

    useEffect(() => {
        setScrollProject(0);
    }, [yearIndex]);

    const handleTouchStart = e => {
        //setScrollCircle
        //setScrollCircle(0);
        setCircleTouchStart(e.touches[0].pageX);
        setCircleTouch(e.touches[0].pageX);
    }
    const handleTouchMove = throttle(e=> {
        setCircleTouch(e.changedTouches[0].pageX);
    }, 100);

    const handleTouchEnd = (e) => setTimeout(e => {
        if(Math.abs(circleTouch - circleTouchStart) > 20)
        setScrollCircle(scrollCircle - 3*(circleTouch - circleTouchStart));
    },1);

    return(
        <>
        <Navbar/>
        <div className={styles.work}>
            <div className={styles.circle} 
                style={{transform:`rotate(${scrollCircle*rotationSpeed}deg)`}}
                onScroll={e=>{e.preventDefault();console.log('here');}}
                onWheel={(e)=>setScrollCircle(scrollCircle + e.deltaY)}
                onTouchStart={e=>handleTouchStart(e)}
                onTouchMove={e=>handleTouchMove(e)}
                onTouchEnd={e=>handleTouchEnd(e)}
            >
                <h1>works</h1>
                {years.map((year, index) => 
                    <div className={styles.years}
                        key={index}
                        style={{
                            transform:`rotate(${(windowSize.width<1025? 90 : 0) - 360/years.length * index}deg) 
                                translateX(${windowSize.width<1025?'60vw':'60vh'})
                                rotate(${windowSize.width<1025?'-90':'0'}deg) `
                        }}>
                            {year}
                    </div>
                )}
            </div>
            <div className={styles.circlePlace}/>

            <div className={styles.projectWrap}>
                <div className={styles.projects}
                    style={{transform:`translateY(${scrollProject}px)`}}
                >
                    <div className={styles.project}>
                        {images.map((data, index) =>
                            <Project key={index} mount={data.year === years[yearIndex]} src={data.src}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export async function getStaticProps(context) {
    return {
        props: {}
    }
}