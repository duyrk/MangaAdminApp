import "../styles/welcomeScreen.css"
export default function Welcome() {
    return (

        <div className="container" >

            <div className="welcomeText">Welcome to MangaRK Control Panel and you are ...?</div>
            <div className="imgContainer">
                <div className="roleContainer">
                    <div className="roleName">
                        <h2>Translators</h2>
                    </div>


                    <img className="roleBackGround" src="../assets/chooseRoleBanner1.png" ></img>
                </div>
                <div className="roleContainer">
                    <div className="roleName">
                        <h2>Admin</h2>
                    </div>
                    <img className="roleBackGround" src="../assets/chooseRoleBanner2.png" ></img>
                </div>

            </div>
            <div className="footer">Powered by raiko</div>
        </div>


    )
}
