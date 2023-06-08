import RootLayout from "@/app/layout";
import Container from "@/components/atoms/Container";
import MainLayout from "@/components/layouts/MainLayout";

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <RootLayout>
        <MainLayout>
          <Container>
            <h1 className="font-bold text-2xl">Bienvenido a Trending</h1>
          </Container>
        </MainLayout>
      </RootLayout>
    </>
  );
}
