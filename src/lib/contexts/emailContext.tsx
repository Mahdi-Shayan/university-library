"use client";

import { createContext, ReactNode, useContext, useState } from "react";

const EmailContext = createContext<
  { email: string; setEmail: (email: string) => void } | undefined
>(undefined);

export function EmailContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [email, setEmail] = useState<string>(
    JSON.parse(localStorage.getItem("email") as string) || ""
  );

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
