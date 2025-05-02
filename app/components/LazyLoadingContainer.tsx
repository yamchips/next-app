"use client";

import { useState } from "react";
import Button from "./Button";
import dynamic from "next/dynamic";
import LodashBtn from "./LodashBtn";
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
// import HeavyComponent from "./HeavyComponent";
// import _ from "lodash";

const LazyLoadingContainer = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button handleClick={() => setShow(true)}></Button>
      {show && <HeavyComponent />}
      <LodashBtn
        handleClick={async () => {
          const _ = (await import("lodash")).default;
          const arr = [{ name: "z" }, { name: "e" }, { name: "a" }];
          const sorted = _.orderBy(arr, ["name"]);
          console.log(sorted);
        }}
      />
    </>
  );
};

export default LazyLoadingContainer;
