import FeedbackItem from "./FeedbackItem";

const feedbackItem = {
  voteCount: 593,
  badge: "B",
  company: "Microsoft",
  text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, nisi minima? Nam eos magnam architecto!",
  days: 4,
};
export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      <FeedbackItem feedbackItem={feedbackItem} />
      <FeedbackItem feedbackItem={feedbackItem} />
      <FeedbackItem feedbackItem={feedbackItem} />
      <FeedbackItem feedbackItem={feedbackItem} />
      <FeedbackItem feedbackItem={feedbackItem} />
      <FeedbackItem feedbackItem={feedbackItem} />
      <FeedbackItem feedbackItem={feedbackItem} />
    </ol>
  );
}
