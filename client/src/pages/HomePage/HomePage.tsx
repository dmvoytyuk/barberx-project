import React from "react";
import bgImage from "../../assets/img/bg/homepagebg.jpg";
import Logo from "../../components/Logo/Logo.tsx";
import PageLayout from "../../components/PageLayout/PageLayout.tsx";
import SearchBox from "../../components/SearchBox/SearchBox.tsx";
import ToolBox from "../../components/ToolBox/ToolBox.tsx";

const HomePage: React.FC = (): React.ReactNode => {
  return (
    <>
      <PageLayout
        backgroundURL={bgImage}
        header={<Logo color="white" />}
        main={<SearchBox />}
        footer={<ToolBox />}
      />
    </>
  );
};

export default HomePage;
