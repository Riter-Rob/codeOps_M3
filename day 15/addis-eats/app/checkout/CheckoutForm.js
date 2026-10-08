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
      <div className="order-ticket" style={{ maxWidth: "480px", margin: "1rem auto", padding: "1.5rem" }}>
        <div className="order-ticket-header">
          <h2 style={{ margin: 0, fontSize: "1.125rem" }}>Order Confirmed</h2>
          <span className="status-badge status-preparing">Ticket #{state.order.id}</span>
        </div>

        <p style={{ margin: "0.5rem 0 1rem", fontSize: "0.875rem", color: "#6b7280" }}>
          Thank you, <strong>{state.order.name}</strong>. Your order has been sent to the kitchen.
        </p>

        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "0.75rem 1rem", marginBottom: "1.25rem", fontSize: "0.875rem" }}>
          <p style={{ margin: "0.25rem 0" }}><strong>Delivery Area:</strong> {state.order.area}</p>
          <p style={{ margin: "0.25rem 0" }}><strong>Phone:</strong> {state.order.phone}</p>
          <p style={{ margin: "0.25rem 0" }}><strong>Status:</strong> <span className="status-badge status-preparing">{state.order.status}</span></p>
        </div>

        {cancelMessage && (
          <p className="field-error" style={{ marginBottom: "0.75rem" }}>
            {cancelMessage}
          </p>
        )}

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {state.order.status !== "cancelled" && (
            <button
              type="button"
              onClick={() => handleCancel(state.order.id)}
              className="btn btn-secondary btn-sm"
              style={{ color: "#b91c1c" }}
            >
              Cancel Order
            </button>
          )}

          <Link
            href={`/order-status?id=${state.order.id}`}
            className="btn btn-primary btn-sm"
          >
            Track in Real Time &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="form-box" style={{ margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "1.125rem" }}>Delivery Details</h2>

      <div className="form-field">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          defaultValue={state?.data?.name || ""}
          placeholder="e.g. Abebe Bikila"
          className="form-control"
        />
        {state?.fieldErrors?.name && (
          <p className="field-error">{state.fieldErrors.name}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="phone">Phone / TeleBirr</label>
        <input
          id="phone"
          name="phone"
          placeholder="09XXXXXXXX"
          defaultValue={state?.data?.phone || ""}
          className="form-control"
        />
        {state?.fieldErrors?.phone && (
          <p className="field-error">{state.fieldErrors.phone}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="area">Delivery District</label>
        <select
          id="area"
          name="area"
          defaultValue={state?.data?.area || "Bole"}
          className="form-control"
        >
          {AREA_OPTIONS.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        {state?.fieldErrors?.area && (
          <p className="field-error">{state.fieldErrors.area}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="notes">Landmark / Building Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="e.g. Near Edna Mall, 3rd floor"
          defaultValue={state?.data?.notes || ""}
          className="form-control"
          style={{ resize: "vertical" }}
        />
        {state?.fieldErrors?.notes && (
          <p className="field-error">{state.fieldErrors.notes}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "0.5rem" }}
      >
        {isPending ? "Confirming..." : "Place Delivery Order"}
      </button>
    </form>
  );
}
