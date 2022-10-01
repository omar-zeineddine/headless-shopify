import Head from "next/head";
import Image from "next/image";
import { getProductsInCollection } from "../lib/shopify";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  console.log(products);
  return <div className="text-3xl">products</div>;
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: { products },
  };
}
