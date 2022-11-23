import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        storeProduct: (state, action) => {
            state.value = action.payload
        },
        changeTargetProduct: (state, action) => {
            state.value[action.payload.index] = { ...state.value[action.payload.index], rating: action.payload.arry }
        }

    }
})
export const { storeProduct, changeRating, changeTargetProduct } = productSlice.actions
export const selectProducts = state => state.product.value
export default productSlice.reducer
