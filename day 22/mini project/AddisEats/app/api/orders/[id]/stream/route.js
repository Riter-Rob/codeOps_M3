import { orders } from "@/app/data/orders";

export async function GET(request, { params }) {
  const { id } = await params;
  const initial = orders.find((o) => String(o.id) === String(id)) || orders[0];

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sequence = [
        {
          status: "preparing",
          courier: {
            name: initial.courierLocation?.name || "Dawit Haile",
            vehicle: initial.courierLocation?.vehicle || "Yamaha Motorbike",
            phone: initial.courierLocation?.phone || "0922334455",
            lat: 9.0020,
            lng: 38.7730,
            distanceKm: 2.1,
            etaMinutes: 14
          }
        },
        {
          status: "cooking",
          courier: {
            name: initial.courierLocation?.name || "Dawit Haile",
            vehicle: initial.courierLocation?.vehicle || "Yamaha Motorbike",
            phone: initial.courierLocation?.phone || "0922334455",
            lat: 9.0040,
            lng: 38.7750,
            distanceKm: 1.8,
            etaMinutes: 10
          }
        },
        {
          status: "out_for_delivery",
          courier: {
            name: initial.courierLocation?.name || "Dawit Haile",
            vehicle: initial.courierLocation?.vehicle || "Yamaha Motorbike",
            phone: initial.courierLocation?.phone || "0922334455",
            lat: 9.0070,
            lng: 38.7800,
            distanceKm: 0.6,
            etaMinutes: 4
          }
        },
        {
          status: "delivered",
          courier: {
            name: initial.courierLocation?.name || "Dawit Haile",
            vehicle: initial.courierLocation?.vehicle || "Yamaha Motorbike",
            phone: initial.courierLocation?.phone || "0922334455",
            lat: initial.deliveryLocation?.lat || 9.0085,
            lng: initial.deliveryLocation?.lng || 38.7830,
            distanceKm: 0.0,
            etaMinutes: 0
          }
        }
      ];

      let stepIndex = 0;

      function sendNext() {
        if (stepIndex >= sequence.length) {
          controller.close();
          return;
        }

        const currentStep = sequence[stepIndex];
        const payload = {
          ...initial,
          status: currentStep.status,
          courierLocation: currentStep.courier,
          deliveryLocation: initial.deliveryLocation || {
            address: `${initial.area}, Addis Ababa`,
            lat: 9.0085,
            lng: 38.7830
          },
          updatedAt: new Date().toISOString()
        };

        const message = `data: ${JSON.stringify(payload)}\n\n`;
        controller.enqueue(encoder.encode(message));

        if (currentStep.status === "delivered") {
          setTimeout(() => {
            try {
              controller.close();
            } catch {}
          }, 800);
          return;
        }

        stepIndex++;
        setTimeout(sendNext, 2500);
      }

      sendNext();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
