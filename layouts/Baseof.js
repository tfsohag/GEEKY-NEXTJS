import config from "@config/config.json";
import { strip } from "@lib/utils/strip";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import Head from "next/head";
import { useRouter } from "next/router";

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { baseURL } = config.site;
  const router = useRouter();
  return (
    <>
      <Head>
        {/* meta_title? meta_title : title */}
        <title>{strip(meta_title ? meta_title : title)}</title>

        {/* canonical url */}
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* description ? description : first 120 char from content */}
        <meta
          name="description"
          content={description ? description : meta_description}
        />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />

        {/* meta_title? meta_title : title */}
        <meta property="og:title" content={meta_title ? meta_title : title} />

        {/* description ? description : first 120 char from content */}
        <meta
          property="og:description"
          content={description ? description : meta_description}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${baseURL}${router.asPath.replace("/", "")}`}
        />

        {/* meta_title? meta_title : title */}
        <meta name="twitter:title" content={meta_title ? meta_title : title} />

        {/* description ? description : first 120 char from content */}
        <meta
          name="twitter:description"
          content={description ? description : meta_description}
        />

        {/* image meta */}
        <meta
          property="og:image"
          content={image ? `${image}` : `${meta_image}`}
        />
        <meta
          name="twitter:image"
          content={image ? `${image}` : `${meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      {/* main site */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Base;
