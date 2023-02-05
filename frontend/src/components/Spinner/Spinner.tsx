import React from "react";

const Spinner: React.FC<{ status?: string }> = ({ status }) => {
  return (
    <div className="d-flex justify-content-center flex-column    my-4 align-items-center">
      <div className="spinner-border text-danger " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="fs-5 my-3 text-center">{status}</p>
    </div>
  );
};

export default Spinner;
