import React from 'react'
import Container from './Container'
import shopex1 from '../assets/shopex1.png'
import shopex2 from '../assets/shopex2.png'
import shopex3 from '../assets/shopex3.png'
import shopex4 from '../assets/shopex4.png'

const Shopex = () => {
  return (
    <section className='bg-[#d64f4f0c] py-12'>
      <Container>
        <div>
          <div className='pb-6'>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center pb-4">Unique Benefits from Electro Selling</h2>
            <p className="text-gray-600 max-w-lg mx-auto text-center text-[14px] md:text-[16px]">
              We provide free delivery, round-the-clock support, top quality products, and guaranteed cashback for your complete satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 text-center shadow">
              <div className="flex justify-center pt-8 pb-4">
                <img src={shopex1} alt="" />
              </div>
              <div>
                <h4 className="text-indigo-950 text-[24px] lg:text-[24px] font-jose font-bold">Free Delivery</h4>
                <p className="text-[#0000008b] text-sm font-jose font-semibold px-4 pt-2 pb-8 max-w-sm mx-auto">We ensure fast, reliable, and hassle-free free delivery on eligible orders, bringing your products right to your doorstep with care.</p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 text-center shadow">
              <div className="flex justify-center pt-8 pb-4">
                <img src={shopex2} alt="" />
              </div>
              <div>
                <h4 className="text-indigo-950 text-2xl font-jose font-bold">100% Cashback</h4>
                <p className="text-[#0000008b] text-sm font-jose font-semibold px-4 pt-2 pb-8 max-w-sm mx-auto">We offer a 100% cash-back guarantee if you’re not satisfied — no questions asked, ensuring a completely risk-free shopping experience.</p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 text-center shadow">
              <div className="flex justify-center pt-8 pb-4">
                <img src={shopex3} alt="" />
              </div>
              <div>
                <h4 className="text-indigo-950 text-2xl font-jose font-bold">Quality Products</h4>
                <p className="text-[#0000008b] text-sm font-jose font-semibold px-4 pt-2 pb-8 max-w-sm mx-auto">We guarantee premium-quality products through rigorous inspections, durable materials, and responsive customer care on every purchase for complete satisfaction always.</p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 text-center shadow">
              <div className="flex justify-center pt-8 pb-4">
                <img src={shopex4} alt="" />
              </div>
              <div>
                <h4 className="text-indigo-950 text-2xl font-jose font-bold">24/7 Support</h4>
                <p className="text-[#0000008b] text-sm font-jose font-semibold px-4 pt-2 pb-8 max-w-sm mx-auto">Our dedicated support team is available 24/7, ready to assist you with quick responses and reliable solutions whenever you need help.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Shopex