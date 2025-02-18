"use client";
import { AppProvider } from "../App/AppContext";
import BudgetProvider from "../Budget/BudgetProvider";
import ControllerProvider from "../Controller";

export type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <AppProvider>
      <ControllerProvider>
        <BudgetProvider>{children}</BudgetProvider>;
      </ControllerProvider>
    </AppProvider>
  );
}
