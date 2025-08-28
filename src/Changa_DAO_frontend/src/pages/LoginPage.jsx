import { AuthClient } from "@dfinity/auth-client";
import React from "react";

const LoginPage = () => {
  const handleLogin = async () => {
    const client = await AuthClient.create();
    await client.login({ identityProvider: "https://identity.ic0.app" });
    window.location.href = "/dashboard";
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <button onClick={handleLogin} className="px-4 py-2 bg-green-600 text-white rounded">
        Login with Internet Identity
      </button>
    </div>
  );
};

export default LoginPage;


