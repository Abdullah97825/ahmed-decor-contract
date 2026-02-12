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

export interface NoteRow {
  id: string;
  note: string;
}

export interface StoveInfo {
  center: string;
  size: string;
}

export interface SinkInfo {
  center: string;
  size: string;
}

export interface MarbleInfo {
  type: string;
  color: string;
}

export interface ManufacturingMaterialInfo {
  type: string;
}

export interface ManufacturingNote {
  id: string;
  note: string;
}

export interface ContractData {
  customer: CustomerInfo;
  dimensions: DimensionRow[];
  stove: StoveInfo;
  stoveNotes: NoteRow[];
  sink: SinkInfo;
  sinkNotes: NoteRow[];
  marble: MarbleInfo;
  marbleNotes: NoteRow[];
  material: ManufacturingMaterialInfo;
  materialNotes: NoteRow[];
  colors: ColorRow[];
  engravings: EngravingRow[];
  doors: DoorNote[];
  manufacturingNotes: ManufacturingNote[];
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
    stove: { center: "", size: "" },
    stoveNotes: [{ id: generateId(), note: "" }],
    sink: { center: "", size: "" },
    sinkNotes: [{ id: generateId(), note: "" }],
    marble: { type: "", color: "" },
    marbleNotes: [{ id: generateId(), note: "" }],
    material: { type: "" },
    materialNotes: [{ id: generateId(), note: "" }],
    colors: [{ id: generateId(), code: "", notes: "" }],
    engravings: [{ id: generateId(), code: "", notes: "" }],
    doors: [{ id: generateId(), note: "" }],
    manufacturingNotes: [{ id: generateId(), note: "" }],
  };
}
