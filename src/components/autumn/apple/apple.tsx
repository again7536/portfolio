import React, {useRef, useState, useEffect, useCallback}from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import {throttle} from 'lodash';

import styles from './apple.module.scss';

function Apple({scrollY, windowSize}) {
    const bannerRef = useRef<HTMLDivElement>();
    const articleRef = useRef<HTMLDivElement>();
    const [bannerScrollY, setBannerScrollY] = useState<number>(0);
    const [articleScrollY, setArticleScrollY] = useState<number>(0);

    const throttledArticleScroll = useCallback(throttle(newValue => {
        setArticleScrollY(newValue);
    }, 100), []);
    const throttledBannerScroll = useCallback(throttle((newValue) => {
        setBannerScrollY(newValue);
    }, 100), []);

    const max = (a:number, b:number) => a>b?a:b;
    const min = (a:number, b:number) => a<b?a:b;

    useEffect(() => {
        throttledBannerScroll(scrollY - bannerRef.current.offsetTop);
        throttledArticleScroll(scrollY - articleRef.current.offsetTop);
    }, [scrollY]);

    /* animation variables */
    const halfSize = (windowSize.height > windowSize.width? windowSize.height : windowSize.width) / 2;
    const weight = windowSize.height > windowSize.width? 1.4 : 1;

    const appleStyle:React.CSSProperties = {
        transform:`
            translateX(${min(bannerScrollY, windowSize.width/2) * 2}px)
            translateY(${max(min(bannerScrollY * weight, halfSize*1.4), 0)}px)
            rotateZ(${bannerScrollY > 0 && bannerScrollY < windowSize.width / 2 ?
                 bannerScrollY * 1440 / windowSize.width 
                 : 720}deg)
            scale(${min(1 + max(bannerScrollY - windowSize.width / 2, 0) / 64, 6)*weight})`,
        transformOrigin:'center center',
        transition: '0.1s linear'
    }

    return (
        <div className={styles.appleSection}>
            <div ref={bannerRef} className={styles.banner}>
                <h1>Foods in season</h1>
                <div className={styles.appleWrap}>
                    <SVG 
                    style={bannerScrollY > -500 ? appleStyle : undefined}
                    className={bannerScrollY > halfSize * 2 ? styles.appleMasked : styles.apple} 
                    src='/autumn/section/apple/apple.svg'/>
                </div>

            </div>
            <div ref={articleRef} 
                className={styles.article} 
                style={{backgroundColor: bannerScrollY >  halfSize * 2 ? '#5c0000' : '#ff0000'}}>
                <h2 className={styles.title} style={{opacity: bannerScrollY > windowSize.width ? 1 : 0}}>
                    Apple
                </h2>
                <div className={styles.imageWrap}>
                    <img className={styles.image} 
                    style={{transform:`translateY(${-articleScrollY/8}px)`}} 
                    src='/autumn/section/apple/apple_pick.jpg'/>
                    <img className={styles.image} 
                    style={{transform:`translateY(${articleScrollY/8}px)`}}
                    src='/autumn/section/apple/apple_pick2.webp'/>
                    <img className={styles.image} 
                    style={{transform:`translateY(${-articleScrollY/8}px)`}}
                    src='/autumn/section/apple/apple_pick3.jpeg'/>
                    <img className={styles.image} 
                    style={{transform:`translateY(${articleScrollY/8}px)`}}
                    src='/autumn/section/apple/apple_pick4.jpg'/>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Ut dictum velit vitae nisi faucibus, ac consequat elit ullamcorper. 
                    In tempus tempor ultrices. Ut lacus enim, cursus eget condimentum et, blandit et ex. 
                    Fusce ligula urna, vulputate ut egestas vitae, elementum a arcu. 
                    Cras pulvinar turpis sit amet ex pretium facilisis. Cras lacinia dapibus pretium.
                </p>
            </div>
        </div>
    )
}

export default Apple;