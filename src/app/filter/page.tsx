import Nav from "../components/Nav";
import AttributeFilter from "../components/Search/AttributeFilter";
import FilterSideBar from "../components/Search/FilterSideBar";
import ProductCard from "../components/Search/ProductCard";

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
      <div className="flex flex-col md:flex-row h-screen"> {/* Stack on mobile and row on medium and larger screens */}
        <div className="flex flex-col border-r border-gray-300 w-full md:w-1/4"> {/* Full width on mobile, quarter on larger screens */}
          <FilterSideBar selectedSubCategoryIds={subCategoryIds} />
          <AttributeFilter selectedSubCategoryIds={subCategoryIds} />
        </div>
        <div className="flex-grow w-full md:w-full h-full bg-gray-100 p-4"> {/* Full width on mobile, three-quarters on larger screens */}
          <div className="flex flex-col space-y-4"> {/* Stack product cards vertically */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Matching Products for <span className="text-red-600"> "{search}"</span>
            </h3>
            {data?.matching_products?.map((product: Product) => {
              return (
                <div key={product.ProductID} className="w-full md:w-full mx-auto"> {/* Full width on mobile */}
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}