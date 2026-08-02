import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  photosApi,
  videosApi,
  gifApi,
  pickVideoFile,
  MissingApiKeyError,
} from "../getAPIs/ApisFunc";
import {
  setResults,
  setLoading,
  setError,
  setHasMore,
  setPage,
  setQuery,
  clearResults,
  addRecentSearch,
} from "../redux/features/searchSlice";
import ResultCard from "./ResultCard";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import Loader from "./Loader";
import PreviewModal from "./PreviewModal";
import Masonry from "react-masonry-css";

const PER_PAGE = 24;

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTabs, loading, hasMore, results, error, page } =
    useSelector((s) => s.search);
  const savedItems = useSelector((s) => s.collection.items);
  const [selectedItem, setSelectedItem] = useState(null);
  const [retryTick, setRetryTick] = useState(0);

  const isSavedTab = activeTabs === "saved";

  const breakpointColumnsObj = {
    default: 5,
    1536: 4,
    1280: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  const fetchPage = useCallback(
    async (signal) => {
      dispatch(setLoading());
      try {
        let data = [];
        if (activeTabs === "photos") {
          const response = await photosApi(query, page, PER_PAGE, signal);
          data = (response.results || []).map((item) => ({
            id: item.id,
            title: item.alt_description || "Photo",
            thumbnel: item.urls.thumb,
            type: "Photos",
            src: item.urls.regular || item.urls.full,
            width: item.width,
            height: item.height,
          }));
        } else if (activeTabs === "videos") {
          const response = await videosApi(query, page, PER_PAGE, signal);
          data = (response.videos || []).map((item) => {
            const file = pickVideoFile(item.video_files);
            return {
              id: item.id,
              title: item.user?.name || "Video",
              thumbnel: item.image,
              type: "Videos",
              src: file?.link || "",
              width: item.width,
              height: item.height,
            };
          });
        } else if (activeTabs === "gif") {
          const response = await gifApi(query, page, PER_PAGE, signal);
          data = (response.data || []).map((item) => ({
            id: item.id,
            title: item.title || item.alt_text || "GIF",
            thumbnel: item.images.original.webp,
            type: "GIF",
            src: item.images.original.url,
            width: Number(item.images.original.width) || undefined,
            height: Number(item.images.original.height) || undefined,
          }));
        }
        dispatch(setResults(data));
        dispatch(setHasMore(data.length === PER_PAGE));
      } catch (err) {
        if (err?.name === "CanceledError" || err?.name === "AbortError") return;
        const message =
          err instanceof MissingApiKeyError
            ? err.message
            : err?.response?.status === 401 || err?.response?.status === 403
              ? "Invalid or missing API key for this source."
              : err?.response?.status === 429
                ? "Rate limit reached. Please wait a moment and try again."
                : "Couldn't fetch results. Check your connection and try again.";
        dispatch(setError(message));
      }
    },
    [dispatch, query, activeTabs, page],
  );

  useEffect(() => {
    if (isSavedTab) return;
    const controller = new AbortController();
    fetchPage(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, activeTabs, retryTick]);

  const fetchMoreData = () => {
    if (!loading) dispatch(setPage(page + 1));
  };

  const handleRetry = () => setRetryTick((t) => t + 1);

  const handleSuggestion = (term) => {
    dispatch(setQuery(term));
    dispatch(clearResults());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
    dispatch(addRecentSearch(term));
  };

  const savedResults = useMemo(() => {
    if (!isSavedTab) return [];
    // The search box is disabled while on the Saved tab, so there's no way
    // for the user to set or clear a filter here — always show everything
    // they've saved rather than silently filtering by whatever query term
    // happened to be active on another tab.
    return savedItems;
  }, [isSavedTab, savedItems]);

  const visibleResults = isSavedTab ? savedResults : results;
  const showInitialSkeleton = !isSavedTab && loading && page === 1;
  const showEmpty =
    !showInitialSkeleton && !error && visibleResults.length === 0;
  const showError = !isSavedTab && error && page === 1;

  return (
    <div className="mx-auto max-w-full px-4 pb-16 sm:px-6">
      {showInitialSkeleton && (
        <div className="results-grid mt-2">
          {Array.from({ length: 12 }, (_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      )}

      {showError && <ErrorState message={error} onRetry={handleRetry} />}

      {showEmpty && !showError && (
        <EmptyState
          query={isSavedTab ? "" : query}
          title={isSavedTab ? "No saved items yet" : undefined}
          description={
            isSavedTab
              ? "Tap the bookmark icon on any card to save it here for later."
              : undefined
          }
          onSuggestionClick={isSavedTab ? undefined : handleSuggestion}
        />
      )}

      {!showInitialSkeleton &&
        !showError &&
        visibleResults.length > 0 &&
        (isSavedTab ? (
          <div className="results-grid mt-2">
            {visibleResults.map((item) => (
              <ResultCard
                key={`${item.type}-${item.id}`}
                item={item}
                onOpen={setSelectedItem}
              />
            ))}
          </div>
        ) : (
          <InfiniteScroll
            dataLength={visibleResults.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
              <p className="py-8 text-center text-sm text-ink-muted">
                You've reached the end of the results.
              </p>
            }
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-4"
              columnClassName="space-y-4"
            >
              {visibleResults.map((item) => (
                <ResultCard
                  key={`${item.type}-${item.id}`}
                  item={item}
                  onOpen={setSelectedItem}
                />
              ))}
            </Masonry>
          </InfiniteScroll>
        ))}

      <PreviewModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default ResultGrid;
