import fs from "fs";
import path from "path";
import { AppointmentRequest } from "../../types/appointment";
import { DoctorUser } from "../../services/authService";

export interface DBAppointment extends AppointmentRequest {
  id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}

interface DatabaseSchema {
  appointments: DBAppointment[];
  doctor: DoctorUser;
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

const DEFAULT_DOCTOR: DoctorUser = {
  id: process.env.DOCTOR_ID || "DOC-ACTIVE",
  name: process.env.DOCTOR_NAME || "Dr. Sonam Maurya",
  email: (process.env.DOCTOR_EMAIL || "doctor@example.com").toLowerCase(),
  role: "doctor",
  qualification: process.env.DOCTOR_QUALIFICATION || "BPTh (Mumbai University)",
  registrationNo: process.env.DOCTOR_REGISTRATION || "10534",
};

const INITIAL_APPOINTMENTS: DBAppointment[] = [
  {
    id: "APT-101",
    patient: {
      name: "Rajesh Sharma",
      phone: "+91 9876543210",
      email: "rajesh.sharma@example.com",
    },
    serviceName: "Back & Neck Pain Rehabilitation",
    preferredDate: "2026-08-02",
    preferredSlot: "10:30 AM",
    symptoms: "Chronic lower back pain radiating to left leg",
    status: "confirmed",
    createdAt: new Date().toISOString(),
    source: "website",
  },
  {
    id: "APT-102",
    patient: {
      name: "Pooja Verma",
      phone: "+91 9812345678",
      email: "pooja.v@example.com",
    },
    serviceName: "Knee & Joint Pain Management",
    preferredDate: "2026-08-02",
    preferredSlot: "11:15 AM",
    symptoms: "Bilateral knee stiffness, difficulty climbing stairs",
    status: "confirmed",
    createdAt: new Date().toISOString(),
    source: "website",
  },
  {
    id: "APT-103",
    patient: {
      name: "Amit Singh",
      phone: "+91 9711223344",
      email: "amit.singh@example.com",
    },
    serviceName: "Dry Needling & Cupping Therapy",
    preferredDate: "2026-08-02",
    preferredSlot: "02:00 PM",
    symptoms: "Upper back muscle knots and strain",
    status: "pending",
    createdAt: new Date().toISOString(),
    source: "website",
  },
  {
    id: "APT-104",
    patient: {
      name: "Sunita Gupta",
      phone: "+91 9655443322",
      email: "sunita.g@example.com",
    },
    serviceName: "Post-Surgical Knee Rehab",
    preferredDate: "2026-08-01",
    preferredSlot: "03:30 PM",
    symptoms: "ACL reconstruction post-op rehabilitation week 4",
    status: "completed",
    createdAt: new Date().toISOString(),
    source: "website",
  },
];

function ensureDatabaseExists(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      appointments: INITIAL_APPOINTMENTS,
      doctor: DEFAULT_DOCTOR,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }

  try {
    const fileContent = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(fileContent) as DatabaseSchema;
  } catch {
    const initialData: DatabaseSchema = {
      appointments: INITIAL_APPOINTMENTS,
      doctor: DEFAULT_DOCTOR,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }
}

function writeDatabase(data: DatabaseSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

export class DataStore {
  static getDoctor(): DoctorUser {
    const db = ensureDatabaseExists();
    return db.doctor;
  }

  static getAppointments(): DBAppointment[] {
    const db = ensureDatabaseExists();
    return db.appointments;
  }

  static getAppointmentById(id: string): DBAppointment | null {
    const appointments = this.getAppointments();
    return appointments.find((a) => a.id === id) || null;
  }

  static createAppointment(appointmentData: Omit<DBAppointment, "id" | "createdAt"> & { id?: string }): DBAppointment {
    const db = ensureDatabaseExists();
    const newId = appointmentData.id || `APT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newAppointment: DBAppointment = {
      ...appointmentData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    db.appointments.unshift(newAppointment);
    writeDatabase(db);
    return newAppointment;
  }

  static updateAppointment(id: string, updates: Partial<DBAppointment>): DBAppointment | null {
    const db = ensureDatabaseExists();
    const index = db.appointments.findIndex((a) => a.id === id);

    if (index === -1) return null;

    db.appointments[index] = {
      ...db.appointments[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    writeDatabase(db);
    return db.appointments[index];
  }

  static deleteAppointment(id: string): boolean {
    const db = ensureDatabaseExists();
    const initialLength = db.appointments.length;
    db.appointments = db.appointments.filter((a) => a.id !== id);

    if (db.appointments.length !== initialLength) {
      writeDatabase(db);
      return true;
    }

    return false;
  }
}
