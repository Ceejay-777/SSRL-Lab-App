import { Link } from "react-router-dom";

const Dashboxes = ({ children, header, nav }) => {
  return (
    <div className="flex flex-col gap-1 shadow-lg p-6 rounded-2xl text-left border">
      <h2 className="font-semibold text-xl">{header}</h2>
      {children}
      <Link
        to={`/home/${nav}`}
        className=" text-logo block text-right text-sm mt-6 hover:underline transition-all duration-300 ease-in"
      >
        See all...
      </Link>
    </div>
  );
};

export default Dashboxes;
