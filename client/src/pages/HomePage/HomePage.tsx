import HomePageLayout from "../../components/HomePageLayout/HomePageLayout.tsx";
import Layout from "../../components/Layout/Layout.tsx";
import bgImage from "../../assets/img/bg/homepagebg.jpeg";

const HomePage = () => {
  return (
    <Layout backgroundURL={bgImage}>
      <HomePageLayout />
    </Layout>
  );
};

export default HomePage;
