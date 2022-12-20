import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import bannerShape from "../public/images/banner-bg-shape.svg";
const { blog_folder, summary_length } = config.settings;

const Home = ({ banner, posts, featured, sidebar, categories }) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const showPost = 4;
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={bannerShape}
          alt="banner-shape"
          priority
        />
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

      {/* featured Posts */}
      <section className="section">
        <div className="container">
          {markdownify(featured.title, "h2", "h3 section-title")}
          <div className="row mt-11 items-start">
            <div className="rounded border p-6 lg:col-8">
              <div className="row">
                <div className="lg:col-6">
                  {featuredPosts[0].frontmatter.image && (
                    <ImageFallback
                      className="w-full rounded"
                      src={featuredPosts[0].frontmatter.image}
                      alt={featuredPosts[0].frontmatter.title}
                      width={405}
                      height={208}
                    />
                  )}
                  <h3 className="h5 mb-2 mt-4">
                    <Link
                      href={`/${blog_folder}/${featuredPosts[0].slug}`}
                      className="block hover:text-primary"
                    >
                      {featuredPosts[0].frontmatter.title}
                    </Link>
                  </h3>
                  <ul className="flex items-center space-x-4">
                    <li>{featuredPosts[0].frontmatter.authors}</li>
                    <li>{dateFormat(featuredPosts[0].frontmatter.date)}</li>
                  </ul>
                  <p>
                    {featuredPosts[0].content.slice(0, Number(summary_length))}
                  </p>
                </div>
                <div className="mt-8 max-h-[480px] overflow-auto lg:mt-0 lg:col-6">
                  {featuredPosts
                    .slice(1, featuredPosts.length)
                    .map((post, i, arr) => (
                      <div
                        className={`mb-6 flex items-center pb-6 ${
                          i !== arr.length - 1 && "border-b"
                        }`}
                        key={`key-${i}`}
                      >
                        {post.frontmatter.image && (
                          <ImageFallback
                            className="mr-3 h-[85px] rounded object-cover"
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
              </div>
            </div>

            {/* sidebar */}
            <Sidebar posts={posts} data={sidebar} />
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
  const { banner, featured, sidebar } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = [
    ...new Set(posts.map((post) => post.frontmatter.categories).flat()),
  ];

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured,
      sidebar,
      categories: categoriesWithPostsCount,
    },
  };
};
