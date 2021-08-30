import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState, useEffect} from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
import Image from "next/image";
import Posts from '../components/Posts'
import Post from '../components/Post'
import Nav from '../components/Nav'
import { useCollection } from "react-firebase-hooks/firestore";
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head'


function InputBox({posts}) {

  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc", "name", "title", "price", "contact", "linkedin")
  );

  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  const { user, isLoading } = useUser();
  
  useEffect(() => {
    Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
   .then((res) => {
      setInfo(res.data[from]);
    })
  }, [from]);
  

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info])
    
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }
  
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }
  if (user) {
    return(
      <div className='h-screen w-screen' >
      <Head>BIZNET</Head>
      <Nav
      textvalue='Dashboard'
      link='dashboard'
      />
      <div className='flex' >
        <div className=" text-white p-2 rounded-2xl ml-[10px] w-[70vw] font-medium mt-6 ">
        {realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              title={post.data().title}
              desc={post.data().desc}
              price={post.data().price}
              contact={post.data().contact}
              linkedin={post.data().linkedin}
              typeSocial={post.data().typeSocial}
              postImage={post.data().postImage}
            />
          ))
        }
        </div>
        <div className='mt-6' >
        <div className="container text-white">
      <div className="left">
        <h3>Amount</h3>
        <input type="number" 
           placeholder="Enter the amount" 
           onChange={(e) => setInput(e.target.value)}
           className=' p-3 glass-input text-white outline-none'
           required
           />
      </div>
      <div className="middle">
        <h3>From</h3>
        <Dropdown options={options} 
                  onChange={(e) => { setFrom(e.value) }}
        value={from} placeholder="From" className=' p-3 glass-input' />
      </div>
      <div className="switch">
        <HiSwitchHorizontal size="30px" 
        className='mt-10 mb-10'
          onClick={() => { flip()}}/>
      </div>
      <div className="right">
        <h3>To</h3>
        <Dropdown options={options} 
                  onChange={(e) => {setTo(e.value)}} 
        value={to} placeholder="To" className=' p-3 glass-input' />
      </div>
    </div>
    <div className="result text-white">
      <button onClick={()=>{convert()}}>Convert</button>
      <h2>Converted Amount:</h2>
      <p className='mb-5' >{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>
      <hr></hr>


      </div>
        </div>
      </div>
  </div>
    )
  }
  return(
    <div>
      <img className='w-60 animate-bounce'  src='https://res.cloudinary.com/codegowdacloud/image/upload/v1630310234/undraw_secure_login_pdn4_d9e7tu.svg' ></img>
      <br/>
      <br/>
      <a href="/api/auth/login" className='rounded-full ml-[80px] p-5 border-2 mt-10 border-white  hover:bg-white hover:text-[#E51A4C] text-white cursor-pointer   ' >Login</a>
    </div>

  ) 
}

export default InputBox;