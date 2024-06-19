import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const remainingCharachters = MAX_CHARACTERS - text.length;

  return (
    <form className="form">
      <textarea
        value={text}
        onChange={(e) => {
          if (e.target.value.length > MAX_CHARACTERS) {
            return;
          }
          setText(e.target.value);
        }}
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
