import Base from "@layouts/Baseof";
import { getSinglePages } from "@lib/contents";
import { getAllCategory } from "@lib/utils/category";
import { kebabCase } from "@lib/utils/slugger";
import Posts from "@partials/Posts";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const Category = ({ category, post }) => {
  const postCategory = post.filter((post) => post.length > 0);

  return (
    <Base title={String(category)}>
      <div className="section container mx-auto pb-0">
        <h1 className="relative inline-block font-primary text-h1 capitalize">
          <svg
            className="absolute left-full -mt-5"
            width="75"
            height="75"
            viewBox="0 0 75 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.0015 33.3355C10.7417 34.0597 11.9749 34.0015 12.756 33.2056C19.2162 26.6222 25.3652 19.779 31.491 12.9615C32.2707 12.0937 33.05 11.2264 33.8295 10.3601C34.5753 9.53132 34.551 8.30305 33.7753 7.61671C32.9995 6.93036 31.7661 7.04584 31.0203 7.87464C30.2388 8.74316 29.4588 9.61118 28.6797 10.4783C22.5462 17.3041 16.4642 24.0727 10.0755 30.5831C9.29439 31.379 9.26126 32.6114 10.0015 33.3355Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M58.2564 19.4483C57.6674 18.4866 56.4242 18.1616 55.4797 18.7222C53.6973 19.7801 51.9178 20.8392 50.1396 21.8973C39.7478 28.0817 29.4044 34.2371 18.8194 39.9837C17.8535 40.508 17.5191 41.7291 18.0725 42.711C18.6259 43.6929 19.8575 44.0638 20.8233 43.5395C31.4814 37.7533 41.8986 31.5537 52.2877 25.3709C54.0632 24.3143 55.8379 23.2581 57.6128 22.2046C58.5573 21.644 58.8455 20.4099 58.2564 19.4483Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M57.1663 52.8267C57.0505 51.7587 56.0914 50.9813 55.0242 51.0903L20.217 54.6435C19.1497 54.7524 18.3785 55.7065 18.4943 56.7745C18.6101 57.8424 19.5691 58.6198 20.6364 58.5109L55.4435 54.9577C56.5108 54.8487 57.2821 53.8947 57.1663 52.8267Z"
              fill="black"
            />
          </svg>
          Showing posts from {category} category
        </h1>
      </div>
      <Posts className={"section pt-0"} post={postCategory[0]} />
    </Base>
  );
};

export default Category;

export async function getStaticPaths() {
  const category = getAllCategory("content/posts");

  const paths = category.map((d) => ({
    params: {
      category: d,
    },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = ({ params }) => {
  const allFiles = fs.readdirSync(path.join("content/posts"));
  const file = allFiles.filter((f) => f.match(/^[a-z]/));
  const posts = file.map((file) => {
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("content/posts", file),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(metaDataWithFrontMatter);

    const filterByCategory = frontmatter.categories.filter(
      (c) => kebabCase(c) == params.category
    );

    const allPosts = getSinglePages("content/posts");
    const data = allPosts.filter((e) => {
      return e.category.some((a) => {
        return filterByCategory.indexOf(a) != -1;
      });
    });

    return data;
  });

  const post = posts.filter((p) => p.length > 0);

  const category = post[0].map((p) =>
    p.frontmatter.categories.filter((c) => kebabCase(c) == params.category)
  );

  return { props: { post: posts, category: category[0] } };
};
