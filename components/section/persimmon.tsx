import React, {useRef, useState, useEffect}from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import styles from '../../styles/components/section/persimmon.module.scss';

function Persimmon({scrollY, windowSize}) {
    const bannerRef = useRef<HTMLDivElement>();
    const [bannerScrollY, setbannerScrollY] = useState<number>(0);

    useEffect(() => {
        setbannerScrollY(scrollY - bannerRef.current.offsetTop);
    }, [scrollY]);

    /* animation variables */
    const speed = 2;
    const weighedScrollY = bannerScrollY * speed;
    const halfSize = (windowSize.height > windowSize.width? windowSize.height : windowSize.width) / 2;

    return (
        <div>
            <div ref={bannerRef} className={styles.persimSection} 
            style={{backgroundColor:bannerScrollY<halfSize/2?'#5c0000':'orange'}}>
                <SVG src='/section/persimmon/tree3.svg' className={styles.persimmon}/>
            </div>
        </div>
    )
}

export default Persimmon;