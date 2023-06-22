import { Form, Link } from "react-router-dom"
import "../styles/root.css"
import { Outlet } from "react-router-dom"
export default function Root() {
    return (

        <div className="rootContainer">
            <div className="sidebar">

                <ul>
                    <li>
                        <Link to={"/cpanel/user/1/dashboard"}>Dashboard</Link>
                    </li>
                    <li>
                    <Link to={"/cpanel/manga/add"}>Upload</Link>
                    </li>
                    <li>
                    <Link to={"/feature"}>Feature Upload</Link>
                    </li>
                    <li>
                    <Link to={"/"}>User Management</Link>
                    </li>
                </ul>
            </div>
            <div className="content">
                <div className="headerText">
                    <h2>Hi, Raiko</h2>
                    <Link><h2 className="logout">Log out</h2></Link>
                </div>
          
                <div className="pageContainer">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>

    )
}