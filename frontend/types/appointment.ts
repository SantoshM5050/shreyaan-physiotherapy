export interface PatientDetails {
  name: string;
  phone: string;
  email?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  address?: string;
}

export interface AppointmentRequest {
  id?: string;
  patient: PatientDetails;
  serviceId?: string;
  serviceName?: string;
  preferredDate?: string;
  preferredSlot?: string;
  symptoms?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: string;
  source?: 'website' | 'whatsapp' | 'phone';
}

export interface AppointmentApiResponse {
  success: boolean;
  message: string;
  appointment?: AppointmentRequest;
  whatsappUrl?: string;
  errors?: Record<string, string>;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DayAvailability {
  date: string;
  slots: TimeSlot[];
}
