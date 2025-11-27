// Import the Layout component to wrap the page content
import Layout from '../../components/layout';
// Import the getAllPostIds and getPostData helpers for dynamic routes and post content
import { getAllIds, getData } from '../../lib/data.js';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

 // Define the Post component that will be rendered on the post page
 export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <div className={utilStyles.dateBG}><Date dateString={postData.date} /></div>
          </div>
          <p>Car: {postData.make} {postData.model}</p>
        </article>
      </Layout>
    );
  }
// Define getStaticPaths to prerender dynamic routes for all post IDs at build time
export async function getStaticPaths() {
    const paths = await getAllIds();
    return {
      paths,
      fallback: false,
    };
  }


  export async function getStaticProps({ params }) {
    // Fetch the post data for the given ID at build time
    const postData = await getData(params.id);
   
    return {
      props: {
        postData,
      },
    };
  }