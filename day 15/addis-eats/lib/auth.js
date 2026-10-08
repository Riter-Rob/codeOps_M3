const encoder = new TextEncoder();
const SECRET = process.env.SESSION_SECRET || "addis-eats-session-secret-key-32chars";

function toBase64Url(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decodeURIComponent(escape(atob(base64)));
}

async function getHmacKey() {
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signSession(payload) {
  const data = toBase64Url(JSON.stringify(payload));
  const key = await getHmacKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const signature = bufferToHex(signatureBuffer);
  return `${data}.${signature}`;
}

export async function verifySession(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  try {
    const key = await getHmacKey();
    const expectedBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
    const expectedSignature = bufferToHex(expectedBuffer);
    if (signature !== expectedSignature) return null;
    const payload = JSON.parse(fromBase64Url(data));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSession(req) {
  let token;
  if (req?.cookies) {
    token = req.cookies.get("session")?.value;
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("session")?.value;
  }
  if (!token) return null;
  return await verifySession(token);
}

export async function setSessionCookie(user) {
  const token = await signSession({
    id: user.id,
    name: user.name,
    role: user.role || "customer",
    exp: Date.now() + 24 * 60 * 60 * 1000
  });
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/"
  });
  return token;
}

export async function clearSessionCookie() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
