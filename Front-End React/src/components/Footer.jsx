import React from "react";

//Footer for the webpage
function Footer(){
    var now = new Date().getFullYear();
    return (<p className="footer">Copyright ©{now}</p>)
}

export default Footer;