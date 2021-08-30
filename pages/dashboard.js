import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import {useRef, useState, useEffect} from 'react'
import { db, storage } from "../firebase";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Post from "../components/Post";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Nav from '../components/Nav'
import { useUser } from '@auth0/nextjs-auth0';
import CurrencyPicker from '../components/CurrencyPicker'
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { HiSwitchHorizontal } from 'react-icons/hi';
import Head from 'next/head'
import router from 'next/router';

// withPageAuthRequired will pass the user as a prop
export default function Dashboard() {

  const descInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const contactRef = useRef(null);
  const linkedinRef = useRef(null)
  const typeSocialRef = useRef(null)
  const [imageToPost, setImageToPost] = useState(null);
  const filepickerRef = useRef(null);
  const { user, isLoading } = useUser();
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const currencyRef = useRef(0);


    // Calling the api whenever the dependency changes
useEffect(() => {
  Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
 .then((res) => {
    setInfo(res.data[from]);
  })
}, [from]);

// Calling the convert function whenever
// a user switches the currency
useEffect(() => {
  setOptions(Object.keys(info));
  convert();
}, [info])
  
// Function to convert the currency
function convert() {
  var rate = info[to];
  setOutput(input * rate);
}

const addCurrency = (e) => {

  e.preventDefault();

  if (!currencyRef.current.value) return;

  db.collection("posts").add({
      price: currencyRef.current.value,
  })

  

}

// Function to switch between two currency
function flip() {
  var temp = from;
  setFrom(to);
  setTo(temp);
}


  if (isLoading) return <div>Loading...</div>;
  


  const sendPost = (e) => {
    e.preventDefault();

    if (!descInputRef.current.value) return;
    if (!nameInputRef.current.value) return;
    if (!descInputRef.current.value) return;
    if (!contactRef.current.value) return;
    if (!linkedinRef.current.value) return;
    if (!currencyRef.current.value) return;

    db.collection("posts")
      .add({
        name: nameInputRef.current.value,
        title: titleInputRef.current.value,
        desc: descInputRef.current.value,
        contact: contactRef.current.value,
        linkedin: linkedinRef.current.value,
        typeSocial: typeSocialRef.current.value,
        price: currencyRef.current.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              // ERROR function
              console.log(error);
            },
            () => {
              // COMPLETE function
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

      nameInputRef.current.value = ''
      titleInputRef.current.value = ''
      descInputRef.current.value = ''
      contactRef.current.value = ''
      linkedinRef.current.value = ''
      currencyRef.current.value = ''
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };
  

  if (user) {
    return (
      <div className='text-white w-screen h-screen' >
        <Head>
          <title>{`${user.name}'s Dashboard`}</title>
        </Head>
        <h1 className="text-center text-white font-bold text-2xl subtext-font mt-5" >Your Dashboard</h1>
        <Nav
        textvalue='BIZNET'
        link='network'
        />
        <div className=" mt-5" >
        <h1 className='text-center font-bold text-5xl'>Make a Business Post</h1>
        <div className='glassmorphic' >
          <h1>Business Name: Name you want it to be posted with</h1>
          <br/>
          <input placeholder='Name' ref={nameInputRef} className='glass-input outline-none p-2' required ></input>
          <h1>Product Title: Title of Your Product</h1>
          <br/>
          <input placeholder='Title' ref={titleInputRef} className='glass-input outline-none p-2' required></input>
          <h1>Product Description: Tell your customers why, your products are special.</h1>
          <br/>
          <input placeholder='Description' ref={descInputRef} className='glass-input outline-none p-2 h-52 w-full' required></input>
          <h1>Contact Number(Add country code too)</h1>
          <br/>
          <input placeholder='Contact Number' ref={contactRef} className='glass-input outline-none p-2 mr-4' ></input>
          <h1>Add a Social or Website</h1>
          <br/>
          <input placeholder='Social Link or Website' ref={linkedinRef} className='glass-input outline-none p-2' required></input>
          <input placeholder='What is the social or is it a website' ref={typeSocialRef} className='glass-input outline-none p-2' required></input>
          <h1>Mention your price(users can convert it to their currency.). It will be displayed in Dollars by default.</h1>
          <br/>
          <div>
        <div className="heading">
          <h1>Currency converter</h1>
        </div>
        <div className="container">
          <div className="left">
            <h3>Amount</h3>
            <input type="number" 
               placeholder="Enter the amount" 
               onChange={(e) => setInput(e.target.value)}
               className=' p-3 glass-input outline-none'
               ref={currencyRef}
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
        <div className="result">
          <button onClick={()=>{convert()}}>Convert</button>
          <h2>Converted Amount:</h2>
          <p className='mb-5' >{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>
          <hr></hr>
  
  
          </div>
        </div>
  
          <div className="flex p-3">
            <h1 className='mr-10' >Upload Photo for your product</h1>
              <div
              onClick={() => filepickerRef.current.click()}
              className="inputIcon"
              >
              <CameraIcon className="h-7 text-white" />
              <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
              <input
                  onChange={addImageToPost}
                  ref={filepickerRef}
                  type="file"
                  hidden
                  accept='image/jpeg image/png' 
              />
                      {imageToPost && (
              <div
                  onClick={removeImage}
                  className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
              >
                  <img className="h-10 object-contain " src={imageToPost} alt="" />
                  <p className="text-xs text-white text-center">Remove</p>
              </div>
              )}
              </div>
          </div>
          <a onClick={sendPost} className='rounded-full border-2 mt-10 border-white p-2 hover:bg-white hover:text-[#E51A4C] text-white cursor-pointer w-20  '>Submit</a>
        </div>
        </div>
      </div>
  
    );
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
