"use client";

import { useActionState, useState } from "react";
import { signIn } from "../actions/auth";

export default function SignInForm({ nextUrl }) {
  const [state, formAction, isPending] = useActionState(signIn, { error: null });
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("customer");

  function setPreset(name, userRole) {
    setUsername(name);
    setRole(userRole);
  }

  return (
    <div style={{ maxWidth: "420px", margin: "0 auto", padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Sign In</h2>

      {nextUrl && (
        <div style={{ padding: "8px", backgroundColor: "#f3f4f6", borderRadius: "4px", marginBottom: "1rem", fontSize: "0.875rem" }}>
          Target destination: <code>{nextUrl}</code>
        </div>
      )}

      {state?.error && (
        <p style={{ color: "#dc2626", fontSize: "0.875rem", marginBottom: "1rem" }}>{state.error}</p>
      )}

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="hidden" name="next" value={nextUrl || ""} />

        <div>
          <label htmlFor="username" style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. Abebe Bikila"
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>

        <div>
          <label htmlFor="role" style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "10px",
            backgroundColor: isPending ? "#9ca3af" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: isPending ? "not-allowed" : "pointer",
            fontWeight: "600"
          }}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px" }}>Quick test accounts:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <button
            type="button"
            onClick={() => setPreset("Abebe Bikila", "customer")}
            style={{ padding: "6px 10px", textAlign: "left", fontSize: "0.875rem", cursor: "pointer" }}
          >
            Abebe Bikila (Customer - has seed order)
          </button>
          <button
            type="button"
            onClick={() => setPreset("Chala Kebede", "customer")}
            style={{ padding: "6px 10px", textAlign: "left", fontSize: "0.875rem", cursor: "pointer" }}
          >
            Chala Kebede (Customer - different account)
          </button>
          <button
            type="button"
            onClick={() => setPreset("Chef Almaz", "staff")}
            style={{ padding: "6px 10px", textAlign: "left", fontSize: "0.875rem", cursor: "pointer" }}
          >
            Chef Almaz (Staff - kitchen access)
          </button>
        </div>
      </div>
    </div>
  );
}
