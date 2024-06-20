import { useEffect, useState } from "react";
import { FeedbackItemType } from "../lib/types";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedbackItem),
      }
    );
  };

  return (
    <div className="app">
      <Footer />
      <Container
        error={error}
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        handleAddFeedbackItem={handleAddFeedback}
      />
      <HashtagList />
    </div>
  );
}

export default App;
