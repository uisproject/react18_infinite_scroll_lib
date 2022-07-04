import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// https://api.instantwebtools.net/v1/passenger?page=0&size=10

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [dataInfo, setDataInfo] = useState(null);

  const getData = async () => {
    const fetchResponse = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
    );
    const response = await fetchResponse.json();
    setDataInfo(
      data.length <= 0
        ? {
            totalPages: response?.totalPages,
            totalPassengers: response?.totalPassengers,
          }
        : dataInfo
    );
    setData([...data, ...response?.data]);
    setPage(page + 1);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={getData}
        hasMore={dataInfo?.totalPages > page ? true : false}
        inverse={true}
        loader={<div>is loading..</div>}
        endMessage={<div>This is the end</div>}
      >
        {data?.map((item, idx) => (
          <div style={{ padding: "50px 0" }} key={idx}>
            {JSON.stringify(item)}
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default App;
