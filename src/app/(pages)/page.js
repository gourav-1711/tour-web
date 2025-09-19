import About from "@/components/section/About";
import Banner from "@/components/section/Banner";

import Destination from "@/components/section/Destination";
import Fleet from "@/components/section/Fleet";
import Services from "@/components/section/Services";
export default function Home() {
  return (
    <>
      <Banner />
      <Destination />
      <Fleet />
      <Services />
      <About/>
    </>
  );
}
