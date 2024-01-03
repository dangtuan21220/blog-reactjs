import React from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter } from 'react-router-dom';
import Router from "routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Blog"
        defaultTitle="Blog Tuandv"
        meta={[
          { name: "description", content: "Blog Tuandv" },
          {
            name: "og:title",
            content: "Blog Tuandv",
          },
          { name: "google", content: "notranslate" },
        ]}
        title={""}
      />
      <Router />
    </BrowserRouter>
  );
};

export default App;
