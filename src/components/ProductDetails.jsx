import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from './Container'
import { FaCartPlus, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { CiHeart, CiStar } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishlist } from './slice/productSlice'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  let productId = useParams()

  let [singleProduct, setSingleProduct] = useState([])
  let getProductId = ()=>{
    axios.get(`https://fakestoreapi.com/products/${productId.id}`).then((response)=>{
      setSingleProduct(response.data)
    })
  }
  useEffect(()=>{
    getProductId()
  },[productId])

  let clientRatting = Array.from({length:5}, (_, index)=>{
    let number = index + 0.5
    return (
      singleProduct?.rating?.rate > index + 1 ? <FaStar className='text-[gold]' /> : singleProduct?.rating?.rate > number ? <FaStarHalfAlt className='text-[gold]' /> : <CiStar /> 
    )
  })

  let discount = singleProduct.price - 6

  let dispatch = useDispatch()
  let navigate = useNavigate()

  let handleCart = (item)=>{
    dispatch(addToCart({...item, qun: 1}))
    toast.success("Add to Cart Successfully");
    setTimeout(() => {
      navigate("/cart")
    }, 1000);
  }

  let wishlist = useSelector((state)=>state.product.wishlistItem)

  let handleWish = (item) => {
  const alreadyExist = wishlist.find((wishIte) => wishIte.id === item.id)

  if (alreadyExist) {
    toast.warning("Already in Wishlist!")
  } else {
    dispatch(addToWishlist(item))
    toast.success("Added to Wishlist Successfully!")
  }
}



  return (
    <section className='py-16'>
      <Container>
        <div className='grid grid-cols-2 items-center gap-x-8'>
          <div className=''>
            <img src={singleProduct.image} alt="" className=' w-full mx-auto bg-gray-300 py-8 px-16 rounded-2xl' />
          </div>
          <div className=''>
            <h2 className='text-[36px] text-indigo-900 font-bold font-jose pb-2'>{singleProduct.title}</h2>
            <div className='pb-8'>
              <div className='flex gap-4 items-center pb-4'>
                <div className='flex'>
                  {clientRatting}
                </div>
                <div className=''>
                  <p className='text-[#767676] text-[16px]'>{singleProduct?.rating?.count} Review</p>
                </div>
              </div>
              <div className=''>
                <div className='flex gap-x-6 items-center pb-4'>
                  <p className='text-[#262626] font-jose font-bold text-[18px]'>${discount.toFixed(2)}</p>
                  <p className='text-[#d32530] font-bold font-jose line-through'>${singleProduct.price}</p>
                </div>
                <p className='text-[#262626] font-dms font-normal text-[16px]'>{singleProduct.description}</p>
                <div className='flex gap-x-2 sm:gap-x-6 pt-4'>
                  <div className='w-40 py-4'>
                    <div className='flex justify-between items-center cursor-pointer group border-2 border-[#0000001a] px-4 sm:px-6 py-1 rounded-[5px] hover:border-violet-500 transition-all duration-300 ease-in-out'>
                      <p className='text-[#151875] text-[14px] sm:text-[16px] font-medium font-josefin group-hover:text-violet-500 transition-all duration-300 ease-in-out' onClick={()=>handleCart(singleProduct)}>Add To cart</p>
                      <FaCartPlus className='text-[#151875] group-hover:text-violet-500 transition-all duration-300 ease-in-out' />
                    </div>
                  </div>
                  <div className='w-50 py-4' onClick={()=>handleWish(singleProduct)}>
                    <div className='flex justify-between items-center cursor-pointer group border-2 border-[#0000001a] px-4 sm:px-6 py-1 rounded-[5px] hover:border-violet-400 transition-all duration-300 ease-in-out'>
                      <p className='text-[#151875] text-[14px] sm:text-[16px] font-medium font-josefin group-hover:text-violet-500 transition-all duration-300 ease-in-out'>Add To Wishlist</p>
                      <CiHeart className='group-hover:text-violet-500 transition-all duration-300 ease-in-out text-[22px]' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProductDetails