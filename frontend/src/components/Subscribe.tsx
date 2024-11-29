import { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something here when submitting the email...
    console.log(email);
    setEmail("");
  };
  return (
    <section className="flex-center flex-col  gap-3">
      <div className="w-full max-w-[60rem]">
        <h1 className="text-center text-2xl font-semibold">
          Subscribe and get 20% off
        </h1>
        <p className="text-center text-gray-400 font-light">
          This will only apply for first-time subscribers.
        </p>
      </div>

      <form
        className="w-full max-w-[60rem] flex-center"
        onSubmit={handleSubscribe}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-r-none border rounded w-1/2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="subscribe-btn">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Subscribe;
