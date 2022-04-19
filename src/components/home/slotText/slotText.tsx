import React, {useEffect, useState} from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import styles from './slotText.module.scss';

interface Props {
    startDelay?:number,
    length:number,
    delay?:number
}

const SlotText:React.FC<Props> = ({startDelay=0, length, delay=3, children}):JSX.Element => {
    const [slotIndex, setSlotIndex] = useState(0);
    const windowSize = useWindowSize();

    useEffect( () => {
        const id = setTimeout(()=> {
            rollSlot(slotIndex);
        }, startDelay*1000);
        return () => clearTimeout(id);
    }, []);

    const rollSlot = (slotIndex) => {
        if(slotIndex < length-1) {
            setSlotIndex(slotIndex+1)
            setTimeout(() => rollSlot(slotIndex+1), delay*1000);
        }
    }

    const minUnit = windowSize.height > windowSize.width ? 'vw': 'vh';

    return (
        <div className={styles.slotWrap}>
            <div className={styles.slot}
                style={{transform:`translateY(${-100 * slotIndex/length}%)`}}
            >
                {children}
            </div>
        </div>
    );
}

export default SlotText;