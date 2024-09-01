'use client'
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { Button, Link } from "@nextui-org/react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setData(token)
    if (data) {
      localStorage.removeItem('token')
      router.replace("/pages/login")
    }
    router.replace("/pages/login") 
    }, [router,data]);
  return(
      <>
        {/* <Button as={Link} href="/pages/login">Tes</Button> */}
      </> 
  )
}
