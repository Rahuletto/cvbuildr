const Language = ({ title, languages, hclass }: {
  title: string;
  languages: string[];
  hclass?: string;
}) => {
  return (
    languages.length > 0 && (
      <div>
        <h2 className={"section-title mb-1 border-b-2 border-gray-300 " + hclass}>
          {title}
        </h2>
        <p className="sub-content">{languages.join(", ")}</p>
      </div>
    )
  );
};

export default Language;