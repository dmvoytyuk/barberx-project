import HomePageLayout from "../../components/HomePageLayout/HomePageLayout.tsx";
import Layout from "../../components/Layout/Layout.tsx";
import bgImage from "../../assets/img/bg/homepagebg.jpg";
import React from "react";

const HomePage: React.FC = (): React.ReactNode => {
  return (
    <Layout backgroundURL={bgImage}>
      <HomePageLayout />
    </Layout>
  );
};

export default HomePage;
