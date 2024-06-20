import { useEffect, useMemo, useState } from "react";
import { FeedbackItemType } from "../lib/types";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((feedbackItem) => feedbackItem.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
  );

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompany((selected) => (selected === company ? "" : company));
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch {
        setError("Failed to fetch feedbacks");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbackItems();
  }, []);

  const handleAddFeedback = async (text: string) => {
    const companyName =
      text
        .split(" ")
        .find((word) => word.includes("#"))
        ?.substring(1) || "";

    const newFeedbackItem: FeedbackItemType = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName?.substring(0, 1).toUpperCase() || "",
      company: companyName,
      text,
      daysAgo: 0,
    };
    setFeedbackItems([newFeedbackItem, ...feedbackItems]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newFeedbackItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="app">
      <Footer />
      <Container
        error={error}
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        handleAddFeedbackItem={handleAddFeedback}
      />
      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
