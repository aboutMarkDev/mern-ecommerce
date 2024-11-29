import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <main className="w-full max-w-[100rem] max-md:max-w-[80rem] mx-auto min-h-screen pb-5 flex flex-col gap-5">
      {/* Nav */}
      <Header />
      {/* Pages */} {/*FLEX GROW */}
      <section className="flex grow">
        <Outlet />
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default RootLayout;
