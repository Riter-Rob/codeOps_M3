"use server";

export async function placeOrder(prevState, formData) {
  const actualFormData = formData instanceof FormData ? formData : prevState;
  const name = (actualFormData.get ? actualFormData.get("name") : actualFormData.name)?.trim() || "";
  const phone = (actualFormData.get ? actualFormData.get("phone") : actualFormData.phone)?.trim() || "";

  const errors = {};

  if (!name || name.length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!phone || !/^09\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Ethiopian phone number (09XXXXXXXX).";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values: { name, phone }
    };
  }

  return {
    success: true,
    order: {
      id: String(Date.now()),
      name,
      phone
    },
    errors: {}
  };
}
