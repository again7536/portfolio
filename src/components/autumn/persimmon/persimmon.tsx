import React, {useRef, useState, useEffect, useCallback} from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import {throttle} from 'lodash';

import styles from './persimmon.module.scss';

function Persimmon({scrollY, windowSize}) {
    const bannerRef = useRef<HTMLDivElement>();
    const articleRef = useRef<HTMLDivElement>();
    const [bannerScrollY, setbannerScrollY] = useState<number>(0);
    const [articleScrollY, setArticleScrollY] = useState<number>(0);

    const throttledBannerScroll = useCallback(throttle(newValue => {
        setbannerScrollY(newValue);
    }, 100), []);
    const throttledArticleScroll = useCallback(throttle(newValue => {
        setArticleScrollY(newValue);
    }, 100), []);

    useEffect(() => {
        throttledBannerScroll(scrollY - bannerRef.current.offsetTop);
        throttledArticleScroll(scrollY - articleRef.current.offsetTop);
    }, [scrollY]);

    const max = (a:number, b:number) => a>b?a:b;
    const min = (a:number, b:number) => a<b?a:b;

    const halfSize = windowSize.width / 2;
    const weight = windowSize.height > windowSize.width? 10 : 1.2;
    return (
        <div className={styles.persimSection}>
            <style jsx global>{`
                #persimmon {
                    transform-box: fill-box;
                    transform-origin:${bannerScrollY < halfSize * 2?'50% 0': '50% 50%'};
                    transform:
                        translateY(${max(0, 0.4 * (bannerScrollY - halfSize)) * weight}px)
                        rotateZ(${bannerScrollY < halfSize?Math.sin(max(0, bannerScrollY)/32) * 16:0}deg);
                    transition:0.1s linear;
                }
            `}</style>

            <div ref={bannerRef} 
                className={styles.banner}
                style={{
                    backgroundColor : bannerScrollY < halfSize ? 
                        '#5c0000' 
                        : bannerScrollY < halfSize*2 ?'orange':'#f1613a',
                }}
            >
                <SVG 
                    src='/autumn/section/persimmon/tree3.svg' 
                    className={styles.persimmon}
                    style={{
                        marginTop:'10%'
                    }}
                />
            </div>

            <div className={styles.article} ref={articleRef}>
                <h2 className={styles.title}>persimmon</h2>
                <div className={styles.imageWrap}>
                    <img className={styles.image} 
                    style={{transform:`translateY(${-articleScrollY/8}px)`}} 
                    src='/autumn/section/persimmon/persimmon2.jpg'/>
                    <img className={styles.image} 
                    style={{transform:`translateY(${articleScrollY/8}px)`}}
                    src='/autumn/section/persimmon/persimmon1.jpg'/>
                    <img className={styles.image} 
                    style={{transform:`translateY(${-articleScrollY/8}px)`}}
                    src='/autumn/section/persimmon/persimmon3.jpg'/>
                    <img className={styles.image} 
                    style={{transform:`translateY(${articleScrollY/8}px)`}}
                    src='/autumn/section/persimmon/persimmon4.jpg'/>
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

export default Persimmon;