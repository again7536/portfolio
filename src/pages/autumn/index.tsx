import React, {useState, useEffect, useRef, useCallback} from 'react';
import Head from 'next/head';
import useOnScreen from '../../components/hooks/useOnScreen';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import {throttle} from 'lodash';
import styles from './autumn.module.scss';

import Apple from '../../components/autumn/apple/apple';
import Persimmon from '../../components/autumn/persimmon/persimmon';
import useWindowSize from '../../components/hooks/useWindowSize';

interface Size{
    width: number,
    height: number
}

export default function Autumn() {
    const [scrollY, setScrollY] = useState<number>(0);
    const throttledScroll = useCallback(throttle((newValue)=> {
        setScrollY(newValue);
    }, 100), []);
    const windowSize = useWindowSize();
    const svgRef = useRef<HTMLDivElement>();
    const svgOnScreen = useOnScreen(svgRef, '-100px');

    const scrolled = () => {
        throttledScroll(window.scrollY);
    }

    useEffect(()=> {
        window.addEventListener('scroll', scrolled, false);
        return () => window.removeEventListener('scroll', scrolled, false);
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <div className={styles.page}>
                <div className={styles.svgWrap} ref={svgRef}>
                    <SVG className={svgOnScreen? 'svg1' : 'svg1-off'} 
                    src='/autumn/autumn.svg' height={windowSize.width < 1024 ? '100vh': null} width={windowSize.width < 1024? null: '100vw'}/>
                </div>
                
                <Apple scrollY={scrollY} windowSize={windowSize}/>
                <Persimmon scrollY={scrollY} windowSize={windowSize}/>

                <div className={styles.footer}>
                    <a href="http://www.freepik.com">Autumn SVG - Designed by Freepik</a>
                    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    return {
        props: {}
    }
}