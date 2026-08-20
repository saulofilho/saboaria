import { SoapProduct, IngredientInfo, CustomerReview, CourseModule, VideoTutorial, SimulatedOrder } from '../types';

export const INITIAL_PRODUCTS: SoapProduct[] = [
  {
    id: 'soap-1',
    name: 'Lavanda Provençal & Manteiga de Karité',
    tagline: 'Calmante aromaterápico com flores secas de lavanda francesa',
    category: 'Aromaterapia',
    price: 34.00,
    originalPrice: 39.00,
    weightGrams: 125,
    rating: 4.9,
    reviewsCount: 86,
    description: 'Nossa barra assinatura mais amada. Saponificada lentamente pelo método ancestral Cold Process com 45 dias de cura. Combina o óleo essencial puro de Lavanda Francesa com a nutrição aveludada da manteiga de karité orgânica e infusão de azeite de oliva extra virgem. Proporciona um banho de relaxamento profundo e restaura a barreira lipídica da pele.',
    scentProfile: {
      intensity: 'Marcante',
      notes: ['Lavanda Francesa', 'Notas herbais doces', 'Camomila romana', 'Fundo amadeirado suave'],
      family: 'Floral Herbal Relaxante'
    },
    skinType: ['Pele Sensível', 'Pele Seca', 'Todos os Tipos'],
    ingredients: [
      'Azeite de Oliva Extra Virgem',
      'Óleo de Coco Palmiste Orgânico',
      'Manteiga de Karité Não Refinada',
      'Óleo de Rícino Prensado a Frio',
      'Óleo Essencial de Lavanda Francesa (Lavandula angustifolia)',
      'Flores de Lavanda Desidratadas',
      'Mica Mineral Roxa Natural',
      'Vitamina E Antioxidante'
    ],
    botanicalBenefits: [
      'Acalma irritações cutâneas e vermelhidão',
      'Aromaterapia para alívio de estresse e insônia',
      'Hidratação profunda sem ressecar o manto lipídico',
      'Espuma cremosa e densa com toque aveludado'
    ],
    saponificationProcess: 'Cold Process (Saponificação a Frio)',
    curingTimeWeeks: 6,
    images: [
      'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 24,
    isBestseller: true
  },
  {
    id: 'soap-2',
    name: 'Argila Rosa & Gerânio Egípcio',
    tagline: 'Equilíbrio delicado e luminosidade para peles sensíveis',
    category: 'Argilas & Minerais',
    price: 36.00,
    weightGrams: 120,
    rating: 4.8,
    reviewsCount: 64,
    description: 'Formulado especialmente para peles desvitalizadas, sensíveis ou maduras. A argila rosa é rica em minerais que auxiliam na absorção de toxinas sem ressecar. Enriquecido com óleo de Rosa Mosqueta puro e óleo essencial de gerânio, apelidado carinhosamente de "o óleo da feminilidade e autoestima".',
    scentProfile: {
      intensity: 'Médio',
      notes: ['Gerânio Bourbon', 'Palmarosa', 'Bergamota suave', 'Toque floral rosado'],
      family: 'Floral Botânico Refinado'
    },
    skinType: ['Pele Sensível', 'Pele Mista', 'Pele Seca'],
    ingredients: [
      'Azeite de Oliva infuso em Pétalas de Rosas',
      'Óleo de Girassol Prensado a Frio',
      'Óleo de Rosa Mosqueta Puro',
      'Manteiga de Cacau Orgânica',
      'Argila Rosa Francesa Certificada',
      'Óleo Essencial de Gerânio Egípcio',
      'Óleo Essencial de Palmarosa'
    ],
    botanicalBenefits: [
      'Desintoxica suavemente os poros',
      'Estimula a regeneração celular e o viço',
      'Melhora a elasticidade e firmeza natural',
      'Não repuxa a pele delicada do rosto e corpo'
    ],
    saponificationProcess: 'Cold Process (Saponificação a Frio)',
    curingTimeWeeks: 5,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 18,
    isBestseller: true
  },
  {
    id: 'soap-3',
    name: 'Carvão Ativado, Melaleuca & Alecrim',
    tagline: 'Detox purificante, controle de oleosidade e combate a cravos',
    category: 'Fitoterápico',
    price: 32.00,
    originalPrice: 38.00,
    weightGrams: 130,
    rating: 5.0,
    reviewsCount: 112,
    description: 'A barra detox definitiva para o rosto e corpo. O carvão ativado vegetal de babaçu atua como um ímã magnético puxando impurezas, poluição e excesso de sebo dos poros. Aliado ao poderoso óleo essencial de Tea Tree (Melaleuca) e Alecrim selvagem, combate a proliferação bacteriana e acalma espinhas.',
    scentProfile: {
      intensity: 'Marcante',
      notes: ['Tea Tree (Melaleuca)', 'Alecrim do Campo', 'Hortelã-Pimenta', 'Eucalipto Glóbulos'],
      family: 'Herbal Canforado & Refrescante'
    },
    skinType: ['Pele Oleosa', 'Pele Acneica', 'Pele Mista'],
    ingredients: [
      'Óleo de Babaçu da Amazônia',
      'Óleo de Neem Puro',
      'Carvão Vegetal Ativado Microfino',
      'Óleo de Rícino',
      'Óleo Essencial de Tea Tree (Melaleuca alternifolia)',
      'Óleo Essencial de Alecrim (Rosmarinus officinalis)',
      'Extrato Hidroglicerinado de Própolis Verde'
    ],
    botanicalBenefits: [
      'Limpeza profunda desobstrutora de poros',
      'Ação antisséptica, fungicida e anti-inflamatória',
      'Reduz a oleosidade e o brilho excessivo ao longo do dia',
      'Sensação refrescante imediata no banho'
    ],
    saponificationProcess: 'Cold Process (Saponificação a Frio)',
    curingTimeWeeks: 6,
    images: [
      'https://images.unsplash.com/photo-1608248597359-0091807d9b9c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547793548-710ec861bb6e?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 31,
    isBestseller: true
  },
  {
    id: 'soap-4',
    name: 'Calêndula Solar, Mel Silvestre & Aveia',
    tagline: 'Nutrição hipoalergênica ultra suave para peles ultrassensíveis e crianças',
    category: 'Fitoterápico',
    price: 35.00,
    weightGrams: 125,
    rating: 4.9,
    reviewsCount: 47,
    description: 'Elaborado com maceração solar de flores de calêndula em azeite de oliva por 40 dias. Sem fragrâncias sintéticas ou corantes artificiais. O mel silvestre cru atua como umectante natural de luxo e a farinha de aveia coloidal cria um manto de proteção suave contra coceiras e ressecamentos.',
    scentProfile: {
      intensity: 'Suave',
      notes: ['Mel natural quente', 'Pétalas de calêndula', 'Cereais doces', 'Sem adição de óleos essenciais fortes'],
      family: 'Doce Natural & Amendoado'
    },
    skinType: ['Pele Sensível', 'Pele Seca', 'Todos os Tipos'],
    ingredients: [
      'Azeite de Oliva Extravirgem macerado com Calêndula',
      'Manteiga de Manga Pura',
      'Óleo de Amêndoas Doces',
      'Mel Cru de Abelhas Nativas',
      'Aveia Coloidal Fina Orgânica',
      'Pétalas Desidratadas de Calendula officinalis'
    ],
    botanicalBenefits: [
      'Acalma dermatites, eczemas e brotoejas',
      'Poderosa ação cicatrizante e regeneradora',
      'Livre de óleos essenciais fortes, ideal para bebês e idosos',
      'Textura aveludada e espuma emoliente'
    ],
    saponificationProcess: 'Cold Process (Saponificação a Frio)',
    curingTimeWeeks: 7,
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 14,
    isSeasonal: true
  },
  {
    id: 'soap-5',
    name: 'Café Torrado, Canela do Ceilão & Laranja Doce',
    tagline: 'Esfoliação corporal vigorosa, ativação de circulação e firmeza',
    category: 'Esfoliante',
    price: 33.00,
    weightGrams: 135,
    rating: 4.8,
    reviewsCount: 53,
    description: 'Uma explosão estimulante para o banho matinal! Os grãos de café arábica moídos em granulação média realizam uma esfoliação mecânica que renova as células mortas e ativa a microcirculação periférica. A canela e a laranja doce trazem ânimo, calor e combatem o cansaço mental.',
    scentProfile: {
      intensity: 'Marcante',
      notes: ['Laranja Doce Prensada a Frio', 'Canela em casca quente', 'Café fresco tostado', 'Cravo-da-índia suave'],
      family: 'Especiado Cítrico Estimulante'
    },
    skinType: ['Pele Mista', 'Pele Seca', 'Todos os Tipos'],
    ingredients: [
      'Óleo de Café Verde Orgânico',
      'Azeite de Oliva',
      'Óleo de Coco da Bahia',
      'Pó de Café Arábica Tostado Especial',
      'Óleo Essencial de Laranja Doce (Citrus sinensis)',
      'Óleo Essencial de Folha de Canela (Cinnamomum zeylanicum)',
      'Canela em Pó Pura'
    ],
    botanicalBenefits: [
      'Remove células mortas e desobstrui pelos encravados',
      'Cafeína tópica auxilia na firmeza e textura da pele',
      'Estimula o bom humor e dissipa o cansaço',
      'Previne ressecamento áspero de cotovelos e calcanhares'
    ],
    saponificationProcess: 'Cold Process (Saponificação a Frio)',
    curingTimeWeeks: 5,
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 22
  },
  {
    id: 'soap-6',
    name: 'Shampoo & Sabonete Sólido de Alecrim, Jojoba & Cupuaçu',
    tagline: 'Cuidado 2 em 1 para couro cabeludo, fortalecimento capilar e corpo',
    category: 'Cabelos',
    price: 38.00,
    weightGrams: 110,
    rating: 4.9,
    reviewsCount: 78,
    description: 'Barra multifuncional para cabelos e corpo elaborada sem sulfatos agressivos. O óleo dourado de jojoba regula o sebo do couro cabeludo enquanto a manteiga amazônica de cupuaçu sela as cutículas dos fios promovendo brilho cintilante. Alecrim e hortelã estimulam o bulbo capilar acelerando o crescimento saudável.',
    scentProfile: {
      intensity: 'Médio',
      notes: ['Alecrim fresco macerado', 'Hortelã verde', 'Capim-Limão', 'Cedro Atlas'],
      family: 'Herbal Aromático Revigorante'
    },
    skinType: ['Pele Oleosa', 'Pele Mista', 'Todos os Tipos'],
    ingredients: [
      'Óleo de Jojoba Dourado Prensado a Frio',
      'Manteiga de Cupuaçu Não Refinada da Amazônia',
      'Óleo de Rícino Fortalecedor',
      'Óleo Essencial de Alecrim Quimiotipo Cineol',
      'Óleo Essencial de Cedro Atlas',
      'Argila Verde Montmorilonita',
      'Pantenol (Pró-vitamina B5)'
    ],
    botanicalBenefits: [
      'Estimula a microcirculação do couro cabeludo e reduz queda',
      'Brilho e maciez naturais sem acúmulo de silicones',
      'Substitui até 2 frascos plásticos de 250ml de shampoo tradicional',
      'Zero plástico e 100% biodegradável'
    ],
    saponificationProcess: 'Hot Process (Cozimento Lento)',
    curingTimeWeeks: 4,
    images: [
      'https://images.unsplash.com/photo-1608248597359-0091807d9b9c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 19,
    isBestseller: true
  },
  {
    id: 'soap-7',
    name: 'Cúrcuma Dourada, Gengibre & Capim-Limão',
    tagline: 'Uniformizador de tom, antioxidante e anti-inflamatório botânico',
    category: 'Hidratação Profunda',
    price: 34.00,
    weightGrams: 125,
    rating: 4.8,
    reviewsCount: 39,
    description: 'Inspirado na sabedoria milenar ayurvédica. A cúrcuma pura (açafrão-da-terra) é famosa por clarear manchas superficiais gradualmente e uniformizar a tonalidade da pele com seu poder antioxidante. A fragrância cítrica e herbal de capim-limão (lemongrass) revigora o espírito e afasta o cansaço.',
    scentProfile: {
      intensity: 'Marcante',
      notes: ['Capim-Limão Orgânico', 'Gengibre fresco picante', 'Laranja Bahia', 'Fundo de noz moscada'],
      family: 'Cítrico Solar & Especiado'
    },
    skinType: ['Pele Mista', 'Pele Oleosa', 'Todos os Tipos'],
    ingredients: [
      'Azeite de Oliva Extra Virgem',
      'Óleo de Girassol Prensado a Frio',
      'Cúrcuma longa Orgânica em Pó',
      'Óleo Essencial de Capim-Limão (Cymbopogon flexuosus)',
      'Óleo Essencial de Gengibre Raiz',
      'Óleo de Abacate Nutritivo',
      'Manteiga de Ucuuba'
    ],
    botanicalBenefits: [
      'Auxilia na uniformização de manchas e marcas superficiais',
      'Ação antioxidante contra radicais livres',
      'Revitaliza peles opacas e sem viço',
      'Aroma alegre e energizante que eleva a disposição'
    ],
    saponificationProcess: 'Cold Process (Saponificação a Frio)',
    curingTimeWeeks: 6,
    images: [
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 16,
    isNew: true,
    releaseBadge: 'Lote Novo'
  },
  {
    id: 'soap-8',
    name: 'Castela Puro 100% Azeite de Oliva & Camomila',
    tagline: 'O sabão mais nobre e gentil do mundo, com 90 dias de cura lenta',
    category: 'Fitoterápico',
    price: 39.00,
    weightGrams: 120,
    rating: 5.0,
    reviewsCount: 58,
    description: 'Seguindo a clássica receita secular da região de Castela (Espanha). Formulado unicamente com 100% de Azeite de Oliva extravirgem prensado a frio e chá concentrado de camomila romana. Cura prolongada por 3 meses para atingir uma barra extremamente densa, hidratante e que produz uma loção cremosa parecida com leite.',
    scentProfile: {
      intensity: 'Suave',
      notes: ['Camomila pura', 'Azeite de oliva fresco', 'Sem essências sintéticas', 'Aroma neutro amanteigado'],
      family: 'Neutro Botânico Delicado'
    },
    skinType: ['Pele Sensível', 'Pele Seca', 'Todos os Tipos'],
    ingredients: [
      '100% Azeite de Oliva Extravirgem Primeira Prensagem',
      'Infusão Concentrada de Camomila Alemã (Matricaria chamomilla)',
      'Flores de Camomila Desidratadas',
      'Vitamina E Tocoferol'
    ],
    botanicalBenefits: [
      'O sabão mais hipoalergênico que a natureza pode conceber',
      'Não remove os lipídios protetores da pele sensível',
      'Produz uma espuma com toque de leite hidratante',
      'Seguro para gestantes, recém-nascidos e peles atópicas'
    ],
    saponificationProcess: 'Cold Process (Saponificação a Frio)',
    curingTimeWeeks: 12,
    images: [
      'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 11,
    isSeasonal: true,
    isNew: true,
    releaseBadge: 'Recém Curado'
  },
  {
    id: 'soap-9',
    name: 'Manteiga de Murumuru & Flor de Laranjeira',
    tagline: 'Emoliência aveludada da Amazônia com buquê aromaterápico de Néroli',
    category: 'Hidratação Profunda',
    price: 37.00,
    originalPrice: 42.00,
    weightGrams: 130,
    rating: 5.0,
    reviewsCount: 19,
    description: 'Nossa mais recente criação do ateliê. Combina a rara manteiga amazônica de murumuru de colheita sustentável com o sublime óleo essencial de Néroli (Flor de Laranjeira) e sementes de papoula. Forma uma película protetora sedosa na pele, preservando a hidratação por até 24 horas.',
    scentProfile: {
      intensity: 'Marcante',
      notes: ['Néroli puro', 'Flor de Laranjeira', 'Petitgrain', 'Madeira clara aveludada'],
      family: 'Floral Cítrico Nobre'
    },
    skinType: ['Pele Seca', 'Pele Sensível', 'Todos os Tipos'],
    ingredients: [
      'Manteiga de Murumuru Não Refinada da Amazônia',
      'Óleo de Girassol Prensado a Frio',
      'Óleo de Babaçu Orgânico',
      'Óleo Essencial de Néroli (Citrus aurantium)',
      'Óleo Essencial de Petitgrain',
      'Argila Amarela Brasileira',
      'Sementes de Papoula'
    ],
    botanicalBenefits: [
      'Reparação intensiva de barreira cutânea',
      'Fragrância nobre com efeito antidepressivo e equilibrante',
      'Espuma densa e ultra hidratante com toque sedoso',
      'Excelente retenção hídrica para peles ressecadas'
    ],
    saponificationProcess: 'Cold Process (Saponificação a Frio)',
    curingTimeWeeks: 5,
    images: [
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
    isNew: true,
    releaseBadge: 'Edição Especial'
  }
];

export const INGREDIENTS_DATABASE: IngredientInfo[] = [
  {
    id: 'ing-1',
    name: 'Manteiga de Karité Não Refinada',
    scientificName: 'Butyrospermum Parkii Butter',
    category: 'Óleos & Manteigas Vegetais',
    description: 'Extraída das nozes da árvore de karité sagrada da savana africana. Rica em ácidos esteárico e oleico, vitaminas A e E, confere dureza à barra e uma retenção hídrica espetacular.',
    origin: 'Cooperativas de mulheres em Gana (Comércio Justo)',
    sapValue: 'SAP NaOH: 0.128 mg/g',
    suitableSkin: ['Pele Seca', 'Pele Sensível', 'Pele Madura'],
    benefits: ['Barreira contra perda de umidade', 'Anti-inflamatório natural', 'Estimula cicatrização', 'Toque aveludado único'],
    howWeUse: 'Usamos entre 10% e 20% nas fórmulas de cold process como gordura de sobreengorduramento (superfat) para que permaneça livre na barra.',
    artisanTip: 'Nunca superaqueça a manteiga de karité acima de 60°C para não perder os fitosteróis medicinais e evitar textura granulada.',
    image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=600&q=80',
    colorHex: '#E8D8C8'
  },
  {
    id: 'ing-2',
    name: 'Óleo Essencial de Lavanda Francesa',
    scientificName: 'Lavandula angustifolia Oil',
    category: 'Óleos Essenciais Puros',
    description: 'Obtido por destilação a vapor das sumidades floridas colhidas nos campos da Provença. É a rainha da aromaterapia, com alta concentração de linalol e acetato de linalila.',
    origin: 'Provença, França',
    suitableSkin: ['Todos os Tipos', 'Pele Sensível', 'Pele Acneica'],
    benefits: ['Sedativo e relaxante do sistema nervoso', 'Regenerador celular epitelial', 'Alívio de queimaduras leves e picadas', 'Antisséptico suave'],
    howWeUse: 'Adicionado rigorosamente no momento do "Traço Leve" com a massa abaixo de 40°C para fixar as notas de topo e coração.',
    artisanTip: 'Para fixar o aroma por até 1 ano na barra, combine 70% Lavanda Francesa com 20% Lavandim e 10% Óleo Essencial de Cedro ou Benjoim como fixador natural.',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80',
    colorHex: '#9B8DB8'
  },
  {
    id: 'ing-3',
    name: 'Argila Rosa de Montmorilonita',
    scientificName: 'Kaolin / Illite / Montmorillonite',
    category: 'Argilas Medicinais',
    description: 'Resultado da mistura geológica natural entre a argila branca (caulim) e a argila vermelha. Possui pH extremamente neutro e granulometria micronizada.',
    origin: 'Minas Gerais, Brasil',
    suitableSkin: ['Pele Sensível', 'Pele Desidratada', 'Pele com Rosácea'],
    benefits: ['Absorve impurezas sem ressecar', 'Ativa a circulação sanguínea facial', 'Acalma vermelhidões e vasinhos', 'Cor rosa pastel 100% natural'],
    howWeUse: 'Dispersa previamente em uma colher de azeite de oliva ou glicerina antes de incorporar à massa saponificada.',
    artisanTip: 'Se quiser marmorizado no sabonete, separe 30% da massa saponificada com a argila rosa e faça o vertimento em espiral tipo swirl.',
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=600&q=80',
    colorHex: '#E5A9A9'
  },
  {
    id: 'ing-4',
    name: 'Carvão Vegetal Ativado de Babaçu',
    scientificName: 'Activated Charcoal Powder',
    category: 'Argilas Medicinais',
    description: 'Carvão microporoso medicinal produzido a partir do coco de babaçu nativo sob queima anóxica controlada. Possui uma área superficial de adsorção imensa.',
    origin: 'Maranhão, Brasil',
    suitableSkin: ['Pele Oleosa', 'Pele Acneica', 'Pele com Poros Dilatados'],
    benefits: ['Adsorve poluição e sebo oxidado', 'Neutraliza odores corporais indesejados', 'Ação antibacteriana', 'Pigmento preto azeviche profundo'],
    howWeUse: 'Usamos 1 colher de chá rasa (aprox. 3g) para cada 500g de gorduras na receita.',
    artisanTip: 'Peneire o carvão sempre antes do uso para não deixar pontinhos sem dissolver na barra pronta.',
    image: 'https://images.unsplash.com/photo-1547793548-710ec861bb6e?auto=format&fit=crop&w=600&q=80',
    colorHex: '#222222'
  },
  {
    id: 'ing-5',
    name: 'Óleo de Rosa Mosqueta Prensado a Frio',
    scientificName: 'Rosa Rubiginosa Seed Oil',
    category: 'Óleos & Manteigas Vegetais',
    description: 'Óleo precioso de coloração avermelhada/dourada extraído das sementes da rosa silvestre dos Andes chilenos. Rico em ácidos graxos essenciais poli-insaturados (ômega 3 e 6) e ácido trans-retinoico.',
    origin: 'Patagônia, Chile',
    sapValue: 'SAP NaOH: 0.133 mg/g',
    suitableSkin: ['Pele Madura', 'Pele Seca', 'Cicatrizes e Manchas'],
    benefits: ['Estímulo poderoso de colágeno', 'Atenuação de linhas finas e marcas', 'Nutrição celular profunda', 'Auxílio na regeneração tecidual'],
    howWeUse: 'Reservado exclusivamente para o sobreengorduramento a 5%, adicionado no último minuto do traço para proteger suas moléculas termossensíveis.',
    artisanTip: 'Armazene o óleo de rosa mosqueta sempre em vidro âmbar ao abrigo da luz solar direta para evitar oxidação rápida.',
    image: 'https://images.unsplash.com/photo-1608248597359-0091807d9b9c?auto=format&fit=crop&w=600&q=80',
    colorHex: '#D47E6A'
  },
  {
    id: 'ing-6',
    name: 'Calêndula Officinalis (Flores & Extrato)',
    scientificName: 'Calendula officinalis Flower Extract',
    category: 'Extratos & Ervas Botânicas',
    description: 'Conhecida historicamente como "a noiva do sol". Suas pétalas laranjas douradas contêm flavonoides, saponinas e carotenoides com incrível poder anti-inflamatório.',
    origin: 'Cultivo agroecológico, Serra da Mantiqueira',
    suitableSkin: ['Pele Sensível', 'Pele com Dermatite', 'Peles de Bebês'],
    benefits: ['Cicatrizante rápido de microfissuras', 'Acalma pruridos e alergias de contato', 'Confere pontos dourados estéticos na barra', 'Suavidade máxima no banho'],
    howWeUse: 'Usamos tanto o azeite macerado com as flores por 40 dias quanto as pétalas finamente desfiadas sobre o topo da barra rústica.',
    artisanTip: 'Nunca use calêndula fresca no sabão — a umidade causa mofo. Use apenas pétalas 100% desidratadas ao ar livre.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    colorHex: '#F3A83B'
  },
  {
    id: 'ing-7',
    name: 'Óleo Essencial de Tea Tree (Melaleuca)',
    scientificName: 'Melaleuca alternifolia Leaf Oil',
    category: 'Óleos Essenciais Puros',
    description: 'Nativo da Austrália, destilado das folhas da árvore Melaleuca. É um dos agentes antimicrobianos e bactericidas botânicos mais estudados pela ciência farmacêutica moderna.',
    origin: 'Nova Gales do Sul, Austrália',
    suitableSkin: ['Pele Oleosa', 'Pele Acneica', 'Foliculite'],
    benefits: ['Combate a bactéria causadora da acne (C. acnes)', 'Secativo natural de espinhas inflamadas', 'Ação antifúngica para pés e unhas', 'Aroma herbal potente e purificador'],
    howWeUse: 'Combinado na proporção de 2% a 3% com óleos essenciais de alecrim e hortelã para balancear o buquê aromático.',
    artisanTip: 'Excelente para sabonetes corporais pós-treino e barras faciais de uso diário.',
    image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=600&q=80',
    colorHex: '#6B8E23'
  },
  {
    id: 'ing-8',
    name: 'Aveia Coloidal & Flocos Orgânicos',
    scientificName: 'Avena Sativa Kernel Flour',
    category: 'Esfoliantes & Aditivos Naturais',
    description: 'Grãos integrais de aveia moídos em pó finíssimo hidrossolúvel. Contém beta-glucanos, lipídios e avenantramidas, compostos químicos únicos com ação anti-coceira comprovada.',
    origin: 'Sul do Brasil (Paraná)',
    suitableSkin: ['Pele Seca', 'Pele Sensível', 'Pele Atópica / Eczema'],
    benefits: ['Cria película protetora que retém hidratação', 'Alívio imediato de coceiras causadas por ressecamento', 'Esfoliação ultra gentil tipo polimento', 'Aroma aconchegante de cereais doces'],
    howWeUse: 'Misturada na água destilada antes de verter na soda ou incorporada no traço como esfoliante aveludado.',
    artisanTip: 'Aveia coloidal é a melhor amiga de mães que querem fazer sabão artesanal infantil totalmente seguro.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    colorHex: '#D9C8B4'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Mariana Silveira Ramos',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    location: 'Belo Horizonte, MG',
    rating: 5,
    date: '14 de Fevereiro, 2026',
    verifiedPurchase: true,
    skinType: 'Pele com Rosácea & Sensível',
    soapPurchased: 'Argila Rosa & Gerânio Egípcio',
    title: 'Transformou a textura do meu rosto em 2 semanas!',
    comment: 'Eu tinha muito receio de usar sabonetes em barra no rosto porque todos os industriais repuxavam minha pele. O sabonete de Argila Rosa e Gerânio é simplesmente uma obra de arte. A espuma parece um creme hidratante macio, o perfume botânico é terapêutico e minha rosácea acalmou muito. Não compro mais sabonetes em farmácia nunca mais!',
    likes: 34,
    tags: ['Não resseca', 'Cheiro divino', 'Cura rosácea']
  },
  {
    id: 'rev-2',
    author: 'Carlos Eduardo Nogueira',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    location: 'São Paulo, SP',
    rating: 5,
    date: '28 de Janeiro, 2026',
    verifiedPurchase: true,
    skinType: 'Pele Oleosa & Acneica',
    soapPurchased: 'Carvão Ativado, Melaleuca & Alecrim',
    title: 'Adeus espinhas nas costas e foliculite da barba',
    comment: 'Pratico crossfit e sofria muito com foliculite e espinhas nos ombros e barba por conta do suor. Essa barra de Carvão e Tea Tree limpou tudo sem agredir. A sensação de frescor no pós-treino é indescritível. Além disso, a barra dura mais de um mês guardando em saboneteira drenada.',
    likes: 27,
    tags: ['Controle de oleosidade', 'Sensação refrescante', 'Dura muito']
  },
  {
    id: 'rev-3',
    author: 'Beatriz Vasconcelos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    location: 'Florianópolis, SC',
    rating: 5,
    date: '02 de Fevereiro, 2026',
    verifiedPurchase: true,
    skinType: 'Pele Normal / Todos os Tipos',
    soapPurchased: 'Pedido Personalizado: Barra Rústica com Lavanda & Argila Roxa',
    title: 'Fiz um lote personalizado para as lembranças do meu casamento',
    comment: 'O ateliê montou um lote personalizado de 60 mini barras com nosso carimbo personalizado e embrulhadas em papel kraft com raminhos de alfazema. Os convidados ficaram maravilhados com o capricho, o aroma encheu o salão de recepção. Atendimento impecável e amor em cada detalhe!',
    likes: 42,
    tags: ['Personalização perfeita', 'Embalagem impecável', 'Casamento']
  },
  {
    id: 'rev-4',
    author: 'Dra. Camila Fontes',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    location: 'Curitiba, PR',
    rating: 5,
    date: '19 de Janeiro, 2026',
    verifiedPurchase: true,
    skinType: 'Pele Seca & Madura',
    soapPurchased: 'Lavanda Provençal & Manteiga de Karité',
    title: 'A qualidade dos óleos vegetais salta aos olhos',
    comment: 'Como dermatologista apaixonada por fitoterapia, sou muito criteriosa com o índice de saponificação e ausência de petrolatos e lauril éter sulfato de sódio. As barras do Ateliê Botânico respeitam o tempo de cura a frio e preservam a glicerina natural. É nutrição real para a microbiota da pele.',
    likes: 51,
    tags: ['Aprovado por dermatologista', '100% Natural', 'Cold Process real']
  },
  {
    id: 'rev-5',
    author: 'Lucas Fontanelli',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    location: 'Rio de Janeiro, RJ',
    rating: 5,
    date: '05 de Janeiro, 2026',
    verifiedPurchase: true,
    skinType: 'Pele Mista',
    soapPurchased: 'Curso Online de Saboaria para Iniciantes',
    title: 'Comecei a produzir meus próprios sabões em casa após as aulas!',
    comment: 'A didática da professora nas aulas em vídeo é maravilhosa. Eu tinha pânico de mexer com soda cáustica, mas o módulo de EPIs e segurança me deu total confiança. Fiz meu primeiro lote de azeite e calêndula e ficou impecável, cortando com fio de aço como ensinado.',
    likes: 38,
    tags: ['Aulas didáticas', 'Segurança na soda', 'Receitas fáceis']
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Fundamentos da Saboaria & Segurança Química',
    subtitle: 'O fascinante processo de saponificação e manipulação sem medo',
    level: 'Iniciante',
    totalLessons: 4,
    totalDuration: '55 min',
    coverImage: 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=600&q=80',
    description: 'Aprenda a química por trás da reação entre triglicerídeos e hidróxido de sódio (NaOH). Conheça todos os equipamentos indispensáveis, termômetros, balanças digitais de precisão e a regra de ouro dos EPIs (Equipamentos de Proteção Individual).',
    objectives: [
      'Entender a reação de saponificação e formação da glicerina natural',
      'Dominar o manuseio seguro da soda cáustica 99% e da lixívia',
      'Montar sua bancada artesanal com materiais seguros (vidro borossilicato, inox e polipropileno)',
      'Aprender a calcular o percentual de água e concentração de lixívia'
    ],
    lessons: [
      {
        id: 'les-1-1',
        title: 'Aula 1: A Magia da Saponificação & História dos Sabões Ancestrais',
        duration: '12:40',
        videoDurationSec: 760,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=600&q=80',
        isFreePreview: true,
        summary: 'Nesta aula inaugural, você vai descobrir como azeites e óleos líquidos se transformam em barras sólidas emolientes através da reação química exotérmica que não deixa resquício algum de soda na barra curada.',
        steps: [
          'Origem do sabão de Marselha e Castela na antiguidade',
          'Diferença entre sabões artesanais com glicerina retida vs sabonetes comerciais industriais',
          'Por que a saponificação a frio (Cold Process) preserva os ativos das plantas',
          'Glossário essencial: Traço, Lixívia, Superfat e Tempo de Cura'
        ],
        safetyRules: [
          'Trabalhe sempre em ambiente bem ventilado',
          'Mantenha crianças e animais de estimação fora do cômodo durante a produção',
          'Tenha vinagre branco diluído à mão para neutralizar possíveis respingos em bancadas'
        ],
        materials: ['Caderno de formulações', 'Calculadora de saboaria', 'Balança de precisão 0.1g'],
        tips: 'Nunca utilize utensílios de alumínio, cobre ou teflon — a soda reage violentamente com alumínio liberando gás hidrogênio tóxico. Use sempre Inox 304/316, Silicone ou Plástico PP número 5.'
      },
      {
        id: 'les-1-2',
        title: 'Aula 2: EPIs Obrigatórios & O Ritual de Preparação da Lixívia',
        duration: '16:15',
        videoDurationSec: 975,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: true,
        summary: 'Aprenda o passo a passo seguro para diluir o hidróxido de sódio na água destilada. A regra inegociável: SEMPRE a soda sobre a água, NUNCA a água sobre a soda.',
        steps: [
          'Colocação correta de óculos de proteção com vedação lateral, luvas de borracha nitrílica e máscara contra vapores',
          'Pesagem precisa da água destilada gelada e das escamas de NaOH 99%',
          'Dissolução lenta e homogênea com espátula de silicone resistente',
          'Monitoramento da temperatura que sobe naturalmente até 85°C e como resfriar'
        ],
        safetyRules: [
          'NUNCA jogue água sobre a soda em pó para evitar erupção de lixívia cáustica quente',
          'Use sempre água destilada ou desmineralizada para não interferir nos íons de cálcio/magnésio'
        ],
        materials: ['Óculos de proteção', 'Luvas de nitrila', 'Jarra de polipropileno PP5', 'Termômetro culinário digital laser ou infravermelho'],
        tips: 'Você pode congelar 50% da água da receita em cubos de gelo destilados. Ao adicionar a soda sobre o gelo, os vapores diminuem em mais de 80%!'
      },
      {
        id: 'les-1-3',
        title: 'Aula 3: Desvendando a Tabela SAP (Índice de Saponificação)',
        duration: '14:20',
        videoDurationSec: 860,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: false,
        summary: 'Aprenda como calcular exatamente quantos gramas de soda cáustica são necessários para cada tipo de óleo vegetal (azeite, coco, mamona, palma, amêndoas doces) sem depender de receitas prontas.',
        steps: [
          'O que é o valor SAP e como ele varia pelo comprimento da cadeia de ácidos graxos',
          'Como calcular o Superfat (Sobreengorduramento) entre 5% e 8% para garantir nutrição extra',
          'Uso da calculadora digital de formulação de saboaria',
          'Equilíbrio entre Dureza (Ácido Láurico/Mirístico), Limpeza, Condicionamento e Espuma (Ácido Ricinoleico)'
        ],
        materials: ['Planilha de formulação', 'Tabela de índices SAP NaOH', 'Calculadora'],
        tips: 'Um sabão com muito óleo de coco (acima de 30%) pode ficar excessivamente adstringente. Sempre balanceie com óleos ricos em ácido oleico como azeite de oliva e manteiga de karité.'
      },
      {
        id: 'les-1-4',
        title: 'Aula 4: Checklist da Bancada & Teste de Traço',
        duration: '11:45',
        videoDurationSec: 705,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: false,
        summary: 'Antes de ligar o mixer, confira todos os ingredientes na temperatura ideal de emulsificação (entre 38°C e 45°C).',
        steps: [
          'Equalização de temperaturas entre óleos derretidos e lixívia',
          'Técnica correta de uso do mixer de mão para não formar bolhas de ar',
          'Identificando os 3 níveis de traço: Leve (swirls e cores), Médio (aditivos e aromas) e Pesado (texturas de topo)'
        ],
        materials: ['Mixer de mão com haste de inox', 'Espátulas de silicone tipo pão duro', 'Forma de madeira com forro de silicone'],
        tips: 'Pulse o mixer por 5 a 8 segundos e depois misture manualmente com a haste desligada por 15 segundos. Isso evita que a massa endureça rápido demais!'
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'O Método Cold Process Passo a Passo na Prática',
    subtitle: 'Da pesagem ao corte perfeito com régua e fio de aço',
    level: 'Iniciante',
    totalLessons: 3,
    totalDuration: '48 min',
    coverImage: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=600&q=80',
    description: 'Produza sua primeira receita botânica do zero: a clássica barra nutritiva de Azeite de Oliva, Calêndula e Manteiga de Karité com sobreengorduramento a 7%.',
    objectives: [
      'Executar uma receita completa de 1kg de sabão vegetal',
      'Despejar na forma de silicone e realizar o acabamento rústico superior',
      'Isolar termicamente a forma para fase de gel perfeita',
      'Desenformar após 24h a 48h e cortar com espessura uniforme de 2.5cm'
    ],
    lessons: [
      {
        id: 'les-2-1',
        title: 'Aula 1: A Receita Perfeita para Iniciantes (Azeite, Coco & Karité)',
        duration: '18:10',
        videoDurationSec: 1090,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: true,
        summary: 'Acompanhe a professora executando a receita mais equilibrada e infalível para seu primeiro lote de 8 a 10 barras artesanais.',
        steps: [
          'Pesagem dos óleos sólidos e derretimento suave em banho-maria',
          'Adição dos óleos líquidos e homogeneização',
          'Vertimento lento da lixívia pelos cantos da tigela',
          'Emulsão até atingir o traço sedoso como pudim ralo'
        ],
        materials: ['500g Azeite de Oliva', '250g Óleo de Coco', '150g Manteiga de Karité', '100g Óleo de Rícino', '142g Soda 99%', '330g Água Destilada'],
        recipeSheetTitle: 'Receita Oficial: Barra Sublime de Azeite & Karité (1kg)',
        recipeSheetContent: {
          fatsRatio: [
            { name: 'Azeite de Oliva Extra Virgem', percentage: 50, weight: '500g' },
            { name: 'Óleo de Coco Palmiste', percentage: 25, weight: '250g' },
            { name: 'Manteiga de Karité Não Refinada', percentage: 15, weight: '150g' },
            { name: 'Óleo de Rícino Puro', percentage: 10, weight: '100g' }
          ],
          lyeWater: { lye: '142g NaOH (Pureza 99%)', water: '330g Água Destilada', superfat: '7% Superfat' },
          additives: ['20ml Óleo Essencial de Lavanda Francesa', '5g Flores secas de Calêndula'],
          cureTime: '4 a 6 semanas em local arejado e sombreado'
        },
        tips: 'Mantenha a temperatura dos óleos e da lixívia entre 40°C e 43°C. Temperaturas muito baixas podem causar falsa tração e cristalização precoce das manteigas.'
      },
      {
        id: 'les-2-2',
        title: 'Aula 2: Fase de Gel (Gel Phase) & Isolamento Térmico',
        duration: '14:30',
        videoDurationSec: 870,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: false,
        summary: 'Descubra como envolver sua forma em mantas térmicas para promover a fase de gel completa, intensificando as cores e acelerando o tempo de desenforme.',
        steps: [
          'Cobrir o topo da massa com filme de cera vegetal ou papel manteiga',
          'Embrulhar a forma de madeira em toalhas grossas',
          'O que acontece molecularmente no pico de calor interno (atinge até 65°C)',
          'Como evitar o "anel de gel parcial" e "cinzas de soda" (soda ash) na superfície'
        ],
        materials: ['Manta térmica ou toalhas', 'Forma de madeira com caixa', 'Papel manteiga'],
        tips: 'Se quiser sabonetes branquinhos e leitosos (como sabão de leite de coco ou cabra), faça o oposto: coloque a forma na geladeira por 12 horas para evitar a fase de gel e não queimar os açúcares!'
      },
      {
        id: 'les-2-3',
        title: 'Aula 3: O Momento do Desenforme, Corte & Estação de Cura',
        duration: '15:20',
        videoDurationSec: 920,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: false,
        summary: 'O momento mais emocionante do saboeiro! Saiba quando a barra está firme o suficiente para cortar e como organizar as prateleiras de cura.',
        steps: [
          'Teste de toque nas bordas da forma após 24 horas',
          'Desmoldagem suave sem quebrar os cantos',
          'Corte uniforme com cortador manual de fio de aço inox',
          'Carimbagem artesanal personalizada no ponto certo de dureza (4 a 8 horas pós-corte)',
          'Armazenamento em caixas de madeira ventiladas com papel manteiga por 4 a 6 semanas'
        ],
        materials: ['Cortador de sabão com régua milimetrada e fio de inox', 'Carimbo acrílico artesanal', 'Martelinho de borracha leve'],
        tips: 'Durante as primeiras semanas de cura, o sabão perde cerca de 10% a 15% do seu peso em água evaporada, tornando a barra dura, durável e com pH suave perfeitamente estabilizado em torno de 8.5 a 9.0.'
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Colorimetria Botânica & Aromaterapia Segura',
    subtitle: 'Pigmentos 100% naturais de argilas, raízes, sementes e óleos essenciais puros',
    level: 'Intermediário',
    totalLessons: 3,
    totalDuration: '52 min',
    coverImage: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=600&q=80',
    description: 'Aprenda a colorir suas criações sem tintas sintéticas: use argilas minerais brasileiras, cúrcuma, espirulina, urucum macerado e crie efeitos marmorizados de encher os olhos.',
    objectives: [
      'Dominar a dispersão de argilas e botânicos em pó',
      'Criar técnicas de swirl (marmorizado em gota, taipe e espiral)',
      'Aprender a taxa de uso seguro (IFRA) de óleos essenciais na saboaria'
    ],
    lessons: [
      {
        id: 'les-3-1',
        title: 'Aula 1: A Paleta da Terra — Argilas e Especiarias',
        duration: '16:40',
        videoDurationSec: 1000,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: false,
        summary: 'Conheça o comportamento das cores no pH alcalino: saiba o que fica vívido e quais plantas perdem a cor ou amarronzam.',
        steps: [
          'Argila Verde (Illite) para tons de oliva suave',
          'Argila Rosa e Vermelha para tons terrosos e terracota',
          'Cúrcuma orgânica para tons de amarelo mostarda brilhante',
          'Carvão vegetal ativado para efeito preto mármore e contraste'
        ],
        materials: ['Argilas micronizadas', 'Tigelas de cerâmica pequenas', 'Mixer miniatura ou fouet'],
        tips: 'Pétalas de hibisco e beterraba NÃO mantêm a cor vermelha no Cold Process — oxidam e viram cinza/marrom. Para vermelhos e rosas naturais estáveis, use sempre Argila Vermelha ou Raiz de Alkanna macerada.'
      },
      {
        id: 'les-3-2',
        title: 'Aula 2: Cálculos de Aromaterapia & Fixação de Fragrâncias',
        duration: '18:30',
        videoDurationSec: 1110,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: false,
        summary: 'Como perfumar seu sabão de forma duradoura usando a pirâmide olfativa (notas de topo, meio e base) e fixadores naturais.',
        steps: [
          'Percentual seguro de óleos essenciais (geralmente entre 2.5% e 4% do peso total de óleos)',
          'Como óleos de especiarias (canela, cravo) aceleram o traço violentamente',
          'O papel das argilas e farinha de aveia na fixação de moléculas voláteis',
          'Combinações aromáticas clássicas: Lavanda + Alecrim + Cedro'
        ],
        materials: ['Pipetas graduadas', 'Béquer de vidro', 'Frascos de óleos essenciais puros'],
        tips: 'Adicione uma colher de chá de amido de milho ou argila branca bem misturada no seu blend de óleos essenciais antes de jogar no traço. Isso funciona como âncora olfativa!'
      },
      {
        id: 'les-3-3',
        title: 'Aula 3: Efeito Mármore Swirl & Texturas de Topo Artesanal',
        duration: '16:50',
        videoDurationSec: 1010,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isFreePreview: false,
        summary: 'Técnicas de vertimento duplo em camadas e modelagem do topo da barra com colher e espátula para aquele visual irresistível de ateliê.',
        steps: [
          'Dividir a massa no traço leve em 2 ou 3 jarros',
          'Colorir individualmente cada jarro',
          'Técnica do In-The-Pot Swirl (Mármore no caldeirão) e Hanger Swirl (com haste de inox dobrada)',
          'Finalização com sal grosso rosa, flores de calêndula e ramos de alecrim'
        ],
        materials: ['Haste de inox para marmorizado', 'Espátula de confeitar pequena', 'Flores secas para decoração'],
        tips: 'Para texturizar o topo em ondas rústicas, espere a massa descansar na forma por cerca de 10 a 15 minutos até atingir a consistência de chantilly firme.'
      }
    ]
  }
];

export const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 'tut-1',
    title: 'Sabonete Facial de Argila Rosa & Rosa Mosqueta (Cold Process)',
    category: 'Sabonetes Medicinais',
    duration: '14 min',
    difficulty: 'Fácil',
    views: '28.4k visualizações',
    rating: 4.9,
    description: 'Aprenda a formular e produzir um sabonete facial antioxidante para peles sensíveis e maduras, com dispersão uniforme de argila rosa e óleo de rosa mosqueta adicionado no traço.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=700&q=80',
    tags: ['Rosto', 'Argila Rosa', 'Pele Madura', 'Cold Process', 'Regenerador'],
    steps: [
      'Separar e pesar: 400g Azeite de Oliva, 200g Óleo de Coco, 100g Manteiga de Karité, 50g Óleo de Rosa Mosqueta',
      'Preparar a lixívia com 105g de Soda 99% e 240g de Água Destilada gelada',
      'Dispersar 2 colheres de sopa de Argila Rosa Francesa em 30ml de azeite de oliva morno até ficar liso',
      'Unir óleos e lixívia a 40°C e bater no mixer até traço leve',
      'Incorporar a argila dispersa e o óleo de rosa mosqueta com espátula',
      'Adicionar 15ml de Óleo Essencial de Gerânio e 10ml de Palmarosa',
      'Despejar na forma de silicone e decorar com botões de rosas secas',
      'Cobrir e aguardar 36 horas para desenformar. Deixar curar por 5 semanas.'
    ],
    ingredientsNeeded: [
      { item: 'Azeite de Oliva Extra Virgem', quantity: '400g', purpose: 'Base emoliente suave rica em ácido oleico' },
      { item: 'Óleo de Coco Palmiste', quantity: '200g', purpose: 'Dureza e espuma abundante' },
      { item: 'Manteiga de Karité', quantity: '100g', purpose: 'Hidratação profunda e proteção de barreira' },
      { item: 'Óleo de Rosa Mosqueta Puro', quantity: '50g', purpose: 'Superfat rejuvenescedor no traço' },
      { item: 'Argila Rosa de Montmorilonita', quantity: '25g', purpose: 'Desintoxicação suave e cor rosa natural' },
      { item: 'Óleo Essencial de Gerânio Egípcio', quantity: '15ml', purpose: 'Equilíbrio hormonal da pele e aroma floral' }
    ],
    equipmentsNeeded: ['Balança de precisão 0.1g', 'Mixer de mão em inox', 'Termômetro digital', 'Forma retangular de silicone 1kg'],
    proTip: 'Se quiser cor rosa degradê, despeje metade da massa sem argila no fundo e adicione a argila apenas na metade superior!'
  },
  {
    id: 'tut-2',
    title: 'Barra Detox Carvão Vegetal, Melaleuca & Hortelã Pimenta',
    category: 'Sabonetes Medicinais',
    duration: '12 min',
    difficulty: 'Fácil',
    views: '45.1k visualizações',
    rating: 5.0,
    description: 'Passo a passo completo para criar a barra preta aveludada purificante mais vendida de qualquer ateliê artesanal, indicada para combate à acne e cravos.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1547793548-710ec861bb6e?auto=format&fit=crop&w=700&q=80',
    tags: ['Detox', 'Carvão Ativado', 'Acne', 'Tea Tree', 'Pele Oleosa'],
    steps: [
      'Peneirar 15g de Carvão Vegetal Ativado finíssimo para evitar grumos',
      'Derreter os óleos de coco e babaçu junto aos óleos líquidos',
      'Preparar a lixívia com água destilada e deixar amornar a 38°C',
      'Verter a lixívia e bater com mixer até início de emulsão',
      'Adicionar o carvão vegetal e bater até que a massa fique homogênea e preta profunda',
      'Adicionar os óleos essenciais de Melaleuca (Tea Tree) e Hortelã Pimenta',
      'Verter na forma e salpicar pequenas sementes de papoula preta no topo',
      'Cura de 6 semanas para neutralidade perfeita do pH.'
    ],
    ingredientsNeeded: [
      { item: 'Óleo de Babaçu da Amazônia', quantity: '250g', purpose: 'Poder de limpeza e espuma farta' },
      { item: 'Azeite de Oliva Extravirgem', quantity: '350g', purpose: 'Condicionamento para não ressecar' },
      { item: 'Óleo de Rícino (Mamona)', quantity: '100g', purpose: 'Espuma estável e cremosa' },
      { item: 'Carvão Ativado Vegetal', quantity: '15g', purpose: 'Adsorção magnética de impurezas e toxinas' },
      { item: 'Óleo Essencial de Tea Tree (Melaleuca)', quantity: '20ml', purpose: 'Ação bactericida e anti-acne' },
      { item: 'Óleo Essencial de Hortelã Pimenta', quantity: '10ml', purpose: 'Sensação refrescante no banho' }
    ],
    equipmentsNeeded: ['Peneira fina', 'Óculos de proteção', 'Luvas de borracha', 'Mixer inox', 'Espátula de silicone'],
    proTip: 'O carvão ativado escurece bastante a espuma no primeiro contato com a água, mas não mancha azulejos nem a pele após o enxágue.'
  },
  {
    id: 'tut-3',
    title: 'Shampoo Sólido 100% Natural de Alecrim, Jojoba & Argila Verde',
    category: 'Shampoo & Condicionador Sólido',
    duration: '18 min',
    difficulty: 'Médio',
    views: '33.8k visualizações',
    rating: 4.8,
    description: 'Substitua os frascos plásticos por uma barra sólida de shampoo saponificado formulada especificamente para o couro cabeludo, estimulando o crescimento capilar.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1608248597359-0091807d9b9c?auto=format&fit=crop&w=700&q=80',
    tags: ['Zero Plástico', 'Cabelos', 'Alecrim', 'Shampoo Sólido', 'Queda Capilar'],
    steps: [
      'Preparar infusão ultraconcentrada de folhas de alecrim fresco em água destilada para a lixívia',
      'Misturar 30% Óleo de Rícino para turbinar o poder espumante e nutrição dos folículos',
      'Adicionar óleo de Jojoba puro como sobreengorduramento a 4%',
      'Adicionar Argila Verde para regular a oleosidade excessiva da raiz',
      'Despejar em moldes redondos individuais de 100g ergonômicos para a mão',
      'Curar por 6 semanas completas para suavidade máxima do fio de cabelo'
    ],
    ingredientsNeeded: [
      { item: 'Óleo de Rícino', quantity: '200g', purpose: 'Estimula o bulbo e encorpa a espuma' },
      { item: 'Azeite de Oliva Extravirgem', quantity: '300g', purpose: 'Brilho e maciez natural' },
      { item: 'Óleo de Coco Palmiste', quantity: '150g', purpose: 'Limpeza profunda da raiz' },
      { item: 'Óleo de Jojoba Dourado', quantity: '50g', purpose: 'Regulador sebáceo no couro cabeludo' },
      { item: 'Óleo Essencial de Alecrim Cineol', quantity: '25ml', purpose: 'Ativação da circulação capilar' }
    ],
    equipmentsNeeded: ['Moldes circulares de silicone', 'Termômetro', 'Balança de precisão'],
    proTip: 'Ensine seus clientes a utilizarem um enxágue com vinagre de maçã diluído (1 colher de sopa em 300ml de água) após o shampoo saponificado para fechar perfeitamente as cutículas!'
  },
  {
    id: 'tut-4',
    title: 'Embalagem Rústica Sustentável com Papel Kraft, Rami & Selo de Cera',
    category: 'Lembrancinhas & Embalagens',
    duration: '9 min',
    difficulty: 'Fácil',
    views: '19.6k visualizações',
    rating: 5.0,
    description: 'Transforme qualquer sabonete artesanal em um presente de luxo com apresentação rústica: dobras elegantes, etiqueta botânica em kraft e selagem com cera de abelha.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=700&q=80',
    tags: ['Embalagem', 'Kraft', 'Rústico', 'Sustentabilidade', 'Lembrancinhas'],
    steps: [
      'Cortar tiras de papel kraft 120g com a largura exata de 5cm (cinta/faixa central)',
      'Imprimir os ingredientes e lote na parte interna ou verso da cinta',
      'Dobrar ao redor da barra curada e prender com fita dupla face biodegradável',
      'Passar 3 voltas de cordão de rami ou ráfia natural de juta',
      'Fixar um raminho desidratado de lavanda ou alfazema no nó',
      'Aplicar uma gota de cera quente e carimbar com sinete de metal com a logo do ateliê'
    ],
    ingredientsNeeded: [
      { item: 'Papel Kraft 120g ecológico', quantity: '1 rolo', purpose: 'Cinta respirável que permite a barra continuar curando' },
      { item: 'Fio de rami ou ráfia vegetal', quantity: '50m', purpose: 'Laço rústico elegante' },
      { item: 'Ramos secos de flores botânicas', quantity: 'Vários', purpose: 'Elemento sensorial natural' },
      { item: 'Cera vegetal e sinete de metal', quantity: '1 kit', purpose: 'Selo de autenticidade artesanal' }
    ],
    equipmentsNeeded: ['Tesoura de precisão', 'Régua de metal', 'Sinete personalizado', 'Pistola de cera quente'],
    proTip: 'Nunca embale sabonetes Cold Process em filme plástico PVC impermeável! As barras precisam respirar para não suar nem criar mofo.'
  },
  {
    id: 'tut-5',
    title: 'Sabão de Castela 100% Azeite de Oliva (Guia Definitivo)',
    category: 'Cold Process',
    duration: '16 min',
    difficulty: 'Intermediário',
    views: '52.3k visualizações',
    rating: 4.9,
    description: 'O método milenar para fabricar o lendário sabão espanhol de Castela. Como controlar a tração lenta do azeite de oliva e garantir barras sedosas.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80',
    tags: ['Castela', '100% Azeite', 'Ancestral', 'Hipoalergênico', 'Cura Longa'],
    steps: [
      'Pesar 1000g de Azeite de Oliva Extra Virgem com acidez menor que 0.5%',
      'Calcular a lixívia com 134g de NaOH e 280g de Água Destilada (Concentração de 32% para acelerar a tração)',
      'Bater com paciência — a tração do azeite puro pode levar de 15 a 25 minutos',
      'Despejar na forma e esperar de 48 a 72 horas para desenformar (o sabão de azeite é naturalmente mais mole no início)',
      'Armazenar em prateleiras arejadas por no mínimo 12 semanas (90 dias) de cura'
    ],
    ingredientsNeeded: [
      { item: 'Azeite de Oliva Extra Virgem', quantity: '1000g', purpose: 'Única gordura da fórmula milenar' },
      { item: 'Hidróxido de Sódio 99%', quantity: '134g', purpose: 'Agente saponificante' },
      { item: 'Água Destilada', quantity: '280g', purpose: 'Solvente da lixívia' }
    ],
    equipmentsNeeded: ['Forma de madeira com silicone', 'Mixer potente', 'Termômetro'],
    proTip: 'Quanto mais velho o sabão de Castela, melhor ele fica! Um sabão de Castela curado por 6 meses a 1 ano produz uma espuma densa parecida com loção de barbear cremosa.'
  },
  {
    id: 'tut-6',
    title: 'Como Montar sua Primeira Coleção & Precificar Sabonetes',
    category: 'Iniciante',
    duration: '21 min',
    difficulty: 'Fácil',
    views: '39.7k visualizações',
    rating: 5.0,
    description: 'Planilha prática e método passo a passo para calcular custo por grama, custo de embalagem, hora de trabalho artesanal e margem de lucro saudável de 200% a 300%.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=700&q=80',
    tags: ['Negócio', 'Precificação', 'Vendas', 'Ateliê', 'Empreendedorismo'],
    steps: [
      'Cálculo do Custo de Matéria Prima (Óleos, Soda, Óleos Essenciais, Argilas)',
      'Cálculo de Perda por Evaporação de Água na Cura (12%)',
      'Inclusão dos Custos de Embalagem, Selos e Etiquetas',
      'Cálculo do Valor da Hora de Trabalho do Artesão',
      'Margem para Venda no Varejo vs Atacado (Lojas e Casamentos)'
    ],
    ingredientsNeeded: [
      { item: 'Planilha de Custos Automatizada', quantity: '1 arquivo', purpose: 'Cálculo de precificação precisa' }
    ],
    equipmentsNeeded: ['Computador ou Celular', 'Calculadora'],
    proTip: 'Nunca venda seu sabonete artesanal puro pelo mesmo preço de um sabonete industrial sintético de supermercado. Posicione seu ateliê como uma experiência de spa botânico e autocuidado de luxo consciente!'
  }
];

export const INITIAL_SIMULATED_ORDERS: SimulatedOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'SAB-2026-8942',
    date: '18 de Agosto de 2026',
    status: 'em_transporte',
    statusLabel: 'Em Transporte Ecológico',
    estimatedDelivery: '21 de Agosto de 2026',
    trackingCode: 'ECO-84910284BR',
    items: [
      {
        name: 'Lavanda Francesa & Manteiga de Karité',
        quantity: 2,
        price: 34.00,
        image: 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=600&q=80',
        specsSummary: '125g • Cold Process • Karité & Alfazema'
      },
      {
        name: 'Argila Rosa & Gerânio Egípcio',
        quantity: 1,
        price: 36.00,
        image: 'https://images.unsplash.com/photo-1607006483702-326002f23247?auto=format&fit=crop&w=600&q=80',
        specsSummary: '130g • Cold Process • Argila Francesa'
      }
    ],
    subtotal: 104.00,
    shipping: 0.00,
    total: 112.00,
    paymentMethod: 'PIX Instantâneo',
    shippingAddress: 'Alameda dos Ipês, 450 - Apto 82, Jardins, São Paulo - SP',
    giftWrap: true,
    giftNote: 'Com muito carinho para um momento de relaxamento e autocuidado botânico!',
    trackingSteps: [
      { title: 'Pedido & Pagamento Confirmado', date: '18/08 às 09:20', completed: true },
      { title: 'Seleção Botânica & Embalagem Kraft', date: '18/08 às 15:40', completed: true },
      { title: 'Coletado pela Transportadora Verde', date: '19/08 às 11:15', completed: true, current: true },
      { title: 'Entrega Prevista no Endereço', date: '21/08 até 18:00', completed: false }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'SAB-2026-6170',
    date: '28 de Julho de 2026',
    status: 'entregue',
    statusLabel: 'Entregue com Sucesso',
    estimatedDelivery: '04 de Agosto de 2026',
    trackingCode: 'ECO-61703921BR',
    items: [
      {
        name: 'Sabão Sob Medida (Lote Exclusivo 6x)',
        quantity: 1,
        price: 184.00,
        image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&q=80',
        specsSummary: '6 barras • Karité & Alecrim • Embalagem Cera',
        isCustom: true
      },
      {
        name: 'Castela Ancestral 100% Oliva Extra Virgem',
        quantity: 1,
        price: 39.00,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
        specsSummary: '140g • 12 Semanas de Cura'
      }
    ],
    subtotal: 223.00,
    shipping: 0.00,
    total: 223.00,
    paymentMethod: 'Cartão de Crédito (3x)',
    shippingAddress: 'Rua Bela Cintra, 1200 - São Paulo - SP',
    giftWrap: false,
    trackingSteps: [
      { title: 'Pedido Confirmado', date: '28/07 às 14:10', completed: true },
      { title: 'Cura & Embalagem Finalizada', date: '30/07 às 16:00', completed: true },
      { title: 'Despachado para Envio', date: '01/08 às 09:30', completed: true },
      { title: 'Entregue ao Destinatário', date: '04/08 às 15:45', completed: true }
    ]
  }
];
