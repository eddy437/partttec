import type { Brand, Category, Part } from "./types"

const BRANDS = [
  "Bosch",
  "Denso",
  "NGK",
  "Monroe",
  "KYB",
  "Moog",
  "Delphi",
  "Valeo",
  "Mahle",
  "Mann-Filter",
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes",
  "Audi",
  "Nissan",
  "Hyundai",
  "Kia",
  "Mazda",
  "Subaru",
  "Lexus",
  "Dodge",
  "RAM",
  "Jeep",
  "GMC",
  "Cadillac",
  "Buick",
  "Chrysler",
  "Lincoln",
  "Acura",
  "Infiniti",
  "Volvo",
  "Land Rover",
  "Jaguar",
  "Porsche",
  "Tesla",
  "MINI",
  "Fiat",
  "Alfa Romeo",
  "Maserati",
  "Genesis",
  "Mitsubishi",
  "Suzuki",
  "Isuzu",
  "Peugeot",
  "Renault",
  "Citroën",
  "Saab",
  "Smart",
  "Scion",
  "Pontiac",
  "Mercury",
  "Brembo",
  "Bilstein",
  "Eibach",
  "Mobil 1",
  "Castrol",
  "Generic",
]
const CATEGORIES = [
  { main: "Engine", sub: ["Filters", "Belts", "Gaskets", "Pistons", "Valves"] },
  { main: "Brakes & Brake Parts", sub: ["Pads", "Rotors", "Calipers", "Lines", "Fluid"] },
  { main: "Suspension", sub: ["Shocks", "Struts", "Control Arms", "Ball Joints", "Bushings"] },
  { main: "Electrical Systems", sub: ["Batteries", "Alternators", "Starters", "Sensors", "Fuses"] },
  { main: "Body & Exterior", sub: ["Doors", "Bumpers", "Lights", "Mirrors"] },
  { main: "Transmission", sub: ["Automatic", "Manual", "CVT", "Clutches"] },
]
const CAR_MAKES = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes",
  "Audi",
  "Nissan",
  "Hyundai",
  "Kia",
  "Mazda",
  "Subaru",
  "Lexus",
  "Dodge",
  "RAM",
  "Jeep",
  "GMC",
  "Cadillac",
  "Buick",
  "Chrysler",
  "Lincoln",
  "Acura",
  "Infiniti",
  "Volvo",
  "Land Rover",
  "Jaguar",
  "Porsche",
  "Tesla",
  "MINI",
  "Fiat",
  "Alfa Romeo",
  "Maserati",
  "Genesis",
  "Mitsubishi",
  "Suzuki",
  "Isuzu",
  "Peugeot",
  "Renault",
  "Citroën",
  "Saab",
  "Smart",
  "Scion",
  "Pontiac",
  "Mercury",
]

