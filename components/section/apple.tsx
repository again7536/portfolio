import React, {useRef, useState, useEffect}from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import styles from '../../styles/components/section/apple.module.scss';

function Apple({scrollY, windowSize}) {
    const sectionRef = useRef<HTMLDivElement>();
    const [sectionScrollY, setsectionScrollY] = useState<number>(0);

    useEffect(() => {
        setsectionScrollY(scrollY - sectionRef.current.offsetTop);
    },[scrollY]);

    /* animation variables */
    const speed = 2;
    const weighedScrollY = sectionScrollY * speed;
    const halfWidth = windowSize.width / 2;

    const appleStyle = {
        transform:`
            translateX(${weighedScrollY < halfWidth ? weighedScrollY : halfWidth}px) 
            rotateZ(${weighedScrollY < halfWidth ? weighedScrollY * 720 / windowSize.width : 360}deg)
            translateY(${weighedScrollY > halfWidth ?
                weighedScrollY < windowSize.width ? 
                    (weighedScrollY - halfWidth) 
                    : halfWidth
                : 0}px)
            scale(${weighedScrollY > halfWidth ? 
                weighedScrollY < windowSize.width ? 
                    1 + (weighedScrollY - halfWidth) / 64 
                    : 1 + halfWidth / 64
                : 1})`
    }

    return (
        <div className={styles.appleSections}>
            <div ref={sectionRef} className={styles.section}>
                <h1>Foods in season</h1>
                <div className={styles.appleWrap}>
                    <SVG style={sectionScrollY > -500 ? appleStyle :null}
                    className={weighedScrollY > windowSize.width ? styles.appleMasked : styles.apple} src='/apple.svg' width='50vh' height='50vh'/>
                </div>
                <div className={styles.article} style={{opacity: weighedScrollY > windowSize.width ? 1 : 0}}>
                    <h2>Apple</h2>
                </div>
            </div>
            <div className={styles.section2} style={{backgroundColor: weighedScrollY > windowSize.width ? '#5c0000' : '#ff0000'}}>
                <div className={styles.imageWrap}>
                    <img className={styles.image} src='/section/apple/apple_pick.jpg'></img>
                    <img className={styles.image} src='/section/apple/apple_pick2.webp'></img>
                    <img className={styles.image} src='/section/apple/apple_pick.jpg'></img>
                    <img className={styles.image} src='/section/apple/apple_pick.jpg'></img>
                </div>
            </div>
        </div>
    )
}

export default Apple;