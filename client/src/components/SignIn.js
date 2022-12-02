import styles from '../styles/Login.module.css'
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../redux/Reducer";

const SignIn = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.reducer.userData)

    const signUpRequest = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/signup/${e.target[0].value}/${e.target[1].value}/${e.target[2].value}/${e.target[3].value}/${e.target[4].value}/${e.target[5].value}/${e.target[6].value}`)
            .then(response => {
                if (response.data[0] === '200') {
                    axios.get(`http://localhost:8000/login/${e.target[2].value}/${e.target[1].value}`, {
                        // headers: {
                        //     'Access-Control-Allow-Origin': '*',
                        //     'Content-Type': 'application/json; charset=utf-8',
                        // }
                    }).then(response => {
                        console.log(response.data)
                        if (response.status === 200 && typeof response.data === "object")
                            dispatch(setUserData(response.data[0]))
                    })
                    // dispatch(setUserData(e.target))
                }
            })
    }
    // if (userData) {
    // return <Navigate to'/'/>
    // }

    return <div className={styles.loginPage}>
        <div className={styles.form}>
            <form className={styles.registerForm} onSubmit={signUpRequest}>
                <input type="text" placeholder="full name" id="fullName" name="fullName"/>
                <input type="password" placeholder="password" id="password" name="password"/>
                <input type="text" placeholder="email address" id="email" name="email"/>

                <input type="phone" placeholder="phone number" className="form-control" id="phone" name="phone"/>

                <input type="text" placeholder="city" id="city" name="city"/>
                <input type="text" placeholder="country" id="country" name="country"/>
                <input type="text" placeholder="zip code" id="zipcode" name="zipcode"/>
                Free delivery on all orders over $100 <br/>
                Amazing discounts<br/>
                Up to the minute info on the hottest styles<br/>
                Latest news<br/>
                <button>create</button>
                <p>Already have an account? <NavLink to={'/login'}>Sign In</NavLink></p>
            </form>

        </div>
    </div>
}
export default SignIn