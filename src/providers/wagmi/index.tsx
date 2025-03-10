"use client";
import { WagmiProvider } from "wagmi";
import { config } from "./config";

function WagmiWrapper({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}

export default WagmiWrapper;
