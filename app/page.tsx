'use client'

import { FormEvent, useRef, useState } from "react";


export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submited, setSubmited] = useState(false);
  const [link, setLink] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { 'name': name, 'email': email };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_CREATE_LINK}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Request was successful
        console.log('Form data submitted successfully');
        setSubmited(true);
        const res = await response.json();
        setLink(res.link);
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}cardlink/${res.link}`);
      } else {
        // Handle errors here
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('An error occurred while submitting form data', error);
    }

  }

  return (
    <main className=" h-screen flex flex-col items-center justify-center bg-black">
      <p className=" text-rose-700 text-center text-xl font-bold px-4 pb-10 sm:pb-32 sm:text-5xl">
        Valentine&ampos;s day proposal card for lonely & desparate
      </p>
      <div className=" flex flex-col items-center justify-center  h-1/2 w-10/12 lg:w-1/3 md:w-8/12 sm:w-1/3 bg-rose-700 rounded-md">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">

          <p className=" text-black font-extrabold text-xl sm:text-2xl pb-3">
            His/Her name
          </p>
          <input
            id="name"
            name="name"
            type="text"
            required
            className=" rounded-md
                   sm:w-1/2 px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="His/Her name"
            onChange={(event) => setName(event.target.value)}
          />

          <p className=" text-black font-extrabold text-xl px-2 text-center sm:text-2xl pt-8 pb-3">
            Your email to let you know what he/she said
          </p>
          <input
            id="email"
            name="email"
            type="email"
            required
            className=" rounded-md
                  sm:w-1/2 px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Your Email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className=" pt-6 pb-6">
            <button
              type="submit"
              className="flex flex-row items-center justify-center  w-52 h-10 rounded bg-black px-6 pb-2 pt-2.5 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Create Link
            </button>
          </div>
          {submited &&
            <div className=" flex flex-row space-x-20 w-96 h-10 bg-rose-300 rounded">
              <p className="pl-4 pt-2 mr-2">{`cardlink/${link}`}</p>
              <p className=" text-green-400 bg-black text-sm rounded-md h-5/6 font-semibold ml-8 px-2  py-1.5 mt-1">Copied</p>
            </div>}
        </form>
      </div>

    </main>
  );
}
