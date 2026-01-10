/**
 * Helper function to get public image paths
 * Prevents 404 errors by ensuring correct paths
 */
export const getPublicImagePath = (imageName: string): string => {
  // Remove leading slash if present
  const cleanName = imageName.startsWith('/') ? imageName.slice(1) : imageName
  // Remove 'public/' prefix if present
  const withoutPublic = cleanName.startsWith('public/') ? cleanName.slice(7) : cleanName
  // Ensure it starts with /
  return `/${withoutPublic}`
}

// Common image paths with type safety
export const IMAGES = {
  logo: '/auw-logo.png',
  logoLight: '/auw-logo-light.png',
  placeholder: '/placeholder.svg',
  placeholderUser: '/placeholder-user.jpg',
  chatbotLogo: '/chatbot-logo.png',
  
  // Brand logos
  brands: {
    toyota: '/toyota-logo.png',
    honda: '/honda-logo.png',
    ford: '/ford-oval-logo.png',
    chevrolet: '/chevrolet-logo.png',
    bmw: '/bmw-logo.png',
    audi: '/audi-logo.png',
    nissan: '/nissan-logo.png',
    mercedes: '/mercedes-benz-logo.jpg',
    dodge: '/dodge-logo.jpg',
    jeep: '/jeep-logo.jpg',
    gmc: '/gmc-logo.jpg',
    cadillac: '/cadillac-logo.jpg',
    lexus: '/lexus-logo.jpg',
    subaru: '/subaru-logo.jpg',
    hyundai: '/hyundai-logo.jpg',
    kia: '/kia-logo.png',
    volkswagen: '/volkswagen-logo.jpg',
    porsche: '/porsche-crest.png',
    jaguar: '/jaguar-logo.png',
    tesla: '/tesla-logo.png',
  },
  
  // Parts images
  parts: {
    brakePads: '/brake-pads-close-up.png',
    airFilter: '/air-filter.png',
    oilFilter: '/oil-filter.png',
    transmission: '/automatic-transmission.jpg',
    brakes: '/brakes.jpg',
    engine: '/detailed-engine.png',
  },
  
  // Engine images
  engines: {
    toyota: '/toyota-engine.jpg',
    honda: '/honda-turbo-engine.jpg',
    ford: '/ford-coyote-engine.jpg',
    chevy: '/chevy-engine.jpg',
    bmw: '/bmw-inline-6-engine.jpg',
    dodge: '/dodge-hemi-engine.jpg',
  },
  
  // Transmission images
  transmissions: {
    automatic: '/automatic-transmission.jpg',
    manual: '/manual-transmission.jpg',
    cvt: '/cvt-transmission.jpg',
  },
} as const

/**
 * Type-safe image getter with fallback
 */
export const getImageWithFallback = (imagePath: string, fallback: string = IMAGES.placeholder): string => {
  return imagePath || fallback
}
