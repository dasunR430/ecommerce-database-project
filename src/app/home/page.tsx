import Image from "next/image";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Hero from "../components/Home/Hero";
import Products from "../components/Home/Products";
import CategorySection from "../components/Home/CategorySection";
import RecommededProducts from "../components/Home/RecommendedProducts";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // URL to the product image
}

const products: Product[] = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 699,
    image: '/images/smartphone.jpg', // Replace with your actual image path
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 199,
    image: '/images/headphones.jpg', // Replace with your actual image path
  },
  {
    id: 3,
    name: '4K Ultra HD TV',
    price: 999,
    image: '/images/tv.jpg', // Replace with your actual image path
  },
  {
    id: 4,
    name: 'Gaming Console',
    price: 499,
    image: '/images/console.jpg', // Replace with your actual image path
  },
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 699,
    image: '/images/smartphone.jpg', // Replace with your actual image path
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 199,
    image: '/images/headphones.jpg', // Replace with your actual image path
  },
  {
    id: 3,
    name: '4K Ultra HD TV',
    price: 999,
    image: '/images/tv.jpg', // Replace with your actual image path
  },
  {
    id: 4,
    name: 'Gaming Console',
    price: 499,
    image: '/images/console.jpg', // Replace with your actual image path
  },
];

export default function Home() {
  return (
    <>
      <Header isLoggedIn={true} />
      <Nav />
      <Hero />
      <CategorySection />
      <Products products={products} heading={"Trending Products"}/>
      <RecommededProducts products={products} heading={"Recommended For You"}/>
    </>
  );
}