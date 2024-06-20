import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInValidIndicator, setShowInValidIndicator] = useState(false);
  const addFeedback = useFeedbackItemsStore((state) => state.addFeedback);

  const remainingCharachters = MAX_CHARACTERS - text.length;

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_CHARACTERS) {
      return;
    }
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text && text.includes("#") && text.length >= 5) {
      addFeedback(text);
      setText("");
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      setShowInValidIndicator(true);
      setTimeout(() => setShowInValidIndicator(false), 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator && "form--valid"} ${
        showInValidIndicator && "form--invalid"
      }`}
    >
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
