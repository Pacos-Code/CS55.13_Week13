
// Import Next.js Head component for managing document head elements (title, meta tags, etc.)
import Head from 'next/head';
// Import the Layout component and siteTitle constant from the layout component
import Layout, { siteTitle } from '../components/layout';
// Import CSS module styles for utility classes
import utilStyles from '../styles/utils.module.css';
// Import the getSortedPostsData function from the posts.js file
import { getSortedList } from '../lib/data.js';
import Link from 'next/link';
import Date from '../components/date';
// Define the getStaticProps function that will be called at build time to get the allPostsData
export async function getStaticProps() {
  // Get the allPostsData from the posts.js file to pass it to the Home component
  const allPostsData = await getSortedList();
  return {
    props: {
      allPostsData,
    },
  };
}

// Define the Home component that will be rendered on the home page and pass the allPostsData as a prop
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingXl}>
        <p>Hello, I'm Francisco. I am a Full Stack Web Dev student.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, date }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}