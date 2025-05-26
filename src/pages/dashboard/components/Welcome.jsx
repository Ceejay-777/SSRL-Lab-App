import React from "react";
import { formattedDateNow } from "../../../Modules/funcs";

const Welcome = ({ name }) => {
  return (
    <div className="border-1 flex flex-col gap-2 rounded-2xl border bg-white p-6 text-left shadow-lg">
      <h2 className="text-xl font-semibold text-navBg2 md:text-2xl">
        Welcome, {name || "Intern"}!
      </h2>
      <p className="text-lg font-normal text-navBg2">{formattedDateNow}</p>
      <p className="text-base font-semibold text-[#357932]">
        Let&apos;s do the best today
      </p>
    </div>
  );
};

export default Welcome;
