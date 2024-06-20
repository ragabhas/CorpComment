import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { FeedbackItemType } from "../../lib/types";

type FeedbackListProps = {
  error: string;
  isLoading: boolean;
  feedbackItems: FeedbackItemType[];
};

export default function FeedbackList({
  error,
  isLoading,
  feedbackItems,
}: FeedbackListProps) {
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
