import styles from '../styles/Header.module.css'
import {NavLink} from "react-router-dom";

const Header = () => {
    return <header className={styles.header}>
        <span className={styles.description}> FREE UKRAINIAN SHIPPING FOR ORDER OVER $80</span>
        <div style={{fontSize: '36px', fontWeight: 'bold', marginTop:'20px'}}>gothic shoes</div>
        <ul className={styles.linksWrapper}>
            <li>
                <div className={styles.link}><NavLink to={'/newin'}>NEW IN</NavLink></div>
            </li>
            <li>
                <div className={styles.link}><NavLink to={'/login'}>SIGN IN</NavLink></div>
            </li>
            <li>
                <div className={styles.link}><NavLink to={'/bag'}>BAG</NavLink></div>
            </li>
        </ul>
    </header>
}

export default Header

