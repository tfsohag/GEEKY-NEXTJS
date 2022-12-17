import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts, authors }) => {
  const { summary_length, blog_folder } = config.settings;
  return (
    <div className="row">
      {posts.map((post, i) => (
        <div key={`key-${i}`} className="col-12 mb-8 sm:col-6">
          {post.frontmatter.image && (
            <Image
              className="rounded-lg"
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              width={i === 0 ? "925" : "445"}
              height={i === 0 ? "475" : "230"}
              layout="responsive"
            />
          )}
          <ul className="mt-4 text-text">
            <li className="mb-2 mr-4 inline-block">
              {authors
                .filter((author) =>
                  post.frontmatter.authors
                    .map((author) => slugify(author))
                    .includes(slugify(author.frontmatter.title))
                )
                .map((author, i) => (
                  <Link
                    href={`/authors/${slugify(author.frontmatter.title)}`}
                    key={`author-${i}`}
                    className="inline-block hover:text-primary"
                  >
                    {author.frontmatter.image && (
                      <span className="mr-2 align-top">
                        <Image
                          src={author.frontmatter.image}
                          alt={author.frontmatter.title}
                          height={25}
                          width={25}
                          className="h-6 w-6 rounded-full"
                        />
                      </span>
                    )}
                    <span>{author.frontmatter.title}</span>
                  </Link>
                ))}
            </li>
            <li className="mb-2 mr-4 inline-block">
              {dateFormat(post.frontmatter.date)}
            </li>
            <li className="mb-2 mr-4 inline-block">
              <ul>
                {post.frontmatter.categories.map((category, i) => (
                  <li className="inline-block" key={`category-${i}`}>
                    <Link
                      href={`/categories/${slugify(category)}`}
                      className="mr-3 hover:text-primary"
                    >
                      &#9635; {humanize(category)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <h2 className="h3 mb-2">
            <Link
              href={`/${blog_folder}/${post.slug}`}
              className="block hover:text-primary"
            >
              {post.frontmatter.title}
            </Link>
          </h2>
          <p className="text-text">
            {post.content.slice(0, Number(summary_length))}...
          </p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
