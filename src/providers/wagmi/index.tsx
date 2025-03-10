"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { WagmiProvider } from "wagmi";
import { config } from "./config";

function WagmiWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <ProgressBar
        height="6px"
        color="#00B2A1"
        options={{ showSpinner: false }}
      />
      {children}
    </WagmiProvider>
  );
}

export default WagmiWrapper;
