export type Product = SoapProduct;

export interface SoapProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'Fitoterápico' | 'Aromaterapia' | 'Esfoliante' | 'Cabelos' | 'Argilas & Minerais' | 'Hidratação Profunda';
  price: number;
  originalPrice?: number;
  weightGrams: number;
  rating: number;
  reviewsCount: number;
  description: string;
  scentProfile: {
    intensity: 'Suave' | 'Médio' | 'Marcante';
    notes: string[];
    family: string;
  };
  skinType: ('Pele Sensível' | 'Pele Seca' | 'Pele Mista' | 'Pele Oleosa' | 'Pele Acneica' | 'Todos os Tipos')[];
  ingredients: string[];
  botanicalBenefits: string[];
  saponificationProcess: 'Cold Process (Saponificação a Frio)' | 'Hot Process (Cozimento Lento)' | 'Glicerina 100% Vegetal';
  curingTimeWeeks: number;
  images: string[];
  stock: number;
  isBestseller?: boolean;
  isSeasonal?: boolean;
}

export interface CustomSoapOrder {
  id: string;
  baseOils: string[];
  scent: string;
  scentIntensity: 'Suave' | 'Médio' | 'Marcante';
  colorant: string;
  botanicalAddins: string[];
  shape: 'Barra Retangular Rústica' | 'Barra Chanfrada Provençal' | 'Formato Oval Orgânico' | 'Mini Barras para Lembrancinhas';
  customStampingText: string;
  packagingStyle: 'Papel Kraft Rústico com Ráfia' | 'Caixa Ecológica com Selo de Cera' | 'Tecido de Algodão Cru & Ramos' | 'Fita de Juta & Canela em Pau';
  quantity: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  totalPrice: number;
  unitPrice: number;
  weightPerUnitGrams: number;
  createdAt: string;
}

export interface IngredientInfo {
  id: string;
  name: string;
  scientificName: string;
  category: 'Óleos & Manteigas Vegetais' | 'Óleos Essenciais Puros' | 'Argilas Medicinais' | 'Extratos & Ervas Botânicas' | 'Esfoliantes & Aditivos Naturais';
  description: string;
  origin: string;
  sapValue?: string;
  suitableSkin: string[];
  benefits: string[];
  howWeUse: string;
  artisanTip: string;
  image: string;
  colorHex: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar: string;
  location: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  skinType: string;
  soapName?: string;
  soapPurchased: string;
  title: string;
  comment: string;
  likes: number;
  tags: string[];
  images?: string[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoDurationSec: number;
  videoUrl: string;
  thumbnail?: string;
  isFreePreview: boolean;
  summary: string;
  steps: string[];
  safetyRules?: string[];
  materials: string[];
  tips?: string;
  recipeSheetTitle?: string;
  recipeSheetContent?: {
    fatsRatio: { name: string; percentage: number; weight: string }[];
    lyeWater: { lye: string; water: string; superfat: string };
    additives: string[];
    cureTime: string;
  };
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  totalLessons: number;
  totalDuration: string;
  coverImage: string;
  description: string;
  objectives: string[];
  lessons: CourseLesson[];
}

export interface VideoTutorial {
  id: string;
  title: string;
  category: 'Iniciante' | 'Cold Process' | 'Sabonetes Medicinais' | 'Shampoo & Condicionador Sólido' | 'Lembrancinhas & Embalagens' | 'Fitocosmética';
  duration: string;
  difficulty: 'Fácil' | 'Médio' | 'Intermediário' | 'Avançado';
  views: string;
  rating: number;
  description: string;
  videoUrl: string;
  thumbnail: string;
  tags: string[];
  steps: string[];
  ingredientsNeeded: { item: string; quantity: string; purpose: string }[];
  equipmentsNeeded: string[];
  proTip: string;
}

export interface CartItem {
  id: string;
  product?: SoapProduct;
  customOrder?: CustomSoapOrder;
  isCustom: boolean;
  quantity: number;
  price: number;
  name: string;
  image: string;
  specsSummary?: string;
}

export type OrderStatus = 'confirmado' | 'em_cura' | 'em_transporte' | 'entregue';

export interface OrderTrackingStep {
  title: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface SimulatedOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  statusLabel: string;
  estimatedDelivery: string;
  trackingCode?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
    specsSummary?: string;
    isCustom?: boolean;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
  trackingSteps: OrderTrackingStep[];
  giftWrap?: boolean;
  giftNote?: string;
}
