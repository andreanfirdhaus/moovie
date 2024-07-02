import React from 'react';
import HomeImg from '../assets/Homepage_Poster.jpg';

export default function Homepage() {
    return (
        <section>
            <img
                src={HomeImg}
                className='h-screen w-full object-cover object-center'
                alt='homepage-image'
                draggable='false'
            />
        </section>
    );
}
