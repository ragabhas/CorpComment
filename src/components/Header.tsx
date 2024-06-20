import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

type HeaderProps = {
  handleAddFeedbackItem: (text: string) => void;
};

export default function Header({ handleAddFeedbackItem }: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddFeedbackItem={handleAddFeedbackItem} />
    </header>
  );
}
