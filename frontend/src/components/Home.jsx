import React from "react";
import NotVerified from "./user/NotVerified";
import TopRateMovies from "./user/TopRatedMovies";
import Container from "./Container";
import TopRatedWebSeries from "./user/TopRatedWebSeries";
import TopRatedTVSeries from "./user/TopRatedTVSeries";

export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen ">
      <Container>
        <NotVerified />
        {/* sline*/}
        {/*Most rated movies*/}
        <TopRateMovies />
        <TopRatedWebSeries />
        <TopRatedTVSeries />
      </Container>
    </div>
  );
}
