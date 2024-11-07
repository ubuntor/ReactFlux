import { useStore } from "@nanostores/react";
import { useContentContext } from "../components/Content/ContentContext";
import {
  activeEntryIndexState,
  contentState,
  filteredEntriesState,
  nextContentState,
  prevContentState,
  setActiveContent,
} from "../store/contentState";
import { extractImageSources } from "../utils/images";
import { useModalToggle } from "./useModalToggle";
import { usePhotoSlider } from "./usePhotoSlider";

const useKeyHandlers = () => {
  const { activeContent } = useStore(contentState);
  const activeEntryIndex = useStore(activeEntryIndexState);
  const filteredEntries = useStore(filteredEntriesState);
  const prevContent = useStore(prevContentState);
  const nextContent = useStore(nextContentState);

  const { entryListRef, handleEntryClick } = useContentContext();

  const scrollSelectedCardIntoView = () => {
    if (entryListRef.current) {
      const selectedCard = entryListRef.current.el.querySelector(
        ".card-wrapper.selected",
      );
      if (selectedCard) {
        selectedCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  const { isPhotoSliderVisible, setIsPhotoSliderVisible, setSelectedIndex } =
    usePhotoSlider();
  const { setSettingsModalVisible, setSettingsTabsActiveTab } =
    useModalToggle();

  const withActiveContent =
    (fn) =>
    (...args) => {
      if (activeContent) {
        return fn(...args);
      }
    };

  const exitDetailView = withActiveContent(() => {
    setActiveContent(null);
    if (entryListRef.current) {
      entryListRef.current.contentWrapperEl.focus();
    }
  });

  const navigateToPreviousArticle = () => {
    if (prevContent) {
      handleEntryClick(prevContent);
      setTimeout(() => scrollSelectedCardIntoView(), 200);
    }
  };

  const navigateToNextArticle = () => {
    if (nextContent) {
      handleEntryClick(nextContent);
      setTimeout(() => scrollSelectedCardIntoView(), 200);
    }
  };

  const findAdjacentUnreadEntry = (currentIndex, direction, entries) => {
    const isSearchingBackward = direction === "prev";
    const searchRange = isSearchingBackward
      ? entries.slice(0, currentIndex).toReversed()
      : entries.slice(currentIndex + 1);

    return searchRange.find((entry) => entry.status === "unread");
  };

  const navigateToAdjacentUnreadArticle = (direction) => {
    const adjacentUnreadEntry = findAdjacentUnreadEntry(
      activeEntryIndex,
      direction,
      filteredEntries,
    );
    if (adjacentUnreadEntry) {
      handleEntryClick(adjacentUnreadEntry);
      setTimeout(scrollSelectedCardIntoView, 200);
    }
  };

  const navigateToPreviousUnreadArticle = () =>
    navigateToAdjacentUnreadArticle("prev");
  const navigateToNextUnreadArticle = () =>
    navigateToAdjacentUnreadArticle("next");

  const openLinkExternally = withActiveContent(() => {
    window.open(activeContent.url, "_blank");
  });

  const fetchOriginalArticle = withActiveContent((handleFetchContent) => {
    handleFetchContent();
  });

  const saveToThirdPartyServices = withActiveContent(
    (handleSaveToThirdPartyServices) => {
      handleSaveToThirdPartyServices();
    },
  );

  const showHotkeysSettings = () => {
    console.log("showHotkeysSettings");
    setSettingsTabsActiveTab("5");
    setSettingsModalVisible(true);
  };

  const toggleReadStatus = withActiveContent((handleUpdateEntry) => {
    handleUpdateEntry();
  });

  const toggleStarStatus = withActiveContent((handleStarEntry) => {
    handleStarEntry();
  });

  const openPhotoSlider = withActiveContent(() => {
    const imageSources = extractImageSources(activeContent.content);
    if (!imageSources.length || isPhotoSliderVisible) {
      return;
    }

    setSelectedIndex(0);
    setIsPhotoSliderVisible(true);
  });

  return {
    exitDetailView,
    fetchOriginalArticle,
    navigateToNextArticle,
    navigateToNextUnreadArticle,
    navigateToPreviousArticle,
    navigateToPreviousUnreadArticle,
    openLinkExternally,
    openPhotoSlider,
    saveToThirdPartyServices,
    showHotkeysSettings,
    toggleReadStatus,
    toggleStarStatus,
  };
};

export default useKeyHandlers;
