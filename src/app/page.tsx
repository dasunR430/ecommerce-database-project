
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const routeto = () => {
    router.push("/route/prabath/details");
  }
  return (
    <>
      <p>Home Page</p>
      <button onClick={routeto}>Cart</button>
    </>
  );
}
