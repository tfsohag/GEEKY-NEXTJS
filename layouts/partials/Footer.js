import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section relative pt-[70px] pb-[30px]">
      <ImageFallback
        className="-z-[1] object-cover object-left dark:hidden md:object-top"
        src="/images/footer-bg-shape.svg"
        alt=""
        fill={true}
      />
      <ImageFallback
        className="-z-[1] hidden object-cover object-left dark:block md:object-top"
        src="/images/footer-bg-shape-dark.svg"
        alt=""
        fill={true}
      />
      <div className="container text-center">
        <div className="mb-6 inline-flex">
          <Logo />
        </div>
        {markdownify(footer_content, "p", "max-w-[638px] mx-auto")}

        {/* footer menu */}
        <ul className="mb-12 mt-6 space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link
                href={menu.url}
                className="p-2 font-bold  hover:text-primary  lg:p-4"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <div className="inline-flex">
          <Social source={social} className="socials mb-12 justify-center" />
        </div>
        {/* copyright */}
        {markdownify(copyright, "p")}
      </div>
    </footer>
  );
};

export default Footer;
