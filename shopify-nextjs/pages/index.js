import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getProductsInCollection } from "../lib/shopify";
import ProductList from "../components/ProductList";

export default function Home({ products }) {
  console.log(products);
  return (
    <div className="text-3xl">
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
