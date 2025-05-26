import React from "react";

const Row = ({ column }) => {
  
  const { id, Date, In, Out } = column;
  return (
    <div className="tableRow flex border-y border-slate-400 text-center text-lg font-medium text-black">
      <div className="flex-1 border-x border-slate-400 p-2">{id}</div>
      <div className="flex-1 border-x border-slate-400 p-2">{Date}</div>
      <div className="flex-1 border-x border-slate-400 p-2">{In}</div>
      <div className="flex-1 border-x border-slate-400 p-2">{Out}</div>
    </div>
  );
};

export default Row;
