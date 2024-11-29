import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <main className="h-screen flex-center">
      <section className="flex flex-col items-center gap-1">
        <div className="w-[5rem] h-[5rem]">
          <img
            src="/assets/icons/confirmation.gif"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl italic font-bold">
            Thank you for purchasing.
          </h1>
          <h3 className="text-gray-500">
            Stay tune on our application for updates regarding your order(s).
          </h3>
          <Link to="/">
            <Button size="sm">Back to homepage</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Confirmation;
