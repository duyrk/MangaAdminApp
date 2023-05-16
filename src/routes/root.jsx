import { Form, Link } from "react-router-dom"
import "../styles/root.css"
import { Outlet } from "react-router-dom"
export default function Root() {
    return (

        <div className="rootContainer">
            <div className="sidebar">

                <ul>
                    <li>
                        <Link to={"/1/dashboard"}>Dashboard</Link>
                    </li>
                    <li>
                    <Link to={"/add"}>Upload</Link>
                    </li>
                    <li>
                    <Link to={"/"}>Team Management</Link>
                    </li>
                </ul>
            </div>
            <div className="content">
                <div className="headerText">
                    <h2>Hi, Raiko</h2>
                    <Link><h2 className="logout">Log out</h2></Link>
                </div>
                <Form className="searchForm" role="search">
                    <div>
                        <img src="../assets/ic_search.png" alt="searchImg" />
                    </div>
                    <input type="search"
                        id="q"
                        name="q"
                        placeholder="Search..."

                    />
                </Form>
                <div className="pageContainer">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>

    )
}