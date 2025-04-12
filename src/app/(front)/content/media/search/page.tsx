"use client"

import { search } from '@/server/search';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


const SearchQueryPage: React.FC = () => {
      const searchParams = useSearchParams();
      const q = searchParams.get('q') || '';

      const [result, setResult] = useState('')
      

      const getResults = async (queryValue: string) => {

           const queryResult = await search(queryValue)
           if(queryResult?.success){
            console.log("Search query works!")
           }
           
            //  setResult(queryResult)
      }

      getResults(q);
      
      
      return (
     <>
     <p>Welcome to search querry</p>
     </>
      );
}

export default SearchQueryPage;