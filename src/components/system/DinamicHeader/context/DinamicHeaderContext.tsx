/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createContext, useState } from "react";

type Path = {
  title: string;
  href: string;
};

export const DinamicHeaderContext = createContext({
  paths: [] as Path[],
  addPath: (_path: Path) => {},
  removePath: (_path: Path) => {},
  clearPaths: (_basePath: Path) => {},
});

export default function DinamicHeaderProvider(props: {
  children: React.ReactNode;
}) {
  const [paths, setPaths] = useState<Path[]>([]);

  const addPath = (path: Path) => {
    setPaths((prevPaths) => [...prevPaths, path]);
  };

  const removePath = (path: Path) => {
    setPaths((prevPaths) => prevPaths.filter((p) => p.href !== path.href));
  };

  const clearPaths = (basePath: Path) => {
    setPaths([basePath]);
  };

  const contextValue = {
    paths,
    addPath,
    removePath,
    clearPaths,
  };

  return (
    <DinamicHeaderContext.Provider value={contextValue}>
      {props.children}
    </DinamicHeaderContext.Provider>
  );
}
