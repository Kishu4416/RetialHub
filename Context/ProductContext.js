import {createContext, useEffect, useState} from 'react';

export const Context =createContext(null);

const ProductContext = ({children})=>{

    const [products, setproduct]=useState([]);
    const [loading,setloading]=useState(false);
  
    const getApiData = async () => {
        const url = "http://192.168.1.96:5000/products";
        let result = await fetch(url);
        result = await result.json();
        if(result){
            setloading(false);
            setproduct(result);
        }
      };
    
      useEffect(() => {
        setloading(true)
        getApiData();
      }, []);
   
    
return(
    <Context.Provider
     value={{products,loading}}>
        {children}
    </Context.Provider>
)
}

export default ProductContext;