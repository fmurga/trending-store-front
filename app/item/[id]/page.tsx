import RootLayout from "@/app/layout";
import Container from "@/components/atoms/Container";
import NoProducts from "@/components/extra/NoProducts";
import MainLayout from "@/components/layouts/MainLayout";
import ItemDetail from "@/components/organisms/Product/ItemDetail";
async function getProduct(id: string) {
  const res = await fetch(`${process.env.API_PATH}/clothes/${id}`, {
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
export default async function Product({ params }: { params: { id: string } }) {
  const productsData = await getProduct(params.id);

  return (
    <>
      <RootLayout>
        <MainLayout>
          <Container>
            <h1 className="font-bold text-2xl mb-10">{productsData.name}</h1>
            {productsData ? <ItemDetail item={productsData} /> : <NoProducts />}
          </Container>
        </MainLayout>
      </RootLayout>
    </>
  );
}
