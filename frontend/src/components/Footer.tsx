import { footerCompany, footerContacts } from "../constants";
import FooterCC from "./FooterCC";

const Footer = () => {
  return (
    <footer className="footer-container border-t">
      <section className="flex max-sm:flex-col gap-5">
        <section className="w-full space-y-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" width={60} height={60} />
            <h1 className="font-semibold text-xl max-md:text-lg">Everywear</h1>
          </div>
          <p className="text-pretty text-sm max-sm:text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            asperiores excepturi delectus ea obcaecati nam voluptatum nobis
            neque, voluptatem impedit reprehenderit sint animi atque mollitia
            eligendi porro earum. Blanditiis, culpa.
          </p>
        </section>

        {/* Contacts/Company About */}
        <section className="w-full flex px-3 max-sm:flex-col gap-8">
          <FooterCC items={footerCompany} title="Company" />

          <FooterCC items={footerContacts} title="Contacts" />
        </section>
      </section>

      <section>
        <h1 className="text-center text-sm">
          Copyright &copy; {new Date().getFullYear()} DevMark. All rights
          reserved.
        </h1>
      </section>
    </footer>
  );
};

export default Footer;
