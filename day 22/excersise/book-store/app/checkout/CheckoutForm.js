"use client";

import { useActionState, useState } from "react";
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
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
        <h2>Order Confirmed!</h2>
        <p>Order ID: {state.order.id}</p>
        <p>Thank you, {state.order.name}. Your order has been placed.</p>
        <p>Status: {state.order.status}</p>
        {cancelMessage && <p style={{ color: "#dc2626" }}>{cancelMessage}</p>}
        {state.order.status !== "cancelled" && (
          <button
            type="button"
            onClick={() => handleCancel(state.order.id)}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Cancel Order
          </button>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "480px", margin: "0 auto" }}>
      <div>
        <label htmlFor="name" style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Full Name</label>
        <input
          id="name"
          name="name"
          defaultValue={state?.data?.name || ""}
          style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        {state?.fieldErrors?.name && (
          <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: "4px 0 0" }}>{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>TeleBirr Phone Number</label>
        <input
          id="phone"
          name="phone"
          placeholder="09XXXXXXXX or +2519XXXXXXXX"
          defaultValue={state?.data?.phone || ""}
          style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        {state?.fieldErrors?.phone && (
          <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: "4px 0 0" }}>{state.fieldErrors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="area" style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Delivery Area</label>
        <select
          id="area"
          name="area"
          defaultValue={state?.data?.area || "Bole"}
          style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          {AREA_OPTIONS.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        {state?.fieldErrors?.area && (
          <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: "4px 0 0" }}>{state.fieldErrors.area}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes" style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Delivery Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Building name, floor, or nearby landmark"
          defaultValue={state?.data?.notes || ""}
          style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        {state?.fieldErrors?.notes && (
          <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: "4px 0 0" }}>{state.fieldErrors.notes}</p>
        )}
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
        {isPending ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
