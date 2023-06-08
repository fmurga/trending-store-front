import Container from "@/components/atoms/Container";
import MainLayout from "@/components/layouts/MainLayout";
import CartContainer from "@/components/organisms/Cart/CartContainer";

export default async function Cart() {
  return (
    <>
      <MainLayout>
        <Container>
          <h1 className="font-bold text-2xl">Bienvenido a Trending</h1>
          <CartContainer />
        </Container>
      </MainLayout>
    </>
  );
}
