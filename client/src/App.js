import './App.css';
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Bag from "./components/Bag";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import ItemView from "./components/ItemView";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={'/newin'} element={<MainPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/bag'} element={<Bag/>}/>
                <Route path={'/signin'} element={<SignIn/>}/>
                <Route path={'/item/:name'} element={<ItemView/>}/>
            </Routes>
        </div>
    );
}

export default App;