const CAR_MODELS: Record<string, string[]> = {
  Toyota: ["Camry", "Corolla", "RAV4", "Tacoma", "Highlander", "4Runner", "Tundra", "Prius"],
  Honda: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline", "Fit"],
  Ford: ["F-150", "Mustang", "Explorer", "Escape", "Focus", "Fusion", "Edge", "Bronco"],
  Chevrolet: ["Silverado", "Camaro", "Equinox", "Malibu", "Tahoe", "Traverse", "Colorado", "Corvette"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series", "X1", "4 Series", "M3"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class", "A-Class", "CLA", "GLA"],
  Nissan: ["Altima", "Sentra", "Rogue", "Pathfinder", "Maxima", "Murano", "Frontier", "Titan"],
  Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Palisade", "Venue", "Accent"],
  Kia: ["Optima", "Sorento", "Sportage", "Forte", "Soul", "Telluride", "Seltos", "Stinger"],
  Audi: ["A4", "A6", "Q5", "Q7", "A3", "Q3", "A8", "RS5"],
  Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Arteon", "ID.4", "Taos"],
  Subaru: ["Outback", "Forester", "Impreza", "Crosstrek", "Legacy", "Ascent", "WRX", "BRZ"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-9", "MX-5", "CX-30", "CX-50", "CX-90"],
  Lexus: ["RX", "ES", "NX", "IS", "GX", "LS", "UX", "LC"],
  Jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade", "Gladiator", "Wagoneer"],
  Dodge: ["Charger", "Challenger", "Durango", "Ram 1500", "Journey", "Grand Caravan"],
  GMC: ["Sierra", "Yukon", "Acadia", "Terrain", "Canyon", "Savana"],
  Acura: ["MDX", "RDX", "TLX", "ILX", "NSX", "Integra"],
  Infiniti: ["Q50", "QX50", "QX60", "QX80", "Q60", "QX55"],
  Volvo: ["XC90", "XC60", "S60", "XC40", "V60", "S90"],
}

export const brands: Brand[] = [
  {
    id: "toyota",
    name: "Toyota",
    slug: "toyota",
    logo: "/placeholder.svg?height=100&width=100&text=Toyota",
    description: "Original Equipment Manufacturer parts for Toyota vehicles.",
    partCount: 15420,
    isPopular: true,
    foundedYear: "1937",
  },
  {
    id: "honda",
    name: "Honda",
    slug: "honda",
    logo: "/placeholder.svg?height=100&width=100&text=Honda",
    description: "Genuine Honda parts and accessories.",
    partCount: 12350,
    isPopular: true,
    foundedYear: "1948",
  },
  {
    id: "ford",
    name: "Ford",
    slug: "ford",
    logo: "/placeholder.svg?height=100&width=100&text=Ford",
    description: "Official Ford Motor Company parts.",
    partCount: 18900,
    isPopular: true,
    foundedYear: "1903",
  },
  {
    id: "bmw",
    name: "BMW",
    slug: "bmw",
    logo: "/placeholder.svg?height=100&width=100&text=BMW",
    description: "Precision engineered parts for the Ultimate Driving Machine.",
    partCount: 8400,
    isPopular: true,
    foundedYear: "1916",
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    slug: "mercedes",
    logo: "/placeholder.svg?height=100&width=100&text=Mercedes",
    description: "Luxury parts for Mercedes-Benz vehicles.",
    partCount: 9200,
    isPopular: true,
    foundedYear: "1926",
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    slug: "chevrolet",
    logo: "/placeholder.svg?height=100&width=100&text=Chevrolet",
    description: "GM quality parts for Chevrolet vehicles.",
    partCount: 16800,
    isPopular: true,
    foundedYear: "1911",
  },
  {
    id: "nissan",
    name: "Nissan",
    slug: "nissan",
    logo: "/placeholder.svg?height=100&width=100&text=Nissan",
    description: "Authentic Nissan OEM parts and accessories.",
    partCount: 11500,
    isPopular: true,
    foundedYear: "1933",
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    slug: "volkswagen",
    logo: "/placeholder.svg?height=100&width=100&text=VW",
    description: "German engineering excellence for VW vehicles.",
    partCount: 10200,
    isPopular: true,
    foundedYear: "1937",
  },
  {
    id: "audi",
    name: "Audi",
    slug: "audi",
    logo: "/placeholder.svg?height=100&width=100&text=Audi",
    description: "Premium parts for Audi performance and luxury.",
    partCount: 7800,
    isPopular: true,
    foundedYear: "1909",
  },
  {
    id: "hyundai",
    name: "Hyundai",
    slug: "hyundai",
    logo: "/placeholder.svg?height=100&width=100&text=Hyundai",
    description: "Quality parts for Hyundai's modern vehicles.",
    partCount: 9800,
    isPopular: true,
    foundedYear: "1967",
  },
  {
    id: "kia",
    name: "Kia",
    slug: "kia",
    logo: "/placeholder.svg?height=100&width=100&text=Kia",
    description: "Genuine Kia parts and accessories.",
    partCount: 8600,
    isPopular: false,
    foundedYear: "1944",
  },
  {
    id: "mazda",
    name: "Mazda",
    slug: "mazda",
    logo: "/placeholder.svg?height=100&width=100&text=Mazda",
    description: "Zoom-Zoom performance parts for Mazda.",
    partCount: 6500,
    isPopular: false,
    foundedYear: "1920",
  },
  {
    id: "subaru",
    name: "Subaru",
    slug: "subaru",
    logo: "/placeholder.svg?height=100&width=100&text=Subaru",
    description: "AWD excellence with genuine Subaru parts.",
    partCount: 7200,
    isPopular: false,
    foundedYear: "1953",
  },
  {
    id: "lexus",
    name: "Lexus",
    slug: "lexus",
    logo: "/placeholder.svg?height=100&width=100&text=Lexus",
    description: "Premium luxury parts for Lexus vehicles.",
    partCount: 5800,
    isPopular: false,
    foundedYear: "1989",
  },
  {
    id: "dodge",
    name: "Dodge",
    slug: "dodge",
    logo: "/placeholder.svg?height=100&width=100&text=Dodge",
    description: "Performance parts for Dodge muscle cars and trucks.",
    partCount: 12400,
    isPopular: false,
    foundedYear: "1900",
  },
  {
    id: "ram",
    name: "RAM",
    slug: "ram",
    logo: "/placeholder.svg?height=100&width=100&text=RAM",
    description: "Heavy-duty truck parts for RAM vehicles.",
    partCount: 8900,
    isPopular: false,
    foundedYear: "2010",
  },
  {
    id: "jeep",
    name: "Jeep",
    slug: "jeep",
    logo: "/placeholder.svg?height=100&width=100&text=Jeep",
    description: "Off-road adventure parts for Jeep.",
    partCount: 10500,
    isPopular: false,
    foundedYear: "1941",
  },
  {
    id: "gmc",
    name: "GMC",
    slug: "gmc",
    logo: "/placeholder.svg?height=100&width=100&text=GMC",
    description: "Professional grade truck and SUV parts.",
    partCount: 9200,
    isPopular: false,
    foundedYear: "1912",
  },
  {
    id: "cadillac",
    name: "Cadillac",
    slug: "cadillac",
    logo: "/placeholder.svg?height=100&width=100&text=Cadillac",
    description: "American luxury vehicle parts.",
    partCount: 6100,
    isPopular: false,
    foundedYear: "1902",
  },
  {
    id: "buick",
    name: "Buick",
    slug: "buick",
    logo: "/placeholder.svg?height=100&width=100&text=Buick",
    description: "Premium comfort parts for Buick.",
    partCount: 5400,
    isPopular: false,
    foundedYear: "1899",
  },
  {
    id: "chrysler",
    name: "Chrysler",
    slug: "chrysler",
    logo: "/placeholder.svg?height=100&width=100&text=Chrysler",
    description: "Classic American automotive parts.",
    partCount: 7300,
    isPopular: false,
    foundedYear: "1925",
  },
  {
    id: "lincoln",
    name: "Lincoln",
    slug: "lincoln",
    logo: "/placeholder.svg?height=100&width=100&text=Lincoln",
    description: "Luxury parts for Lincoln vehicles.",
    partCount: 4200,
    isPopular: false,
    foundedYear: "1917",
  },
  {
    id: "acura",
    name: "Acura",
    slug: "acura",
    logo: "/placeholder.svg?height=100&width=100&text=Acura",
    description: "Precision crafted parts for Acura.",
    partCount: 5600,
    isPopular: false,
    foundedYear: "1986",
  },
  {
    id: "infiniti",
    name: "Infiniti",
    slug: "infiniti",
    logo: "/placeholder.svg?height=100&width=100&text=Infiniti",
    description: "Luxury performance parts for Infiniti.",
    partCount: 4800,
    isPopular: false,
    foundedYear: "1989",
  },
  {
    id: "volvo",
    name: "Volvo",
    slug: "volvo",
    logo: "/placeholder.svg?height=100&width=100&text=Volvo",
    description: "Swedish safety and durability parts.",
    partCount: 6700,
    isPopular: false,
    foundedYear: "1927",
  },
  {
    id: "land-rover",
    name: "Land Rover",
    slug: "land-rover",
    logo: "/placeholder.svg?height=100&width=100&text=LandRover",
    description: "British luxury off-road vehicle parts.",
    partCount: 5200,
    isPopular: false,
    foundedYear: "1948",
  },
  {
    id: "jaguar",
    name: "Jaguar",
    slug: "jaguar",
    logo: "/placeholder.svg?height=100&width=100&text=Jaguar",
    description: "British luxury sports car parts.",
    partCount: 4100,
    isPopular: false,
    foundedYear: "1922",
  },
  {
    id: "porsche",
    name: "Porsche",
    slug: "porsche",
    logo: "/placeholder.svg?height=100&width=100&text=Porsche",
    description: "High-performance sports car parts.",
    partCount: 6300,
    isPopular: false,
    foundedYear: "1931",
  },
  {
    id: "tesla",
    name: "Tesla",
    slug: "tesla",
    logo: "/placeholder.svg?height=100&width=100&text=Tesla",
    description: "Electric vehicle parts and accessories.",
    partCount: 3800,
    isPopular: true,
    foundedYear: "2003",
  },
  {
    id: "mini",
    name: "MINI",
    slug: "mini",
    logo: "/placeholder.svg?height=100&width=100&text=MINI",
    description: "Iconic British compact car parts.",
    partCount: 4600,
    isPopular: false,
    foundedYear: "1959",
  },
  {
    id: "fiat",
    name: "Fiat",
    slug: "fiat",
    logo: "/placeholder.svg?height=100&width=100&text=Fiat",
    description: "Italian automotive parts and accessories.",
    partCount: 5100,
    isPopular: false,
    foundedYear: "1899",
  },
  {
    id: "alfa-romeo",
    name: "Alfa Romeo",
    slug: "alfa-romeo",
    logo: "/placeholder.svg?height=100&width=100&text=AlfaRomeo",
    description: "Italian performance and style parts.",
    partCount: 3400,
    isPopular: false,
    foundedYear: "1910",
  },
  {
    id: "maserati",
    name: "Maserati",
    slug: "maserati",
    logo: "/placeholder.svg?height=100&width=100&text=Maserati",
    description: "Italian luxury performance parts.",
    partCount: 2800,
    isPopular: false,
    foundedYear: "1914",
  },
  {
    id: "genesis",
    name: "Genesis",
    slug: "genesis",
    logo: "/placeholder.svg?height=100&width=100&text=Genesis",
    description: "Luxury division parts for Genesis vehicles.",
    partCount: 3200,
    isPopular: false,
    foundedYear: "2015",
  },
  {
    id: "mitsubishi",
    name: "Mitsubishi",
    slug: "mitsubishi",
    logo: "/placeholder.svg?height=100&width=100&text=Mitsubishi",
    description: "Reliable parts for Mitsubishi vehicles.",
    partCount: 6900,
    isPopular: false,
    foundedYear: "1970",
  },
  {
    id: "suzuki",
    name: "Suzuki",
    slug: "suzuki",
    logo: "/placeholder.svg?height=100&width=100&text=Suzuki",
    description: "Compact and efficient vehicle parts.",
    partCount: 5800,
    isPopular: false,
    foundedYear: "1909",
  },
  {
    id: "isuzu",
    name: "Isuzu",
    slug: "isuzu",
    logo: "/placeholder.svg?height=100&width=100&text=Isuzu",
    description: "Commercial truck and SUV parts.",
    partCount: 4700,
    isPopular: false,
    foundedYear: "1916",
  },
  {
    id: "peugeot",
    name: "Peugeot",
    slug: "peugeot",
    logo: "/placeholder.svg?height=100&width=100&text=Peugeot",
    description: "French automotive engineering parts.",
    partCount: 5300,
    isPopular: false,
    foundedYear: "1810",
  },
  {
    id: "renault",
    name: "Renault",
    slug: "renault",
    logo: "/placeholder.svg?height=100&width=100&text=Renault",
    description: "French innovation in automotive parts.",
    partCount: 5900,
    isPopular: false,
    foundedYear: "1899",
  },
  {
    id: "citroen",
    name: "Citroën",
    slug: "citroen",
    logo: "/placeholder.svg?height=100&width=100&text=Citroen",
    description: "Distinctive French vehicle parts.",
    partCount: 4500,
    isPopular: false,
    foundedYear: "1919",
  },
  {
    id: "saab",
    name: "Saab",
    slug: "saab",
    logo: "/placeholder.svg?height=100&width=100&text=Saab",
    description: "Swedish innovation and safety parts.",
    partCount: 3100,
    isPopular: false,
    foundedYear: "1945",
  },
  {
    id: "smart",
    name: "Smart",
    slug: "smart",
    logo: "/placeholder.svg?height=100&width=100&text=Smart",
    description: "Urban micro-car parts and accessories.",
    partCount: 2400,
    isPopular: false,
    foundedYear: "1994",
  },
  {
    id: "scion",
    name: "Scion",
    slug: "scion",
    logo: "/placeholder.svg?height=100&width=100&text=Scion",
    description: "Youth-oriented Toyota brand parts.",
    partCount: 3600,
    isPopular: false,
    foundedYear: "2003",
  },
  {
    id: "pontiac",
    name: "Pontiac",
    slug: "pontiac",
    logo: "/placeholder.svg?height=100&width=100&text=Pontiac",
    description: "Classic American performance parts.",
    partCount: 4200,
    isPopular: false,
    foundedYear: "1926",
  },
  {
    id: "mercury",
    name: "Mercury",
    slug: "mercury",
    logo: "/placeholder.svg?height=100&width=100&text=Mercury",
    description: "Mid-luxury Ford division parts.",
    partCount: 3700,
    isPopular: false,
    foundedYear: "1938",
  },
  {
    id: "bosch",
    name: "Bosch",
    slug: "bosch",
    logo: "/placeholder.svg?height=100&width=100&text=Bosch",
    description: "Leading global supplier of technology and services.",
    partCount: 25000,
    isPopular: true,
    foundedYear: "1886",
  },
  {
    id: "denso",
    name: "Denso",
    slug: "denso",
    logo: "/placeholder.svg?height=100&width=100&text=Denso",
    description: "Advanced automotive technology, systems and components.",
    partCount: 14500,
    isPopular: false,
    foundedYear: "1949",
  },
  {
    id: "kyb",
    name: "KYB",
    slug: "kyb",
    logo: "/placeholder.svg?height=100&width=100&text=KYB",
    description: "World's largest supplier of shocks and struts.",
    partCount: 6800,
    isPopular: false,
    foundedYear: "1919",
  },
  {
    id: "brembo",
    name: "Brembo",
    slug: "brembo",
    logo: "/placeholder.svg?height=100&width=100&text=Brembo",
    description: "High-performance brake systems and components.",
    partCount: 8200,
    isPopular: false,
    foundedYear: "1961",
  },
  {
    id: "bilstein",
    name: "Bilstein",
    slug: "bilstein",
    logo: "/placeholder.svg?height=100&width=100&text=Bilstein",
    description: "Premium shock absorbers and suspension.",
    partCount: 5400,
    isPopular: false,
    foundedYear: "1873",
  },
  {
    id: "eibach",
    name: "Eibach",
    slug: "eibach",
    logo: "/placeholder.svg?height=100&width=100&text=Eibach",
    description: "Performance springs and suspension components.",
    partCount: 4100,
    isPopular: false,
    foundedYear: "1951",
  },
  {
    id: "mobil1",
    name: "Mobil 1",
    slug: "mobil1",
    logo: "/placeholder.svg?height=100&width=100&text=Mobil1",
    description: "Advanced synthetic motor oils and lubricants.",
    partCount: 3800,
    isPopular: true,
    foundedYear: "1974",
  },
  {
    id: "castrol",
    name: "Castrol",
    slug: "castrol",
    logo: "/placeholder.svg?height=100&width=100&text=Castrol",
    description: "Premium engine oils and automotive fluids.",
    partCount: 4200,
    isPopular: false,
    foundedYear: "1899",
  },
  {
    id: "generic",
    name: "Generic/Universal",
    slug: "generic",
    logo: "/placeholder.svg?height=100&width=100&text=Generic",
    description: "Universal fitment parts and accessories.",
    partCount: 15000,
    isPopular: false,
    foundedYear: "N/A",
  },
]

export const categories: Category[] = [
  {
    id: "brakes",
    name: "Brakes & Brake Parts",
    slug: "brakes",
    description: "Complete brake systems, pads, rotors, and calipers",
    icon: "disc",
    partCount: 8976,
    subcategories: ["Brake Pads", "Rotors", "Calipers", "Brake Lines"],
  },
  {
    id: "engine",
    name: "Engine Parts",
    slug: "engine",
    description: "Engine components and performance parts",
    icon: "cog",
    partCount: 15432,
    subcategories: ["Pistons", "Gaskets", "Timing Belts", "Valves"],
  },
  {
    id: "suspension",
    name: "Suspension & Steering",
    slug: "suspension",
    description: "Shocks, struts, control arms, and steering components",
    icon: "wrench",
    partCount: 6543,
    subcategories: ["Shocks", "Struts", "Control Arms", "Ball Joints"],
  },
  {
    id: "electrical",
    name: "Electrical Systems",
    slug: "electrical",
    description: "Batteries, alternators, starters, and sensors",
    icon: "zap",
    partCount: 9876,
    subcategories: ["Batteries", "Alternators", "Starters", "Sensors"],
  },
  {
    id: "transmission",
    name: "Transmission",
    slug: "transmission",
    description: "Transmission parts and components",
    icon: "settings",
    partCount: 5432,
    subcategories: ["Automatic", "Manual", "CVT", "Clutches"],
  },
  {
    id: "body",
    name: "Body & Exterior",
    slug: "body",
    description: "Doors, bumpers, lights, and exterior components",
    icon: "car",
    partCount: 12345,
    subcategories: ["Doors", "Bumpers", "Lights", "Mirrors"],
  },
]

export const popularParts = [
  { name: "Brake Pads", count: 1245 },
  { name: "Oil Filter", count: 876 },
  { name: "Battery", count: 543 },
  { name: "Spark Plugs", count: 1892 },
  { name: "Air Filter", count: 765 },
  { name: "Shock Absorbers", count: 1123 },
]

// We keep the first ~20 items as "real" handcrafted data for demos
// The rest are procedurally generated to simulate 1,000,000+ items without crashing memory
const REAL_PRODUCTS: Part[] = [
  {
    id: "1",
    name: "Brembo Brake Pads",
    category: "Brakes & Brake Parts",
    subcategory: "Brake Pads",
    brand: "Brembo",
    make: "BMW",
    model: "3 Series",
    year: "2012-2018",
    partNumber: "P06046",
    description:
      "High-performance brake pads designed for superior stopping power and reduced brake fade. Ideal for daily driving and spirited use. These ceramic brake pads offer exceptional durability and minimal dust production.",
    fitment: ["BMW 3 Series (2012-2018)", "BMW 4 Series (2014-2020)", "BMW X3 (2011-2017)"],
    mileageOptions: [
      {
        mileage: 15000,
        condition: "Excellent",
        price: 89.99,
        warranty: "2 Years / 24,000 Miles",
        availability: "In Stock",
      },
      {
        mileage: 35000,
        condition: "Good",
        price: 65.99,
        warranty: "1 Year / 12,000 Miles",
        availability: "In Stock",
      },
      {
        mileage: 55000,
        condition: "Fair",
        price: 45.99,
        warranty: "6 Months / 6,000 Miles",
        availability: "Limited",
      },
    ],
    images: [
      "/brembo-brake-pads.jpg",
      "/brake-pads-close-up.jpg",
      "/brake-pads-installed.jpg",
      "/brake-pads-package.jpg",
    ],
    store: {
      name: "AutoMag",
      distance: 2.0,
      rating: 4.8,
      reviewCount: 342,
    },
    specs: {
      Material: "Ceramic",
      Position: "Front",
      "Wear Sensor": "Included",
      "Pad Thickness": "17mm",
      Weight: "2.3 lbs",
      Make: "BMW",
      Model: "3 Series",
      Year: "2012-2018",
    },
    rating: 4.8,
    reviewCount: 156,
    badges: ["OEM Quality", "Best Seller", "Free Shipping"],
    faqs: [
      {
        question: "Do these pads come with wear sensors?",
        answer: "Yes, this set includes new wear sensors for both left and right sides.",
      },
      {
        question: "Is break-in required?",
        answer: "Yes, we recommend a standard bedding-in procedure for optimal performance.",
      },
    ],
    videos: [
      {
        title: "Installation Guide - BMW F30",
        url: "#",
        thumbnail: "/placeholder.svg?height=200&width=300&text=Install+Guide",
      },
      {
        title: "Brembo vs Stock Comparison",
        url: "#",
        thumbnail: "/placeholder.svg?height=200&width=300&text=Review",
      },
    ],
    articles: [
      {
        id: "brake-maint-1",
        title: "When to Replace Your Brake Pads",
        excerpt: "Signs and symptoms that it's time for a brake service.",
        content: "Full content...",
        image: "/placeholder.svg?height=200&width=300",
        date: "2023-09-10",
        author: "Service Tech",
      },
    ],
  },
  {
    id: "2",
    name: "ATE Brake Pads",
    category: "Brakes & Brake Parts",
    subcategory: "Brake Pads",
    brand: "ATE",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: "2015-2021",
    partNumber: "607143",
    description:
      "Original equipment quality brake pads providing excellent braking performance and long service life. Low noise and dust formulation for a cleaner driving experience.",
    fitment: ["Mercedes-Benz C-Class (2015-2021)", "Mercedes-Benz E-Class (2017-2023)"],
    mileageOptions: [
      {
        mileage: 12000,
        condition: "Excellent",
        price: 95.99,
        warranty: "2 Years / 24,000 Miles",
        availability: "In Stock",
      },
      {
        mileage: 28000,
        condition: "Good",
        price: 72.99,
        warranty: "1 Year / 12,000 Miles",
        availability: "In Stock",
      },
      {
        mileage: 48000,
        condition: "Fair",
        price: 52.99,
        warranty: "6 Months / 6,000 Miles",
        availability: "In Stock",
      },
    ],
    images: ["/ate-brake-pads.jpg", "/brake-pads-detail.jpg", "/brake-pads-comparison.png", "/brake-pads-box.jpg"],
    store: {
      name: "PartsPlus",
      distance: 3.5,
      rating: 4.6,
      reviewCount: 289,
    },
    specs: {
      Material: "Semi-Metallic",
      Position: "Front",
      "Wear Sensor": "Not Included",
      "Pad Thickness": "16mm",
      Weight: "2.1 lbs",
      Make: "Mercedes-Benz",
      Model: "C-Class",
      Year: "2015-2021",
    },
    rating: 4.6,
    reviewCount: 124,
    badges: ["OEM Quality", "Low Dust"],
    articles: [
      {
        id: "brake-noise-1",
        title: "How to Fix Noisy Brakes",
        excerpt: "Common causes of brake squeal and how to solve them.",
        content: `
# How to Fix Noisy Brakes: A Complete Guide

Brake noise is one of the most common complaints among vehicle owners. Whether it's a high-pitched squeal, grinding sound, or clicking noise, understanding the cause can help you determine the right solution.

## Common Causes of Brake Noise

### 1. Worn Brake Pads
The most common cause of brake squeal is worn brake pads. Most modern brake pads have wear indicators - small metal tabs that contact the rotor when pads are low, creating a squealing sound to alert you it's time for replacement.

**Solution:** Replace brake pads when thickness is below 3mm or when wear indicators are audible.

### 2. Glazed Rotors or Pads
When brakes overheat from aggressive braking or riding the brakes downhill, the friction material can glaze over, creating a smooth, hardened surface that squeals.

**Solution:** Resurface or replace rotors, and replace glazed pads. Break in new pads properly with gradual stops.

### 3. Dust and Debris
Brake dust buildup between the pad and rotor can cause squealing, especially after the vehicle sits overnight.

**Solution:** Clean brakes with brake cleaner spray. This noise usually goes away after a few stops.

### 4. Low-Quality Brake Pads
Cheap brake pads often contain metal flakes that can cause squealing when they contact the rotor surface.

**Solution:** Invest in quality brake pads from reputable brands like Brembo, Ferodo, or Textar.

### 5. Missing or Worn Anti-Squeal Shims
Brake shims are thin layers of rubber or metal that dampen vibrations between the pad and caliper.

**Solution:** Always install new shims when replacing pads, and apply brake grease to the back of pads.

## When to Seek Professional Help

- Grinding noise (metal-on-metal contact)
- Brake pedal vibration or pulsation
- Vehicle pulling to one side when braking
- Brake warning light illuminated
- Soft or spongy brake pedal

## Prevention Tips

1. Use quality brake components
2. Avoid aggressive braking when possible
3. Don't ride the brakes on long descents
4. Have brakes inspected every 12,000 miles
5. Replace brake fluid every 2 years

At AUW Auto Parts, we carry premium brake components from trusted manufacturers. Our parts come with warranty coverage and expert fitment guidance.
        `,
        image: "/brake-repair-mechanic-working.jpg",
        date: "2024-11-15",
        author: "AUW Technical Team",
        readTime: "5 min read",
        tags: ["Brakes", "Maintenance", "DIY", "Troubleshooting"],
      },
    ],
  },
  {
    id: "3",
    name: "Textar Brake Pads",
    category: "Brakes & Brake Parts",
    subcategory: "Brake Pads",
    brand: "Textar",
    make: "Audi",
    model: "A4",
    year: "2016-2022",
    partNumber: "2473101",
    description:
      "Premium quality brake pads engineered for precise braking control and safety. Manufactured to strict OE standards with advanced friction materials.",
    fitment: ["Audi A4 (2016-2022)", "Audi A6 (2012-2018)", "Audi Q5 (2018-2023)"],
    mileageOptions: [
      {
        mileage: 18000,
        condition: "Excellent",
        price: 82.99,
        warranty: "2 Years / 24,000 Miles",
        availability: "In Stock",
      },
      {
        mileage: 32000,
        condition: "Good",
        price: 61.99,
        warranty: "18 Months / 18,000 Miles",
        availability: "In Stock",
      },
      {
        mileage: 52000,
        condition: "Fair",
        price: 42.99,
        warranty: "1 Year / 12,000 Miles",
        availability: "In Stock",
      },
    ],
    images: ["/textar-brake-pads.jpg", "/brake-pads-sensor.jpg", "/brake-pads-fitment.jpg", "/brake-pads-warranty.jpg"],
    store: {
      name: "AutoDetail",
      distance: 5.0,
      rating: 4.7,
      reviewCount: 412,
    },
    specs: {
      Material: "Low-Metallic",
      Position: "Rear",
      "Wear Sensor": "Prepared",
      "Pad Thickness": "15mm",
      Weight: "1.8 lbs",
      Make: "Audi",
      Model: "A4",
      Year: "2016-2022",
    },
    rating: 4.7,
    reviewCount: 203,
    badges: ["Top Rated", "Free Shipping"],
    articles: [
      {
        id: "rear-brake-1",
        title: "Rear Brake Maintenance Guide",
        excerpt: "Why rear brakes are just as important as front brakes.",
        content: "Full content...",
        image: "/placeholder.svg?height=200&width=300&text=Rear+Brakes",
        date: "2023-11-12",
        author: "Safety Expert",
      },
    ],
  },
  {
    id: "4",
    name: "Ferodo Brake Pads",
    category: "Brakes & Brake Parts",
    subcategory: "Brake Pads",
    brand: "Ferodo",
    make: "Lexus",
    model: "ES",
    year: "2013-2018",
    partNumber: "FDB4839",
    description:
      "Reliable braking performance for everyday driving conditions. Features thermal underlayer for heat dissipation and consistent pedal feel.",
    fitment: ["Lexus ES (2013-2018)", "Lexus RX (2016-2022)", "Toyota Camry (2012-2017)"],
    mileageOptions: [
      {
        mileage: 22000,
        condition: "Excellent",
        price: 76.99,
        warranty: "2 Years / 24,000 Miles",
        availability: "In Stock",
      },
      {
        mileage: 40000,
        condition: "Good",
        price: 56.99,
        warranty: "1 Year / 12,000 Miles",
        availability: "Limited",
      },
      {
        mileage: 58000,
        condition: "Fair",
        price: 38.99,
        warranty: "6 Months / 6,000 Miles",
        availability: "Out of Stock",
      },
    ],
    images: [
      "/ferodo-brake-pads.jpg",
      "/brake-pads-performance.jpg",
      "/brake-pads-thermal.jpg",
      "/placeholder.svg?height=600&width=600",
    ],
    store: {
      name: "MotorTime",
      distance: 6.5,
      rating: 4.5,
      reviewCount: 198,
    },
    specs: {
      Material: "Organic",
      Position: "Front",
      "Wear Sensor": "Included",
      "Pad Thickness": "16.5mm",
      Weight: "2.0 lbs",
      Make: "Lexus",
      Model: "ES",
      Year: "2013-2018",
    },
    rating: 4.5,
    reviewCount: 89,
    badges: ["Value Pick"],
    articles: [
      {
        id: "ferodo-tech-1",
        title: "Ferodo Eco-Friction Technology",
        excerpt: "How Ferodo reduces copper in brake pads without compromising stopping power.",
        content: "Detailed technical article...",
        image: "/placeholder.svg?height=200&width=300&text=Eco+Friction",
        date: "2023-12-01",
        author: "Engineering Team",
      },
    ],
  },
  {
    id: "1001",
    name: "Uploaded Part #1001 - Generic Control Arm",
    category: "Suspension",
    subcategory: "Control Arms",
    brand: "Generic",
    make: "Generic",
    model: "Generic",
    year: "N/A",
    partNumber: "UPLOAD-1001",
    description: "Bulk uploaded inventory item. Verification pending.",
    fitment: ["Universal Fitment"],
    mileageOptions: [
      {
        mileage: 0,
        condition: "New",
        price: 45.0,
        warranty: "1 Year",
        availability: "In Stock",
      },
    ],
    images: ["/placeholder.svg?height=600&width=800&text=Uploaded+Part+1001"],
    store: { name: "Warehouse A", distance: 0, rating: 0, reviewCount: 0 },
    specs: { Source: "Bulk Upload" },
    rating: 0,
    reviewCount: 0,
    badges: ["New Upload"],
  },
  {
    id: "1002",
    name: "Uploaded Part #1002 - High Flow Air Filter",
    category: "Engine",
    subcategory: "Filters",
    brand: "SpeedPro",
    make: "Honda",
    model: "Civic",
    year: "2020+",
    partNumber: "UPLOAD-1002",
    description: "High performance air filter from bulk import.",
    fitment: ["Honda Civic 2020+"],
    mileageOptions: [
      {
        mileage: 0,
        condition: "New",
        price: 29.99,
        warranty: "1 Year",
        availability: "In Stock",
      },
    ],
    images: ["/placeholder.svg?height=600&width=800&text=Uploaded+Part+1002"],
    store: { name: "Warehouse B", distance: 0, rating: 0, reviewCount: 0 },
    specs: { Source: "Bulk Upload" },
    rating: 0,
    reviewCount: 0,
    badges: ["New Upload"],
  },
  {
    id: "1003",
    name: "Uploaded Part #1003 - OEM Replacement Headlight",
    category: "Body & Exterior",
    subcategory: "Lights",
    brand: "Depo",
    make: "Toyota",
    model: "Camry",
    year: "2018-2022",
    partNumber: "UPLOAD-1003",
    description: "Direct fit replacement headlight assembly.",
    fitment: ["Toyota Camry 2018-2022"],
    mileageOptions: [
      {
        mileage: 0,
        condition: "New",
        price: 159.5,
        warranty: "1 Year",
        availability: "In Stock",
      },
    ],
    images: ["/placeholder.svg?height=600&width=800&text=Uploaded+Part+1003"],
    store: { name: "Warehouse A", distance: 0, rating: 0, reviewCount: 0 },
    specs: { Source: "Bulk Upload" },
    rating: 0,
    reviewCount: 0,
    badges: ["New Upload"],
  },
  {
    id: "1004",
    name: "Uploaded Part #1004 - Radiator Assembly",
    category: "Engine",
    subcategory: "Cooling",
    brand: "CoolMaster",
    make: "Ford",
    model: "F-150",
    year: "2015-2020",
    partNumber: "UPLOAD-1004",
    description: "Aluminum core radiator for maximum cooling efficiency.",
    fitment: ["Ford F-150 2015-2020"],
    mileageOptions: [
      {
        mileage: 0,
        condition: "New",
        price: 189.99,
        warranty: "2 Years",
        availability: "In Stock",
      },
    ],
    images: ["/placeholder.svg?height=600&width=800&text=Radiator"],
    store: { name: "Warehouse B", distance: 0, rating: 0, reviewCount: 0 },
    specs: { Source: "Bulk Upload" },
    rating: 0,
    reviewCount: 0,
    badges: ["New Upload"],
  },
  {
    id: "1005",
    name: "Uploaded Part #1005 - Alternator 160 Amp",
    category: "Electrical Systems",
    subcategory: "Alternators",
    brand: "PowerGen",
    make: "Chevrolet",
    model: "Silverado",
    year: "2014-2018",
    partNumber: "UPLOAD-1005",
    description: "High output alternator suitable for vehicles with aftermarket electronics.",
    fitment: ["Chevrolet Silverado 2014-2018"],
    mileageOptions: [
      {
        mileage: 0,
        condition: "New",
        price: 215.5,
        warranty: "1 Year",
        availability: "In Stock",
      },
    ],
    images: ["/placeholder.svg?height=600&width=800&text=Alternator"],
    store: { name: "Warehouse A", distance: 0, rating: 0, reviewCount: 0 },
    specs: { Source: "Bulk Upload" },
    rating: 0,
    reviewCount: 0,
    badges: ["New Upload"],
  },
  {
    id: "1006",
    name: "Uploaded Part #1006 - Rear Shock Absorber Pair",
    category: "Suspension",
    subcategory: "Shocks",
    brand: "RideStable",
    make: "Toyota",
    model: "RAV4",
    year: "2013-2018",
    partNumber: "UPLOAD-1006",
    description: "Pair of rear gas-charged shock absorbers.",
    fitment: ["Toyota RAV4 2013-2018"],
    mileageOptions: [
      {
        mileage: 0,
        condition: "New",
        price: 89.0,
        warranty: "Lifetime",
        availability: "In Stock",
      },
    ],
    images: ["/placeholder.svg?height=600&width=800&text=Shocks"],
    store: { name: "Warehouse C", distance: 0, rating: 0, reviewCount: 0 },
    specs: { Source: "Bulk Upload", "Part ID": "1006" },
    rating: 4.8,
    reviewCount: 0,
    badges: ["New Upload"],
    videos: [],
    articles: [],
  },
]

// This simulates the database without holding 1M objects in memory
export const TOTAL_INVENTORY_COUNT = 1245678 // Over 1 Million

const SAMPLE_PART_NAMES = [
  "High Performance Alternator",
  "Ceramic Brake Pad Set",
  "Suspension Control Arm",
  "Oil Filter Housing",
  "Fuel Pump Assembly",
  "Ignition Coil Pack",
  "Radiator Cooling Fan",
  "Wheel Hub Bearing",
  "Oxygen Sensor",
  "Cabin Air Filter",
]

// Helper to generate a deterministic product based on ID (so links always work)
function generateProduct(id: string): Part {
  // Check if it's a real product first
  const real = REAL_PRODUCTS.find((p) => p.id === id)
  if (real) return real

  const numId = Number.parseInt(id) || 999999
  const seed = numId % 100
  const brand = BRANDS[numId % BRANDS.length]
  const category = CATEGORIES[numId % CATEGORIES.length]
  const make = CAR_MAKES[numId % CAR_MAKES.length]
  const nameIndex = numId % SAMPLE_PART_NAMES.length

  const makeModels = CAR_MODELS[make] || ["Compatible Models"]
  const model = makeModels[numId % makeModels.length]
  const yearStart = 2015 + (numId % 5)
  const yearEnd = yearStart + 3 + (numId % 5)

  return {
    id: id,
    name: `${brand} ${SAMPLE_PART_NAMES[nameIndex]} for ${make} ${model}`,
    category: category.main,
    subcategory: category.sub[numId % category.sub.length],
    brand: brand,
    make: make,
    model: model,
    year: `${yearStart}-${yearEnd}`,
    partNumber: `UPLOAD-${id}`,
    description: `High quality ${brand} replacement part for ${yearStart}-${yearEnd} ${make} ${model}. Precision engineered to meet or exceed OEM specifications. Part #${id} from our bulk uploaded inventory.`,
    fitment: [`${yearStart}-${yearEnd} ${make} ${model}`, `${make} ${model} All Trims`],
    mileageOptions: [
      {
        mileage: 0,
        condition: "New",
        price: 45.0 + seed * 2.5,
        warranty: "1 Year",
        availability: "In Stock",
      },
    ],
    images: [`/placeholder.svg?height=600&width=800&text=${make}+${model}+${category.main}`],
    store: { name: "Main Warehouse", distance: 0, rating: 0, reviewCount: 0 },
    specs: { Source: "Bulk Upload", "Part ID": id, Make: make, Model: model, Year: `${yearStart}-${yearEnd}` },
    rating: 4.0 + seed / 100,
    reviewCount: Math.floor(seed * 5),
    badges: numId > 1000000 ? ["New Arrival"] : ["In Stock"],
    videos: [],
    articles: [],
  }
}

export function getProductById(id: string): Part | undefined {
  // Check real products first
  const realProduct = REAL_PRODUCTS.find((p) => p.id === id)
  if (realProduct) return realProduct

  // Check generated products
  // We can deterministically generate the product if the ID is a number > 2000
  const numericId = Number.parseInt(id)
  if (!isNaN(numericId) && numericId >= 2000) {
    return generateProduct(numericId)
  }

  // Fallback for "uploaded" parts 1000-2000
  // In a real app these would be in a DB, here we might return undefined
  // But to be safe for the demo, let's generate one if it looks numeric
  if (!isNaN(numericId)) {
    return generateProduct(numericId)
  }

  return undefined
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id.toLowerCase() === id.toLowerCase())
}

