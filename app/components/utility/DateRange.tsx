interface DateRangeProps {
  startYear: string;
  endYear: string;
  id: string;
}

const DateRange: React.FC<DateRangeProps> = ({ startYear, endYear, id }) => {
  if (!startYear) {
    return <p id={id} className="sub-content"></p>;
  }

  const start = new Date(startYear);
  const end = new Date(endYear);
  return (
    <p id={id} className="sub-content">
      {start.toLocaleString("default", { month: "short" })},{" "}
      {start.getFullYear()} -{" "}
      {!isNaN(end.getTime())
        ? end.toLocaleString("default", { month: "short" }) +
          ", " +
          end.getFullYear()
        : "Present"}
    </p>
  );
};

export default DateRange;
