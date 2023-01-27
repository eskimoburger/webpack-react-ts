import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Profile, ProfileWithRefreshToken } from "./api/auth";
import AntDLayout from "./components/AntDLayout";
import AntDLogin from "./components/AntDLogin";
// const  AntDTable =lazy(()=>import("./components/AntDTable")) ;
import AntDTable from "./components/AntDTable";

const App = () => {
  const [dataMock, setDataMock] = useState(null);
  const fetchMock = () => {
    (async () => {
      const response = await fetch("/data/aquater_m1.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const { qr_generate_data } = data;

      const addKeyIndexData = qr_generate_data.map((d: any, i: number) => ({
        key: i,
        ...d,
      }));

      setDataMock(addKeyIndexData);
    })();
  };

  const getProfile = () => {
    (() => {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      Profile(token)
        .then((res) => console.log(res.data))
        .catch((err: AxiosError) => {
          if (err.response.status === 401) {
            ProfileWithRefreshToken(refreshToken)
              .then((res) => {
                localStorage.setItem("accessToken", res.data.data.accessToken);
                window.location.reload();
              })
              .catch((err: AxiosError) => {
                console.log(err.response.data);
              });
          }
        });
    })();
  };
  useEffect(fetchMock, []);
  useEffect(getProfile, []);

  return (
    <div>
      <AntDLayout>
        <AntDTable dataSource={dataMock} />
      </AntDLayout>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDLogin />
      </div>
    </div>
  );
};

export default App;
