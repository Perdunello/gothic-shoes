import styles from '../styles/MainPage.module.css'
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setItemsData} from "../redux/Reducer";
import {useEffect} from "react";

const MainPage = () => {
    const dispatch = useDispatch()
    const itemsData = useSelector(state => state.reducer.itemsData)
    const getItems = () => {
        axios.get(`http://localhost:8000/getitems`, {
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Content-Type': 'application/json; charset=utf-8',
            // }
        }).then(response => {
            dispatch(setItemsData(response.data))
        })
    }
    useEffect(() => {
        getItems()
    }, [])
    return <div>
        <ul>
            {itemsData.map(item => {
                return <li className={styles.li} key={item[0]}>
                    <div className={styles.itemWrapper}>
                        <img src={`data:image/png;base64,${item[4]}`} height={'80%'} width={'auto'}
                             alt=""/>
                        <div className={styles.bottomItem}>
                            <div>{item[1]}</div>
                            <div>{item[3]}</div>
                        </div>
                        <NavLink to={`/item/${item[1]}`}>
                            <div className={styles.button}>
                                VIEW MORE
                            </div>
                        </NavLink>
                    </div>
                </li>
            })}
            {/*<NavLink to={'/item/verses_black'}>*/}
            {/*    <li className={styles.li}>*/}
            {/*        <div className={styles.itemWrapper}>*/}
            {/*            <img src="Циба.jpg" height={300} width={250} alt=""/>*/}
            {/*            <div className={styles.bottomItem}>*/}
            {/*                <div>VERSES BLACK</div>*/}
            {/*                <div>$217.95</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </li>*/}
            {/*</NavLink>*/}
            {/*<li className={styles.li}>*/}
            {/*    <div className={styles.itemWrapper}>*/}
            {/*        <img src="Циба.jpg" height={300} width={250} alt=""/>*/}
            {/*        <div className={styles.bottomItem}>*/}
            {/*            <div>DEMONIA DAMNED-318</div>*/}
            {/*            <div>$217.95</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</li>*/}
            {/*<li className={styles.li}>*/}
            {/*    <div className={styles.itemWrapper}>*/}
            {/*        <img src="Циба.jpg" height={300} width={250} alt=""/>*/}
            {/*        <div className={styles.bottomItem}>*/}
            {/*            <div>DEMONIA SWING</div>*/}
            {/*            <div>$199.95</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</li>*/}
            {/*<li className={styles.li}>*/}
            {/*    <div className={styles.itemWrapper}>*/}
            {/*        <img src="Циба.jpg" height={300} width={250} alt=""/>*/}
            {/*        <div className={styles.bottomItem}>*/}
            {/*            <div>CROWNS BLACK PATENT</div>*/}
            {/*            <div>$217.95</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</li>*/}
            {/*<li className={styles.li}>*/}
            {/*    <div className={styles.itemWrapper}>*/}
            {/*        <img src="Циба.jpg" height={300} width={250} alt=""/>*/}
            {/*        <div className={styles.bottomItem}>*/}
            {/*            <div>DEMONIA ASHES-55</div>*/}
            {/*            <div>$217.95</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</li>*/}
            {/*<li className={styles.li}>*/}
            {/*    <div className={styles.itemWrapper}>*/}
            {/*        <img src="Циба.jpg" height={300} width={250} alt=""/>*/}
            {/*        <div className={styles.bottomItem}>*/}
            {/*            <div>DEMONIA CAMEL-305</div>*/}
            {/*            <div>$199.95</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</li>*/}
        </ul>
        <div>@2022 MIA KUSTOVA</div>
    </div>
}

export default MainPage