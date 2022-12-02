import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setItemData} from "../redux/Reducer";

const ItemView = () => {
    const dispatch = useDispatch()
    const itemData = useSelector(state => state.reducer.itemData)
    const userData = useSelector(state => state.reducer.userData)
    const refSize = useRef()
    const [value, setValue] = useState(0)
    useEffect(() => {
        const a = window.location.href.split('/')
        const item = a[4]
        axios.get(`http://localhost:8000/getshoes/${item}`).then(response => {
            dispatch(setItemData(response.data))
            setValue(response.data[2])
        })
    }, [])
    const addToBag = () => {
        if (userData)
            console.log(`http://localhost:8000/addtobag/${itemData[0]}/${value}/${userData.id}`)
        axios.get(`http://localhost:8000/addtobag/${itemData[0]}/${value}/${userData.id}`).then(response => response)
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return <div style={{display: 'flex', justifyContent: 'center', background: 'white',marginTop:'50px'}}>
        <div style={{
            marginRight: '80px',
            width: '300px',
        }}>
            <img src={itemData ? `data:image/png;base64,${itemData[4]}` : 'Циба.jpg'} height={'300px'} width={'auto'}
                 alt=""/>
        </div>

        <div style={{
            border: '2px solid #7c3232',
            width: '300px',
            textAlign: 'start',
            padding: '5px 12px',
            boxSizing: 'border-box'
        }}>
            <div style={{fontWeight: 'bold'}}>{itemData[1]}</div>
            <div style={{fontWeight: 'bold', marginTop: '15px'}}>${itemData[3]}</div>
            <div>
                <div style={{marginTop: '50px'}}>PRODUCT COLOUR</div>
                <div style={{background: 'black', width: '40px', height: '40px', marginTop: '10px'}}></div>
            </div>
            <div>
                <div style={{marginTop: '35px'}}>SIZE</div>
                <input type={'number'} style={{
                    color: 'white',
                    marginTop: '10px',
                    width: '80px',
                    background: 'grey',
                    border: '2px solid black',
                    cursor: 'pointer'
                }} ref={refSize} onChange={onChange} value={value}/>
            </div>
            <div style={{textAlign: 'end'}}>
                <button style={{
                    background: 'black',
                    color: 'white',
                    padding: '3px 32px',
                    border: '2px solid #7c3232',
                }} onClick={addToBag}>ADD TO BAG
                </button>
            </div>
        </div>
    </div>
}

export default ItemView
