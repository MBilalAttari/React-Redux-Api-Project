import { photosApi, videosApi, gifApi } from "../getAPIs/ApisFunc";
import { useDispatch, useSelector } from "react-redux";
import {
  setResults,
  setLoading,
  setError,
  setPage,
} from "../redux/features/searchSlice";
import { useEffect } from "react";
import ResultCard from "./ResultCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Triangle } from "react-loader-spinner";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const loader = (
    <Triangle
      visible={true}
      height="80"
      width="80"
      color="#155DFC"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
  const { query, activeTabs, loading, hasMore, results, error, page } =
    useSelector((store) => store.search);
  const getData = async () => {
    try {
      let data = [];
      let response;
      if (activeTabs == "photos") {
        response = await photosApi(query, page);
        data = response.results.map((item) => ({
          id: item.id,
          title: item.alt_description,
          thumbnel: item.urls.thumb,
          type: "Photos",
          src: item.urls.full,
        }));
      }
      if (activeTabs == "videos") {
        response = await videosApi(query, page);
        data = response.videos.map((item) => ({
          id: item.id,
          title: item.user.name,
          thumbnel: item.image,
          type: "Videos",
          src: item.video_files[1].link,
        }));
      }
      if (activeTabs == "gif") {
        let limit = page * 30;
        response = await gifApi(query, limit);
        data = response.data.map((item) => ({
          id: item.id,
          title: item.alt_text || "GIF",
          thumbnel: item.images.original.webp,
          type: "GIF",
          src: item.images.original.url,
        }));
      }
      console.log(data);
      dispatch(setResults(data));
    } catch (error) {
      dispatch(setError(error));
    }
  };

  const fetchMoreData = () => {
    console.log("fetchMoreData");
    if (!loading) {
      dispatch(setPage(page + 1));
    }
  };
  useEffect(() => {
    getData();
    console.log("query:", query);
    console.log("page:", page);
    console.log("tab:", activeTabs);
  }, [query, page]);
  if (error) return <h1>Error</h1>;
  return (
    <div className="flex flex-wrap gap-6 mt-6 overflow-hidden justify-around">
      {results.length > 0 && (
        <InfiniteScroll
          dataLength={results.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={loader}
          scrollThreshold="90%"
          endMessage={<h2 className="text-center">No More Results</h2>}
        >
          <div className="flex flex-wrap gap-6 mt-6 justify-around">
            {results.map((item, idx) => (
              <ResultCard key={idx} item={item} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ResultGrid;
