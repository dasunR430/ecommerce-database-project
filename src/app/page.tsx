import Image from "next/image";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Hero from "./components/Home/Hero";
import CategoryComponent from "./components/Home/Category";
import TrendingProducts from "./components/Home/TrendingProducts";

export default function Home() {
  return (
    <>
      <Header isLoggedIn={true}/>
      <Nav />
      <Hero/>
      <CategoryComponent/>
      <TrendingProducts/>
    </>
  );
}
