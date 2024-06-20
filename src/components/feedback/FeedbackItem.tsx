import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackItemType } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = {
  feedbackItem: FeedbackItemType;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`feedback ${open && "feedback--expand"}`}
      onClick={() => setOpen(!open)}
    >
      <button>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
