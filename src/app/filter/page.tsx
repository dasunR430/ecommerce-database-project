import Nav from "../components/Nav";
import AttributeFilter from "../components/Search/AttributeFilter";
import FilterSideBar from "../components/Search/FilterSideBar";
import Pagination from "../components/Search/Pagination";
import PriceRangeFilter from "../components/Search/PriceRangeFilter";
import ProductCard from "../components/Search/ProductCard";
import ProductPerPageSelector from "../components/Search/ProductPerPageSelector";
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
  totalProducts: number;
  maxPrice: number;
}

const fetchProcducts = async (min: number, max: number, page: number = 1, productperpage: number = 2, isAscending: boolean, search?: string, subCategories?: number[]) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/getproducts`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: search, subCategories: subCategories, min: min, max: max, page: page, productperpage: productperpage, isAscending: isAscending })
      }
    );
    const data = await response.json();
    console.log("data fetch", data);
    console.log("is ase", isAscending);

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

export default async function FilterPage(props: { searchParams: { search?: string, subcategory?: number[], min: number, max: number, page: number, productperpage: number, ascending: number } }) {
  const { search, subcategory, min = 0, max = 500_000, page, productperpage = 5, ascending = 1 } = props.searchParams;
  console.log("🚀 ~ FilterPage ~ page:", page)
  console.log("max----",typeof max);
  console.log("ase   bool-",ascending===1);
  
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
  const data: response = await fetchProcducts(min, max, page, productperpage, Number(ascending) === 1, search, subCategoryIds);

  if (!data) console.log("data not recived")
  return (
    <>
      <div className="**flex flex-col min-h-screen**"> {/* Ensure the layout takes full screen height */}
        <Nav />

        {/* Main content area with **flex-grow** */}
        <div className="flex flex-col md:flex-row **flex-grow**">
          {/* Sidebar */}
          <div className="flex flex-col border-r border-gray-300 w-full md:w-1/4">
            <ProductPerPageSelector productperpage = {productperpage}/>
            <PriceRangeFilter globalMin={0} globalMax={data?.maxPrice} />
            <FilterSideBar selectedSubCategoryIds={subCategoryIds} />
            {/* <AttributeFilter selectedSubCategoryIds={subCategoryIds} /> */}
          </div>

          {/* Main product display */}
          {
            data.totalProducts > 0 ? (
              <div className="flex-grow w-full md:w-full bg-gray-100 p-4">
                <div className="flex flex-col space-y-4">
                  {search ?
                    (
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {data.totalProducts} Matching Products for <span className="text-red-600"> "{search}"</span>
                      </h3>
                    ) : (
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {data.totalProducts} Matching Products found
                      </h3>
                    )
                  }
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data?.matching_products?.map((product: Product, index : number) => (
                      <div key={product.ProductID} className="w-full md:w-full mx-auto justify-center items-center">
                        <ProductCard product={product} />
                      </div>
                      ))}
                  </div>
                </div>
                {/* Pagination should sit below the product cards */}
                <Pagination totalCount={data.totalProducts} limit={productperpage} />
              </div>
            ) : (
              <div className="**flex-grow** w-full md:w-full h-full bg-gray-100 p-4 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No products found for <span className="text-red-600">"{search}"</span>
                </h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria or browse other categories.</p>
              </div>
            )
          }
        </div>
      </div>
    </>

  );
}