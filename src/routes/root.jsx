import { Form, Link, useNavigate } from "react-router-dom"
import "../styles/root.css"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { logOut } from "../assets/redux/authSlice"
export default function Root() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.persistedReducer.auth.login.currentUser)
    const handleOnClick = ()=>{
        console.log("alo")
        dispatch(logOut());
    }
    console.log("user ne"+user)
    const navigate = useNavigate();
    useEffect(() => {
        if(!user){
            navigate("/login")
        }
    }, [])
    
    return (

        <div className="rootContainer">
            <div className="sidebar">

                <ul>
                    <li>
                        <Link to={"/cpanel/dashboard"}>Dashboard</Link>
                    </li>
                    <li>
                    <Link to={"/cpanel/manga/add"}>Upload</Link>
                    </li>
                    <li>
                    <Link to={"/cpanel/genre"}>Feature Upload</Link>
                    </li>
                    <li>
                    <Link to={"/"}>User Management</Link>
                    </li>
                </ul>
            </div>
            <div className="content">
                <div className="headerText">
                    <h2>Hi, {user?.user_name}</h2>
                    <Link to={'/login'}><h2 className="logout" onClick={handleOnClick}>Log out</h2></Link>
                </div>
          
                <div className="pageContainer">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>

    )
}