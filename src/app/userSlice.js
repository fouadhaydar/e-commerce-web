import { createSlice } from "@reduxjs/toolkit";

// get the ids of product in local storage if exist
const data = localStorage.getItem('productkey')
if (data) {
    var initialValue = JSON.parse(data)
}

const initialState = {
    value: {
        userName: '',
        email: '',
        id: '',
        favorite: [],
        cart: initialValue ? initialValue : [],
        userRating: [],
        productPices: []
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // set the email of the user loged in
        userData: (state, action) => {
            state.value.email = action.payload
        },
        // store the id of the user feteched from fierstore
        userId: (state, action) => {
            state.value.id = action.payload
        },
        // store favorite products 
        setFavorite: (state, action) => {
            state.value.favorite = [...action.payload]
        },
        // add porduct to redux store and store it in localStorage
        addToCart: (state, action) => {
            state.value.cart = [...state.value.cart, action.payload]
            localStorage.setItem('productkey', JSON.stringify(state.value.cart))
        },
        // delete product from redux store and delete it from localStorage
        deleteProduct: (state, action) => {
            state.value.cart = state.value.cart.filter(product => product !== action.payload)
            localStorage.setItem('productkey', JSON.stringify(state.value.cart))
        },
        // store the rating of the user in redux
        storeRting: (state, action) => {
            let flag = false;
            state.value.userRating.forEach((item, index) => {
                if (item.productId === action.payload.productId) {
                    state.value.userRating[index] = action.payload
                    flag = true
                }
            }
            )
            if (!flag) {
                state.value.userRating = [...state.value.userRating, action.payload]
            }
        },
        // set the array of userRating
        setArry: (state, action) => {
            state.value.userRating = action.payload
        },
        // set product pices in redux
        setProductPices: (state, action) => {
            if (state.value.productPices.length > 0) {
                const oldVal = state.value.productPices.find(product => { return product.id === action.payload.id })
                if (!oldVal) {
                    state.value.productPices = [...state.value.productPices, action.payload]
                }
                else {
                    let a;
                    state.value.productPices.map((oldValue, index) => {
                        if (oldValue.id === action.payload.id) {
                            a = index
                        }
                    })
                    state.value.productPices[a] = action.payload
                }
            }
            else {
                state.value.productPices = [...state.value.productPices, action.payload]
            }
        },
        // empty fuction 
        setEmpty: (state, action) => {
            state.value.userName = ''
            state.value.email = ''
            state.value.id = ''
            state.value.favorite = []
            state.value.cart = []
            state.value.userRating = []
            state.value.productPices = []
        }
    }
})

// export all the functions in reducer
export const { userData, setFavorite, addToCart, deleteProduct, storeRting, userId, setArry, setEmpty, setProductPices } = userSlice.actions
// export the initial state
export const selectUser = state => state.user.value
// export the main slice (userSlice)
export default userSlice.reducer