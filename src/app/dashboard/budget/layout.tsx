import DinamicHeaderProvider from "@/components/system/DinamicHeader/context/DinamicHeaderContext";
import DinamicHeader from "@/components/system/DinamicHeader/DinamicHeader";

export default function DashboardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DinamicHeaderProvider>
      <DinamicHeader />
      {children}
    </DinamicHeaderProvider>
  );
}
