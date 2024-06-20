import { FeedbackItemType } from "../../lib/types";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

type ContainerProps = {
  error: string;
  isLoading: boolean;
  feedbackItems: FeedbackItemType[];
  handleAddFeedbackItem: (text: string) => void;
};

export default function Container({
  error,
  isLoading,
  feedbackItems,
  handleAddFeedbackItem,
}: ContainerProps) {
  return (
    <div className="container">
      <Header handleAddFeedbackItem={handleAddFeedbackItem} />
      <FeedbackList
        error={error}
        feedbackItems={feedbackItems}
        isLoading={isLoading}
      />
    </div>
  );
}
