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
  types: {
    quartzSpanish: boolean;
    quartzNormal: boolean;
    synthetic: boolean;
  };
  color: string;
}

export interface ManufacturingMaterialInfo {
  types: {
    mdf: boolean;
    plywood: boolean;
  };
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

export interface DoorInfo {
  handleTypes: {
    gola: boolean;
    jPull: boolean;
    push: boolean;
    handle: boolean;
  };
}

export interface FrontPayment {
  received: boolean;
  amount: string;
  currency: string;
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
  doorInfo: DoorInfo;
  doors: DoorNote[];
  electricalAppliances: ElectricalAppliances;
  electricalNotes: NoteRow[];
  drawers: DrawerRow[];
  towerCabinets: TowerCabinetRow[];
  manufacturingNotes: ManufacturingNote[];
  frontPayment: FrontPayment;
  frontPaymentNotes: NoteRow[];
  totalPrice: string;
  totalPaid: string;
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
    marble: { types: { quartzSpanish: false, quartzNormal: false, synthetic: false }, color: "" },
    marbleNotes: [{ id: generateId(), note: "" }],
    material: { types: { mdf: false, plywood: false } },
    materialNotes: [{ id: generateId(), note: "" }],
    colors: [{ id: generateId(), code: "", notes: "" }],
    engravings: [{ id: generateId(), code: "", notes: "" }],
    doorInfo: { handleTypes: { gola: false, jPull: false, push: false, handle: false } },
    doors: [{ id: generateId(), note: "" }],
    electricalAppliances: { oven: false, microwave: false, dishwasher: false, washingMachine: false },
    electricalNotes: [{ id: generateId(), note: "" }],
    drawers: [
      { id: generateId(), drawerCount: "", faceCount: "", notes: "" },
    ],
    towerCabinets: [
      { id: generateId(), type: "", location: "", size: "", notes: "" },
    ],
    manufacturingNotes: [{ id: generateId(), note: "" }],
    frontPayment: { received: false, amount: "", currency: "دينار" },
    frontPaymentNotes: [{ id: generateId(), note: "" }],
    totalPrice: "",
    totalPaid: "",
  };
}
