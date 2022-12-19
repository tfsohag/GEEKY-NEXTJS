import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import Link from "next/link";
const { blog_folder } = config.settings;

const Home = ({ banner, posts, authors }) => {
  const sortPostByDate = sortByDate(posts);
  const showPost = 4;

  return (
    <Base>
      {/* Banner */}
      <section className="section">
        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div className="mt-12 text-center lg:mt-0 lg:text-left lg:col-6">
              {markdownify(banner.title, "h1", "h2 banner-title")}
              {markdownify(banner.content, "p", "mt-4")}
              <Link
                className="btn btn-primary mt-6"
                href={banner.button.link}
                rel={banner.button.rel}
              >
                {banner.button.label}
              </Link>
            </div>
            <div className="col-9 lg:col-6">
              <ImageFallback
                className="mx-auto"
                src={banner.image}
                width={548}
                height={443}
                priority={true}
                alt="Banner Image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section>
        <div className="container">
          <div className="row">
            {sortPostByDate.slice(0, showPost).map((post, i) => (
              <div key={`key-${i}`} className="col-12 mb-8 sm:col-6">
                <Post post={post} authors={authors} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const authors = getSinglePage("content/authors");

  return {
    props: {
      banner: banner,
      posts: posts,
      authors: authors,
    },
  };
};
