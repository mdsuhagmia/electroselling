import React from 'react'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { addToCart, removeAllWishlist, removeWishlist } from '../components/slice/productSlice'
import { BsFillCartXFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const WishList = () => {

  let wishData = useSelector((state)=>state.product.wishlistItem)
  let dispatch = useDispatch()

  let handleAllDelete = (item)=>{
    dispatch(removeAllWishlist(item))
  }

  let handleMoveCart = (item)=>{
    dispatch(removeWishlist(item))
    dispatch(addToCart({...item, qun: 1}))
    toast.success("Move to Cart Successfully");
  }

  return (
    <section className='pb-16'>
      <Container>
        <div className='relative'>
          {wishData.length > 0 && (
            <div className='flex items-center justify-center gap-x-2 py-16'>
              <FaHeart className='text-4xl text-violet-950' />
              <h2 className='text-center text-3xl font-jose font-extrabold text-violet-950'>Your Wishlist ({wishData.length})</h2>
            </div>
          )}
          {wishData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-indigo-950 font-bold text-lg">
                      <th className="px-6 py-4 w-[50%]">Product</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Delete</th>
                      <th className="px-6 py-4 w-[15%]">Move</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishData.map((item, index) => (
                      <tr key={item.id} className="border-t-2 border-[#0000001d] hover:bg-gray-50 transition">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
                          <tr>
                            <h2 className="font-semibold font-jose text-indigo-950">{item.title}</h2>
                            <h3 className="font-medium font-lat text-gray-600">{item.category}</h3>
                          </tr>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-semibold">${item.price}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={()=>dispatch(removeWishlist(index))}
                            className="text-red-500 hover:text-red-800 font-semibold cursor-pointer text-xl">
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          <button onClick={()=>handleMoveCart(item)} className='text-white bg-blue-500 px-2 py-2 rounded-[5px] cursor-pointer hover:bg-blue-400'>
                            Move to Cart
                          </button>
                        </td>
                        <div className='absolute top-16 right-0' onClick={() => handleAllDelete(item)}>
                          <h2 className='text-end text-[18px] font-jose font-bold text-white bg-red-500 px-4 py-2 rounded-[5px] inline-block cursor-pointer hover:bg-red-400'>Delete All</h2>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex items-center justify-center gap-2 pb-6">
                <h2 className="text-4xl font-bold font-jose text-indigo-950">Your WishList is Empty</h2>
                <BsFillCartXFill className="text-xl text-indigo-950" />
              </div>
              <Link
                to="/products"
                className="bg-indigo-950 text-white px-8 py-3 rounded font-semibold hover:bg-indigo-800 text-md transition">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default WishList