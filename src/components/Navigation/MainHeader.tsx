import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import accountLogo from "./assets/account_logo.png";
import mainLogo from "./assets/logo.png";
import classes from "./MainHeader.module.css";
import SideDrawerButton from "./SideDrawer/SideDrawerButton";
import SideDrawer from "./SideDrawer/SideDrawer";
import BackDrop from "../UI/BackDrop";
import UserMenu from "../UserMenu/UserMenu";

const windowWidth = window.innerWidth;

const MainHeader: React.FC = () => {
  const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState<boolean>(false);
  const [userMenuIsOpen, setUserMenuIsOpen] = useState<boolean>(false);

  const toggleSideDrawerOpenHandler = () => {
    setSideDrawerIsOpen((prevState) => !prevState);
    if (!sideDrawerIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeSideDrawerHandler = () => {
    setSideDrawerIsOpen(false);
    document.body.style.overflow = "";
  };

  const openUserMenuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setUserMenuIsOpen(true);
  };

  const closeUserMenuHandler = () => {
    setUserMenuIsOpen(false);
  };

  document.addEventListener("click", closeUserMenuHandler);

  return (
    <>
      <header className={classes.main_header}>
        <div
          className={classes.side_drawer_btn}
          onClick={toggleSideDrawerOpenHandler}
        >
          <SideDrawerButton />
        </div>
        <div
          className={classes.main_logo_container}
          onClick={closeSideDrawerHandler}
        >
          <NavLink to="/">
            <img src={mainLogo} alt="Main Logo" />
          </NavLink>
        </div>
        <nav className={classes.main_nav}>
          <ul className={classes.nav_links}>
            <li className={classes.nav_link}>
              <NavLink to="/products">Товари</NavLink>
            </li>
            <li className={classes.nav_link}>
              <NavLink to="/contacts">Контакти</NavLink>
            </li>
          </ul>
        </nav>
        <div
          className={classes.account_logo_container}
          onClick={closeSideDrawerHandler}
        >
          <button
            onClick={(e) => {
              openUserMenuHandler(e);
              closeSideDrawerHandler();
            }}
          >
            <img src={accountLogo} alt="Account Logo" />
          </button>
        </div>
      </header>
      {sideDrawerIsOpen && (
        <div onClick={toggleSideDrawerOpenHandler}>
          <BackDrop />
        </div>
      )}
      {windowWidth < 680 && (
        <div className={classes.side_drawer}>
          <SideDrawer
            isOpen={sideDrawerIsOpen}
            onCloseSideDrawer={closeSideDrawerHandler}
          />
        </div>
      )}
      {userMenuIsOpen && <UserMenu />}
    </>
  );
};

export default MainHeader;