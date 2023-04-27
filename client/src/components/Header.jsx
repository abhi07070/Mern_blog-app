import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [openClose, setOpenClose] = useState(false);
  const url = process.env.REACT_APP_PORT;
  useEffect(() => {
    axios.get(`${url}/profile`, { withCredentials: true })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const { username } = userInfo || {};

  function logout() {
    axios
      .post(`${url}/logout`, null, { withCredentials: true })
      .then((response) => {
        setUserInfo(null);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    // <header>
    <nav className="mx-auto max-w-[800px] flex justify-between mt-4 lg:px-0 px-6">
      <div>
        <Link to="/">
          <h1 className="text-sm xl:text-lg">MyBlog</h1>
        </Link>
      </div>
      <div className={openClose ? 'fullscreen active' : 'fullscreen'}>
        {username && (
          <>
            <div className="space-x-6 text-sm xl:text-lg">
              <Link to='/posts'>Posts</Link>
              <Link to='/tag/:category'>Tags</Link>
              <Link to="/create">Create</Link>
              <Link to='/login' onClick={logout}>
                Logout
              </Link>
            </div>
          </>
        )}
        {!username && (
          <>
            <div className="space-x-6">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </div>
      {/* <div className="mobile">
        {!openClose && (
          <Link className="hamburger" onClick={ev => setOpenClose(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Link>
        )}
        {openClose && (
          <Link className="hamburger" onClick={ev => setOpenClose(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        )}
      </div> */}
    </nav>
    // </header>
  );
};

export default Header;