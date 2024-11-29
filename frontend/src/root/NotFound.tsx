import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full max-w-7xl mx-auto h-screen px-5 flex-center flex-col gap-3 font-black text-7xl">
      <h4 className="">404</h4>
      <img
        src="/assets/icons/404.png"
        alt="404"
        width={300}
        height={300}
        className="animate-pulse"
      />
      <h4 className="">Not Found!</h4>
      <p className="italic font-light text-base">
        I think you went to non-existing page.
      </p>
      <Button>
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  );
}
