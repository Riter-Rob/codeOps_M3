const now = Date.now();
const oneDayMs = 24 * 60 * 60 * 1000;

export const orders = [
  {
    id: "ord_101",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    status: "delivered",
    total: 1250,
    items: [
      { name: "Doro Wat", quantity: 2, price: 320 },
      { name: "Special Kitfo", quantity: 1, price: 610 }
    ],
    createdAt: new Date(now - 0.2 * oneDayMs).toISOString()
  },
  {
    id: "ord_102",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    status: "cooking",
    total: 450,
    items: [
      { name: "Tibs Firfir", quantity: 1, price: 450 }
    ],
    createdAt: new Date(now - 0.5 * oneDayMs).toISOString()
  },
  {
    id: "ord_103",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Kazanchis",
    status: "preparing",
    total: 1850,
    items: [
      { name: "Beyaynetu Platter", quantity: 3, price: 280 },
      { name: "Beef Tibs", quantity: 2, price: 450 },
      { name: "Tej Honey Wine", quantity: 1, price: 110 }
    ],
    createdAt: new Date(now - 0.8 * oneDayMs).toISOString()
  },
  {
    id: "ord_104",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    status: "delivered",
    total: 950,
    items: [
      { name: "Special Kitfo", quantity: 1, price: 610 },
      { name: "Ayib Cheese", quantity: 2, price: 170 }
    ],
    createdAt: new Date(now - 1.2 * oneDayMs).toISOString()
  },
  {
    id: "ord_105",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Sarbet",
    status: "delivered",
    total: 1400,
    items: [
      { name: "Gomen Besiga", quantity: 2, price: 380 },
      { name: "Doro Wat", quantity: 2, price: 320 }
    ],
    createdAt: new Date(now - 1.7 * oneDayMs).toISOString()
  },
  {
    id: "ord_106",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Piassa",
    status: "delivered",
    total: 620,
    items: [
      { name: "Shiro Tegabino", quantity: 2, price: 220 },
      { name: "Telba Drink", quantity: 2, price: 90 }
    ],
    createdAt: new Date(now - 2.1 * oneDayMs).toISOString()
  },
  {
    id: "ord_107",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Gerji",
    status: "delivered",
    total: 2100,
    items: [
      { name: "Zilzil Tibs", quantity: 3, price: 520 },
      { name: "Doro Wat", quantity: 1, price: 320 },
      { name: "Tej Honey Wine", quantity: 2, price: 110 }
    ],
    createdAt: new Date(now - 2.4 * oneDayMs).toISOString()
  },
  {
    id: "ord_108",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    status: "delivered",
    total: 800,
    items: [
      { name: "Boseba Stew", quantity: 2, price: 400 }
    ],
    createdAt: new Date(now - 2.7 * oneDayMs).toISOString()
  },
  {
    id: "ord_109",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "CMC",
    status: "delivered",
    total: 540,
    items: [
      { name: "Fasolia & Alicha", quantity: 2, price: 270 }
    ],
    createdAt: new Date(now - 2.9 * oneDayMs).toISOString()
  },
  {
    id: "ord_110",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Kazanchis",
    status: "delivered",
    total: 1750,
    items: [
      { name: "Special Kitfo", quantity: 2, price: 610 },
      { name: "Beef Tibs", quantity: 1, price: 450 },
      { name: "Telba", quantity: 1, price: 80 }
    ],
    createdAt: new Date(now - 3.4 * oneDayMs).toISOString()
  },
  {
    id: "ord_111",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    status: "delivered",
    total: 1100,
    items: [
      { name: "Doro Wat", quantity: 2, price: 320 },
      { name: "Beef Tibs", quantity: 1, price: 460 }
    ],
    createdAt: new Date(now - 4.2 * oneDayMs).toISOString()
  },
  {
    id: "ord_112",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Sarbet",
    status: "delivered",
    total: 680,
    items: [
      { name: "Shiro Tegabino", quantity: 2, price: 220 },
      { name: "Salata Salad", quantity: 2, price: 120 }
    ],
    createdAt: new Date(now - 4.5 * oneDayMs).toISOString()
  },
  {
    id: "ord_113",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Kazanchis",
    status: "delivered",
    total: 2400,
    items: [
      { name: "Special Kitfo", quantity: 3, price: 610 },
      { name: "Zilzil Tibs", quantity: 1, price: 570 }
    ],
    createdAt: new Date(now - 4.8 * oneDayMs).toISOString()
  },
  {
    id: "ord_114",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Piassa",
    status: "delivered",
    total: 890,
    items: [
      { name: "Beyaynetu Platter", quantity: 2, price: 280 },
      { name: "Gomen Besiga", quantity: 1, price: 330 }
    ],
    createdAt: new Date(now - 5.2 * oneDayMs).toISOString()
  },
  {
    id: "ord_115",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    status: "delivered",
    total: 1300,
    items: [
      { name: "Doro Wat", quantity: 2, price: 320 },
      { name: "Special Kitfo", quantity: 1, price: 610 },
      { name: "Telba", quantity: 1, price: 50 }
    ],
    createdAt: new Date(now - 5.7 * oneDayMs).toISOString()
  },
  {
    id: "ord_116",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "CMC",
    status: "delivered",
    total: 1500,
    items: [
      { name: "Zilzil Tibs", quantity: 2, price: 520 },
      { name: "Beef Tibs", quantity: 1, price: 460 }
    ],
    createdAt: new Date(now - 6.2 * oneDayMs).toISOString()
  },
  {
    id: "ord_117",
    userId: "usr_abebe",
    sessionId: "usr_abebe",
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Gerji",
    status: "delivered",
    total: 750,
    items: [
      { name: "Shiro Tegabino", quantity: 2, price: 220 },
      { name: "Beyaynetu Platter", quantity: 1, price: 280 },
      { name: "Salata Salad", quantity: 1, price: 30 }
    ],
    createdAt: new Date(now - 6.8 * oneDayMs).toISOString()
  }
];
