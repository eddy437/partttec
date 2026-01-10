"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

// Inline SVG Icons to avoid lucide-react import errors
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)
const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)
const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
)
const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
)
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)
const LoaderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)
const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
)
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)
const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
)
const MicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
)
const MicOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" x2="22" y1="2" y2="22" />
    <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
    <path d="M5 10v2a7 7 0 0 0 12 5" />
    <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
)
const VolumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)
const MinimizeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
  </svg>
)

// Languages supported
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
]

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    greeting:
      "Hi! I'm your AI auto parts assistant. Tell me your vehicle info and what part you need. I speak 12 languages!",
    placeholder: "Ask about parts, prices, warranty...",
    quoteForm: "Quote Form",
    aiAssistant: "AI Assistant",
    getQuote: "Get Quote",
    make: "Make",
    model: "Model",
    part: "Part",
    year: "Year",
    trim: "Trim",
    yourName: "Your Name",
    email: "Email",
    phone: "Phone",
    notes: "Additional notes (VIN, mileage, etc.)",
    submit: "Get Free Quote",
    submitting: "Submitting...",
    submitted: "Quote Submitted!",
    willContact: "We'll contact you within 1 hour with pricing.",
    aiPowered: "AI-powered • Instant responses • Real inventory",
    selectMake: "Select Make",
    selectModel: "Select Model",
    selectPart: "Select Part",
    selectYear: "Select Year",
    selectTrim: "Select Trim",
    callUs: "Call Us",
  },
  es: {
    greeting:
      "¡Hola! Soy tu asistente de autopartes con IA. Dime tu vehículo y qué pieza necesitas. ¡Hablo 12 idiomas!",
    placeholder: "Pregunta sobre piezas, precios, garantía...",
    quoteForm: "Formulario",
    aiAssistant: "Asistente IA",
    getQuote: "Cotizar",
    make: "Marca",
    model: "Modelo",
    part: "Pieza",
    year: "Año",
    trim: "Versión",
    yourName: "Tu Nombre",
    email: "Correo",
    phone: "Teléfono",
    notes: "Notas adicionales (VIN, millaje, etc.)",
    submit: "Obtener Cotización",
    submitting: "Enviando...",
    submitted: "¡Cotización Enviada!",
    willContact: "Te contactaremos en 1 hora con el precio.",
    aiPowered: "IA • Respuestas instantáneas • Inventario real",
    selectMake: "Seleccionar Marca",
    selectModel: "Seleccionar Modelo",
    selectPart: "Seleccionar Pieza",
    selectYear: "Seleccionar Año",
    selectTrim: "Seleccionar Versión",
    callUs: "Llámanos",
  },
  fr: {
    greeting:
      "Bonjour! Je suis votre assistant IA pour les pièces auto. Dites-moi votre véhicule et la pièce dont vous avez besoin. Je parle 12 langues!",
    placeholder: "Questions sur pièces, prix, garantie...",
    quoteForm: "Formulaire",
    aiAssistant: "Assistant IA",
    getQuote: "Devis",
    make: "Marque",
    model: "Modèle",
    part: "Pièce",
    year: "Année",
    trim: "Finition",
    yourName: "Votre Nom",
    email: "Email",
    phone: "Téléphone",
    notes: "Notes additionnelles (VIN, kilométrage, etc.)",
    submit: "Obtenir Devis Gratuit",
    submitting: "Envoi...",
    submitted: "Devis Envoyé!",
    willContact: "Nous vous contacterons dans 1 heure avec le prix.",
    aiPowered: "IA • Réponses instantanées • Inventaire réel",
    selectMake: "Sélectionner Marque",
    selectModel: "Sélectionner Modèle",
    selectPart: "Sélectionner Pièce",
    selectYear: "Sélectionner Année",
    selectTrim: "Sélectionner Finition",
    callUs: "Appelez-nous",
  },
  zh: {
    greeting: "您好！我是您的AI汽车零件助手。告诉我您的车辆信息和需要的零件。我会说12种语言！",
    placeholder: "询问零件、价格、保修...",
    quoteForm: "报价表",
    aiAssistant: "AI助手",
    getQuote: "获取报价",
    make: "品牌",
    model: "型号",
    part: "零件",
    year: "年份",
    trim: "配置",
    yourName: "您的姓名",
    email: "邮箱",
    phone: "电话",
    notes: "附加说明（VIN，里程等）",
    submit: "获取免费报价",
    submitting: "提交中...",
    submitted: "报价已提交！",
    willContact: "我们将在1小时内联系您提供价格。",
    aiPowered: "AI驱动 • 即时响应 • 实时库存",
    selectMake: "选择品牌",
    selectModel: "选择型号",
    selectPart: "选择零件",
    selectYear: "选择年份",
    selectTrim: "选择配置",
    callUs: "致电我们",
  },
  ar: {
    greeting: "مرحباً! أنا مساعد قطع غيار السيارات بالذكاء الاصطناعي. أخبرني عن سيارتك وما تحتاجه. أتحدث 12 لغة!",
    placeholder: "اسأل عن القطع والأسعار والضمان...",
    quoteForm: "نموذج العرض",
    aiAssistant: "مساعد AI",
    getQuote: "احصل على عرض",
    make: "الشركة",
    model: "الموديل",
    part: "القطعة",
    year: "السنة",
    trim: "الفئة",
    yourName: "اسمك",
    email: "البريد",
    phone: "الهاتف",
    notes: "ملاحظات إضافية",
    submit: "احصل على عرض مجاني",
    submitting: "جاري الإرسال...",
    submitted: "تم إرسال العرض!",
    willContact: "سنتصل بك خلال ساعة.",
    aiPowered: "AI • ردود فورية • مخزون حقيقي",
    selectMake: "اختر الشركة",
    selectModel: "اختر الموديل",
    selectPart: "اختر القطعة",
    selectYear: "اختر السنة",
    selectTrim: "اختر الفئة",
    callUs: "اتصل بنا",
  },
  hi: {
    greeting: "नमस्ते! मैं आपका AI ऑटो पार्ट्स सहायक हूं। अपनी गाड़ी और जरूरी पार्ट बताएं। मैं 12 भाषाएं बोलता हूं!",
    placeholder: "पार्ट्स, कीमत, वारंटी के बारे में पूछें...",
    quoteForm: "कोटेशन फॉर्म",
    aiAssistant: "AI सहायक",
    getQuote: "कोटेशन लें",
    make: "कंपनी",
    model: "मॉडल",
    part: "पार्ट",
    year: "साल",
    trim: "ट्रिम",
    yourName: "आपका नाम",
    email: "ईमेल",
    phone: "फोन",
    notes: "अतिरिक्त जानकारी",
    submit: "मुफ्त कोटेशन लें",
    submitting: "भेज रहे हैं...",
    submitted: "कोटेशन भेज दी गई!",
    willContact: "हम 1 घंटे में संपर्क करेंगे।",
    aiPowered: "AI • तुरंत जवाब • असली इन्वेंटरी",
    selectMake: "कंपनी चुनें",
    selectModel: "मॉडल चुनें",
    selectPart: "पार्ट चुनें",
    selectYear: "साल चुनें",
    selectTrim: "ट्रिम चुनें",
    callUs: "कॉल करें",
  },
  pt: {
    greeting:
      "Olá! Sou seu assistente de peças automotivas com IA. Diga-me seu veículo e a peça que precisa. Falo 12 idiomas!",
    placeholder: "Pergunte sobre peças, preços, garantia...",
    quoteForm: "Formulário",
    aiAssistant: "Assistente IA",
    getQuote: "Orçamento",
    make: "Marca",
    model: "Modelo",
    part: "Peça",
    year: "Ano",
    trim: "Versão",
    yourName: "Seu Nome",
    email: "Email",
    phone: "Telefone",
    notes: "Notas adicionais (VIN, quilometragem, etc.)",
    submit: "Obter Orçamento Grátis",
    submitting: "Enviando...",
    submitted: "Orçamento Enviado!",
    willContact: "Entraremos em contato em 1 hora com o preço.",
    aiPowered: "IA • Respostas instantâneas • Inventário real",
    selectMake: "Selecionar Marca",
    selectModel: "Selecionar Modelo",
    selectPart: "Selecionar Peça",
    selectYear: "Selecionar Ano",
    selectTrim: "Selecionar Versão",
    callUs: "Ligue para nós",
  },
  ru: {
    greeting:
      "Привет! Я ваш AI-помощник по автозапчастям. Расскажите о вашем автомобиле и нужной детали. Я говорю на 12 языках!",
    placeholder: "Спросите о запчастях, ценах, гарантии...",
    quoteForm: "Форма заявки",
    aiAssistant: "AI Помощник",
    getQuote: "Получить цену",
    make: "Марка",
    model: "Модель",
    part: "Запчасть",
    year: "Год",
    trim: "Комплектация",
    yourName: "Ваше имя",
    email: "Email",
    phone: "Телефон",
    notes: "Дополнительно (VIN, пробег и т.д.)",
    submit: "Получить бесплатную цену",
    submitting: "Отправка...",
    submitted: "Заявка отправлена!",
    willContact: "Мы свяжемся с вами в течение 1 часа.",
    aiPowered: "AI • Мгновенные ответы • Реальный склад",
    selectMake: "Выберите марку",
    selectModel: "Выберите модель",
    selectPart: "Выберите запчасть",
    selectYear: "Выберите год",
    selectTrim: "Выберите комплектацию",
    callUs: "Позвоните нам",
  },
  ja: {
    greeting: "こんにちは！AIオートパーツアシスタントです。お車と必要な部品をお知らせください。12ヶ国語に対応！",
    placeholder: "部品、価格、保証について質問...",
    quoteForm: "見積りフォーム",
    aiAssistant: "AIアシスタント",
    getQuote: "見積り",
    make: "メーカー",
    model: "モデル",
    part: "部品",
    year: "年式",
    trim: "グレード",
    yourName: "お名前",
    email: "メール",
    phone: "電話",
    notes: "追加情報（VIN、走行距離など）",
    submit: "無料見積りを取得",
    submitting: "送信中...",
    submitted: "見積り送信完了！",
    willContact: "1時間以内にご連絡いたします。",
    aiPowered: "AI • 即座の回答 • リアル在庫",
    selectMake: "メーカー選択",
    selectModel: "モデル選択",
    selectPart: "部品選択",
    selectYear: "年式選択",
    selectTrim: "グレード選択",
    callUs: "お電話ください",
  },
  ko: {
    greeting: "안녕하세요! AI 자동차 부품 도우미입니다. 차량 정보와 필요한 부품을 알려주세요. 12개 언어 지원!",
    placeholder: "부품, 가격, 보증에 대해 질문...",
    quoteForm: "견적 양식",
    aiAssistant: "AI 도우미",
    getQuote: "견적 받기",
    make: "제조사",
    model: "모델",
    part: "부품",
    year: "연식",
    trim: "트림",
    yourName: "이름",
    email: "이메일",
    phone: "전화",
    notes: "추가 정보 (VIN, 주행거리 등)",
    submit: "무료 견적 받기",
    submitting: "제출 중...",
    submitted: "견적 제출 완료!",
    willContact: "1시간 이내에 연락드리겠습니다.",
    aiPowered: "AI • 즉각 응답 • 실시간 재고",
    selectMake: "제조사 선택",
    selectModel: "모델 선택",
    selectPart: "부품 선택",
    selectYear: "연식 선택",
    selectTrim: "트림 선택",
    callUs: "전화하기",
  },
  vi: {
    greeting: "Xin chào! Tôi là trợ lý AI phụ tùng ô tô. Cho tôi biết xe và phụ tùng bạn cần. Tôi nói 12 ngôn ngữ!",
    placeholder: "Hỏi về phụ tùng, giá, bảo hành...",
    quoteForm: "Mẫu báo giá",
    aiAssistant: "Trợ lý AI",
    getQuote: "Nhận báo giá",
    make: "Hãng",
    model: "Mẫu",
    part: "Phụ tùng",
    year: "Năm",
    trim: "Phiên bản",
    yourName: "Tên của bạn",
    email: "Email",
    phone: "Điện thoại",
    notes: "Ghi chú thêm (VIN, số km, v.v.)",
    submit: "Nhận báo giá miễn phí",
    submitting: "Đang gửi...",
    submitted: "Đã gửi báo giá!",
    willContact: "Chúng tôi sẽ liên hệ trong 1 giờ.",
    aiPowered: "AI • Phản hồi tức thì • Kho hàng thực",
    selectMake: "Chọn hãng",
    selectModel: "Chọn mẫu",
    selectPart: "Chọn phụ tùng",
    selectYear: "Chọn năm",
    selectTrim: "Chọn phiên bản",
    callUs: "Gọi cho chúng tôi",
  },
  de: {
    greeting:
      "Hallo! Ich bin Ihr KI-Autoteile-Assistent. Sagen Sie mir Ihr Fahrzeug und welches Teil Sie brauchen. Ich spreche 12 Sprachen!",
    placeholder: "Fragen zu Teilen, Preisen, Garantie...",
    quoteForm: "Angebotsformular",
    aiAssistant: "KI-Assistent",
    getQuote: "Angebot",
    make: "Marke",
    model: "Modell",
    part: "Teil",
    year: "Jahr",
    trim: "Ausstattung",
    yourName: "Ihr Name",
    email: "E-Mail",
    phone: "Telefon",
    notes: "Zusätzliche Hinweise (VIN, Kilometerstand, etc.)",
    submit: "Kostenloses Angebot erhalten",
    submitting: "Wird gesendet...",
    submitted: "Angebot gesendet!",
    willContact: "Wir kontaktieren Sie innerhalb 1 Stunde.",
    aiPowered: "KI • Sofortige Antworten • Echtes Inventar",
    selectMake: "Marke wählen",
    selectModel: "Modell wählen",
    selectPart: "Teil wählen",
    selectYear: "Jahr wählen",
    selectTrim: "Ausstattung wählen",
    callUs: "Rufen Sie uns an",
  },
}

