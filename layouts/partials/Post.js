import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  return (
    <div className="post">
      <div className="relative">
        {post.frontmatter.image && (
          <ImageFallback
            className="w-full rounded"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={208}
          />
        )}
        <ul className="absolute top-3 left-2 flex flex-wrap items-center">
          {post.frontmatter.categories.map((tag, index) => (
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
  );
};

export default Post;
