import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { db, storage } from "../firebase";
import {useRef, useState, useEffect} from 'react'

function CurrencyPicker() {

    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const currencyRef = useRef(null);


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
    })

    

  }
  
  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

    return (
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
               className=' p-3 glass-input'
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
    )
}

export default CurrencyPicker
