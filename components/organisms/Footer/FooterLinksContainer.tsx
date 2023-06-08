import FooterLinks from "./FooterLinks";

const FooterLinksContainer = () => {
  return (
    <div className="justify-between w-full mt-4 text-center lg:flex">
      <FooterLinks />
      <FooterLinks />
      <FooterLinks />
    </div>
  );
};

export default FooterLinksContainer;
