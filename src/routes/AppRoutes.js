import { Route, Routes } from "react-router-dom"
import Home from "../views/Home"
import Login from "../views/Login"
import SignUp from "../views/SignUp"

const AppRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signUp" element={<SignUp/>}></Route>
        </Routes>

    )
  
}
export default AppRoutes