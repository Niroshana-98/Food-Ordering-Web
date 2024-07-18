'use client';
import Image from "next/image";
import Right from "../icons/Right";
import React from "react";
import Slideshow from "../Slideshow";
import { motion } from 'framer-motion';
import Link from "next/link";

const images = [
    {
        src: '/slide1.jpg',
      },
      {
        src: '/slide2.jpg',
      },
      {
        src: '/pizza2.jpg',
      },
      {
        src: '/1097928.jpg',
      },
  ];

export default function hero(){
    return(
        <section className="hero mb:mt-4 mb-48">
            <div className="py-8 md:py-12">
                <motion.h1 className="text-4xl font-semibold text-white"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}>
                    Life is<br/> 
                    Tastier with a<br/>
                    Side of&nbsp; 
                    <span className="text-primary">
                        FOOD
                    </span>
                </motion.h1>
                <p className="my-6 text-white text-sm font-semibold text-justify">
                    Food 🍽️ completes our days with simple joys.
                    From hearty soups 🍲 to fresh salads 🥗 and decadent desserts 🍰,
                    food nourishes, delights, and connects us, turning moments into cherished memories 😊.
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full hover:text-secondary border-primary">
                        <Link href={'/menu'}>Order Now</Link>
                        <Right />
                    </button>
                    <button className="flex items-center border-0 gap-2 py-2 text-white font-semibold hover:text-primary">
                        Lern More
                        <Right />
                    </button>
                </div>
            </div>
            <div className="relative mt-4 rounded-xl overflow-hidden">
                <Slideshow images={images} />
            </div>
            
        </section>
    );
}
 