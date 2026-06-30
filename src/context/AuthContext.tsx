import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  User,
  ConfirmationResult,
} from "@react-native-firebase/auth";
import { Profile, UserType, createProfile, fetchProfile } from "../services/profiles";

interface SignUpInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  location?: string;
  userType: UserType;
}

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  initializing: boolean;
  signUpWithEmail: (input: SignUpInput) => Promise<Profile>;
  signInWithEmail: (email: string, password: string) => Promise<Profile | null>;
  sendPhoneCode: (phoneNumber: string) => Promise<ConfirmationResult>;
  confirmPhoneCode: (
    confirmation: ConfirmationResult,
    code: string
  ) => Promise<Profile | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setProfile(firebaseUser ? await fetchProfile(firebaseUser.uid) : null);
      setInitializing(false);
    });
  }, []);

  const signUpWithEmail = async ({ email, password, fullName, phone, location, userType }: SignUpInput) => {
    const auth = getAuth();
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const newProfile = await createProfile({
      firebaseUid: credential.user.uid,
      userType,
      fullName,
      email,
      phone,
      location,
    });
    setProfile(newProfile);
    return newProfile;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const auth = getAuth();
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const found = await fetchProfile(credential.user.uid);
    setProfile(found);
    return found;
  };

  const sendPhoneCode = (phoneNumber: string) => signInWithPhoneNumber(getAuth(), phoneNumber);

  const confirmPhoneCode = async (
    confirmation: ConfirmationResult,
    code: string
  ) => {
    const credential = await confirmation.confirm(code);
    if (!credential?.user) return null;
    const found = await fetchProfile(credential.user.uid);
    setProfile(found);
    return found;
  };

  const signOut = async () => {
    await firebaseSignOut(getAuth());
    setProfile(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, profile, initializing, signUpWithEmail, signInWithEmail, sendPhoneCode, confirmPhoneCode, signOut }),
    [user, profile, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
