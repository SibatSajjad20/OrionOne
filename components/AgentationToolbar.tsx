"use client";

import { useEffect, useState, type ComponentType } from "react";

type AgentationProps = {
  endpoint?: string;
};

export default function AgentationToolbar() {
  const [Agentation, setAgentation] = useState<ComponentType<AgentationProps> | null>(null);

  const isDev = process.env.NODE_ENV === "development";
  const isExplicitlyEnabled = process.env.NEXT_PUBLIC_ENABLE_AGENTATION === "true";
  const isExplicitlyDisabled = process.env.NEXT_PUBLIC_ENABLE_AGENTATION === "false";
  const isEnabled = (isDev || isExplicitlyEnabled) && !isExplicitlyDisabled;

  useEffect(() => {
    if (!isEnabled) return;

    let cancelled = false;

    void import("agentation").then((mod) => {
      if (!cancelled) {
        setAgentation(() => mod.Agentation as ComponentType<AgentationProps>);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isEnabled]);

  if (!isEnabled || !Agentation) {
    return null;
  }

  const endpoint =
    process.env.NEXT_PUBLIC_AGENTATION_ENDPOINT || "http://localhost:4747";

  return <Agentation endpoint={endpoint} />;
}
