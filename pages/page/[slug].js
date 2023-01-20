import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import { getListPage, getSinglePage } from "@lib/contentParser";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import Link from "next/link";
const { blog_folder, summary_length } = config.settings;

// blog pagination
const BlogPagination = ({
  postIndex,
  posts,
  authors,
  currentPage,
  pagination,
}) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title } = frontmatter;
  const totalPages = Math.ceil(posts.length / pagination);

  return (
    <Base title={title}>
      <section className="section">
        <div className="container">
          {markdownify(title, "h1", "h2 mb-8 text-center")}
          <div className="row mb-16">
            {currentPosts.map((post, i) => (
              <div className="mt-16 lg:col-6" key={post.slug}>
                {post.frontmatter.image && (
                  <ImageFallback
                    className="w-full rounded"
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    width={405}
                    height={208}
                  />
                )}
                <h3 className="h5 mb-2 mt-4">
                  <Link
                    href={`/${blog_folder}/${post.slug}`}
                    className="block hover:text-primary"
                  >
                    {post.frontmatter.title}
                  </Link>
                </h3>
                <ul className="flex items-center space-x-4">
                  <li>{post.frontmatter.authors}</li>
                  <li>{dateFormat(post.frontmatter.date)}</li>
                </ul>
                <p>{post.content.slice(0, Number(summary_length))}</p>
                <Link
                  className="btn btn-outline-primary mt-4"
                  href={`/${blog_folder}/${post.slug}`}
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const posts = getSinglePage(`content/${blog_folder}`);
  const authors = getSinglePage("content/authors");
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);

  return {
    props: {
      pagination: pagination,
      posts: posts,
      authors: authors,
      currentPage: currentPage,
      postIndex: postIndex,
    },
  };
};
