import axios from "axios";
import { useState, useEffect } from "react";

const useCustomFetch = <T>(url: string) =>{
    const [data,setData]=useState<T|null>(null);
   const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    const fetchData  = async () => {
        setIsPending(true);
        setIsError(false);
        try {
            const response = await axios.get<T>(
                `https://api.themoviedb.org/3${url}`,
                {
                    headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                }
            );
            setData(response.data);
        } catch (err) {
           setIsError(true);
           console.error(err);
        } finally {
            setIsPending(false);
        }
    } ;

    if(url){
        fetchData();
    }
  }, [url]);
  return { data, isPending, isError }
}

export default useCustomFetch;