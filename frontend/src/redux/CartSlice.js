import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const items = action.payload;
            const existingItems = state.cartItems.find((x) => x._id === items._id)

            if (existingItems) {
                state.cartItems = state.cartItems.map((x) => x._id === items._id ? items : x)
            } else{
                state.cartItems = [...state.cartItems, items]
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, action)=>{
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((x)=> x._id !== itemId)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        clearCart: (state , action)=>{
            state.cartItems=[]
            localStorage.removeItem('cartItems')
        }
    }
})

export const {addToCart, removeFromCart,clearCart}= cartSlice.actions

export default cartSlice.reducer