import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../context/authContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classes from "./MainNavigation.module.css";
import linkList from "./LinkList";
const MainNavigation = () => {
  const { SignOut, authtoken, getCurrentUser } = useContext(authContext);
  const [currentuser, setCurrentuser] = useState(undefined);
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  useEffect(() => {
    setCurrentuser(authtoken);
  }, [getCurrentUser()]);
  return (
    <div className={classes.navigation}>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="me-auto">
          Mahi Ludo
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {linkList.map((e, i) =>
              !currentuser && i < 2 ? (
                <NavItem>
                  <NavLink href={e.path}>{e.item}</NavLink>
                </NavItem>
              ) : i >= 2 ? (
                <NavItem>
                  <NavLink href={e.path}>{e.item}</NavLink>
                </NavItem>
              ) : (
                ""
              )
            )}
            <NavItem>
              <NavLink onClick={SignOut}>logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default MainNavigation;
