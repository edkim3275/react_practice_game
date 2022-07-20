import React from "react";

const Header = () => {
    return (
        <div>
            <header>
                <button className="header-btn" onClick={() => {
                    console.log('go home')
                }}>Home</button>
                <button className="header-btn stage" onClick={() => {console.log('state')}}>
                    <span>stage</span>
                </button>
            </header>
        </div>
    )
}

export default Header;