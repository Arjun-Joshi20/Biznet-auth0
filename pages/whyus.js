import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Head from 'next/head'
import Tilt from 'react-tilt'
import {useRouter} from 'next/router'
import Link from 'next/link'

/**
 * This is an example of animating shared layouts in Framer Motion 2.
 *
 * The open state of each panel is contained locally to that component. Wrapping
 * them all in the same AnimateSharedLayout component allows them all to animate
 * in response to state changes that affect each other's layout.
 *
 * Try removing AnimateSharedLayout to see how that affects the animation.
 */

export default function App() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);
    const router = useRouter()

  return (
      <div>
          <Head>
              <title>Why Us</title>
          </Head>
        <div className="flex" >
            <div  >
                <h1 type="staticText" className="text-center subtext-font text-white mr-52 overflow-hidden " >Your benefits by selling on BIZNET</h1>
                <Tilt className="flex" >
                    <button onClick={() => router.push('/')} className='rounded-full border-2 mt-10 border-white p-2 hover:bg-white hover:text-[#E51A4C] text-white cursor-pointer w-20 mr-5  ' >Prev</button> 
                    <button onClick={() => router.push('dashboard')} className='rounded-full border-2 mt-10 border-white p-2 hover:bg-white hover:text-[#E51A4C] text-white cursor-pointer w-20  ' >Next</button> 
                </Tilt>
            </div>
        <AnimateSharedLayout >
            <motion.ul layout initial={{ borderRadius: 25 }}>
                <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
                    <motion.div className="flex" >
                        <img className="h-10 mr-5" src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629219204/farmfresh/undraw_businessman_97x4_m7vjjb.svg' ></img>
                        <h1 className='text-xl' >Are you a small business??</h1>
                    </motion.div>
                    <AnimatePresence>{isOpen && <h1>If you are one then you have come to the right place, BIZNET is a new platform for you to post about your creative products and people can buy them by directly contacting you. No middleman, no extra charges involved.</h1>}</AnimatePresence>
                </motion.li>
                <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
                    <motion.div className="flex" >
                        <img className="h-10 mr-5" src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629217888/undraw_add_to_cart_vkjp_o4cfqe.svg' ></img>
                        <h1 className='text-xl' >Need a specific platform to sell</h1>
                    </motion.div>
                    <AnimatePresence>{isOpen && <h1>Everyone has tried Facebook, Instagram, Twitter but they don't always work out. We need a seperate plaform to promote and sell our products. BIZNET is a platform only to sell your products. People interested can contact you and buy the products.</h1>}</AnimatePresence>
                </motion.li>
            </motion.ul>
        </AnimateSharedLayout>
      </div>
      </div>
  );
}

function Item() {


  return (
    <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
      <motion.div >
        <img className="h-10" src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629219204/farmfresh/undraw_businessman_97x4_m7vjjb.svg' ></img>
      </motion.div>
      <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
    </motion.li>
  );
}

function Content() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
        <h1>djflk</h1>
    </motion.div>
  );
}

const items = [0, 1, 2];
