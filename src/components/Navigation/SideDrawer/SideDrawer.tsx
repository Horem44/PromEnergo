import React from "react";
import classes from "./SiderDrawer.module.css";
import { NavLink } from "react-router-dom";
import { Transition } from "react-transition-group";

interface SideDrawerProps {
  isOpen: boolean;
  onCloseSideDrawer: () => void;
}

interface transitionPhases {
  [key: string]: { transform: string };

  entered: {
    transform: string;
  };
  entering: {
    transform: string;
  };
  exited: {
    transform: string;
  };
  exiting: {
    transform: string;
  };
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  const phases: transitionPhases = {
    entered: {
      transform: "translateX(0%)",
    },
    entering: {
      transform: "translateX(0%)",
    },
    exited: {
      transform: "translateX(-100%)",
    },
    exiting: {
      transform: "translateX(-100%)",
    },
  };

  return (
    <Transition in={props.isOpen} timeout={200} mountOnEnter unmountOnExit>
      {(status) => (
        <nav className={`${classes.mob_nav}`} style={phases[status]}>
          <ul className={classes.mob_nav_links}>
            <li className={classes.mob_nav_link} onClick={props.onCloseSideDrawer}>
              <NavLink to="/products/0">Товари</NavLink>
            </li>
            <li className={classes.mob_nav_link} onClick={props.onCloseSideDrawer}>
              <NavLink to="/contacts">Контакти</NavLink>
            </li>
          </ul>
        </nav>
      )}
    </Transition>
  );
};

export default SideDrawer;
