import React, {useState, useEffect, useCallback} from 'react';
import useWindowSize from '../../components/hooks/useWindowSize';
import styles from './work.module.scss';

import Navbar from '../../components/home/navbar/navbar';
import Project from '../../components/home/project/project';
import { debounce, throttle } from 'lodash';

export default function Work() {
    const [firstTouch, setFirstTouch] = useState<boolean>(false);
    const [circleTouchStart, setCircleTouchStart] = useState<number>(0);
    const [circleTouch, setCircleTouch] = useState<number>(0);
    const [scrollCircle, setScrollCircle] = useState<number>(0);
    const [scrollProject, setScrollProject] = useState<number>(0);
    const windowSize = useWindowSize();

    //these will be replaced with DB data.
    const years = [2020, 2021, 2022];
    const images = [
        {
            year:2020, 
            src:'/home/projects/project1.png', 
            url:'/autumn',
            title:'이벤트 연습 페이지'
        },
        {
            year:2021, 
            src:'/home/projects/project2.jpg', 
            url:'https://mini-submarine-8d0.notion.site/1b6f1ec038454871b839bb47b298cd94',
            title:'Example-based FAQ 시스템'
        },
        {
            year:2021, 
            src:'/home/projects/project3.jpg', 
            url:'https://github.com/again7536/React_SSR',
            title:'React SSR'
        },
        {
            year:2021, 
            src:'/home/projects/project4.jpg', 
            url:'#',
            title:'소프트웨어대학 생활지도교수 사이트'
        },
    ]

    const rotationSpeed = 0.1;
    const offset = 180/years.length;
    const temp = Math.floor(Math.abs(scrollCircle*rotationSpeed+offset) / (360 / years.length)) % years.length;
    const yearIndex = scrollCircle*rotationSpeed+offset < 0 ? years.length - 1 - temp : temp;

    useEffect(() => {
        setScrollProject(0);
    }, [yearIndex]);

    const handleTouchStart = e => {
        setFirstTouch(true);
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

    const handleWheel = throttle(e=> {
        setFirstTouch(true);
        setScrollCircle(scrollCircle + e.deltaY);
    }, 100);

    return(
        <>
        <Navbar/>
        <div className={styles.work}>
            <div className={styles.circleWrap}>
                <div className={styles.circle} 
                    style={{transform:`rotate(${scrollCircle*rotationSpeed}deg)`}}
                    onWheel={(e)=>handleWheel(e)}
                    onTouchStart={e=>handleTouchStart(e)}
                    onTouchMove={e=>handleTouchMove(e)}
                    onTouchEnd={e=>handleTouchEnd(e)}
                >
                    <h1>works</h1>
                        <div className={firstTouch?styles.arrowWrapHidden:styles.arrowWrap}>
                            <h2>{windowSize.width<1025? 'slide to next': 'scroll down'}</h2>
                            <span className={styles.arrow}></span>
                        </div>
                    
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
            </div>

            <div className={styles.projectWrap}>
                    {images.map((data, index) =>
                        <Project 
                            key={index} 
                            mount={data.year === years[yearIndex]} 
                            src={data.src}
                            url={data.url}
                            title={data.title}
                        />
                    )}
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