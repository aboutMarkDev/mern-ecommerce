import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const AdminHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <header className="px-3 py-5 flex items-center gap-5">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
      </Button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
};

export default AdminHeader;
