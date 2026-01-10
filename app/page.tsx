"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils" // Assuming cn utility exists for conditional class names

// Data
const years = Array.from({ length: 35 }, (_, i) => (new Date().getFullYear() + 1 - i).toString())
const makes = [
  "Acura",
  "Alfa Romeo",
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Fiat",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
]

const modelsByMake: Record<string, string[]> = {
  Toyota: [
    "4Runner",
    "Avalon",
    "Camry",
    "Corolla",
    "Highlander",
    "Land Cruiser",
    "Prius",
    "RAV4",
    "Sequoia",
    "Sienna",
    "Tacoma",
    "Tundra",
  ],
  Honda: ["Accord", "Civic", "CR-V", "HR-V", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  Ford: ["Bronco", "Edge", "Escape", "Expedition", "Explorer", "F-150", "F-250", "F-350", "Mustang", "Ranger"],
  Chevrolet: [
    "Blazer",
    "Camaro",
    "Colorado",
    "Corvette",
    "Equinox",
    "Malibu",
    "Silverado 1500",
    "Silverado 2500",
    "Suburban",
    "Tahoe",
    "Traverse",
  ],
  Dodge: ["Challenger", "Charger", "Durango", "Journey"],
  Ram: ["1500", "2500", "3500", "ProMaster"],
  BMW: ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "GLA", "GLC", "GLE", "GLS", "S-Class"],
  Jeep: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"],
  Nissan: ["Altima", "Armada", "Frontier", "Kicks", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan"],
  Hyundai: ["Elantra", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson"],
  Kia: ["Forte", "K5", "Seltos", "Sorento", "Soul", "Sportage", "Telluride"],
  Lexus: ["ES", "GX", "IS", "LX", "NX", "RX", "UX"],
  Acura: ["ILX", "MDX", "RDX", "TLX"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7", "Q8"],
  Subaru: ["Ascent", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
  Mazda: ["CX-30", "CX-5", "CX-50", "CX-9", "Mazda3", "Mazda6", "MX-5 Miata"],
  Volkswagen: ["Atlas", "Golf", "ID.4", "Jetta", "Passat", "Taos", "Tiguan"],
  GMC: ["Acadia", "Canyon", "Sierra 1500", "Sierra 2500", "Terrain", "Yukon"],
  Cadillac: ["CT4", "CT5", "Escalade", "XT4", "XT5", "XT6"],
  Volvo: ["S60", "S90", "V60", "XC40", "XC60", "XC90"],
  Porsche: ["718", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
  "Land Rover": ["Defender", "Discovery", "Range Rover", "Range Rover Sport"],
  Jaguar: ["E-PACE", "F-PACE", "F-TYPE", "XE", "XF"],
  Lincoln: ["Aviator", "Corsair", "Nautilus", "Navigator"],
  Infiniti: ["Q50", "Q60", "QX50", "QX55", "QX60", "QX80"],
  Genesis: ["G70", "G80", "G90", "GV70", "GV80"],
  Buick: ["Enclave", "Encore", "Envision"],
  Chrysler: ["300", "Pacifica", "Voyager"],
  Mitsubishi: ["Eclipse Cross", "Outlander", "Outlander Sport"],
  Fiat: ["500", "500X"],
  "Alfa Romeo": ["Giulia", "Stelvio"],
  Maserati: ["Ghibli", "Levante", "Quattroporte"],
  Mini: ["Clubman", "Countryman", "Hardtop"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
}

const trimsByModel: Record<string, string[]> = {
  // Toyota
  "4Runner": ["SR5", "SR5 Premium", "TRD Off-Road", "TRD Off-Road Premium", "Limited", "TRD Pro"],
  Avalon: ["XLE", "XSE", "Limited", "Touring"],
  Camry: ["LE", "SE", "SE Nightshade", "XLE", "XSE", "TRD"],
  Corolla: ["L", "LE", "SE", "XLE", "XSE", "Apex Edition"],
  Highlander: ["L", "LE", "XLE", "Limited", "Platinum", "Bronze Edition"],
  "Land Cruiser": ["Base", "Heritage Edition"],
  Prius: ["L Eco", "LE", "XLE", "Limited"],
  RAV4: ["LE", "XLE", "XLE Premium", "Adventure", "TRD Off-Road", "Limited"],
  Sequoia: ["SR5", "Limited", "Platinum", "TRD Pro"],
  Sienna: ["LE", "XLE", "XSE", "Limited", "Platinum"],
  Tacoma: ["SR", "SR5", "TRD Sport", "TRD Off-Road", "Limited", "TRD Pro"],
  Tundra: ["SR", "SR5", "Limited", "Platinum", "1794 Edition", "TRD Pro"],

  // Honda
  Accord: ["LX", "Sport", "Sport Special Edition", "EX-L", "Touring"],
  Civic: ["LX", "Sport", "EX", "EX-L", "Touring", "Si", "Type R"],
  "CR-V": ["LX", "EX", "EX-L", "Touring"],
  "HR-V": ["LX", "Sport", "EX", "EX-L"],
  Odyssey: ["LX", "EX", "EX-L", "Touring", "Elite"],
  Passport: ["Sport", "EX-L", "Touring", "Elite"],
  Pilot: ["LX", "EX", "EX-L", "Touring", "Elite", "Black Edition"],
  Ridgeline: ["Sport", "RTL", "RTL-E", "Black Edition"],

  // Ford
  Bronco: ["Base", "Big Bend", "Black Diamond", "Outer Banks", "Badlands", "Wildtrak", "Raptor"],
  Edge: ["SE", "SEL", "ST-Line", "Titanium", "ST"],
  Escape: ["S", "SE", "SEL", "Titanium"],
  Expedition: ["XL", "XLT", "Limited", "King Ranch", "Platinum", "Timberline"],
  Explorer: ["Base", "XLT", "Limited", "ST", "King Ranch", "Platinum", "Timberline"],
  "F-150": ["XL", "XLT", "Lariat", "King Ranch", "Platinum", "Limited", "Tremor", "Raptor"],
  "F-250": ["XL", "XLT", "Lariat", "King Ranch", "Platinum", "Limited", "Tremor"],
  "F-350": ["XL", "XLT", "Lariat", "King Ranch", "Platinum", "Limited"],
  Mustang: ["EcoBoost", "EcoBoost Premium", "GT", "GT Premium", "Mach 1", "Shelby GT500"],
  Ranger: ["XL", "XLT", "Lariat", "Tremor"],

  // Chevrolet
  Blazer: ["2LT", "3LT", "RS", "Premier"],
  Camaro: ["1LS", "1LT", "2LT", "3LT", "LT1", "1SS", "2SS", "ZL1"],
  Colorado: ["WT", "LT", "Z71", "ZR2"],
  Corvette: ["1LT", "2LT", "3LT", "1LZ", "2LZ", "3LZ"],
  Equinox: ["LS", "LT", "RS", "Premier"],
  Malibu: ["LS", "RS", "LT", "Premier"],
  "Silverado 1500": ["WT", "Custom", "Custom Trail Boss", "LT", "RST", "LT Trail Boss", "LTZ", "High Country", "ZR2"],
  "Silverado 2500": ["WT", "Custom", "LT", "LTZ", "High Country"],
  Suburban: ["LS", "LT", "RST", "Z71", "Premier", "High Country"],
  Tahoe: ["LS", "LT", "RST", "Z71", "Premier", "High Country"],
  Traverse: ["LS", "LT", "RS", "Premier", "High Country"],

  // Dodge
  Challenger: [
    "SXT",
    "GT",
    "R/T",
    "R/T Scat Pack",
    "R/T Scat Pack Widebody",
    "SRT Hellcat",
    "SRT Hellcat Widebody",
    "SRT Super Stock",
    "SRT Demon 170",
  ],
  Charger: ["SXT", "GT", "R/T", "Scat Pack", "Scat Pack Widebody", "SRT Hellcat", "SRT Hellcat Widebody"],
  Durango: ["SXT", "GT", "Citadel", "R/T", "SRT 392", "SRT Hellcat"],
  Journey: ["SE", "SXT", "Crossroad", "GT"],

  // Ram
  "1500": ["Tradesman", "Big Horn", "Laramie", "Rebel", "Limited", "Limited Longhorn", "TRX"],
  "2500": ["Tradesman", "Big Horn", "Laramie", "Limited", "Limited Longhorn", "Power Wagon"],
  "3500": ["Tradesman", "Big Horn", "Laramie", "Limited", "Limited Longhorn"],
  ProMaster: ["1500", "2500", "3500"],

  // BMW
  "2 Series": ["228i", "230i", "M235i", "M240i", "M2"],
  "3 Series": ["320i", "330i", "330e", "M340i", "M3"],
  "4 Series": ["430i", "M440i", "M4"],
  "5 Series": ["530i", "530e", "540i", "M550i", "M5"],
  "7 Series": ["740i", "760i", "i7"],
  X1: ["sDrive28i", "xDrive28i"],
  X3: ["sDrive30i", "xDrive30i", "M40i", "M"],
  X5: ["sDrive40i", "xDrive40i", "xDrive45e", "M50i", "M"],
  X7: ["xDrive40i", "xDrive60i", "M60i"],

  // Mercedes-Benz
  "A-Class": ["A 220", "A 220 4MATIC", "AMG A 35"],
  "C-Class": ["C 300", "C 300 4MATIC", "AMG C 43", "AMG C 63"],
  "E-Class": ["E 350", "E 350 4MATIC", "E 450", "AMG E 53", "AMG E 63 S"],
  GLA: ["GLA 250", "GLA 250 4MATIC", "AMG GLA 35", "AMG GLA 45"],
  GLC: ["GLC 300", "GLC 300 4MATIC", "AMG GLC 43", "AMG GLC 63"],
  GLE: ["GLE 350", "GLE 450", "GLE 580", "AMG GLE 53", "AMG GLE 63 S"],
  GLS: ["GLS 450", "GLS 580", "AMG GLS 63", "Maybach GLS 600"],
  "S-Class": ["S 500", "S 580", "AMG S 63", "Maybach S 580", "Maybach S 680"],

  // Jeep
  Cherokee: ["Latitude", "Latitude Lux", "Altitude", "Limited", "Trailhawk"],
  Compass: ["Sport", "Latitude", "Latitude Lux", "Limited", "Trailhawk"],
  Gladiator: ["Sport", "Sport S", "Willys", "Overland", "Rubicon", "Mojave"],
  "Grand Cherokee": ["Laredo", "Altitude", "Limited", "Trailhawk", "Overland", "Summit", "Summit Reserve", "4xe"],
  Renegade: ["Sport", "Latitude", "Altitude", "Limited", "Trailhawk"],
  Wrangler: ["Sport", "Sport S", "Willys", "Sahara", "Rubicon", "Rubicon 392", "4xe"],

  // Nissan
  Altima: ["S", "SV", "SR", "SL", "SR VC-Turbo", "Platinum"],
  Armada: ["S", "SV", "SL", "Platinum", "Midnight Edition"],
  Frontier: ["S", "SV", "PRO-X", "PRO-4X"],
  Kicks: ["S", "SV", "SR"],
  Maxima: ["SV", "SR", "Platinum"],
  Murano: ["S", "SV", "SL", "Platinum", "Midnight Edition"],
  Pathfinder: ["S", "SV", "SL", "Platinum", "Rock Creek"],
  Rogue: ["S", "SV", "SL", "Platinum"],
  Sentra: ["S", "SV", "SR"],
  Titan: ["S", "SV", "PRO-4X", "Platinum Reserve"],

  // Hyundai
  Elantra: ["SE", "SEL", "Limited", "N Line", "N"],
  Kona: ["SE", "SEL", "Limited", "N Line", "N"],
  Palisade: ["SE", "SEL", "XRT", "Limited", "Calligraphy"],
  "Santa Fe": ["SE", "SEL", "XRT", "Limited", "Calligraphy"],
  Sonata: ["SE", "SEL", "SEL Plus", "Limited", "N Line"],
  Tucson: ["SE", "SEL", "XRT", "Limited", "N Line"],

  // Kia
  Forte: ["FE", "LXS", "GT-Line", "GT"],
  K5: ["LXS", "GT-Line", "EX", "GT"],
  Seltos: ["LX", "S", "EX", "SX", "X-Line"],
  Sorento: ["LX", "S", "EX", "SX", "SX Prestige", "X-Line"],
  Soul: ["LX", "S", "GT-Line", "EX"],
  Sportage: ["LX", "EX", "SX", "SX Prestige", "X-Line", "X-Pro"],
  Telluride: ["LX", "S", "EX", "SX", "SX Prestige", "X-Line", "X-Pro"],

  // Lexus
  ES: ["ES 250", "ES 300h", "ES 350", "F Sport"],
  GX: ["GX 460", "Premium", "Luxury", "F Sport"],
  IS: ["IS 300", "IS 350", "IS 500", "F Sport"],
  LX: ["LX 600", "Premium", "Luxury", "F Sport", "Ultra Luxury"],
  NX: ["NX 250", "NX 350", "NX 350h", "NX 450h+", "F Sport"],
  RX: ["RX 350", "RX 350h", "RX 450h+", "RX 500h", "F Sport"],
  UX: ["UX 200", "UX 250h", "F Sport"],

  // Acura
  ILX: ["Base", "Premium", "Technology", "A-Spec"],
  MDX: ["Base", "Technology", "A-Spec", "Advance", "Type S"],
  RDX: ["Base", "Technology", "A-Spec", "Advance"],
  TLX: ["Base", "Technology", "A-Spec", "Advance", "Type S"],

  // Audi
  A3: ["Premium", "Premium Plus", "Prestige", "S3"],
  A4: ["Premium", "Premium Plus", "Prestige", "S4"],
  A6: ["Premium", "Premium Plus", "Prestige", "S6"],
  Q3: ["Premium", "Premium Plus", "Prestige"],
  Q5: ["Premium", "Premium Plus", "Prestige", "SQ5"],
  Q7: ["Premium", "Premium Plus", "Prestige", "SQ7"],
  Q8: ["Premium", "Premium Plus", "Prestige", "SQ8", "RS Q8"],

  // Subaru
  Ascent: ["Base", "Premium", "Limited", "Touring", "Onyx Edition"],
  Crosstrek: ["Base", "Premium", "Sport", "Limited"],
  Forester: ["Base", "Premium", "Sport", "Limited", "Touring", "Wilderness"],
  Impreza: ["Base", "Premium", "Sport", "Limited"],
  Legacy: ["Base", "Premium", "Sport", "Limited", "Touring"],
  Outback: ["Base", "Premium", "Onyx Edition", "Limited", "Touring", "Wilderness"],
  WRX: ["Base", "Premium", "Limited", "GT"],

  // Mazda
  "CX-30": [
    "2.5 S",
    "2.5 S Select",
    "2.5 S Preferred",
    "2.5 S Carbon Edition",
    "2.5 S Premium",
    "2.5 Turbo",
    "2.5 Turbo Premium Plus",
  ],
  "CX-5": [
    "2.5 S",
    "2.5 S Select",
    "2.5 S Preferred",
    "2.5 S Carbon Edition",
    "2.5 S Premium",
    "2.5 Turbo",
    "2.5 Turbo Signature",
  ],
  "CX-50": [
    "2.5 S",
    "2.5 S Select",
    "2.5 S Preferred",
    "2.5 S Premium",
    "2.5 Turbo",
    "2.5 Turbo Premium Plus",
    "2.5 Turbo Meridian Edition",
  ],
  "CX-9": ["Sport", "Touring", "Carbon Edition", "Grand Touring", "Signature"],
  Mazda3: ["2.5 S", "2.5 S Select", "2.5 S Preferred", "2.5 S Carbon Edition", "2.5 Turbo", "2.5 Turbo Premium Plus"],
  Mazda6: ["Sport", "Touring", "Grand Touring", "Grand Touring Reserve", "Carbon Edition", "Signature"],
  "MX-5 Miata": ["Sport", "Club", "Grand Touring"],

  // Volkswagen
  Atlas: ["S", "SE", "SEL", "SEL R-Line", "SEL Premium R-Line"],
  Golf: ["S", "SE", "GTI S", "GTI SE", "GTI Autobahn", "Golf R"],
  "ID.4": ["Standard", "S", "Pro", "Pro S", "AWD Pro", "AWD Pro S"],
  Jetta: ["S", "Sport", "SE", "SEL"],
  Passat: ["S", "SE", "R-Line", "Limited Edition"],
  Taos: ["S", "SE", "SEL"],
  Tiguan: ["S", "SE", "SE R-Line Black", "SEL", "SEL R-Line"],

  // GMC
  Acadia: ["SL", "SLE", "AT4", "Denali"],
  Canyon: ["Elevation", "AT4", "AT4X", "Denali"],
  "Sierra 1500": ["Pro", "SLE", "Elevation", "SLT", "AT4", "AT4X", "Denali", "Denali Ultimate"],
  "Sierra 2500": ["Pro", "SLE", "SLT", "AT4", "Denali"],
  Terrain: ["SL", "SLE", "AT4", "Denali"],
  Yukon: ["SLE", "SLT", "AT4", "Denali", "Denali Ultimate"],

  // Cadillac
  CT4: ["Luxury", "Premium Luxury", "Sport", "V", "V Blackwing"],
  CT5: ["Luxury", "Premium Luxury", "Sport", "V", "V Blackwing"],
  Escalade: ["Luxury", "Premium Luxury", "Sport", "V"],
  XT4: ["Luxury", "Premium Luxury", "Sport"],
  XT5: ["Luxury", "Premium Luxury", "Sport"],
  XT6: ["Luxury", "Premium Luxury", "Sport"],

  // Volvo
  S60: ["Core", "Plus", "Ultimate", "Polestar Engineered"],
  S90: ["Core", "Plus", "Ultimate"],
  V60: ["Core", "Plus", "Ultimate", "Polestar Engineered"],
  XC40: ["Core", "Plus", "Ultimate"],
  XC60: ["Core", "Plus", "Ultimate", "Polestar Engineered"],
  XC90: ["Core", "Plus", "Ultimate"],

  // Porsche
  "718": [
    "718 Cayman",
    "718 Cayman S",
    "718 Cayman GTS 4.0",
    "718 Boxster",
    "718 Boxster S",
    "718 Boxster GTS 4.0",
    "718 Spyder",
  ],
  "911": ["Carrera", "Carrera S", "Carrera GTS", "Targa 4", "Targa 4S", "Turbo", "Turbo S", "GT3", "GT3 RS"],
  Cayenne: ["Cayenne", "Cayenne S", "Cayenne GTS", "Cayenne Turbo", "Cayenne Turbo GT"],
  Macan: ["Macan", "Macan S", "Macan GTS", "Macan T"],
  Panamera: ["Panamera", "Panamera 4", "Panamera 4S", "Panamera GTS", "Panamera Turbo S"],
  Taycan: ["Taycan", "Taycan 4S", "Taycan GTS", "Taycan Turbo", "Taycan Turbo S"],

  // Land Rover
  Defender: ["Defender 90", "Defender 110", "Defender 130", "S", "SE", "X", "V8"],
  Discovery: ["S", "SE", "R-Dynamic SE", "HSE", "R-Dynamic HSE", "Metropolitan Edition"],
  "Range Rover": ["SE", "HSE", "Autobiography", "SV", "First Edition"],
  "Range Rover Sport": ["SE", "Dynamic SE", "Dynamic HSE", "Autobiography", "First Edition", "SVR"],

  // Jaguar
  "E-PACE": ["P250", "P250 SE", "P300 SE", "P300 R-Dynamic SE", "P300 R-Dynamic HSE"],
  "F-PACE": ["P250", "P250 S", "P340 S", "P400 R-Dynamic S", "SVR"],
  "F-TYPE": ["P300", "P380", "P450", "R", "R-Dynamic"],
  XE: ["P250", "P250 S", "P300 R-Dynamic S", "P300 R-Dynamic SE"],
  XF: ["P250", "P250 S", "P300 R-Dynamic S", "P300 R-Dynamic SE"],

  // Lincoln
  Aviator: ["Standard", "Reserve", "Grand Touring", "Black Label"],
  Corsair: ["Standard", "Reserve", "Grand Touring"],
  Nautilus: ["Standard", "Reserve", "Black Label"],
  Navigator: ["Standard", "Reserve", "Black Label"],

  // Infiniti
  Q50: ["Pure", "Luxe", "Sensory", "Red Sport 400"],
  Q60: ["Pure", "Luxe", "Red Sport 400"],
  QX50: ["Pure", "Luxe", "Essential", "Sensory", "Autograph"],
  QX55: ["Luxe", "Essential", "Sensory"],
  QX60: ["Pure", "Luxe", "Sensory", "Autograph"],
  QX80: ["Luxe", "Premium Select", "Sensory"],

  // Genesis
  G70: ["2.0T", "2.0T Sport", "3.3T", "3.3T Sport"],
  G80: ["2.5T", "2.5T Sport", "3.5T", "3.5T Sport", "Electrified"],
  G90: ["3.3T", "3.5T", "3.5T E-Supercharger"],
  GV70: ["2.5T", "2.5T Sport", "3.5T", "3.5T Sport", "Electrified"],
  GV80: ["2.5T", "2.5T Advanced", "3.5T", "3.5T Advanced"],

  // Buick
  Enclave: ["Preferred", "Essence", "Premium", "Avenir"],
  Encore: ["Preferred", "Sport Touring", "Essence"],
  Envision: ["Preferred", "Essence", "Avenir"],

  // Chrysler
  "300": ["Touring", "Touring L", "Limited", "300S", "300C"],
  Pacifica: ["Touring", "Touring L", "Limited", "Pinnacle"],
  Voyager: ["LX", "LXi"],

  // Mitsubishi
  "Eclipse Cross": ["ES", "SE", "SEL"],
  Outlander: ["ES", "SE", "SEL", "GT"],
  "Outlander Sport": ["ES", "SE", "GT"],

  // Fiat
  "500": ["Pop", "Sport", "Lounge", "Abarth"],
  "500X": ["Pop", "Sport", "Trekking"],

  // Alfa Romeo
  Giulia: ["Sprint", "Ti", "Ti Sport", "Veloce", "Quadrifoglio"],
  Stelvio: ["Sprint", "Ti", "Ti Sport", "Veloce", "Quadrifoglio"],

  // Maserati
  Ghibli: ["Base", "S", "S Q4", "Trofeo"],
  Levante: ["Base", "S", "GTS", "Trofeo"],
  Quattroporte: ["Base", "S", "S Q4", "Trofeo"],

  // Mini
  Clubman: ["Classic", "Signature", "Iconic", "John Cooper Works"],
  Countryman: ["Classic", "Signature", "Iconic", "John Cooper Works"],
  Hardtop: ["Classic", "Signature", "Iconic", "John Cooper Works"],

  // Tesla
  "Model 3": ["Standard Range", "Long Range", "Performance"],
  "Model S": ["Long Range", "Plaid"],
  "Model X": ["Long Range", "Plaid"],
  "Model Y": ["Standard Range", "Long Range", "Performance"],
}

const parts = [
  "Engine",
  "Transmission",
  "Transfer Case",
  "Rear Axle Assembly",
  "Front Axle Assembly",
  "AC Compressor",
  "Alternator",
  "Starter Motor",
  "Radiator",
  "Power Steering Pump",
  "Turbocharger",
  "Supercharger",
  "Cylinder Head",
  "Engine Block",
  "Crankshaft",
  "Camshaft",
  "Timing Chain Kit",
  "Water Pump",
  "Fuel Pump",
  "Oil Pump",
]

const brandsByCountry: Record<string, { name: string; logo: string }[]> = {
  USA: [
    { name: "Ford", logo: "/ford-oval-logo.png" },
    { name: "Chevrolet", logo: "/chevrolet-logo.png" },
    { name: "Dodge", logo: "/dodge-logo.jpg" },
    { name: "Jeep", logo: "/jeep-logo.jpg" },
    { name: "GMC", logo: "/gmc-logo.jpg" },
    { name: "Cadillac", logo: "/cadillac-logo.jpg" },
    { name: "Lincoln", logo: "/lincoln-logo.jpg" },
    { name: "Buick", logo: "/buick-logo.jpg" },
    { name: "Chrysler", logo: "/chrysler-logo.jpg" },
    { name: "Ram", logo: "/ram-trucks-logo.jpg" },
    { name: "Tesla", logo: "/tesla-logo.jpg" },
    { name: "Hummer", logo: "/hummer-logo.jpg" },
  ],
  Japan: [
    { name: "Toyota", logo: "/toyota-logo.png" },
    { name: "Honda", logo: "/honda-logo.png" },
    { name: "Nissan", logo: "/nissan-logo.png" },
    { name: "Mazda", logo: "/mazda-logo.jpg" },
    { name: "Subaru", logo: "/subaru-logo.jpg" },
    { name: "Lexus", logo: "/lexus-logo.jpg" },
    { name: "Infiniti", logo: "/infiniti-logo.jpg" },
    { name: "Acura", logo: "/acura-logo.jpg" },
    { name: "Mitsubishi", logo: "/mitsubishi-logo.jpg" },
    { name: "Suzuki", logo: "/suzuki-logo.jpg" },
    { name: "Isuzu", logo: "/isuzu-logo.jpg" },
    { name: "Scion", logo: "/scion-logo.jpg" },
  ],
  Germany: [
    { name: "BMW", logo: "/bmw-logo.png" },
    { name: "Mercedes-Benz", logo: "/mercedes-benz-logo.jpg" },
    { name: "Audi", logo: "/audi-logo.png" },
    { name: "Volkswagen", logo: "/volkswagen-logo.jpg" },
    { name: "Porsche", logo: "/porsche-logo.jpg" },
    { name: "Mini", logo: "/mini-logo.jpg" },
    { name: "Smart", logo: "/smart-logo.jpg" },
    { name: "Maybach", logo: "/maybach-logo.jpg" },
  ],
  Korea: [
    { name: "Hyundai", logo: "/hyundai-logo.jpg" },
    { name: "Kia", logo: "/kia-logo.png" },
    { name: "Genesis", logo: "/genesis-logo.jpg" },
  ],
  UK: [
    { name: "Land Rover", logo: "/land-rover-logo.jpg" },
    { name: "Jaguar", logo: "/jaguar-logo.jpg" },
    { name: "Bentley", logo: "/bentley-logo.jpg" },
    { name: "Rolls-Royce", logo: "/rolls-royce-logo.jpg" },
    { name: "Aston Martin", logo: "/aston-martin-logo.jpg" },
    { name: "McLaren", logo: "/mclaren-logo.jpg" },
  ],
  Italy: [
    { name: "Ferrari", logo: "/ferrari-logo.jpg" },
    { name: "Lamborghini", logo: "/lamborghini-logo.jpg" },
    { name: "Maserati", logo: "/maserati-logo.jpg" },
    { name: "Alfa Romeo", logo: "/alfa-romeo-logo.jpg" },
    { name: "Fiat", logo: "/fiat-logo.jpg" },
  ],
  Sweden: [
    { name: "Volvo", logo: "/volvo-logo.jpg" },
    { name: "Saab", logo: "/saab-logo.jpg" },
  ],
}

const countryTabs = [
  { id: "USA", label: "USA", flag: "🇺🇸" },
  { id: "Japan", label: "Japan", flag: "🇯🇵" },
  { id: "Germany", label: "Germany", flag: "🇩🇪" },
  { id: "Korea", label: "Korea", flag: "🇰🇷" },
  { id: "UK", label: "UK", flag: "🇬🇧" },
  { id: "Italy", label: "Italy", flag: "🇮🇹" },
  { id: "Sweden", label: "Sweden", flag: "🇸🇪" },
]

const articles = [
  {
    id: "brake-noise-1",
    title: "How to Fix Noisy Brakes",
    excerpt: "Common causes of brake squeal and how to solve them. Learn the warning signs and solutions.",
    image: "/brake-repair-mechanic.jpg",
    date: "Nov 15, 2024",
    category: "Maintenance",
  },
  {
    id: "engine-swap-guide",
    title: "Complete Engine Swap Guide",
    excerpt: "Everything you need to know about swapping engines, from planning to execution.",
    image: "/engine-swap-garage.jpg",
    date: "Nov 10, 2024",
    category: "DIY Guide",
  },
  {
    id: "transmission-tips",
    title: "Transmission Maintenance Tips",
    excerpt: "Keep your transmission running smoothly with these essential maintenance practices.",
    image: "/transmission-repair-shop.jpg",
    date: "Nov 5, 2024",
    category: "Tips",
  },
  {
    id: "used-vs-new",
    title: "Used vs New Parts: What to Know",
    excerpt: "When should you buy used parts? Our guide helps you make the right decision.",
    image: "/auto-parts-comparison.jpg",
    date: "Oct 28, 2024",
    category: "Buying Guide",
  },
]

const featuredProducts = [
  { id: "1", name: "Toyota 2GR-FE Engine", price: 1899, image: "/toyota-engine.jpg", category: "Engines" },
  {
    id: "2",
    name: "Honda K24A Transmission",
    price: 1299,
    image: "/honda-transmission.jpg",
    category: "Transmissions",
  },
  { id: "3", name: "Ford 5.0L Coyote Engine", price: 3499, image: "/ford-coyote-engine.jpg", category: "Engines" },
  {
    id: "4",
    name: "Chevy 6L80 Transmission",
    price: 1599,
    image: "/chevy-transmission.jpg",
    category: "Transmissions",
  },
]

export default function HomePage() {
  const router = useRouter()
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [part, setPart] = useState("")
  const [year, setYear] = useState("")
  const [trim, setTrim] = useState("")

  const [inventoryCount, setInventoryCount] = useState(50000)
  const [recentOrders, setRecentOrders] = useState([
    { city: "Houston, TX", part: "Toyota Camry Engine", time: "2 min ago" },
    { city: "Los Angeles, CA", part: "Honda Accord Transmission", time: "5 min ago" },
    { city: "Chicago, IL", part: "Ford F-150 Transfer Case", time: "8 min ago" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setInventoryCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const orders = [
      { city: "Houston, TX", part: "Toyota Camry Engine", time: "Just now" },
      { city: "Los Angeles, CA", part: "Honda Accord Transmission", time: "1 min ago" },
      { city: "Chicago, IL", part: "Ford F-150 Transfer Case", time: "2 min ago" },
      { city: "Phoenix, AZ", part: "Chevy Silverado Engine", time: "3 min ago" },
      { city: "Miami, FL", part: "Dodge Charger Transmission", time: "4 min ago" },
      { city: "Dallas, TX", part: "BMW 3 Series Engine", time: "5 min ago" },
      { city: "Atlanta, GA", part: "Jeep Wrangler Transfer Case", time: "6 min ago" },
      { city: "Seattle, WA", part: "Nissan Altima Transmission", time: "7 min ago" },
    ]
    const interval = setInterval(() => {
      setRecentOrders((prev) => {
        const newOrder = orders[Math.floor(Math.random() * orders.length)]
        return [{ ...newOrder, time: "Just now" }, ...prev.slice(0, 2)]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const availableModels = make ? modelsByMake[make] || [] : []
  const availableTrims = model ? trimsByModel[model] || ["Base", "Standard", "Premium", "Sport", "Limited"] : []

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (make) params.append("make", make)
    if (model) params.append("model", model)
    if (part) params.append("part", part)
    if (year) params.append("year", year)
    if (trim) params.append("trim", trim)
    router.push(`/search?${params.toString()}`)
  }

  const testimonials = [
    {
      name: "Mike Johnson",
      role: "Auto Shop Owner",
      location: "Dallas, TX",
      rating: 5,
      text: "Best used auto parts supplier I've worked with. The quality is consistently excellent and shipping is always fast. Highly recommend!",
      image: "/mechanic-man-portrait.jpg",
    },
    {
      name: "Sarah Williams",
      role: "DIY Enthusiast",
      location: "Phoenix, AZ",
      rating: 5,
      text: "Saved over $2,000 on my engine replacement. Part arrived in perfect condition with full warranty. Will definitely buy again!",
      image: "/woman-car-enthusiast-portrait.jpg",
    },
    {
      name: "Carlos Rodriguez",
      role: "Fleet Manager",
      location: "Miami, FL",
      rating: 5,
      text: "We manage 50+ vehicles and AUW has been our go-to for parts. Great prices, reliable quality, and excellent customer service.",
      image: "/hispanic-man-professional-portrait.jpg",
    },
  ]

  const [activeBrandTab, setActiveBrandTab] = useState("USA")

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="bg-green-600 py-1.5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-xs text-white animate-pulse">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              LIVE
            </span>
            <span className="font-medium">
              {recentOrders[0]?.city} just ordered a {recentOrders[0]?.part}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-red-600 py-1.5">
          <div className="container mx-auto px-4 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-4">
              <span>Call: 1-800-528-9978</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Mon-Fri 8AM-6PM CST</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                {inventoryCount.toLocaleString()} Parts in Stock
              </span>
              <span>Free Shipping on Orders $500+</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center font-black text-white text-lg">
                AUW
              </div>
              <div>
                <h1 className="text-base font-bold text-white leading-tight">ALL USED AUTO PARTS WORLD</h1>
                <p className="text-[11px] text-red-500 font-medium">Quality Parts. Nationwide Shipping. Guaranteed.</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/shop" className="text-sm text-neutral-300 hover:text-white transition-colors">
                Shop All
              </Link>
              <Link href="/engines" className="text-sm text-neutral-300 hover:text-white transition-colors">
                Engines
              </Link>
              <Link href="/transmissions" className="text-sm text-neutral-300 hover:text-white transition-colors">
                Transmissions
              </Link>
              <Link href="/brands" className="text-sm text-neutral-300 hover:text-white transition-colors">
                Brands
              </Link>
              <Link href="/blog" className="text-sm text-neutral-300 hover:text-white transition-colors">
                Resources
              </Link>
              <Link
                href="/quote"
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Get Quote
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/cart" className="relative p-2 text-neutral-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
              <Link href="/account" className="p-2 text-neutral-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
              <Link
                href="/login"
                className="hidden sm:block text-sm text-neutral-300 hover:text-white transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("/auto-parts-warehouse-dark.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Search Form - Reordered: Make, Model, Part, Year, Trim */}
            <div className="bg-neutral-900/95 backdrop-blur border border-neutral-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-500 font-medium">AI-Powered Search</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Find Your Part</h2>
              <p className="text-neutral-400 mb-6 text-sm">Search 50,000+ quality used auto parts with warranty</p>

              <div className="space-y-4">
                {/* Row 1: Make, Model */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5 font-medium">Make *</label>
                    <select
                      value={make}
                      onChange={(e) => {
                        setMake(e.target.value)
                        setModel("")
                        setTrim("")
                      }}
                      className="w-full bg-neutral-800 border border-neutral-700 text-white h-12 rounded-lg px-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    >
                      <option value="">Select Make</option>
                      {makes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5 font-medium">Model *</label>
                    <select
                      value={model}
                      onChange={(e) => {
                        setModel(e.target.value)
                        setTrim("")
                      }}
                      disabled={!make}
                      className="w-full bg-neutral-800 border border-neutral-700 text-white h-12 rounded-lg px-3 disabled:opacity-50 disabled:cursor-not-allowed focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    >
                      <option value="">Select Model</option>
                      {availableModels.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Part */}
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5 font-medium">Part Needed *</label>
                  <select
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 text-white h-12 rounded-lg px-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  >
                    <option value="">Select Part</option>
                    {parts.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 3: Year, Trim */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5 font-medium">Year</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 text-white h-12 rounded-lg px-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5 font-medium">Trim</label>
                    <select
                      value={trim}
                      onChange={(e) => setTrim(e.target.value)}
                      disabled={!model}
                      className="w-full bg-neutral-800 border border-neutral-700 text-white h-12 rounded-lg px-3 disabled:opacity-50 disabled:cursor-not-allowed focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    >
                      <option value="">Select Trim</option>
                      {availableTrims.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-lg transition-all hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search Parts
                </button>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-neutral-500">Popular:</span>
                  <Link href="/engines" className="text-xs text-red-500 hover:text-red-400">
                    Engines
                  </Link>
                  <Link href="/transmissions" className="text-xs text-red-500 hover:text-red-400">
                    Transmissions
                  </Link>
                  <Link href="/shop?category=transfer-case" className="text-xs text-red-500 hover:text-red-400">
                    Transfer Cases
                  </Link>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-2 mb-6">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-red-500 font-semibold text-sm">90-Day Warranty on All Parts</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-tight mb-6 text-balance">
                America&apos;s Trusted
                <br />
                <span className="text-red-600">Used Auto Parts</span>
                <br />
                Supplier
              </h1>
              <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0 text-pretty">
                Direct from salvage yards to you. Quality tested engines, transmissions, and drivetrain components at
                wholesale prices.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Warranty Protected</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                  <span className="text-sm font-medium">Fast Shipping</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">4.8/5 Rating</span>
                </div>
              </div>

              {/* Phone CTA */}
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <a
                  href="tel:1-800-528-9978"
                  className="flex items-center gap-3 bg-neutral-900 border border-neutral-700 rounded-xl px-5 py-3 hover:border-red-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Talk to an Expert</p>
                    <p className="text-lg font-bold text-white">1-800-528-9978</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-black border-y border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1">50K+</div>
              <div className="text-neutral-500 text-sm">Parts in Stock</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1">15K+</div>
              <div className="text-neutral-500 text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1">500+</div>
              <div className="text-neutral-500 text-sm">Partner Yards</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1">98%</div>
              <div className="text-neutral-500 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-neutral-900 border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">A+</span>
              </div>
              <div>
                <p className="text-xs text-neutral-400">BBB Rating</p>
                <p className="text-sm font-semibold text-white">Accredited Business</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Google Reviews</p>
                <p className="text-sm font-semibold text-white">4.8/5 (2,500+ Reviews)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Verified Seller</p>
                <p className="text-sm font-semibold text-white">100% Authentic Parts</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Secure Checkout</p>
                <p className="text-sm font-semibold text-white">SSL Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Shop by Brand</h2>
            <p className="text-neutral-400">Quality parts for all major automotive brands</p>
          </div>

          {/* Country Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {countryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveBrandTab(tab.id)}
                className={cn(
                  "px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  activeBrandTab === tab.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white",
                )}
              >
                <span className="text-lg">{tab.flag}</span>
                <span>{tab.label}</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">
                  {brandsByCountry[tab.id]?.length || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {brandsByCountry[activeBrandTab]?.map((brand) => (
              <Link
                key={brand.name}
                href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center h-28 hover:shadow-lg hover:shadow-red-600/20 transition-all border-2 border-transparent hover:border-red-500">
                  <div className="h-14 w-full flex items-center justify-center mb-2">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={70}
                      height={50}
                      className="object-contain max-h-12"
                    />
                  </div>
                  <span className="text-xs font-medium text-neutral-700 group-hover:text-red-600 transition-colors text-center">
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Brands
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/10 text-red-500 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              OUR PROCESS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Certified Quality Assurance</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Every part goes through our rigorous 7-point inspection before shipping
            </p>
          </div>
          <div className="grid md:grid-cols-7 gap-4">
            {[
              { step: "1", title: "Source", desc: "Partner yards" },
              { step: "2", title: "Inspect", desc: "Visual check" },
              { step: "3", title: "Test", desc: "Functionality" },
              { step: "4", title: "Clean", desc: "Professional" },
              { step: "5", title: "Photo", desc: "Documentation" },
              { step: "6", title: "Package", desc: "Secure wrap" },
              { step: "7", title: "Ship", desc: "Fast delivery" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-neutral-500">{item.desc}</p>
                {i < 6 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Popular Categories</h2>
              <p className="text-neutral-500 mt-1">Find parts by category</p>
            </div>
            <Link href="/shop" className="text-sm text-red-500 hover:text-red-400 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Engines", href: "/engines", count: "5,000+", icon: "⚙️", desc: "Complete & short block" },
              { name: "Transmissions", href: "/transmissions", count: "3,500+", icon: "🔧", desc: "Auto & manual" },
              {
                name: "Transfer Cases",
                href: "/shop?category=transfer-case",
                count: "1,200+",
                icon: "⛓️",
                desc: "4WD & AWD",
              },
              {
                name: "Axle Assemblies",
                href: "/shop?category=axle",
                count: "2,800+",
                icon: "🛞",
                desc: "Front & rear",
              },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-red-600/50 transition-all hover:shadow-lg hover:shadow-red-600/5 group h-full">
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-2">{cat.desc}</p>
                  <p className="text-red-500 text-sm font-medium">{cat.count} parts</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-red-600/10 text-red-500 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                VIDEO TOUR
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">See Our Warehouse in Action</h2>
              <p className="text-neutral-400 mb-6">
                Take a virtual tour of our Houston facility. See how we source, inspect, test, and ship over 50,000
                quality used auto parts nationwide.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "500,000 sq ft warehouse facility",
                  "State-of-the-art testing equipment",
                  "Same-day shipping capability",
                  "Professional packaging team",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium"
              >
                Learn More About Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 relative group cursor-pointer">
                <Image
                  src="/auto-parts-warehouse-interior-industrial.jpg"
                  alt="AUW Warehouse"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xl">
                Watch 2 min video
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Parts</h2>
              <p className="text-neutral-500 mt-1">Top-selling engines and transmissions</p>
            </div>
            <Link href="/shop" className="text-sm text-red-500 hover:text-red-400 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden hover:border-red-600/50 transition-all group">
                  <div className="aspect-square bg-neutral-800 relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-red-500 font-bold text-lg">${product.price.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/10 text-red-500 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What Our Customers Say</h2>
            <p className="text-neutral-500">Join thousands of satisfied customers nationwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-red-600/30 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-300 mb-6 text-sm leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-neutral-500">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Resources & Guides</h2>
              <p className="text-neutral-500 mt-1">Expert tips and how-to articles</p>
            </div>
            <Link href="/blog" className="text-sm text-red-500 hover:text-red-400 font-medium">
              View All Articles →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <article className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-red-600/50 transition-all group h-full">
                  <div className="aspect-video bg-neutral-800 relative overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 left-2 bg-red-600/90 text-white text-xs px-2 py-1 rounded font-medium">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-500 mb-2">{article.date}</p>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-neutral-400 text-sm line-clamp-2">{article.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-900 border-y border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block bg-red-600/10 text-red-500 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              NEWSLETTER
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Get Exclusive Deals</h2>
            <p className="text-neutral-400 mb-8">
              Subscribe to receive special offers, new arrivals, and automotive tips directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-14 bg-neutral-800 border border-neutral-700 rounded-lg px-4 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
              <button
                type="button"
                className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-neutral-500 mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Why Choose AUW?</h2>
            <p className="text-neutral-400">The trusted name in quality used auto parts</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "90-Day Warranty",
                desc: "All parts come with comprehensive warranty coverage. If it doesn't work, we'll make it right.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Fast Nationwide Shipping",
                desc: "Get your parts quickly with our coast-to-coast shipping network. Most orders ship same day.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                ),
                title: "Expert Support",
                desc: "Our team of auto parts specialists are ready to help you find the right part for your vehicle.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-neutral-950 border-y border-neutral-800 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-white">Recent Orders</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-8 animate-scroll">
                {[...recentOrders, ...recentOrders].map((order, i) => (
                  <div key={i} className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{order.part}</p>
                      <p className="text-xs text-neutral-500">
                        {order.city} • {order.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Part?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
            Search our inventory of over 50,000 quality used auto parts. All with warranty coverage and fast shipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <button
                type="button"
                className="px-8 py-4 bg-white text-red-600 font-bold uppercase rounded-lg hover:bg-neutral-100 transition-colors"
              >
                Browse All Parts
              </button>
            </Link>
            <Link href="/quote">
              <button
                type="button"
                className="px-8 py-4 border-2 border-white text-white font-bold uppercase rounded-lg hover:bg-white/10 transition-colors"
              >
                Get a Free Quote
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center font-black text-white text-lg">
                  AUW
                </div>
                <div>
                  <h3 className="font-bold text-white">ALL USED AUTO PARTS WORLD</h3>
                  <p className="text-xs text-neutral-500">Quality Parts. Guaranteed.</p>
                </div>
              </div>
              <p className="text-neutral-400 text-sm mb-4 max-w-sm">
                Your trusted source for quality used auto parts. We connect you directly to tested parts from salvage
                yards nationwide.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    All Parts
                  </Link>
                </li>
                <li>
                  <Link href="/engines" className="hover:text-white transition-colors">
                    Engines
                  </Link>
                </li>
                <li>
                  <Link href="/transmissions" className="hover:text-white transition-colors">
                    Transmissions
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="hover:text-white transition-colors">
                    Shop by Brand
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="hover:text-white transition-colors">
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <Link href="/warranty" className="hover:text-white transition-colors">
                    Warranty
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/fitment-guide" className="hover:text-white transition-colors">
                    Fitment Guide
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a href="tel:1-800-528-9978" className="hover:text-white transition-colors">
                    1-800-528-9978
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a href="mailto:support@allusedautoparts.world" className="hover:text-white transition-colors">
                    support@allusedautoparts.world
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Houston, TX 77001</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} ALL USED AUTO PARTS WORLD (AUW). All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
