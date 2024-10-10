import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useUnsavedChanges } from "./UnsavedChangesContext";

const App = () => {
  const navigate = useNavigate();
  const { unsavedChanges, setShowModal, setPendingAction } =
    useUnsavedChanges();

  // Handle navigation with unsaved changes check
  const handleNavigation = (path) => {
    if (unsavedChanges) {
      setPendingAction(() => () => navigate(path));
      setShowModal(true); // Show confirmation modal if there are unsaved changes
    } else {
      navigate(path); // Direct navigation if there are no unsaved changes
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink
          className="navbar-brand"
          to="/"
          onClick={() => handleNavigation("/")}
        >
          React App
        </NavLink>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => handleNavigation("/page1")}
            >
              Page 1
            </span>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => handleNavigation("/page2")}
            >
              Page 2
            </span>
          </li>
        </ul>
      </nav>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
