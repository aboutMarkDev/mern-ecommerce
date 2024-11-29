import { useNavigate } from "react-router-dom";

const AdminHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <header className="px-3 py-5 flex items-center gap-5">
      <button
        className="p-1 rounded-full hover:bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <img
          src="/assets/icons/arrow-small-left.svg"
          alt=""
          width={24}
          height={24}
        />
      </button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
};

export default AdminHeader;
