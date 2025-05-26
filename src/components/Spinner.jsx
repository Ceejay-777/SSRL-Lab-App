import { Loader } from "lucide-react";
import React from "react";

const Spinner = ({size}) => {
  return <Loader className="animate-spin text-navBg2" size={size} />;
};

export default Spinner;
