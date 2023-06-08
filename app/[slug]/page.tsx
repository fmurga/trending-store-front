import Container from "@/components/atoms/Container";
import ItemList from "@/components/organisms/Product/ItemsList";
import MainLayout from "@/components/layouts/MainLayout";
import NoProducts from "@/components/extra/NoProducts";
import RootLayout from "../layout";

async function getProducts(slug: string) {
  const res = await fetch(`${process.env.API_PATH}/clothes?category=${slug}`, {
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

export default async function Home({ params }: { params: { slug: string } }) {
  const productsData = await getProducts(params.slug);

  const [products] = await Promise.all([productsData]);

  return (
    <>
      <RootLayout>
        <MainLayout>
          <Container>
            <h1 className="font-bold text-2xl">Bienvenido a Trending</h1>
            {products && products.length ? (
              <ItemList items={products} />
            ) : (
              <NoProducts />
            )}
          </Container>
        </MainLayout>
      </RootLayout>
    </>
  );
}
