import React from "react";
interface Props {
  count: number;
  length: number;
  title: string;
}
const Words: React.FC<Props> = ({ count, length, title }) => {
  return (
    <div className="my-3 card bg-dark text-light p-2">
      <div className="card-body">
        <span className="d-flex align-items-center gap-3">
          <span>Percentage of {title} : </span>
          <span>{length > 0 ? Math.round((length / count) * 100) : 0} %</span>
        </span>
      </div>
    </div>
  );
};

export default Words;
