import React, { lazy, Suspense } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";

// Code-split the results grid (and its infinite-scroll/preview-modal weight)
// out of the initial bundle, same as the original app did.
const ResultGrid = lazy(() => import("./components/ResultGrid"));

const App = () => {
  return (
    <div className="min-h-screen w-screen bg-canvas text-ink">
      <Header />
      <Tabs />
      <Suspense fallback={<Loader />}>
        <ResultGrid />
      </Suspense>
      <ScrollToTop />
    </div>
  );
};

export default App;
