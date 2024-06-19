import { useEffect, useState } from "react";
import FeedbackItem, { FeedbackItemType } from "./FeedbackItem";
import Spinner from "./Spinner";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    ).then((response) => {
      response.json().then((data) => {
        setFeedbackItems(data.feedbacks);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {feedbackItems &&
        feedbackItems.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
        ))}
    </ol>
  );
}
