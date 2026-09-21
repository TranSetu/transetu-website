import Navbar from "@/components/Navbar";
import Hero from "@/app/home/Hero";
import Products from "@/app/product/Products";
import About from "./about/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Footer />
    </main>
  );
}
