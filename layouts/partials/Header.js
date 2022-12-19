import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import socical from "@config/social.json";
import Social from "@layouts/components/Social";
import SearchModal from "@partials/SearchModal";
import Link from "next/link";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [searchModal, setSearchModal] = useState(false);
  const { logo } = config.site;

  return (
    <>
      <header className="header">
        <nav className="navbar container">
          {/* logo */}
          <div className="order-0">
            <Logo src={logo} />
          </div>
          <div className="hidden items-center space-x-8 md:flex">
            <ul
              id="nav-menu"
              className="navbar-nav hidden w-full md:flex md:w-auto md:space-x-2"
            >
              {main.map((menu, i) => (
                <React.Fragment key={`menu-${i}`}>
                  {menu.hasChildren ? (
                    <li className={`nav-item nav-dropdown group relative`}>
                      <span className="nav-link inline-flex items-center">
                        {menu.name}
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                        {menu.children.map((child, i) => (
                          <li
                            className="nav-dropdown-item"
                            key={`children-${i}`}
                          >
                            <Link
                              href={child.url}
                              className="nav-dropdown-link block"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link href={menu.url} className="nav-link block">
                        {menu.name}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
            {/* header social */}
            <Social source={socical} className="header-social" />

            {/* Header search */}
            <div
              className="search-icon"
              onClick={() => {
                setSearchModal(true);
              }}
            >
              <IoSearch />
            </div>
          </div>

          <SearchModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
          />
        </nav>
      </header>
    </>
  );
};

export default Header;
