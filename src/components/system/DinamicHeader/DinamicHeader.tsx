"use client";
import { New_Amsterdam } from "next/font/google";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui";
import useDinamicHeader from "./context/useDinamicHeader";

const amsterdam = New_Amsterdam({ subsets: ["latin"], weight: "400" });

export default function DinamicHeader() {
  const { paths } = useDinamicHeader();
  console.log("render");
  return (
    <header className="flex items-center justify-between p-4 bg-[#121212] text-white">
      <div className="flex items-center ">
        <h1 className={`text-lg font-bold ${amsterdam.className}`}>Bsystem</h1>
        <Breadcrumb className="ml-2 h-full ">
          <BreadcrumbList key={Math.random()}>
            {paths.map((path) => (
              <div key={path.title} className="flex items-center space-x-2 ">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={path.href}
                    className="text-white hover:text-gray-300 text-sm font-sans"
                  >
                    {path.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
