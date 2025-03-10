import React from "react";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";

const WalletConnectButton = () => {
  const { connect, isPending } = useConnect();
  return (
    <button
      disabled={isPending}
      onClick={() => connect({ connector: metaMask() })}
      className="flex items-center text-xs lg:text-sm font-medium text-accent space-x-2 border border-athens rounded-lg px-4 py-[0.625rem]"
    >
      <VscDebugDisconnect size={18} />
      <span>Connect</span>
    </button>
  );
};

export default WalletConnectButton;
