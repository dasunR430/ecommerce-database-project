import Nav from "../components/Nav";
import FilterSideBar from "../components/Search/FilterSideBar";
import ProductCard from "../components/Search/ProductCard";
// import { useRouter, useSearchParams } from "next/navigation";

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
  matching_products: Product[];
}

const fetchProcducts = async (search?: string, subCategories?: number[]) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/getproducts`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: search, subCategories: subCategories })
      }
    );
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

export default async function FilterPage(props: { searchParams: { search?: string, subcategory?: number[] } }) {
  const { search, subcategory } = props.searchParams;

  // Initialize subCategoryIds as an empty array
  let subCategoryIds: number[] = [];

  if (subcategory) {
    // Check if subcategory is an array
    if (Array.isArray(subcategory)) {
      // Map the array of strings to an array of numbers
      subCategoryIds = subcategory.map((id) => Number(id));
    } else {
      // If it's a single string, convert it to a number
      subCategoryIds = [Number(subcategory)];
    }
  }
  const data: response = search ? await fetchProcducts(search, subCategoryIds) : {};
  if (!data) console.log("data not recived")
  return (
    <>
      <Nav />
      <h3>Matching Products for {search}</h3>
      <div className="flex">
        <FilterSideBar />
        {data?.matching_products?.map(
          (product: Product) => {
            return (
              <div key={product.ProductID} className="w-1/2 m-10">
                <ProductCard product={product} />
              </div>
            )
          })
        }
      </div>

    </>
  );
}