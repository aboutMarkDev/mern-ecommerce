import AboutSection from "../../components/AboutSection";
import Subscribe from "../../components/Subscribe";
import { aboutSection, whyUs } from "../../constants";

const About = () => {
  return (
    <section className="px-3 space-y-10">
      <h1 className="uppercase max-sm:text-2xl text-3xl font-bold">About Us</h1>
      <main className="flex-between max-md:flex-col gap-5">
        <section className="w-full max-w-[500px] flex-center">
          <img
            src="/assets/about.jpg "
            alt="about"
            width={350}
            height={350}
            className="rounded-xl"
          />
        </section>
        <section className="w-full space-y-3">
          {aboutSection.map((item) => (
            <AboutSection
              key={item.title}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </section>
      </main>

      <section className="space-y-5">
        <h1 className="text-2xl uppercase font-semibold">Why Us</h1>
        <article className="flex justify-between max-md:flex-col gap-5 w-full">
          {whyUs.map((item) => (
            <section
              key={item.title}
              className="border px-5 py-8 rounded-md space-y-3 shadow max-md:w-full max-md:max-w-[400px] max-md:mx-auto"
            >
              <div className="flex-center gap-1">
                <h1 className="font-semibold">{item.title}</h1>
                <img src={item.gif} alt={item.title} width={35} height={35} />
              </div>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </section>
          ))}
        </article>
      </section>
      <Subscribe />
    </section>
  );
};

export default About;
