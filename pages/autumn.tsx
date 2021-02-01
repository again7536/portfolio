import React, {useState, useEffect, useRef} from 'react';
import useOnScreen from '../components/hooks/useOnScreen';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import styles from '../styles/pages/autumn.module.scss';

import Apple from '../components/svg/section/apple';
import Persimmon from '../components/svg/section/persimmon';

interface Size{
    width: number,
    height: number
}

function SVGtest() {
    const [scrollY, setScrollY] = useState<number>(0);
    const [windowSize, setWindowSize] = useState<Size>({width:0, height:0});
    const svgRef = useRef<HTMLDivElement>();
    const svgOnScreen = useOnScreen(svgRef, '-100px');

    const scrolled = () => {
        setScrollY(window.scrollY);
    }
    const resized = () => {
        setWindowSize({width:window.outerWidth, height:window.outerHeight});
    }

    useEffect(()=> {
        resized();
    },[]);

    useEffect(()=> {
        window.addEventListener('scroll', scrolled, false);
        return () => window.removeEventListener('scroll', scrolled, false);
    }, [scrollY]);

    useEffect(()=>{
        window.addEventListener('resize', resized);
        return () => window.removeEventListener('resize', resized);
    }, [windowSize]);

    return (
        <div className={styles.page}>
            <div className={styles.svgWrap} ref={svgRef}>
                <SVG className={svgOnScreen? 'svg1' : 'svg1-off'} 
                src='/autumn4.svg' height={windowSize.width < 1024 ? windowSize.height: null} width={windowSize.width < 1024? null: windowSize.width}/>
            </div>
            
            <Apple scrollY={scrollY} windowSize={windowSize}/>
            <Persimmon scrollY={scrollY} windowSize={windowSize}/>

            <div className={styles.footer}>
                <a href="http://www.freepik.com">Autumn SVG - Designed by Freepik</a>
                <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        </div>
    )
}

export default SVGtest;