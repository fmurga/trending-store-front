import Container from "@/components/atoms/Container";
import MainLayout from "@/components/layouts/MainLayout";
import CheckoutContainer from "@/components/organisms/Checkout/CheckoutContainer";
import RootLayout from "../layout";

export default async function Checkout() {
  return (
    <>
      <RootLayout>
        <MainLayout>
          <Container>
            <CheckoutContainer />
          </Container>
        </MainLayout>
      </RootLayout>
    </>
  );
}
