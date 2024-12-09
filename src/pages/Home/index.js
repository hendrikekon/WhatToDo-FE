import React from "react";


const Home = ({isLoggedIn}) => {
    return (
        <div>
            <h1>Home Page</h1>
            {isLoggedIn && <p>Welcome to the Home Page, Logged In!</p>}
            {!isLoggedIn && <p>Welcome to the Home Page, Logged Out!</p>}
        </div>
    );
}

export default Home;