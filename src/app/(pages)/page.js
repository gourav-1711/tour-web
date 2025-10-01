import About from "@/components/section/About";
import Banner from "@/components/section/Banner";

import Destination from "@/components/section/Destination";
import Fleet from "@/components/section/Fleet";
import Offer from "@/components/section/Offer";
import Services from "@/components/section/Services";

export const metaData = {
  title: "Home",
  description: "Gurukripa Tour & Travel Booking Agency ",
};
export default function Home() {
  
  return (
    <>
      <Banner />
      <Destination />
      <Fleet />
      <Offer />
      <Services />
      <About />
    </>
  );
}
