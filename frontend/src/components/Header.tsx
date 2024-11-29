import { Link, useLocation } from "react-router-dom";
import { headerNav, otherButtons } from "../constants";
import { useState } from "react";
import { useProductsContext } from "../context/Products";

const Header = () => {
  const { pathname } = useLocation();
  const { cart } = useProductsContext();

  const [open, setOpen] = useState(false);
  return (
    <header className="flex flex-col px-5 py-3 gap-3 border-b">
      {/* Initial Header */}
      <section className="flex-between">
        {/* Logo */}
        <img src="/logo.png" alt="logo" width={60} height={60} />

        {/* Navigations */}
        <ul className="flex items-center gap-3 max-sm:hidden">
          {headerNav.map((nav) => {
            const isActive = pathname === nav.route;
            return (
              <li key={nav.label} className="group">
                <Link
                  to={nav.route}
                  className={`uppercase font-semibold transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {nav.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Other Buttons */}
        <ul className="flex items-center gap-1">
          {otherButtons.map((btn) => {
            return (
              <li className="flex items-center group" key={btn.label}>
                <Link
                  to={btn.route}
                  className=" group-hover:bg-gray-100 header-icons"
                >
                  <img src={btn.icon} alt={btn.label} width={24} height={24} />
                </Link>
              </li>
            );
          })}
          {/* Customize Cart Icon with Badge */}
          <div className="relative group">
            <Link
              to="/cart"
              className="flex-center group-hover:bg-gray-100 header-icons"
            >
              <img
                src="/assets/icons/cart-minus.svg"
                alt="cartIcon"
                width={24}
                height={24}
              />
              <p className="cart-badge">{cart.length}</p>
            </Link>
          </div>
          {/* Menu Hamburger Button */}
          <button
            className="header-icons hover:bg-gray-100 active:bg-gray-300 sm:hidden"
            onClick={() => setOpen(!open)}
          >
            <img
              src="/assets/icons/menu-burger.svg"
              alt="menuIcon"
              width={24}
              height={24}
            />
          </button>
        </ul>
      </section>

      {/* Toggle Navigation */}
      <ul
        className={`${
          !open && "hidden"
        } sm:hidden flex items-start flex-col gap-2`}
      >
        {headerNav.map((nav) => {
          const isActive = pathname === nav.route;
          return (
            <li key={nav.label} className="flex">
              <Link
                to={nav.route}
                className={`uppercase font-semibold transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                }`}
                onClick={() => setOpen(!open)}
              >
                {nav.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
