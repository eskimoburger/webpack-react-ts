import React, { useEffect, useState } from "react";
import AntDTable from "./components/AntDTable";
import data from "../public/data/aquater_m1.json"


const App = () => {
  const [dataMock, setDataMock] = useState(null);
  const fetchMock = () => {
   fetch("/data/aquater_m1.json").then(res=>res.json()).then(data=>console.log(data));
  };
  useEffect(fetchMock, []);
  return (
    <div>
      <AntDTable />
      {JSON.stringify(data)}
    </div>
  );
};

export default App;
