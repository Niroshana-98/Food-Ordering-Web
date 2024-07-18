'use client';
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Element, scroller } from 'react-scroll';
import Image from 'next/image';


export default function Home() {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) { // Adjust the scroll threshold as needed
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      scroller.scrollTo('scroll-target', {
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [isVisible]);

  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
      <SectionHeaders 
          subHeader={'Our Story'}
          mainHeader={'About us'}
      />
      <Element name="scroll-target">
      <motion.div
       initial={{ x: -1000 }}
       animate={{ x: 0 }}
       transition={{ duration: 1, type: 'spring', stiffness: 120 }}
       className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p className="text-white">
          At Bacement Cafe, we believe that dining is not just about food; it’s an experience. Nestled in the heart of Galle, our restaurant combines delicious flavors with warm hospitality. ❤️ Whether you’re celebrating a special occasion or simply enjoying a meal with loved ones, we invite you to savor every moment with us. 🎉👨‍👩‍👧‍👦
        </p>
        <p className="text-white">
          🍽️ Founded in 2015, Bacement Cafe 🍽️ has been a culinary destination for locals and tourists alike. 🌟 Our journey began with a passion for Comfort Food. Over the years, we’ve evolved, but our commitment to quality ingredients, impeccable service, and a welcoming ambiance remains unwavering. 🍔✨
        </p>
        <p className="text-white">
          🎯 Our mission is simple - to create memorable dining experiences 🎯. From our carefully curated menu 📜🍽️ to our thoughtfully designed space 🛋️✨, every detail reflects our dedication to excellence. We strive to be more than just a restaurant; we want to be a part of your cherished memories. ❤️🍴
        </p>
      </motion.div>
      </Element>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders 
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact Us'}
        />
        <div className="mt-8 flex items-center space-x-4 justify-center">
          <a href="https://web.facebook.com/HungryRestaurantGalle">
            <Image
              src="/R.png"
              width={220}
              height={220}
              alt="First Image"
              className="w-8 h-8 sm:w-12 sm:h-12"
            />
          </a>
          <a href="https://wa.me/94763903736">
            <Image
              src="/R (1).png"
              width={220}
              height={220}
              alt="Second Image"
              className="w-8 h-8 sm:w-12 sm:h-12"
            />
          </a>
          <a className="text-4xl underline text-gray-500" href="tel:+94763903736">
            +94 76 390 3736
          </a>
      </div>   
      </section>
    </>
  );
}

