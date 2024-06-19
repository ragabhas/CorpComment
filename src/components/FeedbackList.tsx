import { useEffect, useState } from "react";
import FeedbackItem, { FeedbackItemType } from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setFeedbackItems(data.feedbacks);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Failed to fetch feedbacks");
      });
  }, []);

  return (
    <ol className="feedback-list">
      {error && <ErrorMessage message={error} />}
      {isLoading && <Spinner />}
      {feedbackItems &&
        feedbackItems.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
        ))}
    </ol>
  );
}
