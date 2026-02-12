import type { Metadata } from "next";
import { SurveyForm } from "@/components/survey-form";

export const metadata: Metadata = {
  title: "أحمد ديكور — استمارة كشف أولي",
  description: "استمارة كشف أولي لجمع المعلومات من موقع الزبون",
};

export default function SurveyPage() {
  return <SurveyForm />;
}
