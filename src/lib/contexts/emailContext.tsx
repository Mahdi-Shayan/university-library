"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const EmailContext = createContext<
  { email: string; setEmail: (email: string) => void } | undefined
>(undefined);

export function EmailContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmailContext() {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error(
      "useEmailContext must be used within an EmailContextProvider"
    );
  }
  return context;
}
