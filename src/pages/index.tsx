import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import styles from './Home.module.scss';

import SVG from 'react-inlinesvg';
import SlotText from '../components/home/slotText/slotText';
import Navbar from '../components/home/navbar/navbar';

interface FloatMove {
    x:number,
    y:number
};

export default function Home():JSX.Element {
    const [floatMove1, setFloatMove1] = useState<FloatMove>({x:0, y:0});
    const [floatMove2, setFloatMove2] = useState<FloatMove>({x:0, y:0});
    const [firstSlotEnd, setFirstSlotEnd] = useState<Boolean>(false);

    const firstSlotEnded = () => setFirstSlotEnd(true);

    useEffect(() => {
        const id = setInterval(()=>{  
            setFloatMove1({x:Math.random()*10-5, y:Math.random()*10-5});
            setFloatMove2({x:Math.random()*10-5, y:Math.random()*10-5});
        }, 3000);
        return ()=>clearInterval(id);
    }, [])

    return (
        <div>
            <style>{`
                #circle1{
                    transition:3.0s linear;
                    transform:translate3D(${floatMove1.x}%, ${floatMove1.y}%, 0);
                }
                #circle2 {
                    transition:3.0s linear;
                    transform:translate3D(${floatMove2.x}%, ${floatMove2.y}%, 0);
                }
                #gear1 {
                    transform-origin:67% 29%;
                    animation:rotate 2.0s forwards linear infinite;
                }
                #gear2 {
                    transform-origin:77.7% 38%;
                    animation:rotate 2.0s forwards linear reverse infinite;
                }
                @keyframes rotate {
                    from { transform:rotateZ(0deg); }
                    to   { transform:rotateZ(360deg);}
                }
            `}</style>
            <Navbar/>
            <div className={styles.banner}>
                <div className={styles.bannerText}>
                    <SlotText startDelay={3.1} delay={0.8} length={3} >
                        <span>I AM A</span>
                        <span>&nbsp;</span>
                        <Link href='/about'><span style={{cursor:'pointer'}}>About Me</span></Link>
                    </SlotText>

                    <SlotText delay={0.8} length={7}> 
                        <span>&nbsp;</span>
                        <span>&nbsp;</span>
                        <span>Helpful</span>
                        <span>Junior</span>
                        <span>Frontend</span>
                        <span>&nbsp;</span>
                        <Link href='/work'><span style={{cursor:'pointer'}}>Works</span></Link>
                    </SlotText>

                    <SlotText startDelay={3.4} delay={0.8} length={3}>
                        <span>DEVELOPER</span>
                        <span>&nbsp;</span>
                        <Link href='/contact'><span style={{cursor:'pointer'}}>Contact</span></Link>
                    </SlotText>
                </div>
                <div className={styles.bannerImageWrap}>
                    <SVG className={styles.bannerImage} src='/home/coding.svg'></SVG>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    return {
        props: {}
    }
}