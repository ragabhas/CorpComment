import { TriangleUpIcon } from "@radix-ui/react-icons";

type FeedbackItemProps = {
  feedbackItem: FeedbackItem;
};

type FeedbackItem = {
  voteCount: number;
  badge: string;
  company: string;
  text: string;
  days: number;
};
export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedbackItem.voteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badge}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.days}d</p>
    </li>
  );
}
