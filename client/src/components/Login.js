import styles from '../styles/Login.module.css'
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setUserData} from "../redux/Reducer";

const Login = () => {
    const dispatch = useDispatch()

     const loginRequest = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:8000/login/${e.target[0].value}/${e.target[1].value}`, {
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Content-Type': 'application/json; charset=utf-8',
            // }
        }).then(response => {
            if (response.status === 200 && typeof response.data === "object")
                dispatch(setUserData(response.data[0]))
        })

    }

    return <div className={styles.loginPage}>
        <div className={styles.form}>
            <form className={styles.loginForm} onSubmit={loginRequest}>
                <input type="text" placeholder="email" id="email" name="email"/>
                <input type="password" placeholder="password" id="password" name="password"/>
                <button>login</button>
                <p>Don't have an account? <NavLink to={'/signin'}>Create an account</NavLink></p>
            </form>

        </div>
    </div>
}

export default Login