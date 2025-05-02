"use client";

interface Props {
  handleClick: () => void;
}

const Button = ({ handleClick }: Props) => {
  return (
    <button onClick={handleClick} className="btn btn-primary">
      Show
    </button>
  );
};

export default Button;
