import React from "react";
import MyNavbar from "../components/NavbarhomePage";
import CarouselHomepage from "../components/CarousehomePagel";
import ListShoe from "../components/listShoe";
import ImfoHomepage from "../components/imfomationHomepage";
import ListShoeSeal from "../components/listShoeSeal";
import Footer from "../components/foolterHomepage";

import ListShoeSealNam from "../components/listShoeSeal copy";
class HomePage extends React.Component {
  render() {
    return (
      <>
        <MyNavbar></MyNavbar>
        <CarouselHomepage />
        <ImfoHomepage></ImfoHomepage>
        <ListShoe></ListShoe>
        <ListShoeSealNam></ListShoeSealNam>
        <ListShoeSeal></ListShoeSeal>
        <Footer></Footer>
      </>
    );
  }
}
export default HomePage;
