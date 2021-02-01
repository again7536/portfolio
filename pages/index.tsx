import React, {useEffect} from 'react';
import Link from 'next/link';

export default function Home() {

    return (
        <div>
            <h1>My blog</h1>
            <ul className='projects'>
                <li><Link href="/autumn">SVG#1</Link></li>
                <li><Link href="/webgl">WebGL#1</Link></li>
            </ul>
        </div>
    );
}