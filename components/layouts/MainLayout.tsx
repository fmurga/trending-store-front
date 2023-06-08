import Footer from "../organisms/Footer/Footer";
import NavBar from "../organisms/Navigation/NavBar";

async function getLinks() {
  const res = await fetch(`${process.env.API_PATH}/links`, {
    next: { revalidate: 60 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const MainLayout = async ({ children }: any) => {
  const linksData = await getLinks();

  const [links] = await Promise.all([linksData]);

  return (
    <>
      <NavBar json={links} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
