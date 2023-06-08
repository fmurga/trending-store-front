import Container from "@/components/atoms/Container";
import ItemList from "@/components/organisms/Product/ItemsList";
import RootLayout from "./layout";
import MainLayout from "@/components/layouts/MainLayout";
import NoProducts from "@/components/extra/NoProducts";

async function getProducts() {
  const res = await fetch(`${process.env.API_PATH}/clothes`, {
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

export default async function Home() {
  const productsData = await getProducts();

  const [products] = await Promise.all([productsData]);

  return (
    <>
      <RootLayout>
        <MainLayout>
          <Container>
            <h1 className="font-bold text-2xl">Bienvenido a Trending</h1>
            {products.clothes && products.clothes.length ? (
              <ItemList items={products.clothes} />
            ) : (
              <NoProducts />
            )}
          </Container>
        </MainLayout>
      </RootLayout>
    </>
  );
}
