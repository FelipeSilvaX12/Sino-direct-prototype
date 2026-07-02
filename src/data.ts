import { Product, Category, Coupon } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'eletronicos',
    name: 'Eletrônicos',
    description: 'Gadgets de última geração com alta precisão e performance.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPb1SxZXoa1TZ7ITNsNsFeTDNct92jdwXSQBWec6GBZ5EEln6KbHXwHMrCkNHG21gZhIyo4nLxcxUIYwfoWSdB7vlJpghHZwtw3_4EwMX4E63qQIp-DmCHfLtlEQTEDQpmDeLslebYwgGPMWyA6jNBMQLqQuAWz5UPrEIBPNXLO-hS86_PlGfY33pFY4wXcNKpuinz6kx6q43Sk2ihUZ2wGJW0PobvvYyB_XomrudU3ItmZdUWmHBalg',
    itemCount: 4
  },
  {
    id: 'moda',
    name: 'Moda',
    description: 'Estilo contemporâneo e tecidos nobres inspirados no minimalismo oriental.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZKCugjWT-nW3p5E3Fbs_gSsbKOGFy9ayNgyt8u9sHcvei4s_8xSN9Hx2sMHFdgZK247IEoyqQfBoeEBIEOdruGb3mJiGkukUvvCrSDSXWelvh0JgIh-ekluIlQFp4YFHcNKlSbk99ICnZFYlBlvAD7lOc4kbf4e3vHdd6-xFP7rgbpjSlBtAG7H3b7_c1ouPvDIMq935sgmhWeEGTqhm-U7Oi8UtIutGuqFQLlS18G0ZigY2bmqTwWQ',
    itemCount: 3
  },
  {
    id: 'casa',
    name: 'Casa',
    description: 'Utensílios, decorações e bem-estar para um conforto inteligente e sofisticado.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY565-iesyHjiYlBKnqw1Tgkk9uXa5N2LNeA-IiA427oXkX_N1hbRUEddVtco14S5JpXBktXSjpQ1bhDG9J32aAxwC0-jkdHjQAiZdnvp3bo7WQGmiRrFaKDAt0U-D1-JbJWnOhpnJHm8kMvljIyptEjS68sXOSgzRhQDNUuvQB8DK9UFnw2Pz_0JfUBQ21p2F3FoNPnZXBwI5DJNxiIGLB62ShaUF8S4DjpO-qH1DWFF25-YNzTeoZA',
    itemCount: 3
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'k1-keyboard',
    name: 'Teclado Mecânico Pro K1',
    price: 549.00,
    originalPrice: 699.00,
    category: 'eletronicos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZuoRnvOrdawbM3Ak3uS06_Ao-rruAFrO8TUtS2NIux0kSoxQnBliOT0Ke0_wqeHn8gOqKDyZKtxJwNljyzZOW8A8kA7_HoD8x3EOZKW0l-jgnbxw7Qe0UZpn3Z7wnfJgXhm_M_lRIpEf5TaxtEhrbvdKQ0LTMJ3RBu8zpB9WrDT_Z9bs66gOxhQV0lCJVudG_yty_1t1IEcClCTKT8aoTtn4a-WD6-XXQOOEvUZ8kohWjsHQJdcPsdA',
    badge: 'NOVO',
    description: 'Teclado mecânico topo de linha em preto fosco com iluminação RGB personalizável e acabamento em alumínio escovado. Projetado com switches táteis de altíssima durabilidade para digitação precisa e silenciosa, ideal para programadores e gamers exigentes.',
    rating: 4.9,
    reviewsCount: 124,
    specifications: {
      'Layout': 'ANSI Compacto (75%)',
      'Switches': 'Gateron Brown Pro (Tátil & Silencioso)',
      'Conexão': 'Bluetooth 5.1, Wireless 2.4Ghz e USB-C',
      'Bateria': '4000mAh (Até 200 horas com LEDs desligados)',
      'Material': 'Chassis de Alumínio Aeroespacial'
    },
    features: [
      'Iluminação RGB dinâmica com 18 efeitos pré-programados',
      'Teclas PBT Double-Shot resistentes ao desgaste e brilho',
      'Compatibilidade total com Mac, Windows, iOS e Android',
      'Hot-swappable (substitua os switches sem solda)'
    ]
  },
  {
    id: 'zenflow-headphones',
    name: 'Fone Wireless ZenFlow',
    price: 389.90,
    originalPrice: 499.00,
    category: 'eletronicos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Ia0KKRw0KuIJn36Ef6WgFJtZIoYdTH_pRLwMRY02MYiVmLp9GFWmPECk5bp1zSg4Df34w7qCBP3kWnhj3mjQI87Eq0BeHJIMrat2q-cabAf2WfwslXQ6RPfUN1zZaoxK3Q-Of0UfFjxy4Ct1JoWJuo5UvVumAGrtW65Nx8XRyp6XzH8zMi1da92f5_JzvUm-30_CtS-H6NFOFmtkYJtOyFGlqsijTZMWrpTxDwm9Y8lJHrCtPHTfhA',
    description: 'Fones de ouvido com cancelamento ativo de ruído inteligente (ANC) na elegante cor cinza carvão. Almofadas em couro sintético premium memory foam e dobradiças metálicas reforçadas. Sinta a imersão de áudio pura e equilibrada com drivers de 40mm de neodímio.',
    rating: 4.8,
    reviewsCount: 89,
    specifications: {
      'Cancelamento de Ruído': 'ANC Híbrido de até 35dB',
      'Driver': 'Dínamo de Neodímio de 40mm',
      'Autonomia': 'Até 45 horas com ANC ativado',
      'Codec': 'Hi-Res Audio, AAC, SBC, LDAC',
      'Carregamento': 'Rápido USB-C (10 min de carga = 5h de música)'
    },
    features: [
      'Cancelamento ativo de ruído com modo transparência adaptativo',
      'Design dobrável ultra confortável ideal para viagens',
      'Microfones duplos com redução de ruído por IA para chamadas cristalinas',
      'Conexão multiponto (conecta a 2 dispositivos ao mesmo tempo)'
    ]
  },
  {
    id: 'orion-smartwatch',
    name: 'Smartwatch Orion Gen 4',
    price: 1299.00,
    originalPrice: 1599.00,
    category: 'eletronicos',
    badge: 'PREMIUM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsQHbeN5HgtFgfUe6JgJelztQuJOycvQb0MwGXjAw7fkPRtQGIoMkiJcD3Okbm91NCSkhOHJEDwHBOllA9VxIs687fpabkWsXQwGdoxiC5chURF8hwbA2nTwGpqFaF4JOND1JeLmCYPyTsteBh5q2JShgeWxuI84DfkFxSpQhumwXlCn682c0WQayNtu-SPefRjLmMaosFB827fN67YmQSTN0y3Z49KRIF4X39ZY55CKiiQcW-mqCkcg',
    description: 'Relógio inteligente de alta tecnologia com tela AMOLED Retina curva e pulseira de silicone minimalista em tom terra. Monitoramento de saúde em tempo real com eletrocardiograma (ECG), oxímetro e mais de 100 modos esportivos. O equilíbrio perfeito entre alta costura e bio-sensores.',
    rating: 4.9,
    reviewsCount: 215,
    specifications: {
      'Tela': 'AMOLED Retina de 1.96 polegadas (Always-On)',
      'Sensores': 'Frequência Cardíaca, Oxigênio Sanguíneo (SpO2), Temperatura Corporal, ECG',
      'Resistência à Água': 'IP68 / 5 ATM (Apropriado para natação)',
      'GPS': 'Dual Band Integrado de alta precisão',
      'Bateria': 'Até 14 dias em uso típico'
    },
    features: [
      'Estrutura em liga de titânio leve e ultra resistente',
      'Chamadas via Bluetooth diretamente do pulso com supressão de eco',
      'Assistente de voz integrado de alta resposta',
      'Detecção de quedas e alertas de emergência inteligentes'
    ]
  },
  {
    id: 'minimalist-tea-set',
    name: 'Kit Chá Minimalista',
    price: 215.00,
    originalPrice: 280.00,
    category: 'casa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7KAwSlbRLI_yFtCOOrdxKeENm7-77rwGc5VVbZ3gK95DqVy5W8d_-lMcPA-TY8iXVkREYfEjXNyyedyN0DD8lL3dcJv261gT2K49kYrkLdvtu6Cld2mn9hMOoS4VcDnCbh5laB2fPhKdLquAiqY7FAErE7GR2ica8CFRFo7XvA9ahAnFy_ofiAznjRDM4ICNIDTkr6DSf7h_WCqln6kO9JR1c8Jmsijuiq5ZEMFNfRdQ-TYfEm7ITrw',
    description: 'Conjunto de chá de cerâmica com design contemporâneo e acabamento fosco em tom terracota suave. Inclui um bule sofisticado com infusor em aço inox e quatro xícaras organizadas em uma bandeja de bambu escuro. Traz a harmonia milenar do chá chinês para seu lar.',
    rating: 4.7,
    reviewsCount: 63,
    specifications: {
      'Material': 'Cerâmica de alta temperatura e bambu tratado',
      'Capacidade do Bule': '600 ml',
      'Capacidade das Xícaras': '80 ml (cada)',
      'Itens Inclusos': '1 Bule, 4 Xícaras, 1 Bandeja de Bambu',
      'Isolamento Térmico': 'Cerâmica de parede dupla para manter o calor'
    },
    features: [
      'Design premiado de fusão oriental contemporânea',
      'Textura tátil acetinada confortável de segurar',
      'Infusor interno de malha fina que extrai o sabor de folhas soltas perfeitamente',
      'Bandeja de bambu com ranhuras de contenção de respingos'
    ]
  },
  {
    id: 'kimono-linen-shirt',
    name: 'Camisa Linho Kimono',
    price: 189.90,
    originalPrice: 249.90,
    category: 'moda',
    badge: 'MINIMAL',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    description: 'Camisa masculina inspirada na modelagem tradicional oriental de gola kimono, confeccionada em blend nobre de linho e algodão respirável. Caimento solto e textura rica em cor areia crua. Um toque de sofisticação para o seu guarda-roupa contemporâneo.',
    rating: 4.6,
    reviewsCount: 42,
    specifications: {
      'Composição': '55% Linho Orgânico, 45% Algodão Egípcio',
      'Modelagem': 'Oversized Kimono Cut',
      'Cor': 'Areia Crua (Off-white Natural)',
      'Instruções de Lavagem': 'Lavagem manual ou em ciclo delicado',
      'Origem': 'Tecelagem artesanal em Suzhou'
    },
    features: [
      'Blend altamente respirável e anti-alérgico',
      'Gola estilizada sem botões para visual limpo e moderno',
      'Fendas laterais sutis para maior liberdade de movimento',
      'Costuras reforçadas com padrão tradicional de alfaiataria'
    ]
  },
  {
    id: 'silk-scarf-handpainted',
    name: 'Lenço de Seda Pintado à Mão',
    price: 320.00,
    originalPrice: 399.00,
    category: 'moda',
    badge: 'EXCLUSIVO',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600',
    description: 'Lenço de seda 100% amoreira, produzido na histórica província de Hangzhou. Pintura à mão exclusiva representando elementos sutis da flora tradicional chinesa. Um acessório luxuoso com brilho sedoso incomparável e suavidade extraordinária ao toque.',
    rating: 4.9,
    reviewsCount: 31,
    specifications: {
      'Material': '100% Seda de Amoreira (Grade 6A)',
      'Dimensões': '90 cm x 90 cm',
      'Método de Produção': 'Impressão ecológica e bainhas costuradas à mão',
      'Peso': 'Apenas 45g (Super leve e fluido)',
      'Estojo': 'Acompanha caixa premium de presente'
    },
    features: [
      'Padrão floral clássico revitalizado com cores contemporâneas',
      'Termorregulador natural - fresco no verão, aconchegante no inverno',
      'Peça colecionável assinada pelos mestres artesãos de Hangzhou',
      'Pode ser usado no pescoço, no cabelo ou como adorno de bolsa'
    ]
  },
  {
    id: 'smart-rice-cooker',
    name: 'Panela de Arroz Smart IH',
    price: 890.00,
    originalPrice: 1100.00,
    category: 'casa',
    badge: 'SMART',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600',
    description: 'Panela de arroz inteligente de última geração com aquecimento por indução eletromagnética (IH). Conecta-se via Wi-Fi ao app de receitas para ajustar a curva exata de temperatura de acordo com o tipo de grão escolhido. Design minimalista premiado que complementa cozinhas modernas.',
    rating: 4.8,
    reviewsCount: 74,
    specifications: {
      'Tecnologia de Aquecimento': 'Indução Eletromagnética IH 3D',
      'Conectividade': 'Wi-Fi 2.4Ghz com App Android/iOS',
      'Capacidade': '3 Litros (Até 8 porções)',
      'Material Interno': 'Pote de ferro fundido antiaderente pesado de 3mm',
      'Potência': '1130W'
    },
    features: [
      'Mais de 3000 curvas de cozimento de arroz catalogadas por código de barras',
      'Painel de controle LED de toque invisível quando desligado',
      'Válvula de pressão inovadora para um cozimento mais rápido e grãos soltos',
      'Mantenha aquecido por até 24 horas mantendo o frescor'
    ]
  },
  {
    id: 'incense-burner-waterfall',
    name: 'Queimador de Incenso Cascata',
    price: 145.00,
    category: 'casa',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600',
    description: 'Peça escultural de cerâmica negra esmaltada, que serve como queimador de incenso de refluxo. A fumaça escorre suavemente simulando uma cascata d\'água mística sobre rochas, criando um efeito zen perfeito para meditação, ioga e relaxamento em casa.',
    rating: 4.5,
    reviewsCount: 57,
    specifications: {
      'Material': 'Cerâmica vitrificada de argila roxa tradicional (Zisha)',
      'Dimensões': '20 cm x 11 cm x 10 cm',
      'Peso': '650g',
      'Tempo de Queima': 'Aproximadamente 12 minutos por cone',
      'Acessórios': 'Inclui kit com 20 cones de incenso sortidos'
    },
    features: [
      'Efeito visual hipnotizante de refluxo de fumaça',
      'Modelagem manual detalhada com acabamento de alta qualidade',
      'Propicia redução do estresse e purificação da atmosfera',
      'Fácil de limpar após a queima com água quente e pano úmido'
    ]
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'SINODIR10',
    discountType: 'percentage',
    value: 10,
    minSubtotal: 100
  },
  {
    code: 'BENVINDO50',
    discountType: 'fixed',
    value: 50,
    minSubtotal: 400
  },
  {
    code: 'CHINAPRIME',
    discountType: 'percentage',
    value: 15,
    minSubtotal: 300
  }
];
