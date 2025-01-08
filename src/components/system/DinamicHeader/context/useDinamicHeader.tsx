"use client";
import { useContext } from "react";
import { DinamicHeaderContext } from "./DinamicHeaderContext";

export default function useDinamicHeader() {
  return useContext(DinamicHeaderContext);
}
