import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder } = config.settings;

const Categories = ({ categories }) => {
  return (
    <Base title={"categories"}>
      <section className="section pt-0">
        {markdownify(
          "Categories",
          "h1",
          "h2 mb-16 bg-theme-dark dark:bg-darkmode-theme-dark py-12 text-center lg:text-[55px]"
        )}
        <div className="container text-center">
          <ul className="row">
            {categories.map((category, i) => (
              <li
                key={`category-${i}`}
                className="mt-4 block lg:col-4 xl:col-3"
              >
                <Link
                  href={`/categories/${category}`}
                  className="bg-theme-light flex w-full items-center justify-center rounded-lg px-4 py-3.5 font-bold transition hover:bg-primary hover:text-white dark:bg-darkmode-theme-dark  dark:hover:bg-primary dark:hover:text-white"
                >
                  <svg
                    className="mr-2"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 2C3.20435 2 2.44129 2.31607 1.87868 2.87868C1.31607 3.44129 1 4.20435 1 5V19C1 19.7957 1.31607 20.5587 1.87868 21.1213C2.44129 21.6839 3.20435 22 4 22H20C20.7957 22 21.5587 21.6839 22.1213 21.1213C22.6839 20.5587 23 19.7957 23 19V8C23 7.20435 22.6839 6.44129 22.1213 5.87868C21.5587 5.31607 20.7957 5 20 5H11.5352L10.1289 2.8906C9.75799 2.3342 9.13352 2 8.46482 2H4Z"
                      fill="currentColor"
                    />
                  </svg>
                  {humanize(category)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Base>
  );
};

export default Categories;

export const getStaticProps = () => {
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  return {
    props: {
      categories: categories,
    },
  };
};
