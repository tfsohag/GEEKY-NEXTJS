import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
const { blog_folder } = config.settings;

// tag page
const Tag = ({ tag, posts, authors }) => {
  return (
    <Base title={tag}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{tag}</span> tag
          </h1>
          <div className="row">
            {posts.map((post, i) => (
              <div key={`key-${i}`} className="col-12 mb-8 sm:col-6">
                <Post post={post} authors={authors} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Tag;

// tag page routes
export const getStaticPaths = () => {
  const allCategories = getTaxonomy(`content/${blog_folder}`, "tags");

  const paths = allCategories.map((tag) => ({
    params: {
      tag: tag,
    },
  }));

  return { paths, fallback: false };
};

// tag page data
export const getStaticProps = ({ params }) => {
  const posts = getSinglePage(`content/${blog_folder}`);
  const filterPosts = posts.filter((post) =>
    post.frontmatter.tags.find((tag) => slugify(tag).includes(params.tag))
  );
  const authors = getSinglePage("content/authors");

  return {
    props: { posts: filterPosts, tag: params.tag, authors: authors },
  };
};
