import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

let apiData = createContext()
const ContextApi = ({children}) => {

  let [info, setInfo] = useState([])
  let getData = ()=>{
    axios.get("https://fakestoreapi.com/products").then((response)=>{
      setInfo(response.data)
    })
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div>
      <apiData.Provider value={info}>{children}</apiData.Provider>
    </div>
  )
}

export {ContextApi, apiData}