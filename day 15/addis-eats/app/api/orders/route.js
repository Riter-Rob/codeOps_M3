export async function POST(request) {
  const body = await request.json();
  const { name, phone } = body;

  const fieldErrors = {};

  if (!name || name.trim().length < 2) {
    fieldErrors.name = "Name must contain at least 2 characters.";
  }

  if (!phone || !/^09\d{8}$/.test(phone.trim())) {
    fieldErrors.phone = "Enter a valid Ethiopian phone number (09XXXXXXXX).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors
      },
      {
        status: 422
      }
    );
  }

  return Response.json(
    {
      message: "Order created successfully.",
      order: {
        id: String(Date.now()),
        name: name.trim(),
        phone: phone.trim()
      }
    },
    {
      status: 201
    }
  );
}
