import { CloudSun, PencilRuler, Zap } from "lucide-react";
import { useState } from "react";
import ConsumptionCalculator from "./ConsumptionCalculator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
export default function Toolbox() {
  const tools = [
    {
      icon: <CloudSun className="hover:fill-gray-900" />,
      title: "Weather",
      description: "Check the weather forecast",
      component: () => <div>Weather</div>,
    },
    {
      icon: <Zap className="hover:fill-gray-900" />,
      title: "Energy",
      description: "Calculadora de consumo ",
      component: () => <ConsumptionCalculator />,
    },
    {
      icon: <PencilRuler className="hover:fill-gray-900" />,
      title: "Design",
      description: "Check the design",
      component: () => <div>Design</div>,
    },
  ];

  const [selectedTool, setSelectedTool] = useState<null | number>(null);

  const handleToolClick = (index: number) => {
    setSelectedTool(selectedTool === index ? null : index);
  };

  return (
    <aside
      className={`flex flex-row h-full absolute top-[60px] right-0 bg-gray-50 transition-all ease-in-out duration-600`}
    >
      <div className="w-12 flex flex-col justify-center items-center gap-4 py-4 ">
        {tools.map((tool, index) => (
          <TooltipProvider key={tool.title}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  key={tool.title}
                  onClick={() => handleToolClick(index)}
                  className="w-full border-l-2 border-transparent hover:border-gray-300 p-2 cursor-pointer"
                >
                  {tool.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tool.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div
        className={`w-[350px] bg-white transition-all ease-in-out duration-600 ${
          selectedTool !== null ? "w-full" : "hidden"
        }`}
      >
        {selectedTool !== null && tools[selectedTool].component()}
      </div>
    </aside>
  );
}
