"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { placeOrder, cancelOrder } from "../actions/order";

const AREA_OPTIONS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export default function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(placeOrder, {
    fieldErrors: {},
    success: false
  });
  const [cancelMessage, setCancelMessage] = useState(null);

  async function handleCancel(id) {
    const res = await cancelOrder(id);
    if (res?.error) {
      setCancelMessage(res.error);
    } else {
      setCancelMessage("Order cancelled successfully");
    }
  }

  if (state?.success && state?.order) {
    return (
      <div className="card" style={{ maxWidth: "520px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <span className="badge badge-success">Confirmed</span>
          <span style={{ fontSize: "0.875rem", color: "var(--color-text-faint)" }}>
            Ticket #{state.order.id}
          </span>
        </div>

        <h2 style={{ margin: "0 0 0.5rem 0" }}>Order Received!</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--color-text-muted)" }}>
          Thank you, <strong>{state.order.name}</strong>. The kitchen is preparing your dishes.
        </p>

        <div style={{ background: "var(--color-surface-subtle)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem" }}>
          <p style={{ margin: "0.25rem 0" }}><strong>Delivery Area:</strong> {state.order.area}</p>
          <p style={{ margin: "0.25rem 0" }}><strong>Phone:</strong> {state.order.phone}</p>
          <p style={{ margin: "0.25rem 0" }}><strong>Current Status:</strong> <span className="badge badge-warning">{state.order.status}</span></p>
        </div>

        {cancelMessage && (
          <p style={{ color: "var(--color-danger)", fontSize: "0.875rem", marginBottom: "1rem" }}>
            {cancelMessage}
          </p>
        )}

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {state.order.status !== "cancelled" && (
            <button
              type="button"
              onClick={() => handleCancel(state.order.id)}
              className="btn btn-danger"
              style={{ padding: "0.45rem 1rem", fontSize: "0.875rem" }}
            >
              Cancel Order
            </button>
          )}

          <Link
            href={`/order-status?id=${state.order.id}`}
            className="btn btn-primary"
            style={{ padding: "0.45rem 1rem", fontSize: "0.875rem" }}
          >
            Track in Real Time &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="form-card">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          defaultValue={state?.data?.name || ""}
          placeholder="e.g. Abebe Bikila"
          className="form-input"
        />
        {state?.fieldErrors?.name && (
          <p className="form-error">{state.fieldErrors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">TeleBirr / Mobile Phone</label>
        <input
          id="phone"
          name="phone"
          placeholder="09XXXXXXXX or +2519XXXXXXXX"
          defaultValue={state?.data?.phone || ""}
          className="form-input"
        />
        {state?.fieldErrors?.phone && (
          <p className="form-error">{state.fieldErrors.phone}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="area">Delivery District</label>
        <select
          id="area"
          name="area"
          defaultValue={state?.data?.area || "Bole"}
          className="form-input"
        >
          {AREA_OPTIONS.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        {state?.fieldErrors?.area && (
          <p className="form-error">{state.fieldErrors.area}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Delivery Landmark / Apartment Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Building name, office floor, or gate landmark"
          defaultValue={state?.data?.notes || ""}
          className="form-input"
          style={{ resize: "vertical" }}
        />
        {state?.fieldErrors?.notes && (
          <p className="form-error">{state.fieldErrors.notes}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary"
        style={{ width: "100%", padding: "0.75rem", fontSize: "0.9375rem" }}
      >
        {isPending ? "Confirming Order..." : "Place Delivery Order"}
      </button>
    </form>
  );
}
