import { orders } from "@/app/data/orders";

export async function GET(request, { params }) {
  const { id } = await params;
  const targetOrder = orders.find((o) => String(o.id) === String(id)) || orders[0];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function sendEvent(eventType, payload) {
        const message = `event: ${eventType}\ndata: ${JSON.stringify(payload)}\n\n`;
        controller.enqueue(encoder.encode(message));
      }

      sendEvent("init", {
        orderId: targetOrder.id,
        status: targetOrder.status || "preparing",
        area: targetOrder.area,
        total: targetOrder.total,
        courier: targetOrder.courierLocation,
        delivery: targetOrder.deliveryLocation,
        timestamp: new Date().toISOString(),
        message: "Live connection established"
      });

      const sequence = [
        {
          status: "preparing",
          step: "Kitchen accepted order and is assembling ingredients",
          courier: {
            name: "Dawit Haile",
            vehicle: "Yamaha Motorbike (ET-3401)",
            phone: "0922334455",
            lat: 8.9950,
            lng: 38.7880,
            distanceKm: 2.8,
            etaMinutes: 20
          }
        },
        {
          status: "cooking",
          step: "Dishes are actively simmering in the kitchen",
          courier: {
            name: "Dawit Haile",
            vehicle: "Yamaha Motorbike (ET-3401)",
            phone: "0922334455",
            lat: 9.0010,
            lng: 38.7850,
            distanceKm: 2.1,
            etaMinutes: 14
          }
        },
        {
          status: "out_for_delivery",
          step: "Courier picked up hot meal and is en route to destination",
          courier: {
            name: "Dawit Haile",
            vehicle: "Yamaha Motorbike (ET-3401)",
            phone: "0922334455",
            lat: 9.0080,
            lng: 38.7790,
            distanceKm: 0.9,
            etaMinutes: 5
          }
        },
        {
          status: "delivered",
          step: "Order handed to customer at destination address",
          courier: {
            name: "Dawit Haile",
            vehicle: "Yamaha Motorbike (ET-3401)",
            phone: "0922334455",
            lat: targetOrder.deliveryLocation?.lat || 9.0125,
            lng: targetOrder.deliveryLocation?.lng || 38.7750,
            distanceKm: 0,
            etaMinutes: 0
          }
        }
      ];

      for (let i = 0; i < sequence.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const item = sequence[i];
        sendEvent("status", {
          orderId: targetOrder.id,
          status: item.status,
          step: item.step,
          area: targetOrder.area,
          total: targetOrder.total,
          courier: item.courier,
          delivery: targetOrder.deliveryLocation,
          timestamp: new Date().toISOString()
        });

        if (item.status === "delivered") {
          sendEvent("delivered", {
            orderId: targetOrder.id,
            status: "delivered",
            step: "Order fulfilled and signed off",
            timestamp: new Date().toISOString()
          });
          controller.close();
          return;
        }
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive"
    }
  });
}
