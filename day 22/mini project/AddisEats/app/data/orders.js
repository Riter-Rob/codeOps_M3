const now = Date.now();
const oneDayMs = 24 * 60 * 60 * 1000;

export const orders = [
  {
    id: "ord_201",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe, Junior",
    phone: "0911223344",
    area: "Bole",
    status: "out_for_delivery",
    total: 3450,
    items: [
      { name: "Special Kitfo", quantity: 3, price: 610 },
      { name: 'Doro Wat "Traditional Recipe"', quantity: 4, price: 320 },
      { name: "Tej Honey Wine", quantity: 3, price: 110 }
    ],
    deliveryLocation: {
      address: "Bole Atlas, House 402, Ring Road",
      lat: 9.0085,
      lng: 38.7830
    },
    courierLocation: {
      name: 'Dawit "Speedy" Haile',
      vehicle: "Yamaha DT175 (ET-3401)",
      phone: "0922334455",
      lat: 9.0035,
      lng: 38.7760,
      distanceKm: 0.9,
      etaMinutes: 5
    },
    notes: 'Please ring "Gate 2", do not honk.\nCall upon arrival.',
    createdAt: new Date(now - 0.05 * oneDayMs).toISOString()
  },
  {
    id: "ord_202",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: 'Kidus ""The Runner"" Bekele',
    phone: "0911223344",
    area: "Kazanchis",
    status: "cooking",
    total: 450,
    items: [
      { name: 'Tibs Firfir, Spicy "Hot Level 3"', quantity: 1, price: 450 }
    ],
    deliveryLocation: {
      address: "Kazanchis, Near UNECA, Bloom Tower",
      lat: 9.0180,
      lng: 38.7690
    },
    courierLocation: {
      name: "Solomon Tadesse",
      vehicle: "Honda Ace 125",
      phone: "0933445566",
      lat: 9.0140,
      lng: 38.7620,
      distanceKm: 1.2,
      etaMinutes: 7
    },
    notes: 'Leave at front desk, labeled "URGENT".',
    createdAt: new Date(now - 0.2 * oneDayMs).toISOString()
  },
  {
    id: "ord_203",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: 'Sara "Chef", Wondimu',
    phone: "0911223344",
    area: "Piassa",
    status: "preparing",
    total: 1850,
    items: [
      { name: "Beyaynetu Platter, Fasting Edition", quantity: 3, price: 280 },
      { name: "Beef Tibs", quantity: 2, price: 450 },
      { name: "Tej Honey Wine", quantity: 1, price: 110 }
    ],
    deliveryLocation: {
      address: "Piassa, Church Road,\nBuilding 7, Office 12",
      lat: 9.0340,
      lng: 38.7520
    },
    courierLocation: {
      name: "Yonas Alemu",
      vehicle: "Bajaj Pulsar 150",
      phone: "0944556677",
      lat: 9.0290,
      lng: 38.7480,
      distanceKm: 1.6,
      etaMinutes: 10
    },
    notes: "Office closes at 6 PM,\nplease deliver before sunset.",
    createdAt: new Date(now - 0.5 * oneDayMs).toISOString()
  },
  {
    id: "ord_204",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Almaz Kebede",
    phone: "0911223344",
    area: "Sarbet",
    status: "delivered",
    total: 950,
    items: [
      { name: "Special Kitfo", quantity: 1, price: 610 },
      { name: "Ayib Cheese", quantity: 2, price: 170 }
    ],
    deliveryLocation: {
      address: "Sarbet, Near Canadian Embassy, Villa 18",
      lat: 8.9960,
      lng: 38.7380
    },
    courierLocation: {
      name: "Ermias Girma",
      vehicle: "TVS Apache",
      phone: "0955667788",
      lat: 8.9960,
      lng: 38.7380,
      distanceKm: 0.0,
      etaMinutes: 0
    },
    notes: "Order delivered safely and handed to security guard.",
    createdAt: new Date(now - 1.2 * oneDayMs).toISOString()
  },
  {
    id: "ord_205",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Tewodros Kassahun",
    phone: "0911223344",
    area: "Gerji",
    status: "delivered",
    total: 1400,
    items: [
      { name: "Gomen Besiga", quantity: 2, price: 380 },
      { name: "Doro Wat", quantity: 2, price: 320 }
    ],
    deliveryLocation: {
      address: "Gerji Imperial, Behind Mebrat Hayl",
      lat: 8.9980,
      lng: 38.8020
    },
    courierLocation: {
      name: "Natnael Berhanu",
      vehicle: "Suzuki GD110",
      phone: "0966778899",
      lat: 8.9980,
      lng: 38.8020,
      distanceKm: 0.0,
      etaMinutes: 0
    },
    notes: "Contactless delivery.",
    createdAt: new Date(now - 1.7 * oneDayMs).toISOString()
  },
  {
    id: "ord_206",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Selamawit Desta",
    phone: "0911223344",
    area: "CMC",
    status: "delivered",
    total: 620,
    items: [
      { name: "Shiro Tegabino", quantity: 2, price: 220 },
      { name: "Telba Drink", quantity: 2, price: 90 }
    ],
    deliveryLocation: {
      address: "CMC Heights, Block B, Floor 4",
      lat: 9.0220,
      lng: 38.8340
    },
    courierLocation: {
      name: "Dawit Haile",
      vehicle: "Yamaha DT175",
      phone: "0922334455",
      lat: 9.0220,
      lng: 38.8340,
      distanceKm: 0.0,
      etaMinutes: 0
    },
    notes: "Delivered to reception.",
    createdAt: new Date(now - 2.1 * oneDayMs).toISOString()
  },
  {
    id: "ord_207",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Bereket Mengistu",
    phone: "0911223344",
    area: "Bole",
    status: "delivered",
    total: 2800,
    items: [
      { name: "Zilzil Tibs", quantity: 4, price: 520 },
      { name: "Doro Wat", quantity: 2, price: 320 },
      { name: "Telba Drink", quantity: 1, price: 80 }
    ],
    deliveryLocation: {
      address: "Bole Medhanialem, Street 19",
      lat: 9.0010,
      lng: 38.7890
    },
    courierLocation: {
      name: "Solomon Tadesse",
      vehicle: "Honda Ace 125",
      phone: "0933445566",
      lat: 9.0010,
      lng: 38.7890,
      distanceKm: 0.0,
      etaMinutes: 0
    },
    notes: "Thank you!",
    createdAt: new Date(now - 2.4 * oneDayMs).toISOString()
  },
  {
    id: "ord_208",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Hanna Girma",
    phone: "0911223344",
    area: "Kazanchis",
    status: "delivered",
    total: 800,
    items: [
      { name: "Boseba Stew", quantity: 2, price: 400 }
    ],
    deliveryLocation: {
      address: "Kazanchis, Supermarket Plaza",
      lat: 9.0175,
      lng: 38.7680
    },
    courierLocation: {
      name: "Yonas Alemu",
      vehicle: "Bajaj Pulsar 150",
      phone: "0944556677",
      lat: 9.0175,
      lng: 38.7680,
      distanceKm: 0.0,
      etaMinutes: 0
    },
    notes: "",
    createdAt: new Date(now - 2.7 * oneDayMs).toISOString()
  }
];
