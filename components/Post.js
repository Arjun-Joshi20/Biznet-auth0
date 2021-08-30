import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Tilt from 'react-tilt'
import { useRef, useState, useEffect} from "react";
import { db, storage } from "../firebase";

function Post({ desc, name, title, price, postImage, contact, linkedin, typeSocial }) {
  return (
    <Tilt>
      <div className=" bg-gray-100 glassmorphic">
        <p className="mb-2" >{ `Product by ${ name }` }</p>
        <p className='text-4xl mb-3' >{title}</p>
        <img src={ postImage }></img>
        <p className=" mt-5 break-words text-justify " > {desc}</p>
        <br/>
        <p className='mb-3' >{`Price: $ ${price}`}</p>
        <p>{contact}</p>
        <a target='_blank' className='text-white hover:border-b-2 border-white' href={linkedin}>Visit our {typeSocial}</a>
        <br></br>
      </div>
    </Tilt>
  );
}

export default Post; 