export function getPaginatedProducts(page: number, limit: number, filterBrand?: string, filterCategory?: string) {
  const start = (page - 1) * limit

  let products: Part[] = []

  // If verifying specific filters, we simulate filtered results
  // For standard browsing, we generate sequential IDs

  if (filterBrand) {
    // Generate simulated brand-specific items
    for (let i = 0; i < limit; i++) {
      const id = (start + i + 10000).toString() // Offset IDs for specific searches
      const product = generateProduct(id)
      product.brand = filterBrand // Force match
      product.name = `${filterBrand} Genuine Part #${id}`
      products.push(product)
    }
    return {
      products,
      total: Math.floor(TOTAL_INVENTORY_COUNT / 10), // Approx 10% match brand
    }
  }

  if (filterCategory) {
    // Generate simulated category-specific items
    for (let i = 0; i < limit; i++) {
      const id = (start + i + 20000).toString() // Different offset for categories
      const product = generateProduct(id)
      product.category = filterCategory // Force match
      product.name = `${product.brand} ${filterCategory} Part #${id}`
      products.push(product)
    }
    return {
      products,
      total: Math.floor(TOTAL_INVENTORY_COUNT / 6), // Approx 1/6th match category
    }
  }

  // Default Browse - Mix of Real + Generated
  if (page === 1) {
    products = [...REAL_PRODUCTS]
    const remaining = limit - products.length
    for (let i = 0; i < remaining; i++) {
      products.push(generateProduct((2000 + i).toString()))
    }
  } else {
    // Generate completely new items for page 2, 3, 4... 1000
    for (let i = 0; i < limit; i++) {
      products.push(generateProduct((start + 2000 + i).toString()))
    }
  }

  return {
    products,
    total: TOTAL_INVENTORY_COUNT,
  }
}

