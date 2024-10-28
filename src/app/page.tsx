import Nav from "../../src/app/components/Nav";
import Hero from "../../src/app/components/Home/Hero";
import Products from "../../src/app/components/Home/Products";
import CategorySection from "../../src/app/components/Home/CategorySection";
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
}

const fetchProcducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/getproducts`);
    const data = await response.json();
    if (data.status !== 200)
      throw Error("response not ok!!")
    else {

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
  const trending_products: Product[] = data.trending_products;
  
  const recommened_products: Product[] = data.recommened_products;
  return (
    <>
      <Nav />
      <Hero />
      <CategorySection />
      <div className="flex flex-col justify-center items-center">
        <Products products={trending_products} heading={"Trending Products"} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Products products={recommened_products} heading={"Recommended For You"} />
      </div>
    </>
  );
}