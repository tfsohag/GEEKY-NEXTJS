import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Link from "next/link";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  return (
    <div className="">
      {post.frontmatter.image && (
        <ImageFallback
          className=""
          src={post.frontmatter.image}
          alt={post.frontmatter.title}
          fill="cover"
        />
      )}
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
  );
};

export default Post;
