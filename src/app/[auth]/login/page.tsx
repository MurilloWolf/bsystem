"use client";
import { New_Amsterdam } from "next/font/google";
import LoginForm from "./components/Form";
import { Card, CardContent, CardFooter } from "@/components/ui";

const amsterdam = New_Amsterdam({ subsets: ["latin"], weight: "400" });
export default function LoginPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className={`text-5xl text-bolder ${amsterdam.className}`}>
            Bsystem
          </h1>
          <p>
            <span className="text-sm text-gray-400">
              Um produto da <strong>Brasa Solar</strong>
            </span>
          </p>
        </div>
        <Card className="w-full min-w-[300px] max-w-[384px]">
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <p className="text-right w-full text-xs font-thin">v0.0.1</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
