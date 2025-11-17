import React, { useContext, useEffect, useState } from 'react'
import Container from './Container'
import { apiData } from './ContextApi'
import { Link, useNavigate } from 'react-router-dom'

const ShopTopCategory = () => {

  let data = useContext(apiData)
  let [shopCategory, setShopCategory] = useState([])
  let [shopCategory1, setShopCategory1] = useState([])
  let [shopCategory2, setShopCategory2] = useState([])
  let [shopCategory3, setShopCategory3] = useState([])

  let [sh, setSh] = useState([])

  useEffect(()=>{

    setSh([...new Set(data.map((item)=>item.category))])
    
    let cateSingle = data.filter((item)=>item.category === "men's clothing")
    setShopCategory(cateSingle)

    let cateSingle1 = data.filter((item)=>item.category === "women's clothing")
    let exclude1 = [1, 2]
    let cateFil1 = cateSingle1.filter((_,index)=>!exclude1.includes(index))
    setShopCategory1(cateFil1)

    let cateSingle2 = data.filter((item)=>item.category === "jewelery")
    setShopCategory2(cateSingle2)

    let cateSingle3 = data.filter((item)=>item.category === "electronics")
    let excluse = [1, 4, 6,]
    let caeFil = cateSingle3.filter((_, index)=> !excluse.includes(index))
    setShopCategory3(caeFil)

  },[data])
   
  let navigate = useNavigate()
  let handleCate = (citem)=>{
    let cateFill = data.filter((item)=>item.category === citem)
    navigate('/products', { state: { cateData: cateFill, category: citem } })
  }

  return (
    <section className='py-12 bg-gray-100'>
      <Container>
        <h2 className='text-4xl text-indigo-950 font-bold font-jose pb-6 text-center'>Shop By Top Category</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-6'>
          <div className='bg-indigo-400 py-6 px-6 rounded-[5px]'>
            <h2 className='text-2xl text-white font-bold font-jose pb-6 text-center'>Shop Electronics</h2>
            <div className='grid grid-cols-2 gap-x-2'>
              {shopCategory3.map((item) => (
                <div className='bg-white rounded-[5px] mb-2 shadow'>
                  <div className='bg-gray-200 rounded-t-[5px] flex justify-center'>
                    <Link to={`/products/${item.id}`}>
                      <img src={item.image} alt="" className='h-40 py-4 px-4' />
                    </Link>
                  </div>
                  <div className='px-2 py-4'>
                    <Link to={`/products/${item.id}`}>
                      <h4 className='text-[14px] font-semibold font-jose text-neutral-950 hover:underline'>{item.title}</h4>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div onClick={() => handleCate("electronics")}>
              <h2 className='text-xl font-semibold font-jose text-white cursor-pointer hover:text-gray-300 pt-2 inline-block'>See More</h2>
            </div>
          </div>
          <div className='bg-indigo-400 py-6 px-6 rounded-[5px]'>
            <h2 className='text-2xl text-white font-bold font-jose pb-6 text-center'>Shop Jewelery</h2>
            <div className='grid grid-cols-2 gap-x-2'>
              {shopCategory2.map((item) => (
                <div className='bg-white rounded-[5px] mb-2 shadow'>
                  <div className='bg-gray-200 rounded-t-[5px] flex justify-center'>
                    <Link to={`/products/${item.id}`}>
                      <img src={item.image} alt="" className='h-40 py-4 px-4' />
                    </Link>
                  </div>
                  <div className='px-2 py-4'>
                    <Link to={`/products/${item.id}`}>
                      <h4 className='text-[14px] font-semibold font-jose text-neutral-950 hover:underline'>{item.title}</h4>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div onClick={() => handleCate("jewelery")}>
              <h2 className='text-xl font-semibold font-jose text-white cursor-pointer hover:text-gray-300 pt-2 inline-block'>See More</h2>
            </div>
          </div>
          <div className='bg-indigo-400 py-6 px-6 rounded-[5px] mt-6'>
            <h2 className='text-2xl text-white font-bold font-jose pb-6 text-center'>Shop Women's Clothing</h2>
            <div className='grid grid-cols-2 gap-x-2'>
              {shopCategory1.map((item) => (
                <div className='bg-white rounded-[5px] mb-2 shadow'>
                  <div className='bg-gray-200 rounded-t-[5px] flex justify-center'>
                    <Link to={`/products/${item.id}`}>
                      <img src={item.image} alt="" className='h-40 py-4 px-4' />
                    </Link>
                  </div>
                  <div className='px-2 py-4'>
                    <Link to={`/products/${item.id}`}>
                      <h4 className='text-[14px] font-semibold font-jose text-neutral-950 hover:underline'>{item.title}</h4>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div onClick={() => handleCate("women's clothing")}>
              <h2 className='text-xl font-semibold font-jose text-white cursor-pointer hover:text-gray-300 pt-2 inline-block'>See More</h2>
            </div>
          </div>
          <div className='bg-indigo-400 py-6 px-6 rounded-[5px] mt-6'>
            <h2 className='text-2xl text-white font-bold font-jose pb-6 text-center'>Shop Men's Clothing</h2>
            <div className='grid grid-cols-2 gap-x-2'>
              {shopCategory.map((item) => (
                <div className='bg-white rounded-[5px] mb-2 shadow'>
                  <div className='bg-gray-200 rounded-t-[5px] flex justify-center'>
                    <Link to={`/products/${item.id}`}>
                      <img src={item.image} alt="" className='h-40 py-4 px-4' />
                    </Link>
                  </div>
                  <div className='px-2 py-4'>
                    <Link to={`/products/${item.id}`}>
                      <h4 className='text-[14px] font-semibold font-jose text-neutral-950 hover:underline'>{item.title}</h4>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div onClick={() => handleCate("men's clothing")}>
              <h2 className='text-xl font-semibold font-jose text-white cursor-pointer hover:text-gray-300 pt-2 inline-block'>See More</h2>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ShopTopCategory