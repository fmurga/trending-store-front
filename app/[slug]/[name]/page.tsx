import Container from "@/components/atoms/Container";
import ItemList from "@/components/organisms/Product/ItemsList";
import MainLayout from "@/components/layouts/MainLayout";
import NoProducts from "@/components/extra/NoProducts";
import RootLayout from "../../layout";
import { capitalizeWords } from "@/utils/capitalizeSentence";

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

export default async function SubProducts({
  params,
}: {
  params: { name: string; slug: string };
}) {
  const productsData = await getProducts();

  const filteredItems = productsData.clothes.filter(
    (item) =>
      item.category.some((cat) => cat.name === capitalizeWords(params.slug)) &&
      item.category.some((cat) => cat.name === capitalizeWords(params.name))
  );

  return (
    <>
      <RootLayout>
        <MainLayout>
          <Container>
            <h1 className="font-bold text-2xl">
              {capitalizeWords(`${params.name + " de " + params.slug}`)}
            </h1>
            {filteredItems && filteredItems.length ? (
              <ItemList items={filteredItems} />
            ) : (
              <NoProducts />
            )}
          </Container>
        </MainLayout>
      </RootLayout>
    </>
  );
}
