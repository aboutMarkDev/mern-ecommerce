interface IItems {
  label: string;
}

type FooterCCProps = {
  items: IItems[];
  title: "Company" | "Contacts";
};

const FooterCC = ({ items, title }: FooterCCProps) => {
  return (
    <section className="px-5 space-y-3 w-full">
      <h1 className="text-lg font-semibold uppercase">{title}</h1>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li className="cursor-pointer group" key={item.label}>
            <p className="text-sm group-hover:underline">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FooterCC;
