"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";
import Link from "next/link";

export default function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(placeOrder, {
    errors: {},
    success: false
  });

  if (state?.success && state?.order) {
    return (
      <div className="form-box">
        <h3 style={{ color: "#166534", marginBottom: "0.5rem" }}>Order Confirmed!</h3>
        <p>Thank you, {state.order.name}. Your order #{state.order.id} has been placed.</p>
        <p style={{ marginTop: "0.5rem", color: "#57534e" }}>We will call {state.order.phone} when your order is on the way.</p>
        <Link href="/menu" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="form-box">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          defaultValue={state?.values?.name || ""}
          placeholder="e.g. Almaz Kebede"
          required
        />
        {state?.errors?.name && (
          <p className="field-error">{state.errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          defaultValue={state?.values?.phone || ""}
          placeholder="09XXXXXXXX"
          required
        />
        {state?.errors?.phone && (
          <p className="field-error">{state.errors.phone}</p>
        )}
      </div>

      <button type="submit" disabled={isPending} className="btn btn-primary" style={{ width: "100%" }}>
        {isPending ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
