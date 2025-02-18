"use client";
import {
  Card,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";

import {
  CheckoutInfo,
  MaterialAdjust,
  MaterialsSelection,
  PanelsDirections,
  ProjectSettings,
  ServicesAdjust,
  ServicesSelection,
} from "@/components/system";
import useBudgetContext from "@/app/context/Budget/useBudgetContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BudgetPage() {
  const { client } = useBudgetContext();
  const [tabStep, setTabStep] = useState("project");
  const [tabDisabled, setTabDisabled] = useState(4);
  const [progress, setProgress] = useState(0);

  const steps = [
    { name: "project", translation: "Projeto" },
    { name: "materials", translation: "Materiais" },
    { name: "services", translation: "Serviços" },
    { name: "budget", translation: "Orçamento" },
  ];

  const nextStep = () => {
    const currentStep = steps.findIndex((step) => step.name === tabStep);
    if (currentStep === steps.length - 1) {
      return;
    }
    setTabStep(steps[currentStep + 1].name);
    setTabDisabled((prev) => prev + 1);
  };

  const prevStep = () => {
    const currentStep = steps.findIndex((step) => step.name === tabStep);
    if (currentStep === 0) {
      return;
    }
    setTabStep(steps[currentStep - 1].name);
    setTabDisabled((prev) => prev - 1);
  };

  // const router = useRouter();

  useEffect(() => {
    const tabProgress = (100 / steps.length) * tabDisabled;
    console.log("Progress", tabProgress);
    setProgress(tabProgress);
  }, [tabDisabled, steps.length]);

  if (!client) {
    return <div>No client selected</div>;
    // router.push("/dashboard/user");
  }

  return (
    <Tabs
      defaultValue="project"
      className="w-full"
      value={tabStep}
      onValueChange={setTabStep}
    >
      <TabsList className="w-full justify-start">
        {steps.map((step, index) => (
          <TabsTrigger
            disabled={!(index < tabDisabled)}
            key={step.name}
            value={step.name}
            onClick={() => setTabStep(step.name)}
          >
            {step.translation}
          </TabsTrigger>
        ))}
      </TabsList>
      <Progress value={progress} className="h-1" />
      <TabsContent value="project">
        <div className="h-full  grid grid-cols-12 grid-rows-[500px] p-4  gap-4">
          <Card className="col-span-5 row-start-1 col-start-1 row-span-1  ">
            <ProjectSettings />
          </Card>
          <Card className="col-span-6 row-start-1 row-span-2 col-start-6 min-h-[650px] ">
            <PanelsDirections nextStep={nextStep} />
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="materials">
        <div className="h-full  grid grid-cols-12 grid-rows-[1fr] p-4  gap-4">
          <Card className="col-span-5 row-start-1 col-start-1 row-span-1 min-h-[650px] ">
            <MaterialsSelection />
          </Card>
          <Card className="col-span-6 row-start-1 row-span-1 col-start-6 min-h-[650px] ">
            <MaterialAdjust nextStep={nextStep} />
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="services">
        <div className="h-full  grid grid-cols-12 grid-rows-[1fr] p-4 gap-4">
          <Card className="col-span-5 row-start-1 col-start-1 row-span-1 min-h-[650px]">
            <ServicesSelection />
          </Card>
          <Card className="col-span-6 row-start-1 row-span-1 col-start-6 min-h-[650px] ">
            <ServicesAdjust nextStep={nextStep} />
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="budget">
        <div className="h-full  grid grid-cols-12 grid-rows-[1fr] p-4  gap-4">
          <Card className="col-span-5 row-start-1 col-start-1 row-span-1 min-h-[650px] ">
            <CheckoutInfo />
          </Card>
          <Card className="col-span-6 row-start-1 row-span-1 col-start-6 min-h-[650px] ">
            <ServicesAdjust nextStep={nextStep} />
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
