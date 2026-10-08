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
    <div className="form-card">
      <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem", textAlign: "center" }}>
        Welcome to Addis Eats
      </h1>
      <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--color-text-faint)", marginBottom: "1.5rem" }}>
        Sign in to manage your orders or access staff services
      </p>

      {nextUrl && (
        <div style={{ padding: "0.5rem 0.75rem", backgroundColor: "var(--color-surface-subtle)", borderRadius: "var(--radius-sm)", marginBottom: "1.25rem", fontSize: "0.8125rem", border: "1px solid var(--color-border)" }}>
          Redirect destination: <code style={{ color: "var(--color-primary)", fontWeight: "600" }}>{nextUrl}</code>
        </div>
      )}

      {state?.error && (
        <p className="form-error" style={{ marginBottom: "1rem" }}>
          {state.error}
        </p>
      )}

      <form action={formAction} style={{ display: "flex", flexDirection: "column" }}>
        <input type="hidden" name="next" value={nextUrl || ""} />

        <div className="form-group">
          <label htmlFor="username">Full Name / Account Name</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. Abebe Bikila"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role Permission</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-input"
          >
            <option value="customer">Customer (Order Placement & History)</option>
            <option value="staff">Staff (Kitchen Queue Management)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary"
          style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem" }}
        >
          {isPending ? "Authenticating..." : "Sign In to Account"}
        </button>
      </form>

      <div style={{ marginTop: "1.75rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.25rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-faint)", marginBottom: "0.5rem" }}>
          Quick Demo Accounts:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <button
            type="button"
            onClick={() => setPreset("Abebe Bikila", "customer")}
            className="btn btn-secondary"
            style={{ justifyContent: "flex-start", padding: "0.4rem 0.75rem", fontSize: "0.8125rem", width: "100%" }}
          >
            Abebe Bikila · Customer (Has seed order)
          </button>
          <button
            type="button"
            onClick={() => setPreset("Chala Kebede", "customer")}
            className="btn btn-secondary"
            style={{ justifyContent: "flex-start", padding: "0.4rem 0.75rem", fontSize: "0.8125rem", width: "100%" }}
          >
            Chala Kebede · Customer (Different account)
          </button>
          <button
            type="button"
            onClick={() => setPreset("Chef Almaz", "staff")}
            className="btn btn-secondary"
            style={{ justifyContent: "flex-start", padding: "0.4rem 0.75rem", fontSize: "0.8125rem", width: "100%" }}
          >
            Chef Almaz · Staff (Kitchen access)
          </button>
        </div>
      </div>
    </div>
  );
}
