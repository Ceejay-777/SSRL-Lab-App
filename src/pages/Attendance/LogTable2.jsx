import React, { useState } from "react";
import Header from "./header";
import Row from "./row";

const LogTable2 = ({data}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  return (
    <div>
      <Header />
      {data.map((row) => {
        return <Row key={row.id} column={row} />;
      })}
    </div>
  );
};

export default LogTable2;
