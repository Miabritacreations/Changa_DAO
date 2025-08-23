import { AuthClient } from "@dfinity/auth-client";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      const loggedIn = await client.isAuthenticated();
      setIsAuthenticated(loggedIn);

      if (loggedIn) {
        const identity = client.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
      }
    };

    initAuth();
  }, []);

  const handleLogin = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: "https://identity.ic0.app", // Internet Identity canister
      onSuccess: async () => {
        setIsAuthenticated(true);
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
      },
    });
  };

  const handleLogout = async () => {
    if (!authClient) return;

    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Changa DAO</h1>

        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <span className="text-sm">Principal: {principal}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
          >
            Login
          </button>
        )}
      </header>

      {/* Main app content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
