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

export interface ElectricalAppliances {
  oven: boolean;
  microwave: boolean;
  dishwasher: boolean;
  washingMachine: boolean;
  notes: string;
}

export interface DrawerRow {
  id: string;
  drawerCount: string;
  faceCount: string;
  notes: string;
}

export interface TowerCabinetRow {
  id: string;
  type: string;
  location: string;
  size: string;
  notes: string;
}

export interface FrontPayment {
  received: boolean;
  amount: string;
}

export interface ContractData {
  customer: CustomerInfo;
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
  electricalAppliances: ElectricalAppliances;
  drawers: DrawerRow[];
  towerCabinets: TowerCabinetRow[];
  frontPayment: FrontPayment;
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
    electricalAppliances: { oven: false, microwave: false, dishwasher: false, washingMachine: false, notes: "" },
    drawers: [
      { id: generateId(), drawerCount: "", faceCount: "", notes: "" },
    ],
    towerCabinets: [
      { id: generateId(), type: "", location: "", size: "", notes: "" },
    ],
    frontPayment: { received: false, amount: "" },
    manufacturingNotes: [{ id: generateId(), note: "" }],
  };
}
