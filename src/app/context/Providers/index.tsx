"use client";
import BudgetProvider from "../Budget/BudgetProvider";
import ControllerProvider from "../Controller";

export type AppProvidersProps = {
  children: React.ReactNode;
};

export default function AppProviders(props: AppProvidersProps) {
  const { children } = props;

  return (
    <ControllerProvider>
      <BudgetProvider>{children}</BudgetProvider>;
    </ControllerProvider>
  );
}
