"use client";
import Container from "@/components/atoms/Container";
import MainLayout from "@/components/layouts/MainLayout";
import CheckoutContainer from "@/components/organisms/Checkout/CheckoutContainer";

export default async function Checkout() {
  return (
    <>
      <MainLayout>
        <Container>
          <h1 className="font-bold text-2xl">Bienvenido a Trending</h1>
          <CheckoutContainer />
        </Container>
      </MainLayout>
    </>
  );
}
