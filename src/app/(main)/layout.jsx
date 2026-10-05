import FloatingButton from "../../components/handlClick/HandleClick";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NavItem from "../../components/navitem/NavItem";
import { Suspense } from "react";
import FloatingCalculator from "../../components/FloatingCalculator/FloatingCalculator";

export default function MainLayout({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Suspense fallback={null}>
        <NavItem />
      </Suspense>
      <FloatingButton />
      <FloatingCalculator />
      {children}
      <Footer />
    </>
  );
}