// Vehicle data
const vehicleData: Record<string, Record<string, string[]>> = {
  Toyota: {
    models: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Tundra", "4Runner", "Prius"],
    trims: ["LE", "SE", "XLE", "XSE", "Limited", "TRD Sport", "TRD Pro"],
  },
  Honda: {
    models: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline"],
    trims: ["LX", "EX", "EX-L", "Sport", "Touring", "Type R"],
  },
  Ford: {
    models: ["F-150", "Mustang", "Explorer", "Escape", "Bronco", "Edge", "Ranger"],
    trims: ["XL", "XLT", "Lariat", "King Ranch", "Platinum", "Raptor"],
  },
  Chevrolet: {
    models: ["Silverado", "Camaro", "Equinox", "Tahoe", "Suburban", "Malibu", "Colorado"],
    trims: ["LS", "LT", "RST", "Z71", "High Country", "ZL1"],
  },
  Dodge: {
    models: ["Challenger", "Charger", "Durango", "RAM 1500", "RAM 2500"],
    trims: ["SXT", "GT", "R/T", "Scat Pack", "Hellcat", "Demon"],
  },
  BMW: {
    models: ["3 Series", "5 Series", "X3", "X5", "X7", "M3", "M5"],
    trims: ["Base", "Sport Line", "M Sport", "Competition"],
  },
  Mercedes: {
    models: ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "AMG GT"],
    trims: ["Base", "AMG Line", "AMG 43", "AMG 63"],
  },
  Nissan: {
    models: ["Altima", "Maxima", "Rogue", "Pathfinder", "Frontier", "Titan"],
    trims: ["S", "SV", "SL", "Platinum", "PRO-4X"],
  },
}

