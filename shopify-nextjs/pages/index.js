import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getProductsInCollection } from "../lib/shopify";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";

export default function Home({ products }) {
  return (
    <div className="">
      <Head>
        <title>Modern eCommerce</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=ISO-8859-1"
        />
        <meta
          name="description"
          content="Modern eCommerce using Shopify, Next.js, TailwindCSS, GraphQL."
        />
        <meta property="og:title" content="Modern eCommerce" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://headless-shopify-nextjs-nvy3.vercel.app/"
        />
        <meta
          property="og:description"
          content="Modern eCommerce Development Course using Shopify, Next.js, TailwindCSS, GraphQL."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Modern eCommerce" />
      </Head>
      <Hero />
      <ProductList products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: { products },
  };
}
