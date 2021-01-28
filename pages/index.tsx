import React, {useEffect} from 'react';
import Link from 'next/link';

export default function Home() {

    return (
        <div>
            <h1>View Tests</h1>
            <ul>
                <li><Link href="/svg">SVG#1</Link></li>
                <li><Link href="/webgl">WebGL#1</Link></li>
            </ul>
        </div>
    );
}