'use client'

import { useEffect, useState } from "react"


export default function Page({ params }: { params: { slug: string } }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noCount, setNoCount] = useState(0);


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




        const handleCount = () => {
          setNoCount(prev => prev + 1)
          if(noCount >= 3){
            setNoCount(0)
          }
          console.log(noCount)
        }

  return (
    <div className=" h-screen flex flex-col items-center justify-center bg-black">
      <div className=" flex flex-col items-center h-5/6 w-1/2 bg-rose-700 rounded-lg text-center pt-24">
        <p className=" text-yellow-50 font-bold text-4xl ">{`Dear ${name}, will you be my valentine?`}</p>

        <div className="flex flex-row space-x-2 items-center justify-center h-4/5 w-full">
          {(noCount == 0) && <button className={`w-40 h-14 bg-[#faecbc] rounded-sm`}>Yes</button> }
          {noCount == 1 && <button className={`w-52 h-16 bg-[#faecbc] rounded-sm`}>Yes</button> }
          {noCount == 2 && <button className={`w-56 h-20 bg-[#faecbc] rounded-sm`}>Yes</button> }
          {noCount == 3 && <button className={`w-60 h-24 bg-[#faecbc] rounded-sm`}>Yes</button> }

          {/* <button className={`w-${width[0]} h-${width[1]} bg-[#faecbc] rounded-sm`}>Yes</button> */}
          <button className="w-28 h-14 bg-black text-white rounded-sm" onClick={handleCount}>No</button>
        </div>

      </div>
    </div>
  )
}