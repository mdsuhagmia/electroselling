import React from 'react'
import Container from '../components/Container'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Process = () => {

  let rdata = useSelector((state)=>state.product.cartItem)

  let {totalPrice, totalQunatity} = rdata.reduce((item, index)=>{
    item.totalPrice += index.price * index.qun
    item.totalQunatity += index.qun
    return item ;
  },{totalPrice: 0, totalQunatity: 0})

  let navigate = useNavigate()
  let handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!e.target.checkValidity()) {
      e.target.reportValidity()
      return
    }
    toast.success('Your Order is Complete', {
      position: "top-center",
      autoClose: 7000,
      className: "custom-toast",
      bodyClassName: 'custom-toast-body',
    });
    navigate("/ordercomplete")
    window.scrollTo({top: 0})
  }

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <form className="space-y-5" onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-indigo-950 mb-6">Billing & Shipping</h2>
              <div className='pb-2'>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input required autoComplete='full-name' placeholder='Your full name' type="text" className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className='pb-2'>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input autoComplete='email' placeholder='example@domain.com' type="email" className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className='pb-2'>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input required autoComplete='tel' placeholder='01xxxxxxxxx' type="number" className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className='pb-2'>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input required autoComplete='street-address' placeholder='City' className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></input>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea required autoComplete='street-address' placeholder='Street, Area, Postal Code' rows="3" className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-indigo-950 mb-6">Order Summary</h2>
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 border-b">Item</th>
                    <th className="text-right px-4 py-3 border-b">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border-b text-gray-700">Subtotal</td>
                    <td className="px-4 py-3 border-b text-right text-gray-800 font-semibold">${totalPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-b text-gray-700">Quantity</td>
                    <td className="px-4 py-3 border-b text-right text-gray-800 font-semibold">{totalQunatity}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-b text-gray-700">Shipping</td>
                    <td className="px-4 py-3 border-b text-right text-gray-800 font-semibold">${15}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-b text-indigo-950 font-bold">Total</td>
                    <td className="px-4 py-3 border-b text-right text-indigo-950 font-bold">${(totalPrice + 15).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
                <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Credit/Debit Card</option>
                  <option>Cash on Delivery</option>
                  <option>Mobile Banking (bKash/Nagad)</option>
                </select>
              </div>
              <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-500 transition hover:scale-102 duration-500 ease-in-out cursor-pointer">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  )
}

export default Process