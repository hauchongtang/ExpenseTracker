import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import DarkModeToggle from './dark'

export const NaviBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">expenseTRACKER</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink id='directory' href="https://github.com/thchong-code/ExpenseTracker">GitHub</NavLink>
          </NavItem>
        </Nav>
        <DarkModeToggle />
      </Navbar>
    </div>
  );
}

export default NaviBar;