const makes = Object.keys(vehicleData)
const parts = [
  "Engine",
  "Transmission",
  "Transfer Case",
  "Axle Assembly",
  "Cylinder Head",
  "Crankshaft",
  "ECU/ECM",
  "Turbocharger",
  "Alternator",
  "Starter Motor",
  "AC Compressor",
  "Radiator",
]
const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString())

// AI Response generator
const generateAIResponse = (message: string, lang: string): string => {
  const lowerMsg = message.toLowerCase()

  // Detect language from message
  const langResponses: Record<string, Record<string, string>> = {
    engine: {
      en: "Great choice! We have a wide selection of quality used engines. For a quote, I need your vehicle's Year, Make, Model, and preferred mileage range. Engines typically range from $800-$4,500 depending on the vehicle. All come with 6-month warranty!",
      es: "¡Excelente elección! Tenemos una amplia selección de motores usados de calidad. Para una cotización, necesito el Año, Marca, Modelo de su vehículo y rango de millaje preferido. Los motores van desde $800-$4,500. ¡Todos con garantía de 6 meses!",
      fr: "Excellent choix! Nous avons une large sélection de moteurs d'occasion de qualité. Pour un devis, j'ai besoin de l'Année, Marque, Modèle de votre véhicule. Les moteurs vont de 800$-4500$. Tous avec garantie 6 mois!",
      zh: "很好的选择！我们有大量优质二手发动机。报价需要您的车辆年份、品牌、型号和首选里程范围。发动机价格从$800-$4,500不等。全部6个月保修！",
      ar: "اختيار ممتاز! لدينا تشكيلة واسعة من المحركات المستعملة. للحصول على عرض أسعار، أحتاج سنة السيارة وماركتها وموديلها. الأسعار من 800-4500 دولار. جميعها بضمان 6 أشهر!",
      hi: "बढ़िया चुनाव! हमारे पास क्वालिटी यूज्ड इंजन का बड़ा कलेक्शन है। कोटेशन के लिए, मुझे आपकी गाड़ी का साल, कंपनी, मॉडल चाहिए। इंजन $800-$4,500 में आते हैं। सभी पर 6 महीने की वारंटी!",
    },
    transmission: {
      en: "We specialize in transmissions! Both automatic and manual available. Prices range from $600-$3,500 based on vehicle type. We test every unit and offer 90-day warranty. What vehicle do you need it for?",
      es: "¡Nos especializamos en transmisiones! Automáticas y manuales disponibles. Precios desde $600-$3,500 según el vehículo. Probamos cada unidad y ofrecemos garantía de 90 días. ¿Para qué vehículo la necesita?",
      fr: "Nous sommes spécialisés dans les transmissions! Automatiques et manuelles disponibles. Prix de 600$-3500$. Nous testons chaque unité et offrons une garantie de 90 jours. Pour quel véhicule?",
      zh: "我们专业经营变速箱！自动和手动都有。价格从$600-$3,500不等。每台都经过测试，90天保修。您需要什么车型的？",
    },
    price: {
      en: "Our prices are very competitive! Engines: $800-$4,500, Transmissions: $600-$3,500, Transfer Cases: $400-$1,500. We offer 3 mileage tiers: Economy (80-100K), Standard (50-80K), Premium (Under 50K). Which option interests you?",
      es: "¡Nuestros precios son muy competitivos! Motores: $800-$4,500, Transmisiones: $600-$3,500, Cajas de transferencia: $400-$1,500. Ofrecemos 3 niveles de millaje. ¿Cuál le interesa?",
    },
    warranty: {
      en: "All our parts come with warranty! Engines: 6-month standard (12-month available), Transmissions: 90-day standard (6-month available), Other parts: 30-90 days. Extended warranties available for purchase.",
      es: "¡Todas nuestras piezas tienen garantía! Motores: 6 meses estándar, Transmisiones: 90 días estándar, Otras piezas: 30-90 días. Garantías extendidas disponibles.",
    },
    shipping: {
      en: "We ship nationwide! Free shipping on orders over $500. Standard delivery: 3-7 business days. Express available for urgent needs. We use trusted carriers with full insurance coverage.",
      es: "¡Enviamos a todo el país! Envío gratis en pedidos de más de $500. Entrega estándar: 3-7 días hábiles. Express disponible para urgencias.",
    },
    default: {
      en: "I can help you find any auto part you need! Just tell me your vehicle's Year, Make, Model and the part you're looking for. I'll check our inventory of 50,000+ parts and give you the best price. You can also call us at 1-800-528-9978!",
      es: "¡Puedo ayudarte a encontrar cualquier pieza que necesites! Solo dime el Año, Marca, Modelo de tu vehículo y la pieza que buscas. Revisaré nuestro inventario de más de 50,000 piezas. ¡También puedes llamarnos al 1-800-528-9978!",
      fr: "Je peux vous aider à trouver n'importe quelle pièce! Dites-moi l'Année, Marque, Modèle de votre véhicule et la pièce recherchée. J'ai accès à plus de 50,000 pièces. Appelez-nous au 1-800-528-9978!",
      zh: "我可以帮您找到任何汽车零件！只需告诉我您的车辆年份、品牌、型号和所需零件。我会查看我们50,000+零件的库存。您也可以拨打1-800-528-9978！",
      ar: "يمكنني مساعدتك في العثور على أي قطعة! أخبرني سنة السيارة وماركتها وموديلها والقطعة المطلوبة. لدينا أكثر من 50,000 قطعة. اتصل بنا على 1-800-528-9978!",
      hi: "मैं आपको कोई भी पार्ट खोजने में मदद कर सकता हूं! बस अपनी गाड़ी का साल, कंपनी, मॉडल और जरूरी पार्ट बताएं। हमारे पास 50,000+ पार्ट्स हैं। आप 1-800-528-9978 पर भी कॉल कर सकते हैं!",
    },
  }

  // Detect topic
  let topic = "default"
  if (
    lowerMsg.includes("engine") ||
    lowerMsg.includes("motor") ||
    lowerMsg.includes("引擎") ||
    lowerMsg.includes("محرك") ||
    lowerMsg.includes("इंजन")
  ) {
    topic = "engine"
  } else if (
    lowerMsg.includes("transmission") ||
    lowerMsg.includes("transmisión") ||
    lowerMsg.includes("变速") ||
    lowerMsg.includes("ناقل")
  ) {
    topic = "transmission"
  } else if (
    lowerMsg.includes("price") ||
    lowerMsg.includes("cost") ||
    lowerMsg.includes("precio") ||
    lowerMsg.includes("价格") ||
    lowerMsg.includes("سعر") ||
    lowerMsg.includes("कीमत")
  ) {
    topic = "price"
  } else if (
    lowerMsg.includes("warranty") ||
    lowerMsg.includes("garantía") ||
    lowerMsg.includes("保修") ||
    lowerMsg.includes("ضمان") ||
    lowerMsg.includes("वारंटी")
  ) {
    topic = "warranty"
  } else if (
    lowerMsg.includes("ship") ||
    lowerMsg.includes("delivery") ||
    lowerMsg.includes("envío") ||
    lowerMsg.includes("运输") ||
    lowerMsg.includes("شحن")
  ) {
    topic = "shipping"
  }

  return (
    langResponses[topic]?.[lang] ||
    langResponses[topic]?.["en"] ||
    langResponses["default"][lang] ||
    langResponses["default"]["en"]
  )
}