// Export a getter for the full list for compatibility, but warn it's partial
export const searchResults = REAL_PRODUCTS

export function getProductsByBrand(brandName: string): Part[] {
  // Get real products first
  const real = REAL_PRODUCTS.filter((p) => p.brand.toLowerCase() === brandName.toLowerCase())
  // Generate a few more to populate the list if needed
  const generated: Part[] = []
  for (let i = 0; i < 10; i++) {
    const p = generateProduct((10000 + i).toString())
    p.brand = brandName // Force brand match
    p.name = `${brandName} Official Part #${10000 + i}`
    generated.push(p)
  }
  return [...real, ...generated]
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug || c.id === slug)
}

export function getProductsByCategory(categorySlug: string): Part[] {
  // Find category name from slug
  const category = categories.find((c) => c.slug === categorySlug || c.id === categorySlug)
  const categoryName = category ? category.name : categorySlug

  const real = REAL_PRODUCTS.filter(
    (p) =>
      p.category.toLowerCase() === categoryName.toLowerCase() ||
      p.category.toLowerCase().includes(categorySlug.toLowerCase()),
  )

  const generated: Part[] = []
  for (let i = 0; i < 10; i++) {
    const p = generateProduct((20000 + i).toString())
    p.category = categoryName // Force category match
    generated.push(p)
  }
  return [...real, ...generated]
}
