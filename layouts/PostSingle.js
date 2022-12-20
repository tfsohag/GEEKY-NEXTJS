import Share from "@components/Share";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import shortcodes from "./shortcodes/all";

const PostSingle = ({ frontmatter, content, mdxContent, authors, slug }) => {
  let { description, title, date, image, categories, tags } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container">
          <article className="text-center">
            {markdownify(title, "h1", "h2")}

            {image && (
              <Image
                src={image}
                height="500"
                width="1000"
                alt={title}
                className="rounded-lg"
              />
            )}
            <div className="content mb-16 text-left">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
            <div className="flex flex-wrap items-center justify-between">
              {/* <ul className="mr-4 mb-4 space-x-3">
                {tags.map((tag, i) => (
                  <li className="inline-block" key={`tag-${i}`}>
                    <Link
                      href={`/tags/${slugify(tag)}`}
                      className="bg-light block rounded-lg px-4 py-2 font-semibold text-dark hover:text-primary"
                    >
                      {humanize(tag)}
                    </Link>
                  </li>
                ))}
              </ul> */}
              <Share
                className="social-share mb-4"
                title={title}
                description={description}
                slug={slug}
              />
            </div>
          </article>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
