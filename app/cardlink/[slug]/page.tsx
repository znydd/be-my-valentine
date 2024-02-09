'use client'

import { useEffect, useState } from "react"


export default function Page({ params }: { params: { slug: string } }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/cardlink/${params.slug}`);
    
            if (response.ok) {
              const data = await response.json();
              setName(data[0].name);
              setEmail(data[0].email)
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

    return (
    <div>My Post: {name}</div>
        

    )}