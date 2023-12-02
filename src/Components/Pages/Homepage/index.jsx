import React from "react";
import { Container } from "react-bootstrap";
import Banner from "./components/Banner";
import HowItWorks from "./components/HowItWorks";
import AboutUs from "./components/AboutUs";
import TechnologyArea from "./components/TechnologyArea";
import MissionAndVision from "./components/MissionAndVision";
import Benefits from "./components/Benefits";
import CustomNavbar from "../../Common/CustomNavbar/Index";
import CustomFooter from "../../Shared/Footer/CustomFooter";
import "../../Stylesheet/Homepage/homePage.scss";
import { Button } from "@mui/material";
import axios from "axios";
import { API_URL, BASE_URL } from "../../utils/contants";
const handleApiResponse = async () => {
  try {
    const response = await axios.get(BASE_URL + '/hello')
    console.log("data", response);
  } catch (error) {
    console.log("error", error);
  }
}
const Homepage = () => {
  return (
    <>
      <CustomNavbar />
      <Button onClick={handleApiResponse}>Test Api</Button>
      {/* <Container>
        <Banner />
        <HowItWorks />
        <AboutUs />
        <TechnologyArea />
        <MissionAndVision />
        <Benefits />
      </Container> */}

      <CustomFooter />
    </>
  );
};

export default Homepage;
