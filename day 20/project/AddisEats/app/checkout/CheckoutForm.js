"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { placeOrder, cancelOrder } from "../actions/order";
import { useCart } from "../components/CartProvider";

const AREA_OPTIONS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export default function CheckoutForm() {
  const { items, itemCount, subtotal, deliveryFee, total, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, { fieldErrors: {}, success: false });
  const [cancelMessage, setCancelMessage] = useState(null);
  const orderPlaced = Boolean(state?.success && state?.order);
  const cartCleared = useRef(false);

  useEffect(() => {
    if (!orderPlaced || cartCleared.current) return;
    cartCleared.current = true;
    clearCart();
  }, [orderPlaced, clearCart]);

  async function handleCancel(id) {
    const res = await cancelOrder(id);
    setCancelMessage(res?.error || "Order cancelled successfully");
  }

  if (orderPlaced) {
    return (
      <div className="order-ticket" style={{ maxWidth: "480px", margin: "1rem auto", padding: "1.5rem" }}>
        <div className="order-ticket-header">
          <h2 style={{ margin: 0, fontSize: "1.125rem" }}>Order recorded</h2>
          <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#18542a" }}>Ticket #{state.order.id}</span>
        </div>
        <p style={{ margin: "0.5rem 0 1rem", fontSize: "0.875rem", color: "#6b7280" }}>
          Thanks, <strong>{state.order.name}</strong>. This demo recorded your order so you can follow its status.
        </p>
        <div style={{ background: "#fdfbf7", border: "1px solid #e5dcc3", borderRadius: "18px", padding: "0.85rem 1.15rem", marginBottom: "1.25rem", fontSize: "0.875rem" }}>
          <p style={{ margin: "0.25rem 0" }}><strong>Delivery area:</strong> {state.order.area}</p>
          <p style={{ margin: "0.25rem 0" }}><strong>Phone:</strong> {state.order.phone}</p>
          <p style={{ margin: "0.25rem 0" }}><strong>Status:</strong> <span style={{ fontWeight: 600, color: "#b45309", textTransform: "capitalize" }}>{state.order.status}</span></p>
        </div>
        <p className="helper-text">Demo only — no payment was taken and no food will be delivered.</p>
        {cancelMessage && <p className="field-error" style={{ marginBottom: "0.75rem" }}>{cancelMessage}</p>}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {state.order.status !== "cancelled" && (
            <button type="button" onClick={() => handleCancel(state.order.id)} className="btn btn-secondary btn-sm" style={{ color: "#d52518", borderRadius: "9999px" }}>
              Cancel order
            </button>
          )}
          <Link href={`/order-status?id=${state.order.id}`} className="btn btn-primary btn-sm" style={{ borderRadius: "9999px" }}>
            Track status &rarr;
          </Link>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="card empty-state" style={{ margin: "0 auto" }}>
        <h2>Your cart is empty.</h2>
        <p>Add a dish before checking out.</p>
        <Link href="/menu" className="btn btn-primary">Browse the menu &rarr;</Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="form-box" style={{ margin: "0 auto" }}>
      <input type="hidden" name="selection" value={JSON.stringify(items.map((item) => ({ id: item.id, quantity: item.quantity })))} />
      {state?.fieldErrors?.cart && <p className="field-error" style={{ marginBottom: "0.75rem" }}>{state.fieldErrors.cart}</p>}

      <h2 style={{ marginBottom: "0.35rem", fontSize: "1.125rem" }}>Order summary</h2>
      <ul className="checkout-summary">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name} <span className="muted">× {item.quantity}</span></span>
            <span className="tabular">{item.price * item.quantity} ETB</span>
          </li>
        ))}
      </ul>
      <div className="price-row"><span>Subtotal ({itemCount} {itemCount === 1 ? "portion" : "portions"})</span><span className="tabular">{subtotal} ETB</span></div>
      <div className="price-row"><span>Demo delivery fee</span><span className="tabular">{deliveryFee} ETB</span></div>
      <div className="price-row price-total"><strong>Total</strong><strong className="tabular">{total} ETB</strong></div>

      <h2 style={{ margin: "1.5rem 0 1rem", fontSize: "1.125rem" }}>Delivery details</h2>

      <div className="form-field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" defaultValue={state?.data?.name || ""} placeholder="e.g. Abebe Bikila" className="form-control" required />
        {state?.fieldErrors?.name && <p className="field-error">{state.fieldErrors.name}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="phone">Contact phone</label>
        <input id="phone" name="phone" type="tel" placeholder="09XXXXXXXX" defaultValue={state?.data?.phone || ""} className="form-control" required />
        {state?.fieldErrors?.phone && <p className="field-error">{state.fieldErrors.phone}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="area">Delivery district</label>
        <select id="area" name="area" defaultValue={state?.data?.area || "Bole"} className="form-control">
          {AREA_OPTIONS.map((area) => <option key={area} value={area}>{area}</option>)}
        </select>
        {state?.fieldErrors?.area && <p className="field-error">{state.fieldErrors.area}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="notes">Landmark / building notes (optional)</label>
        <textarea id="notes" name="notes" rows={3} placeholder="e.g. Near Edna Mall, 3rd floor" defaultValue={state?.data?.notes || ""} className="form-control" style={{ resize: "vertical" }} />
        {state?.fieldErrors?.notes && <p className="field-error">{state.fieldErrors.notes}</p>}
      </div>

      <p className="helper-text">Demo checkout — no payment is collected and no order is really delivered.</p>
      <button type="submit" disabled={isPending} className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem", borderRadius: "9999px" }}>
        {isPending ? "Recording order..." : "Place demo order"}
      </button>
    </form>
  );
}
