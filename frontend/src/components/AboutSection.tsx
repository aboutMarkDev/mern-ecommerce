const AboutSection = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <section className="space-y-2">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-pretty">{desc}</p>
    </section>
  );
};

export default AboutSection;
