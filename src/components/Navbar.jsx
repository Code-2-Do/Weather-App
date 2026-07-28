import React from "react";
import logo from "./Black_and_White_Minimalist_Simple_Modern_Bold_Typographic_Chic_Logo__1_-removebg-preview.png";


const Navbar = () => {
    return(
        <div>
            <img className="heigh" src={logo} />
            <button>About Me</button>
        </div>
    )
}

export default Navbar;