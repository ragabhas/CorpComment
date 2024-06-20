type HashtagItemProps = {
  company: string;
  onSelectCompany: (company: string) => void;
};

export default function HashtagItem({
  company,
  onSelectCompany,
}: HashtagItemProps) {
  const handleOnClick = () => {
    onSelectCompany(company);
  };

  return (
    <li key={company}>
      <button onClick={handleOnClick}>#{company}</button>
    </li>
  );
}
