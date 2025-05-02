"use client";

const LodashBtn = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button className="btn btn-secondary" onClick={handleClick}>
      Run Lodash Command
    </button>
  );
};

export default LodashBtn;
