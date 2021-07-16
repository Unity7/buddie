import React from "react";



function Nav(props) {

    const { navSelected, setNavSelected } = props;

    return(
        <nav>
         <ul>
           <li className={navSelected === "dashboard" && 'navActive'}>
              <a href="#dashboard" onClick={() => setNavSelected("dashboard")}>DASHBOARD</a> 
           </li>
           <li className={navSelected === "taskboard" && 'navActive'}>
              <a href="#taskboard" onClick={() => setNavSelected("taskboard")}>TASKBOARD</a>
           </li>  
         </ul>   
        </nav>
    )

}

export default Nav