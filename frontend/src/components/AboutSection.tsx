const AboutSection = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <section className="space-y-2">
      <h1 className="max-sm:text-base text-lg font-semibold">{title}</h1>
      <p className="max-sm:text-sm text-pretty">{desc}</p>
    </section>
  );
};

export default AboutSection;
