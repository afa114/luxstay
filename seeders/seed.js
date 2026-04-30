require('dotenv').config({ path: '../.env' });
const { sequelize, User, Hotel, Room, Booking } = require('../models');
const bcrypt = require('bcryptjs');

const hotels = [
  {
    name: 'The Grand Palace Hotel',
    slug: 'the-grand-palace-hotel',
    description: 'Experience unparalleled luxury at The Grand Palace Hotel, where timeless elegance meets modern sophistication. Nestled in the heart of the city, our hotel offers breathtaking skyline views, world-class dining, and personalized service that exceeds every expectation.',
    address: '100 Grand Boulevard',
    city: 'New York',
    country: 'USA',
    stars: 5,
    category: 'luxury',
    mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Concierge', 'Valet Parking', 'Room Service', 'Business Center'],
    phone: '+1-212-555-0100',
    email: 'info@grandpalace.com',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    rating: 4.9,
    reviewCount: 1284,
    isActive: true,
    rooms: [
      {
        name: 'Deluxe King Room',
        type: 'deluxe',
        description: 'Spacious deluxe room featuring a plush king-sized bed, marble bathroom, and stunning city views from floor-to-ceiling windows.',
        price: 450.00,
        capacity: 5,
        bedType: 'King',
        size: 45,
        floor: 10,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800&q=80', 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80'],
        amenities: ['King Bed', 'City View', 'Marble Bathroom', 'Minibar', 'Smart TV', 'Nespresso Machine'],
        quantity: 20
      },
      {
        name: 'Premier Suite',
        type: 'suite',
        description: 'Our Premier Suite offers a separate living area, dining space, and a luxurious bathroom with a soaking tub overlooking the city skyline.',
        price: 950.00,
        capacity: 6,
        bedType: 'King',
        size: 95,
        floor: 20,
        image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'],
        amenities: ['King Bed', 'Living Room', 'Soaking Tub', 'City View', 'Butler Service', 'Premium Minibar'],
        quantity: 8
      },
      {
        name: 'Penthouse Suite',
        type: 'penthouse',
        description: 'The ultimate expression of luxury. Our two-story penthouse features a private terrace, panoramic city views, and exclusive amenities.',
        price: 2500.00,
        capacity: 8,
        bedType: 'King',
        size: 280,
        floor: 40,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1560185127-6a8e83e96c6d?w=800&q=80'],
        amenities: ['Private Terrace', 'Panoramic Views', 'Private Pool', 'Butler Service', 'Home Theater', 'Grand Piano'],
        quantity: 2
      }
    ]
  },
  {
    name: 'Azure Beachfront Resort',
    slug: 'azure-beachfront-resort',
    description: 'Wake up to the sound of waves at Azure Beachfront Resort. Our stunning oceanfront property combines natural beauty with luxurious comfort, featuring overwater bungalows, pristine white sand beaches, and world-class water sports.',
    address: '1 Ocean Drive',
    city: 'Miami',
    country: 'USA',
    stars: 5,
    category: 'resort',
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80'
    ],
    amenities: ['Private Beach', 'Infinity Pool', 'Spa', 'Water Sports', 'Snorkeling', 'Fine Dining', 'Kids Club', 'Free WiFi'],
    phone: '+1-305-555-0200',
    email: 'info@azureresort.com',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    rating: 4.8,
    reviewCount: 987,
    isActive: true,
    rooms: [
      {
        name: 'Ocean View Room',
        type: 'deluxe',
        description: 'Bright and airy room with a private balcony offering sweeping ocean views. Fall asleep to the sound of gentle waves.',
        price: 380.00,
        capacity: 5,
        bedType: 'Queen',
        size: 40,
        floor: 3,
        image: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80'],
        amenities: ['Ocean View', 'Balcony', 'Rain Shower', 'Beach Access', 'Hammock'],
        quantity: 30
      },
      {
        name: 'Beachfront Villa',
        type: 'villa',
        description: 'Step directly from your private villa onto pristine white sand. Features a plunge pool, outdoor shower, and direct beach access.',
        price: 1200.00,
        capacity: 6,
        bedType: 'King',
        size: 150,
        floor: 1,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80'],
        amenities: ['Private Plunge Pool', 'Direct Beach Access', 'Outdoor Shower', 'Butler', 'Golf Cart'],
        quantity: 6
      }
    ]
  },
  {
    name: 'The Montmartre Boutique',
    slug: 'the-montmartre-boutique',
    description: 'A charming boutique hotel in the heart of Paris, steps from the Eiffel Tower. Each room is uniquely designed by renowned French interior designers, blending art deco heritage with contemporary Parisian chic.',
    address: '24 Rue de la Paix',
    city: 'Paris',
    country: 'France',
    stars: 5,
    category: 'boutique',
    mainImage: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&q=80',
      'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=800&q=80'
    ],
    amenities: ['Rooftop Bar', 'French Restaurant', 'Spa', 'Eiffel Tower View', 'Concierge', 'Free WiFi', 'Wine Cellar'],
    phone: '+33-1-5555-0300',
    email: 'bonjour@montmartre-hotel.fr',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    rating: 4.7,
    reviewCount: 654,
    isActive: true,
    rooms: [
      {
        name: 'Classic Parisian Room',
        type: 'standard',
        description: 'Elegant room with Haussmann-inspired decor, featuring hand-painted murals, antique furnishings, and a view of charming cobblestone streets.',
        price: 320.00,
        capacity: 5,
        bedType: 'Double',
        size: 28,
        floor: 2,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'],
        amenities: ['Street View', 'Antique Decor', 'French Press', 'Luxury Linens', 'Rainfall Shower'],
        quantity: 15
      },
      {
        name: 'Eiffel Tower Suite',
        type: 'suite',
        description: 'Wake up to a direct view of the Eiffel Tower from your bed. This exceptional suite features a private terrace, champagne bar, and bespoke French furnishings.',
        price: 1800.00,
        capacity: 7,
        bedType: 'King',
        size: 120,
        floor: 6,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&q=80'],
        amenities: ['Eiffel Tower View', 'Private Terrace', 'Champagne Bar', 'Butler', 'Jacuzzi'],
        quantity: 2
      }
    ]
  },
  {
    name: 'Tokyo Skyline Hotel',
    slug: 'tokyo-skyline-hotel',
    description: 'A masterpiece of modern Japanese architecture, the Tokyo Skyline Hotel sits atop the city offering 360-degree views of Tokyo. Combining cutting-edge technology with the tranquility of Japanese design principles.',
    address: '1-1 Shinjuku',
    city: 'Tokyo',
    country: 'Japan',
    stars: 5,
    category: 'luxury',
    mainImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'
    ],
    amenities: ['Onsen Spa', 'Rooftop Pool', 'Michelin Restaurant', 'Sake Bar', 'Tea Ceremony', 'Concierge', 'Free WiFi', 'Gym'],
    phone: '+81-3-5555-0400',
    email: 'info@tokyoskyline.jp',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    rating: 4.8,
    reviewCount: 1102,
    isActive: true,
    rooms: [
      {
        name: 'Zen Deluxe Room',
        type: 'deluxe',
        description: 'A serene sanctuary inspired by Japanese minimalism. Features a futon-style king bed, shoji screens, and a deep soaking tub overlooking the city.',
        price: 520.00,
        capacity: 5,
        bedType: 'King',
        size: 42,
        floor: 25,
        image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1560185127-6a8e83e96c6d?w=800&q=80'],
        amenities: ['City View', 'Deep Soaking Tub', 'Yukata Robes', 'Tatami Area', 'Green Tea Set'],
        quantity: 25
      },
      {
        name: 'Mount Fuji Suite',
        type: 'suite',
        description: 'On clear days, enjoy an unobstructed view of Mount Fuji from your private balcony. A sublime blend of luxury and traditional Japanese aesthetics.',
        price: 1400.00,
        capacity: 5,
        bedType: 'King',
        size: 110,
        floor: 40,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=800&q=80'],
        amenities: ['Fuji View', 'Private Balcony', 'Personal Onsen', 'Butler', 'Ikebana Flowers'],
        quantity: 4
      }
    ]
  },
  {
    name: 'Alpine Lodge & Spa',
    slug: 'alpine-lodge-spa',
    description: 'Nestled in the Swiss Alps at 1,800m altitude, Alpine Lodge & Spa is a sanctuary of mountain luxury. Ski-in/ski-out access, a world-renowned wellness centre, and panoramic Alpine views make this an unforgettable escape.',
    address: 'Dorfstrasse 12',
    city: 'Zermatt',
    country: 'Switzerland',
    stars: 5,
    category: 'resort',
    mainImage: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80'
    ],
    amenities: ['Ski-in/Ski-out', 'Heated Pool', 'Alpine Spa', 'Fine Dining', 'Fireplace Lounge', 'Ski Storage', 'Helipad', 'Free WiFi'],
    phone: '+41-27-5555-0500',
    email: 'info@alpinelodge.ch',
    checkInTime: '16:00',
    checkOutTime: '11:00',
    rating: 4.9,
    reviewCount: 432,
    isActive: true,
    rooms: [
      {
        name: 'Mountain View Chalet Room',
        type: 'deluxe',
        description: 'Cozy Alpine room with pine wood interiors, a fireplace, and floor-to-ceiling windows framing the Matterhorn. Handwoven Swiss wool blankets included.',
        price: 680.00,
        capacity: 6,
        bedType: 'King',
        size: 50,
        floor: 2,
        image: 'https://images.unsplash.com/photo-1601701119533-fde05b96a96d?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'],
        amenities: ['Matterhorn View', 'Fireplace', 'Ski Storage', 'Heated Floors', 'Swiss Linens'],
        quantity: 20
      },
      {
        name: 'Alpine Grand Suite',
        type: 'suite',
        description: 'A two-bedroom suite with a private hot tub on a sheltered terrace, panoramic mountain views, and a dedicated ski valet.',
        price: 2200.00,
        capacity: 8,
        bedType: 'King',
        size: 180,
        floor: 4,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80'],
        amenities: ['Private Hot Tub', 'Ski Valet', '2 Bedrooms', 'Mountain Panorama', 'Fondue Service'],
        quantity: 3
      }
    ]
  },
  {
    name: 'City Comfort Business Hotel',
    slug: 'city-comfort-business-hotel',
    description: 'The preferred choice for business travelers, City Comfort offers seamless connectivity, state-of-the-art conference facilities, and a prime location in the financial district — all at a competitive price.',
    address: '55 Finance Street',
    city: 'London',
    country: 'UK',
    stars: 4,
    category: 'business',
    mainImage: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80'
    ],
    amenities: ['Free WiFi', 'Business Center', 'Conference Rooms', 'Gym', 'Restaurant', 'Airport Shuttle', 'Printer', 'Express Check-in'],
    phone: '+44-20-5555-0600',
    email: 'info@citycomfort.co.uk',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    rating: 4.3,
    reviewCount: 2103,
    isActive: true,
    rooms: [
      {
        name: 'Business Standard Room',
        type: 'standard',
        description: 'Efficiently designed room with a large work desk, ergonomic chair, high-speed WiFi, and blackout curtains for optimal rest.',
        price: 180.00,
        capacity: 4,
        bedType: 'Queen',
        size: 28,
        floor: 5,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'],
        amenities: ['Work Desk', 'Fast WiFi', 'Blackout Curtains', 'Safe', 'Iron & Board'],
        quantity: 50
      },
      {
        name: 'Executive Floor Room',
        type: 'deluxe',
        description: 'Access the exclusive Executive Lounge with complimentary breakfast, evening cocktails, and premium business amenities on the 15th floor.',
        price: 320.00,
        capacity: 5,
        bedType: 'King',
        size: 38,
        floor: 15,
        image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80'],
        amenities: ['Executive Lounge', 'Free Breakfast', 'Evening Cocktails', 'Nespresso', 'City View'],
        quantity: 20
      }
    ]
  },
  {
    name: 'Desert Sands Oasis',
    slug: 'desert-sands-oasis',
    description: 'An extraordinary desert escape rising from the golden dunes of Arabia. Inspired by ancient Bedouin architecture, Desert Sands Oasis blends traditional craftsmanship with contemporary luxury, offering camel treks, stargazing nights, and world-class cuisine.',
    address: 'Desert Road, Al Maha District',
    city: 'Dubai',
    country: 'UAE',
    stars: 5,
    category: 'luxury',
    mainImage: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
    ],
    amenities: ['Private Pool', 'Desert Safari', 'Camel Trekking', 'Stargazing', 'Spa', 'Arabian Restaurant', 'Free WiFi', 'Falconry'],
    phone: '+971-4-5555-0700',
    email: 'info@desertsands.ae',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    rating: 4.9,
    reviewCount: 378,
    isActive: true,
    rooms: [
      {
        name: 'Desert View Tent Villa',
        type: 'villa',
        description: 'Luxurious tented villa with hand-carved furniture, private infinity pool, and 270-degree desert views. Stargazing from your own private dune.',
        price: 890.00,
        capacity: 6,
        bedType: 'King',
        size: 80,
        floor: 1,
        image: 'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80'],
        amenities: ['Private Pool', 'Desert View', 'Butler', 'Outdoor Shower', 'Sunset Deck'],
        quantity: 10
      },
      {
        name: 'Royal Arabian Suite',
        type: 'suite',
        description: 'The pinnacle of Arabian hospitality. Featuring hand-painted ceilings, a private hammam, dedicated butler, and access to the royal dining pavilion.',
        price: 3200.00,
        capacity: 10,
        bedType: 'King',
        size: 320,
        floor: 1,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'],
        amenities: ['Private Hammam', 'Butler', 'Royal Dining', 'Desert Dune Access', 'Gold Fixtures'],
        quantity: 2
      }
    ]
  },
  {
    name: 'The Harbor Inn',
    slug: 'the-harbor-inn',
    description: 'Affordable comfort in a prime harbourside location. The Harbor Inn is perfect for travelers who want clean, comfortable rooms and friendly service without breaking the bank.',
    address: '8 Harbor Lane',
    city: 'Sydney',
    country: 'Australia',
    stars: 3,
    category: 'budget',
    mainImage: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
    ],
    amenities: ['Free WiFi', 'Breakfast Included', 'Harbor View', 'Bar', '24hr Reception', 'Luggage Storage'],
    phone: '+61-2-5555-0800',
    email: 'info@harborinn.au',
    checkInTime: '14:00',
    checkOutTime: '10:00',
    rating: 4.1,
    reviewCount: 3201,
    isActive: true,
    rooms: [
      {
        name: 'Standard Harbor Room',
        type: 'standard',
        description: 'Clean and cozy room with a view of the harbor. Everything you need for a comfortable stay at a great price.',
        price: 95.00,
        capacity: 5,
        bedType: 'Double',
        size: 22,
        floor: 2,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        images: [],
        amenities: ['Harbor View', 'Free WiFi', 'Flat Screen TV', 'Tea & Coffee'],
        quantity: 40
      },
      {
        name: 'Family Room',
        type: 'deluxe',
        description: 'Spacious family room with two queen beds, ideal for families or small groups exploring Sydney.',
        price: 150.00,
        capacity: 6,
        bedType: 'Twin Queens',
        size: 35,
        floor: 3,
        image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        images: [],
        amenities: ['2 Queen Beds', 'Harbor View', 'Free WiFi', 'Sofa', 'Kitchenette'],
        quantity: 15
      }
    ]
  }
];

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Create admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@luxstay.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1-000-000-0000'
    });

    // Create test user
    const user = await User.create({
      name: 'John Traveler',
      email: 'user@luxstay.com',
      password: 'user1234',
      role: 'user',
      phone: '+1-555-123-4567'
    });

    console.log('✅ Users created');

    // Create hotels and rooms
    for (const hotelData of hotels) {
      const { rooms, ...hData } = hotelData;
      const hotel = await Hotel.create(hData);
      for (const roomData of rooms) {
        await Room.create({ ...roomData, hotelId: hotel.id });
      }
      console.log(`✅ Hotel created: ${hotel.name}`);
    }

    // Create sample bookings
    const room1 = await Room.findOne();
    const hotel1 = await Hotel.findOne();
    if (room1 && hotel1) {
      await Booking.create({
        userId: user.id,
        roomId: room1.id,
        hotelId: hotel1.id,
        checkIn: '2025-06-01',
        checkOut: '2025-06-05',
        nights: 4,
        guests: 2,
        totalPrice: (room1.price * 4).toFixed(2),
        status: 'confirmed',
        paymentStatus: 'paid',
        guestName: user.name,
        guestEmail: user.email,
        guestPhone: '+1-555-123-4567'
      });
    }

    console.log('\n🎉 Seed complete!');
    console.log('─────────────────────────────');
    console.log('👤 Admin:  admin@luxstay.com / admin123');
    console.log('👤 User:   user@luxstay.com  / user1234');
    console.log('─────────────────────────────');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
