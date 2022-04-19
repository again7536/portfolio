import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import styles from './project.module.scss';

interface ProjectProps{
    mount:boolean;
    src:string;
    title:string;
    url?:string;
}

export default function Project({mount, src, title='', url='#'}:ProjectProps):JSX.Element {
    const router = useRouter();
    const [render, setRender] = useState<boolean>(mount);

    useEffect(() => {
        let id = null;
        if(mount) 
            id = setTimeout(()=>setRender(true), 1000);
        return () => clearTimeout(id);
    }, [mount]);

    function animEnd() {
        if(!mount) setRender(false);
    }

    return(
        render && (
            <div className={mount?styles.project:styles.projectHide} onAnimationEnd={animEnd}>
                <img 
                    src={src}
                    onClick={()=>window.open(url, '_blank').focus()}
                />
                <h3>{title}</h3>
            </div>
        )
    )
}