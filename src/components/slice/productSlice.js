import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'counter',
  initialState: {
    cartItem: localStorage.getItem("cartstore")  ? JSON.parse(localStorage.getItem("cartstore")) : [],
    wishlistItem: localStorage.getItem("wishStore") ? JSON.parse(localStorage.getItem("wishStore")) : [],
    user: null,
  },
  reducers: {
    addToCart: (state, action) => {
      let findProduct = state.cartItem.findIndex((item)=>item.id === action.payload.id)
      if(findProduct !== -1){
        state.cartItem[findProduct].qun += 1
        localStorage.setItem("cartstore", JSON.stringify(state.cartItem))
      }else{
        state.cartItem = [...state.cartItem, action.payload]
        localStorage.setItem("cartstore", JSON.stringify(state.cartItem))
      }
    },
    increment: (state, action) => {
      let item = state.cartItem.find(i => i.id === action.payload.id);
      if (item) {
        item.qun += 1;
        localStorage.setItem("cartstore", JSON.stringify(state.cartItem))
      }
    },
    decrement: (state, action) =>{
      let item = state.cartItem.find((dec)=>dec.id === action.payload.id)
      if(item && item.qun > 1){
        item.qun -= 1
        localStorage.setItem("cartstore", JSON.stringify(state.cartItem))
      }
    },
    productRemove: (state, action) => {
      state.cartItem.splice(action.payload, 1)
      localStorage.setItem("cartstore", JSON.stringify(state.cartItem))
    },
    productRemoveAll: (state)=>{
      state.cartItem = []
      localStorage.setItem("cartstore", JSON.stringify(state.cartItem))
    },
    addToWishlist: (state, action) => {
      let findWishProduct = state.wishlistItem.findIndex((item)=>item.id === action.payload.id)
      if(findWishProduct == -1){
        state.wishlistItem.push(action.payload)
        localStorage.setItem("wishStore", JSON.stringify(state.wishlistItem))
      }
    },
    removeWishlist: (state, action)=>{
      state.wishlistItem.splice(action.payload, 1)
      localStorage.setItem("wishStore", JSON.stringify(state.wishlistItem))
    },
    removeAllWishlist: (state)=>{
      state.wishlistItem = []
      localStorage.setItem("wishStore", JSON.stringify(state.wishlistItem))
    },

  },
})

export const { addToCart, increment, decrement, productRemove, productRemoveAll, addToWishlist, removeWishlist, removeAllWishlist } = productSlice.actions

export default productSlice.reducer