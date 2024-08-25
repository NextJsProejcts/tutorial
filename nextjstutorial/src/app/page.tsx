'use client';
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const apiUrl = process.env.NODE_ENV;
console.log('apiUrl :',process.env);

useEffect(()=>{
console.log('apiUrl :',apiUrl);

},[apiUrl])
  return (
    <>{apiUrl}</>
  );
}
