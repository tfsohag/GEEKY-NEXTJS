import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import socical from "@config/social.json";
import Social from "@layouts/components/Social";
import SearchModal from "@partials/SearchModal";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  // distructuring the main menu from menu object
  const { main } = menu;

  //logo
  const { logo } = config.site;

  // states declaration
  const [searchModal, setSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Router
  const router = useRouter();

  //stop scrolling when nav is open
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  return (
    <>
      <header className="header">
        <nav className="navbar container">
          {/* logo */}
          <div className="order-0">
            <Logo src={logo} />
          </div>
          <div className="flex items-center space-x-5 lg:space-x-8">
            <div
              className={`collapse-menu  ${
                !showMenu && "translate-x-full"
              } lg:flex lg:translate-x-0`}
            >
              <button
                className="absolute right-6 top-11 lg:hidden"
                onClick={() => setShowMenu(false)}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <title>Menu Close</title>
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  />
                </svg>
              </button>
              <ul
                id="nav-menu"
                className="navbar-nav w-full md:w-auto md:space-x-2 lg:flex"
              >
                {main.map((menu, i) => (
                  <React.Fragment key={`menu-${i}`}>
                    {menu.hasChildren ? (
                      <li className="nav-item nav-dropdown group relative">
                        <span
                          className={`nav-link ${
                            menu.children
                              .map((c) => c.url)
                              .includes(router.asPath) && "active"
                          } inline-flex items-center`}
                        >
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
                        <Link
                          href={menu.url}
                          className={`nav-link block ${
                            router.asPath === menu.url && "active"
                          }`}
                        >
                          {menu.name}
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
              {/* header social */}
              <Social source={socical} className="header-social" />
            </div>
            {/* Header search */}
            <div
              className="search-icon"
              onClick={() => {
                setSearchModal(true);
              }}
            >
              <IoSearch />
            </div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white lg:hidden"
            >
              {showMenu ? (
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <title>Menu Close</title>
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <title>Menu Open</title>
                  <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
                </svg>
              )}
            </button>
          </div>

          <SearchModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
          />
        </nav>
        {showMenu && (
          <div className="header-backdrop absolute top-0 left-0 h-[100vh] w-full bg-black/50 lg:hidden"></div>
        )}
      </header>
    </>
  );
};

export default Header;
