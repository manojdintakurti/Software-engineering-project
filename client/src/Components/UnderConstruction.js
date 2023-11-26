import React from "react"
import "../CSS/UnderConstruction.css"

function UnderConstruction(){
    return (
        <div className="under-construction">
            <img  src={require("../images/underconstruction.jpg")}  alt="under construction"/>
        </div>
    );

}
export default UnderConstruction;