const Language = ({ title, languages, hclass, type }: {
  title: string;
  languages: string[];
  hclass?: string;
  type?: "list" | "text";
}) => {
  return (
    languages.length > 0 && (
      <div>
        <h2 className={"section-title mb-1 border-b-2 border-gray-300 " + hclass}>
          {title}
        </h2>
        {type === "list" || languages.length < 4 ? (
          <ul className="sub-content">
            {languages.map((language, index) => (
              <li className="list-disc" key={index}>{language}</li>
            ))}
          </ul>
        ) :
        (<p className="sub-content">{languages.join(", ")}</p>)}
      </div>
    )
  );
};

export default Language;