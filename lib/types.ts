export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  date: string;
}

export interface DimensionRow {
  id: string;
  label: string;
  length: string;
  height: string;
  notes: string;
}

export interface ColorRow {
  id: string;
  code: string;
  notes: string;
}

export interface EngravingRow {
  id: string;
  code: string;
  notes: string;
}

export interface DoorNote {
  id: string;
  note: string;
}

export interface ContractData {
  customer: CustomerInfo;
  dimensions: DimensionRow[];
  colors: ColorRow[];
  engravings: EngravingRow[];
  doors: DoorNote[];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function createEmptyContract(): ContractData {
  const today = new Date().toISOString().split("T")[0];
  return {
    customer: {
      name: "",
      phone: "",
      address: "",
      date: today,
    },
    dimensions: [
      { id: generateId(), label: "", length: "", height: "", notes: "" },
    ],
    colors: [{ id: generateId(), code: "", notes: "" }],
    engravings: [{ id: generateId(), code: "", notes: "" }],
    doors: [{ id: generateId(), note: "" }],
  };
}
