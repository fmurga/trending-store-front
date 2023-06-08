import Link from "next/link";

const FooterLinks = () => {
  return (
    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
      <h2 className="mb-2 font-bold text-white underline underline-offset-2">
        Useful Links
      </h2>
      <ul className="mb-8 space-y-2 text-sm list-none">
        <li>
          <Link
            href="/"
            className="text-white font-semibold hover:text-purple-600"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-white font-semibold hover:text-purple-600"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-white font-semibold hover:text-purple-600"
          >
            Blogs
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-white font-semibold hover:text-purple-600"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </div>

    //TODO: Improve Links mapping
    /*     
    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
      <h2 className="mb-2 font-bold text-white underline underline-offset-2">
        {title}
      </h2>
      <ul className="mb-8 space-y-2 text-sm list-none">
        {links &&
          links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.path}
                className="text-white font-semibold hover:text-purple-600">
                {link.name}
              </Link>
            </li>
          ))}
      </ul>
    </div> 
    */
  );
};

export default FooterLinks;
