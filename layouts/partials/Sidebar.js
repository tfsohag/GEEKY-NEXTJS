import config from "@config/config.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Social from "@layouts/components/Social";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";
const { blog_folder } = config.settings;

const Sidebar = ({ posts, data }) => {
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );

  const [showRecent, setShowRecent] = useState(true);

  const uniqueCategories = [
    ...new Set(posts.map((post) => post.frontmatter.categories).flat()),
  ];

  const categories = uniqueCategories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return (
    <aside className="mt-12 px-6 lg:mt-0 lg:col-4">
      <div className="rounded border p-6">
        <ImageFallback
          className="mx-auto"
          src={data.logo}
          width={150}
          height={39}
          alt="logo"
        />
        {markdownify(data.content, "p", "mt-8")}
        <Social className="socials mt-6 justify-center" source={social} />
      </div>

      <div className="mt-6 rounded border p-6">
        {markdownify(
          data.title_category,
          "h4",
          "section-title text-center mb-12"
        )}
        <ul>
          {categories.map((category, i) => (
            <li
              className={`relative mb-2 flex items-center justify-between pl-6 text-[16px] font-bold capitalize text-dark ${
                i !== categories.length - 1 && "border-b"
              }`}
              key={i}
            >
              <svg
                className="absolute left-0 top-2.5"
                width="20px"
                height="20px"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7318 9.35984C12.0854 8.93556 12.7159 8.87824 13.1402 9.2318C13.5645 9.58537 13.6218 10.2159 13.2682 10.6402L8.26825 16.6402C7.91468 17.0645 7.28412 17.1218 6.85984 16.7682C6.43556 16.4147 6.37824 15.7841 6.7318 15.3598L11.7318 9.35984Z"
                  fill="#2ba283"
                />
                <path
                  d="M6.7318 4.64021C6.37824 4.21593 6.43556 3.58537 6.85984 3.2318C7.28412 2.87824 7.91468 2.93556 8.26825 3.35984L13.2682 9.35984C13.6218 9.78412 13.5645 10.4147 13.1402 10.7682C12.7159 11.1218 12.0854 11.0645 11.7318 10.6402L6.7318 4.64021Z"
                  fill="#2ba283"
                />
              </svg>
              <Link className="py-2" href={`/categories/${category.name}`}>
                {category.name}
                <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[10px] text-gray-500">
                  {category.posts}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded border p-6">
        <h4 className="section-title mb-12 text-center">Featured</h4>
        <div className="mb-12 flex items-center justify-center">
          <button
            className={`btn px-5 py-2 ${
              showRecent ? "btn-outline-primary" : "btn-primary"
            }`}
            onClick={() => setShowRecent(false)}
          >
            Featured
          </button>
          <button
            className={`btn ml-3  px-5 py-2 ${
              showRecent ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setShowRecent(true)}
          >
            Recent
          </button>
        </div>
        {showRecent
          ? sortPostByDate.slice(0, 5).map((post, i, arr) => (
              <div
                className={`flex items-center ${
                  i !== arr.length - 1 && "mb-6 border-b pb-6"
                }`}
                key={`key-${i}`}
              >
                {post.frontmatter.image && (
                  <ImageFallback
                    className="mr-3 h-[85px] w-[85px] rounded-full object-cover"
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    width={105}
                    height={85}
                  />
                )}
                <div>
                  <h3 className="h5 mb-2">
                    <Link
                      href={`/${blog_folder}/${post.slug}`}
                      className="block hover:text-primary"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h3>
                  <p>{dateFormat(post.frontmatter.date)}</p>
                </div>
              </div>
            ))
          : featuredPosts.slice(1, 6).map((post, i, arr) => (
              <div
                className={`flex items-center pb-6 ${
                  i !== arr.length - 1 && "mb-6 border-b"
                }`}
                key={`key-${i}`}
              >
                {post.frontmatter.image && (
                  <ImageFallback
                    className="mr-3 h-[85px] w-[85px] rounded-full object-cover"
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    width={105}
                    height={85}
                  />
                )}
                <div>
                  <h3 className="h5 mb-2">
                    <Link
                      href={`/${blog_folder}/${post.slug}`}
                      className="block hover:text-primary"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h3>
                  <p>{dateFormat(post.frontmatter.date)}</p>
                </div>
              </div>
            ))}
      </div>
    </aside>
  );
};

export default Sidebar;
