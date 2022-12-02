import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setBag} from "../redux/Reducer";

const Bag = () => {
    const userData = useSelector(state => state.reducer.userData)
    const bag = useSelector(state => state.reducer.bag)
    // const [totalSum, setTotalSum] = useState(0)
    let totalSum = 0;
    const dispatch = useDispatch()
    const getBag = () => {
        if (userData) {
            axios.get(`http://localhost:8000/getbag/${userData.id}`).then(response => {
                console.log(response.data)
                dispatch(setBag(response.data))
            })
        }
    }
    useEffect(() => {
        getBag()
    }, [])
    return <div style={{marginTop:'50px'}}>
        {bag.length ? <div style={{display: 'flex', justifyContent: 'space-between', margin: '50px 350px'}}>
                <div> {bag.map(item => {
                    totalSum += Number(item[4])
                    return <div key={item[0]} style={{
                        width: '350px',
                        height: '170px',
                        border: ' 3px solid #7c3232',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                    }}>
                        <div style={{padding: '20px', display: 'flex', alignItems: 'center'}}>
                            <img src={`data:image/png;base64,${item[5]}`} width={'auto'} height={'100px'} alt=""/>
                        </div>
                        <div style={{marginRight: '30px'}}>
                            <div style={{fontWeight: 'bold', fontSize: '20px', marginTop: '25px'}}>{item[2]}</div>
                            <div style={{display: 'flex', marginTop: '40px', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex'}}>
                                    <div>SIZE:</div>
                                    <div>{item[3]}</div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div>QTY:</div>
                                    <div>1</div>
                                </div>
                            </div>
                            <div style={{display: 'flex', marginTop: '15px'}}>
                                <div>SUBTOTAL:</div>
                                <div style={{marginLeft: '50px'}}>${item[4]}</div>
                            </div>
                        </div>
                    </div>
                })}</div>
                <div>
                    <div style={{padding: '8px 15px', border: ' 3px solid #7c3232', width: '280px'}}>FREE UKRAINIAN
                        SHIPPING FOR
                        ORDERS OVER $80
                    </div>
                    <div style={{padding: '50px 10px 60px 40px', border: ' 3px solid #7c3232', borderTop: 'none'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <div>SUBTOTAL:</div>
                            <div>${totalSum}</div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <div>SHIPPING:</div>
                            <div>$0.00</div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-end', paddingTop: '15px'}}>
                            <div>GRAND TOTAL:</div>
                            <div>${totalSum}</div>
                        </div>
                    </div>
                </div>
            </div>
            : <div style={{fontSize: '20px', margin: 'auto'}}>You need to login...</div>
        }
    </div>
}

export default Bag