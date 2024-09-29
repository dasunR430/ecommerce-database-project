import Nav from "../components/Nav";
import Header from "../components/Header";
import Hero from "../components/Home/Hero";
import Products from "../components/Home/Products";
import CategorySection from "../components/Home/CategorySection";

interface Product {
  ProductID: number;
  ProductTitle: string;
  BasePrice: number;
  PrimaryImage: string; // URL to the product image
}

interface SearchKey {
  ProductID: number;
  ProductTitle: string;
}
interface response {
  status: number;
  message?: string;
  recommened_products: Product[];
  trending_products: Product[];
  available_products: SearchKey[];
}

const fetchProcducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/getproducts`);
    if (response.status !== 200)
      throw Error("response not ok!!")
    else {
      const data = await response.json();
      return data;
    }
  }
  catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const data: response = await fetchProcducts();
  if (!data) console.log("data not recived")
  let trending_products: Product[] = data.trending_products;
  let recommened_products: Product[] = data.recommened_products;
  let available_products: SearchKey[] = data.available_products;

  return (
    <>
      <Nav />
      <Hero />
      <CategorySection />
      <Products products={trending_products} heading={"Trending Products"} />
      <Products products={recommened_products} heading={"Recommended For You"} />
    </>
  );
}