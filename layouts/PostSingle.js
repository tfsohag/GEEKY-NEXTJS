import Base from "@layouts/Baseof";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import Post from "./partials/Post";
import Sidebar from "./partials/Sidebar";
import shortcodes from "./shortcodes/all";

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  slug,
  posts,
  allCategories,
  relatedPosts,
}) => {
  let { description, title, date, image, categories, authors } = frontmatter;
  description = description ? description : content.slice(0, 120);

  const disqusShortname = "your-site-shortname";
  const disqusConfig = {
    url: "http://localhost:3000",
    identifier: "article-id",
    title: "Title of Your Article",
  };

  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="lg:col-8">
              <article>
                <div className="relative">
                  {image && (
                    <Image
                      src={image}
                      height="500"
                      width="1000"
                      alt={title}
                      className="rounded-lg"
                    />
                  )}
                  <ul className="absolute top-3 left-2 flex flex-wrap items-center">
                    {categories.map((tag, index) => (
                      <li
                        className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
                        key={"tag-" + index}
                      >
                        <Link
                          className="capitalize"
                          href={`/categories/${tag.replace(" ", "-")}`}
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {markdownify(title, "h1", "h2 mt-16")}
                <ul className="mt-5 flex items-center space-x-4">
                  <li>{authors}</li>
                  <li>{dateFormat(date)}</li>
                </ul>
                <div className="content mb-16">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                </div>
              </article>
            </div>
            <Sidebar posts={posts} categories={allCategories} />
          </div>
          <div className="row">
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </div>

        {/* Related posts */}
        <div className="container mt-20">
          <h2 className="h3 section-title">Related Posts</h2>
          <div className="row mt-16">
            {relatedPosts.map((post) => (
              <div key={post.frontmatter.slug} className="mb-12 lg:col-4">
                <Post post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
