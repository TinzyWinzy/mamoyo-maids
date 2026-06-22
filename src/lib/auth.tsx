"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithPhone: (phone: string) => Promise<ConfirmationResult>;
  verifyOTP: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  confirmationResult: ConfirmationResult | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithPhone = async (phone: string) => {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    const result = await signInWithPhoneNumber(auth, phone, verifier);
    setConfirmationResult(result);
    return result;
  };

  const verifyOTP = async (code: string) => {
    if (!confirmationResult) throw new Error("No OTP sent. Request a code first.");
    await confirmationResult.confirm(code);
    setConfirmationResult(null);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithPhone,
        verifyOTP,
        logout,
        confirmationResult,
      }}
    >
      <div id="recaptcha-container" />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
