import type { Metadata } from "next";
import { GraphPaper } from "@/components/graph-paper";

export const metadata: Metadata = {
  title: "أحمد ديكور — ورقة رسم",
  description: "ورقة رسم مخصصة لرسم المخططات في موقع الزبون",
};

export default function GraphPaperPage() {
  return <GraphPaper />;
}
