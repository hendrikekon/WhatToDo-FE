import React from "react";
import { NavLink } from "react-router-dom";
import './index.css';
import { useDispatch} from "react-redux";
import imglogo from '../../assets/img/logo1.png';
import Account from "../../components/Account";
import { fetchTodos } from "../../app/features/Todo/actions";

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
    const dispatch = useDispatch();

    const handleMenu = () => {
        dispatch(fetchTodos());

      };

    return(
        <div className="navbar-container">
            {/* <p>navbar</p> */}
            <div className="navbar">
                <div className="navbar-list">
                    <h4 className="navbar-brand">
                        <img src={imglogo} alt="Logo" className="imgLogo" />
                        <NavLink to="/" onClick={() => handleMenu} className="linkMenu">                        
                            Eduwork-Store
                        </NavLink>
                    </h4>
                </div>
                <div className="navbar-list">
                    <ul className="link-wrapper">
                        <li className="link">
                            <NavLink to="/" onClick={handleMenu} className="linkMenu">Home</NavLink>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="link">
                                    <Account isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                                </li>
                            </>
                        ) : (
                            <li className="link">
                                <NavLink to="/login" className="linkMenu">Login</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;