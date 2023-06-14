import Container from "@/components/atoms/Container";
import MainLayout from "@/components/layouts/MainLayout";
import dynamic from "next/dynamic";

const CartContainer = dynamic(
  () => import("@/components/organisms/Cart/CartContainer"),
  {
    loading: () => <p>Loading</p>,
  }
);

export default async function Cart() {
  return (
    <>
      <MainLayout>
        <Container>
          <h1 className="font-bold text-2xl">Carrito de compras</h1>
          <CartContainer />
        </Container>
      </MainLayout>
    </>
  );
}
