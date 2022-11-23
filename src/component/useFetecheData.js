import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import db from "./firebase/firebase";
import { setFavorite, setArry, userId } from '../app/userSlice'
import { useEffect } from "react";


function useFetecheData(email) {
    const dispatch = useDispatch();

    useEffect(() => {
        let myDoc;
        // get all the data of the user loged in    
        const secondRef = collection(db, 'users');
        if (email) {
            getDocs(secondRef).then((snapshot) => {
                myDoc = snapshot.docs.find((doc) => email === doc.data().email)
                return myDoc
            }).then((myDoc) => {
                // store the id of user in redux    
                dispatch(userId(myDoc.data().id))
                // store the favorite produts of the user in redux
                dispatch(setFavorite(myDoc.data().favorite))
                // store the rating in redux
                if (myDoc.data().userRating) {
                    dispatch(setArry(myDoc.data().userRating))
                }
            })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [email])
}
export default useFetecheData