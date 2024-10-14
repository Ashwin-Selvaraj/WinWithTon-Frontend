import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import React, { useCallback, useEffect, useState } from "react";
import './ConnectWalletButton.css'; // Import your CSS file

export default function ConnectWalletButton() {
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleWalletConnection = useCallback((address) => {
        setTonWalletAddress(address);
        console.log("Wallet Connected Successfully! " + address);
        setIsLoading(false);
    }, []);

    const handleWalletDisconnection = useCallback(() => {
        setTonWalletAddress(null);
        console.log("Wallet Disconnected Successfully!");
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                handleWalletConnection(tonConnectUI.account?.address);
            } else {
                handleWalletDisconnection();
            }
        };
        checkWalletConnection();

        const unSubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                handleWalletConnection(wallet.account.address);
            } else {
                handleWalletDisconnection();
            }
        });

        return () => {
            unSubscribe();
        };

    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            setIsLoading(true);
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };

    const formatAddress = (address) => {
        const userFriendlyAddress = toUserFriendlyAddress(address);
        console.log("User Wallet Address " + userFriendlyAddress);
        return userFriendlyAddress;
    };

    if (isLoading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center">
                <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
                    Loading...
                </div>
            </main>
        );
    }

    return (
        <React.Fragment>
            <div className="container"> {/* Added container for positioning */}
                {tonWalletAddress ? (
                    <div className="flex flex-col items-center">
                        <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
                        <button
                            onClick={handleWalletAction}
                            className={`wallet-button disconnect-button`} // Use both classes
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleWalletAction}
                        className="wallet-button"
                    >
                        Connect TON Wallet
                    </button>
                )}
            </div>
        </React.Fragment>
    );
}
