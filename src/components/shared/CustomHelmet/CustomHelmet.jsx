import React from "react";
import { Helmet } from "react-helmet-async";

const CustomHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>SyncFit | {title}</title>
    </Helmet>
  );
};

export default CustomHelmet;
