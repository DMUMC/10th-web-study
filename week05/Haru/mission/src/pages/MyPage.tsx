import React, { useEffect, useState } from 'react'
import type { ResponseMyInfoDto } from '../types/auth'
import { getMyInfo } from '../apis/auth'

const MyPage = () => {

    const [data, setData]=useState([]);

    useEffect(()=>{
        const getData = async () =>{
            const response:ResponseMyInfoDto = await getMyInfo();
            console.log(response);
            
        }

        getData();
    },[])
  return (
    <div>MyPage</div>
  )
}

export default MyPage