export function FloatingQuoteWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState<"form" | "ai">("form")
  const [language, setLanguage] = useState("en")
  const [showLangPicker, setShowLangPicker] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    part: "",
    year: "",
    trim: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // AI Chat state
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const t = translations[language] || translations["en"]
  const availableModels = formData.make ? vehicleData[formData.make]?.models || [] : []
  const availableTrims = formData.make ? vehicleData[formData.make]?.trims || [] : []

  useEffect(() => {
    if (messages.length === 0 && isOpen && activeTab === "ai") {
      setMessages([{ role: "assistant", content: t.greeting }])
    }
  }, [isOpen, activeTab, t.greeting, messages.length])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Save to localStorage
    const quotes = JSON.parse(localStorage.getItem("auw_quotes") || "[]")
    quotes.push({ ...formData, timestamp: new Date().toISOString(), id: Date.now() })
    localStorage.setItem("auw_quotes", JSON.stringify(quotes))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleAISend = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateAIResponse(userMessage, language)
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsTyping(false)
    }, 1000)
  }

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice input not supported in this browser")
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = language === "zh" ? "zh-CN" : language === "ar" ? "ar-SA" : language
    recognition.continuous = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInputValue(transcript)
    }

    recognition.start()
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "zh" ? "zh-CN" : language === "ar" ? "ar-SA" : language
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-3 rounded-full shadow-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 group"
      >
        <MessageIcon />
        <span className="font-semibold">{t.getQuote}</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </button>
    )
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full shadow-2xl hover:from-red-700 hover:to-red-800 transition-all"
      >
        <ChevronUpIcon />
        <span className="font-semibold">AUW Quote</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <SparklesIcon />
            </div>
            <div>
              <h3 className="font-bold text-lg">AUW Parts Finder</h3>
              <p className="text-xs text-white/80">{t.aiPowered}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Language Picker */}
            <div className="relative">
              <button
                onClick={() => setShowLangPicker(!showLangPicker)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1"
              >
                <span className="text-lg">{languages.find((l) => l.code === language)?.flag}</span>
                <ChevronDownIcon />
              </button>
              {showLangPicker && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-40 max-h-60 overflow-y-auto z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setShowLangPicker(false)
                        if (activeTab === "ai") {
                          setMessages([
                            {
                              role: "assistant",
                              content: translations[lang.code]?.greeting || translations["en"].greeting,
                            },
                          ])
                        }
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm ${language === lang.code ? "bg-red-50 text-red-600" : "text-gray-700"}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <MinimizeIcon />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <XIcon />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "form" ? "bg-white text-red-600" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            {t.quoteForm}
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${activeTab === "ai" ? "bg-white text-red-600" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            <BotIcon />
            {t.aiAssistant}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[500px] overflow-y-auto">
        {activeTab === "form" ? (
          <div className="p-4">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.submitted}</h3>
                <p className="text-gray-600 mb-4">{t.willContact}</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      make: "",
                      model: "",
                      part: "",
                      year: "",
                      trim: "",
                      name: "",
                      email: "",
                      phone: "",
                      notes: "",
                    })
                  }}
                  className="text-red-600 font-medium hover:underline"
                >
                  Submit Another Quote
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                {/* Make */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t.make} *</label>
                  <select
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value, model: "", trim: "" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">{t.selectMake}</option>
                    {makes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t.model} *</label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                    disabled={!formData.make}
                  >
                    <option value="">{t.selectModel}</option>
                    {availableModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Part */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t.part} *</label>
                  <select
                    value={formData.part}
                    onChange={(e) => setFormData({ ...formData, part: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">{t.selectPart}</option>
                    {parts.map((part) => (
                      <option key={part} value={part}>
                        {part}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year and Trim row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{t.year} *</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">{t.selectYear}</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{t.trim}</label>
                    <select
                      value={formData.trim}
                      onChange={(e) => setFormData({ ...formData, trim: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      disabled={!formData.make}
                    >
                      <option value="">{t.selectTrim}</option>
                      {availableTrims.map((trim) => (
                        <option key={trim} value={trim}>
                          {trim}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-2">Contact Information</p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder={t.yourName}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="email"
                        placeholder={t.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                      <input
                        type="tel"
                        placeholder={t.phone}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>
                    <textarea
                      placeholder={t.notes}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      rows={2}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderIcon />
                      {t.submitting}
                    </>
                  ) : (
                    t.submit
                  )}
                </button>

                {/* Call Us */}
                <a
                  href="tel:1-800-528-9978"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm"
                >
                  <PhoneIcon />
                  {t.callUs}: 1-800-528-9978
                </a>
              </form>
            )}
          </div>
        ) : (
          <div className="flex flex-col h-[400px]">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <BotIcon />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-800"}`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => speakText(msg.content)}
                        className="mt-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <VolumeIcon />
                      </button>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <UserIcon />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <BotIcon />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${isListening ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {isListening ? <MicOffIcon /> : <MicIcon />}
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAISend()}
                  placeholder={t.placeholder}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  onClick={handleAISend}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
