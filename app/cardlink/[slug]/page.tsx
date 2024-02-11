'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react"


export default function Page({ params }: { params: { slug: string } }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noCount, setNoCount] = useState(0);
  const [yes, setYes] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cardlink/${params.slug}`);

        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setEmail(data.email)
          console.log(data)
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('An error occurred while fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleYes = () => {
    sendEmail("It's a YES love.");
  }


  const sendEmail = async (decision: string) => {
  
    console.log(decision)
    let data = {
      service_id: process.env.NEXT_PUBLIC_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_USER_ID,
      template_params: {
          from_name: name,
          to_email: email,
          message: decision
      }

    };
    try {
      const resp = axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      console.log(resp)
    } catch (error) {
      console.log(error);
      
    }

  }


  const handleCount = () => {
    setNoCount(prev => prev + 1)
    if (noCount == 5) {
      sendEmail("Sorry, It's a No.");
    }
    if (noCount >= 6) {
      setNoCount(0);
    }
    if(noCount)
    console.log(noCount)
  }

  return (<>
    {yes ?
    <div className=" h-screen flex flex-col items-center justify-center bg-black">
      <p className=" text-yellow-50 font-bold text-4xl pb-4">{`Dear ${name},You are the best🥰😘`}</p>
      <Image
        src="/happy.gif"
        width={500}
        height={500}
        alt="happi"
      />
    </div>:

    <div className=" h-screen flex flex-col items-center justify-center bg-black">

      {noCount == 6 ?

        <div>
          <p className=" text-yellow-50 font-bold text-4xl pb-4">{`Dear ${name}, God may blast you😡`}</p>
          <Image
            src="/cry.jpg"
            width={500}
            height={500}
            alt="cry"
          /></div> :


        <div className=" flex flex-col items-center h-5/6 w-2/3 bg-rose-700 rounded-lg text-center pt-24">
          <p className=" text-yellow-50 font-bold text-4xl pb-4">{`Dear ${name}, will you be my valentine?😍`}</p>
          {noCount == 1 && <p className=" text-black font-bold text-4xl ">You sure about that?😟</p>}
          {noCount == 2 && <p className=" text-black font-bold text-4xl ">Really sure?😨</p>}
          {noCount == 3 && <p className=" text-black font-bold text-4xl ">Don't do this to me🥺</p>}
          {noCount == 4 && <p className=" text-black font-bold text-4xl ">I am gonna cry...😖</p>}
          {noCount == 5 && <p className=" text-black font-bold text-4xl ">You're breaking my heart😭</p>}
          <div className="flex flex-row space-x-2 items-center justify-center h-4/5 w-full">

            {(noCount == 0) && <button onClick={handleYes} className={`w-40 h-16 text-xl bg-[#faecbc] rounded-md`}>Yes</button>}
            {noCount == 1 && <button onClick={handleYes} className={`w-52 h-20 text-2xl bg-[#faecbc] rounded-md`}>Yes</button>}
            {noCount == 2 && <button onClick={handleYes} className={`w-60 h-24 text-3xl bg-[#faecbc] rounded-md`}>Yes</button>}
            {noCount == 3 && <button onClick={handleYes} className={`w-72 h-32 text-4xl bg-[#faecbc] rounded-md`}>Yes</button>}
            {noCount == 4 && <button onClick={handleYes} className={`w-96 h-40 text-5xl bg-[#faecbc] rounded-md`}>Yes</button>}
            {noCount == 5 && <button onClick={handleYes} className={`w-[30rem] h-48 text-6xl bg-[#faecbc] rounded-md`}>Yes</button>}

            <button className="w-36 h-14 bg-black text-white rounded-md" onClick={handleCount}>No</button>
          </div>
        </div>}
    </div>
}
  </>
  )
}