import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

type FeedbackFormProps = {
  onAddFeedbackItem: (text: string) => void;
};
export default function FeedbackForm({ onAddFeedbackItem }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const remainingCharachters = MAX_CHARACTERS - text.length;

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_CHARACTERS) {
      return;
    }
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFeedbackItem(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        value={text}
        onChange={handleTextAreaChange}
        id="feedback-textarea"
        placeholder="x"
        spellCheck={false}
        maxLength={MAX_CHARACTERS}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company.
      </label>
      <div>
        <p className="u-italic">{remainingCharachters}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
