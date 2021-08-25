import { AuthProvider } from "./Auth";
import { CartProvider } from "./Cart";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}
const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default Providers;
