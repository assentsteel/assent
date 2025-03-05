"use client";
import CareerForm from "../career-form";
import { useParams } from "next/navigation";

export default function CareerPage() {
  const { id } = useParams();
  return <CareerForm careerId={id as string} />;
}
