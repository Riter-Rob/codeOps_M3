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
    <div className="form-box" style={{ margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.375rem", marginBottom: "0.25rem" }}>
        Sign In
      </h1>
      <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.25rem" }}>
        Sign in to save delivery addresses and track orders.
      </p>

      {nextUrl && (
        <div style={{ padding: "0.4rem 0.65rem", backgroundColor: "#f9fafb", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.8125rem", border: "1px solid #e5e7eb" }}>
          Redirect destination: <code style={{ color: "#b91c1c", fontWeight: 600 }}>{nextUrl}</code>
        </div>
      )}

      {state?.error && (
        <p className="field-error" style={{ marginBottom: "1rem" }}>
          {state.error}
        </p>
      )}

      <form action={formAction}>
        <input type="hidden" name="next" value={nextUrl || ""} />

        <div className="form-field">
          <label htmlFor="username">Your Name</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. Abebe Bikila"
            required
            className="form-control"
          />
        </div>

        <div className="form-field">
          <label htmlFor="role">Account Type</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-control"
          >
            <option value="customer">Customer (Order food & track)</option>
            <option value="staff">Staff (Kitchen queue access)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "0.5rem" }}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em", color: "#9ca3af", marginBottom: "0.5rem" }}>
          Quick Test Accounts:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <button
            type="button"
            onClick={() => setPreset("Abebe Bikila", "customer")}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: "flex-start" }}
          >
            Abebe Bikila · Customer (Has existing order)
          </button>
          <button
            type="button"
            onClick={() => setPreset("Chala Kebede", "customer")}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: "flex-start" }}
          >
            Chala Kebede · Customer (New account)
          </button>
          <button
            type="button"
            onClick={() => setPreset("Chef Almaz", "staff")}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: "flex-start" }}
          >
            Chef Almaz · Staff (Kitchen access)
          </button>
        </div>
      </div>
    </div>
  );
}
