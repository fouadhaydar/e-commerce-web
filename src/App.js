import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Products from './pages/Products'
import { Navbar } from './component';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import { collection, getDocs } from "firebase/firestore"
import db from './component/firebase/firebase';
import { storeProduct } from './app/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Footer from './component/Footer';
import Detail from './pages/Detail';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './component/firebase/firebase';
import { selectUser, userData } from './app/userSlice'
import Favorite from './pages/Favorite';
import Cart from './component/Cart';
import useFetecheData from './component/useFetecheData';
import NotFound from './component/NotFound';



function App() {
  const dispatch = useDispatch()
  const colRef = (collection(db, 'products'))
  const data = useSelector(selectUser)
  // log in automatic
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(userData(user?.email))
    }
  })
  useFetecheData(data?.email)

  useEffect(() => {
    getDocs(colRef)
      .then(snapshot => {
        let products = []
        snapshot.docs.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id })
        })
        return products
      }).then((product) => {
        dispatch(storeProduct(product))
      })
      .catch(err => console.log(err.message))

  }, [])
  return (
    <>
      <div className='main'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
