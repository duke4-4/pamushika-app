import { supabase } from "../lib/supabase";

export type UserType = "consumer" | "vendor";

export interface Profile {
  firebaseUid: string;
  userType: UserType;
  fullName: string;
  email: string | null;
  phone: string | null;
  location: string | null;
}

export interface CreateProfileInput {
  firebaseUid: string;
  userType: UserType;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
}

function toProfile(row: any): Profile {
  return {
    firebaseUid: row.firebase_uid,
    userType: row.user_type,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    location: row.location,
  };
}

export async function fetchProfile(firebaseUid: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .maybeSingle();

  if (error) throw error;
  return data ? toProfile(data) : null;
}

export async function createProfile(input: CreateProfileInput): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      firebase_uid: input.firebaseUid,
      user_type: input.userType,
      full_name: input.fullName,
      email: input.email ?? null,
      phone: input.phone ?? null,
      location: input.location ?? null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return toProfile(data);
}
