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

  // let [relatedProducts, setRelatedProducts] = useState([])
  // let categoryCus = singleProduct.category
  // let getRelatedProducts = ()=>{
  //   if(categoryCus){
  //     axios.get(`https://fakestoreapi.com/products/category/${singleProduct.category}`).then((res)=>{
  //       let filtered = res.data.filter(item => item.id !== singleProduct.id);
  //       setRelatedProducts(filtered);
  //     })
  //   }
  // }
  // useEffect(()=>{
  //   getRelatedProducts()
  // },[relatedProducts])

  // console.log(relatedProducts)

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
    <section className='py-16 bg-gray-50'>
      <Container>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8'>
            <div className=''>
              <img src={singleProduct.image} alt="" className=' w-full mx-auto bg-gray-300 py-8 px-16 rounded-2xl' />
            </div>
            <div className=''>
              <h2 className='text-[20px] sm:text-[36px] md:text-[30px] lg:text-[36px] pt-4 md:pt-0 text-indigo-900 font-bold font-jose pb-2'>{singleProduct.title}</h2>
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
                  <div className='flex gap-x-2 sm:gap-x-6 md:gap-x-2 lg:gap-x-6 pt-6'>
                    <div className=''>
                      <div className='flex justify-between items-center cursor-pointer gap-x-4 transition-all duration-300 ease-in-out bg-orange-600 hover:bg-orange-500 px-4 sm:px-6 md:px-4 lg:px-6 py-2 rounded-[5px] text-white'>
                        <p className='text-[14px] sm:text-[16px] font-medium font-josefin' onClick={() => handleCart(singleProduct)}>Add To cart</p>
                        <FaCartPlus className='' />
                      </div>
                    </div>
                    <div className='' onClick={() => handleWish(singleProduct)}>
                      <div className='flex justify-between items-center cursor-pointer gap-x-4 transition-all duration-300 ease-in-out bg-blue-700 hover:bg-blue-800 px-4 sm:px-6 md:px-4 lg:px-6 py-2 rounded-[5px] text-white'>
                        <p className='text-[14px] sm:text-[16px] font-medium font-josefin'>Add To Wishlist</p>
                        <CiHeart className='text-[22px]' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-bold font-jose text-orange-700 pt-12'>Related proudcts</h2>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProductDetails