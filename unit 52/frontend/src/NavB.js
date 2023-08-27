import React from "react";
import "./static/styles/NavB.css";
import { NavLink as NotNavLink } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function NavB({ username, isMobile }) {
  return (
    <div>
      {/* Navigation bar using Bootstrap Navbar */}
      <Navbar color="dark">
        <div className="container">
          {/* Brand logo */}
          <NavbarBrand href="/" className="inactive">
            WeTrip
          </NavbarBrand>
          {!isMobile && (
            <Nav>
              {/* Navigation items for non-mobile view */}
              <NavItem>
                {/* NavLink for Weather Forecast */}
                <NavLink
                  to="/forecast"
                  className="inactive"
                  activeClassName="active"
                  tag={NotNavLink}
                >
                  Weather Forecast
                </NavLink>
              </NavItem>
              <NavItem>
                {/* NavLink for Trip Planner */}
                <NavLink
                  to="/planner"
                  className="inactive"
                  activeClassName="active"
                  tag={NotNavLink}
                >
                  Trip Planner
                </NavLink>
              </NavItem>
              {!username && (
                <>
                  {/* Navigation items for non-logged in users */}
                  <NavItem>
                    <NavLink
                      to="/register"
                      className="inactive"
                      activeClassName="active"
                      tag={NotNavLink}
                    >
                      Register
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/login"
                      className="inactive"
                      activeClassName="active"
                      tag={NotNavLink}
                    >
                      Log In
                    </NavLink>
                  </NavItem>
                </>
              )}
              {username && (
                <>
                  {/* Navigation items for logged in users */}
                  <NavItem>
                    {/* NavLink to user's profile */}
                    <NavLink
                      to="/profile"
                      className="inactive"
                      activeClassName="active"
                      tag={NotNavLink}
                    >
                      {username}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    {/* NavLink for Log Out */}
                    <NavLink
                      to="/logout"
                      className="inactive"
                      activeClassName="active"
                      tag={NotNavLink}
                    >
                      Log Out
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          )}
          {isMobile && (
            <Nav>
              {/* Dropdown menu for mobile view */}
              <UncontrolledDropdown nav inNavbar>
                {/* Dropdown toggle button */}
                <DropdownToggle nav caret className="inactive">
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  {/* Dropdown items for mobile view */}
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/forecast">Weather Forecast</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/planner">Trip Planner</NavLink>
                    </NavItem>
                  </DropdownItem>
                  {!username && (
                    <>
                      <DropdownItem>
                        <NavItem>
                          <NavLink href="/register">Register</NavLink>
                        </NavItem>
                      </DropdownItem>
                      <DropdownItem>
                        <NavItem>
                          <NavLink href="/login">Log In</NavLink>
                        </NavItem>
                      </DropdownItem>
                    </>
                  )}
                  {username && (
                    <>
                      <DropdownItem>
                        <NavItem>
                          <NavLink href="/profile">{username}</NavLink>
                        </NavItem>
                      </DropdownItem>
                      <DropdownItem>
                        <NavItem>
                          <NavLink href="/logout">Log Out</NavLink>
                        </NavItem>
                      </DropdownItem>
                    </>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default NavB;
