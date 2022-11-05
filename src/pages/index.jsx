import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Amazon</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto bg-gray-100">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json()
  );
  return {
    props: {
      products,
    },
  };
}
