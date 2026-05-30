export type ServiceType = 'uniforms' | 'supplies' | 'didactic';

// Supply item categories
export type SupplyCategory =
  | 'escritura'
  | 'libretas'
  | 'manualidades'
  | 'archivo'
  | 'oficina'
  | 'geometria'
  | 'papel'
  | 'corte'
  | 'pintura'
  | 'didactico'
  | 'otros';

export interface SupplyItem {
  id: string;
  name: string;
  category: SupplyCategory;
}

export interface SelectedItem {
  qty: number;
  note: string;
  name?: string;
}

export interface ScannedItem {
  id: string;
  name: string;
  note: string;
  selected: boolean;
}

export type ScannedSectionItem = ScannedItem;

export interface ServiceStat {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  description: string;
  emoji: string;
}

export interface CarouselItem {
  image: string;
  title: string;
  description: string;
  type?: string;
  code?: string;
  tags?: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ServiceContent {
  tag: string;
  headline: string;
  subheadline: string;
  bullets: string[];
  image: string;
  whatsappMessage: string;
  trustEmojis: string[];
  trustText: string;
  stats: ServiceStat[];
  ctaCarousel: CarouselItem[];
  faqs: FAQItem[];
}

const RAW_WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '+521000000000';
// Limpiar el número para el link de WhatsApp (solo dígitos)
const CLEAN_WHATSAPP_NUMBER = RAW_WHATSAPP_NUMBER.replace(/\D/g, '');
const WHATSAPP_BASE_URL = `https://api.whatsapp.com/send/?phone=${CLEAN_WHATSAPP_NUMBER}&text=`;

export const getWhatsappLink = (message: string) => WHATSAPP_BASE_URL + encodeURIComponent(message);

export const SERVICES_CONTENT: Record<ServiceType, ServiceContent> = {
  uniforms: {
    tag: 'Uniformes',
    headline: 'Uniformes a la medida, sin complicaciones.',
    subheadline: 'Uniforme escolar, deportivo o de escolta con los colores y especificaciones para estudiantes y maestros de cualquier escuela. Simplificando tu proceso de compra durante todo el ciclo.',
    bullets: [
      'Personalización total según manual de identidad',
      'Plan de pagos flexibles (Apartado)',
      'Garantía de ajuste sin costo adicional',
    ],
    image: 'https://www.unicef.org/honduras/sites/unicef.org.honduras/files/styles/hero_extended/public/WhatsApp%20Image%202023-06-08%20at%204.36.48%20PM_0.jpeg.webp?itok=VETTkvVL',
    whatsappMessage: '¡Hola Schoolify! 👋, me interesa el servicio de Uniformes Escolares.',
    trustEmojis: ['🧑‍🏫', '👩‍👧', '👨‍👩‍👦', '👩‍🎓', '🧑‍💼'],
    trustText: '+500 familias ya confían en nosotros',
    stats: [
      { value: 3, suffix: ' días', prefix: '<', label: 'Tiempo de elaboración', description: 'Promedio de confección por uniforme completo', emoji: '📦' },
      { value: 100, suffix: '%', prefix: '', label: 'Personalizado', description: 'Siguiendo manual de identidad', emoji: '🎨' },
      { value: 10, suffix: ' años', prefix: '+', label: 'Experiencia', description: 'En el sector textil escolar', emoji: '🧵' },
      { value: 5, suffix: ' mil', prefix: '+', label: 'Prendas', description: 'Entregadas con éxito', emoji: '👕' },
    ],
    ctaCarousel: [
      {
        code: 'CUJM006',
        image: 'https://res.cloudinary.com/dqqh49kon/image/upload/q_auto/f_auto/v1780102777/CUJM006_awysk8.avif',
        title: 'Jumper de gala con moños artesanales',
        description: 'Pieza de gala confeccionada en tela verde y amarillo institucional. Cada moño — desde el del cabello hasta los del jumper — elaborado a mano en distintos tamaños para lograr una presentación impecable en eventos escolares y actos cívicos.',
        type: 'Jumper, moños',
        tags: ['Primaria: Patria y Libertad', 'Colegio Alemán Von Glümer', 'Primaria: Bosques del Valle']
      },
      {
        code: 'CUJM004',
        image: 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1773889449/ChatGPT_Image_2_oct_2025_10_35_19_p.m_u5ss7h.avif',
        title: 'Jumper personalizado por petición',
        description: 'Estampado elegido para el uniforme de gala. Con esta tela como punto de partida, se diseña el patrón, toma de medidas y confección el jumper, la blusa y los moños coordinados.',
        type: 'Jumper, blusa, moños',
      },
      {
        code: 'CU001-H',
        image: 'https://res.cloudinary.com/dqqh49kon/image/upload/q_auto/f_auto/v1780102703/CU001-H_u7qypy.avif',
        title: 'Uniforme completo para niño — diseño especial',
        description: 'Uniforme masculino de preescolar con inspiración oriental: camisa de cuello, chaleco cruzado y pantalón confeccionados en telas combinadas. Cada pieza respeta el manual de identidad de la institución y las medidas exactas indicadas por la familia.',
        type: 'Chaleco, camisa, pantalón',
        tags: ['Jardín de niños: San José de Bacis']
      },
      {
        code: 'CU001-M',
        image: 'https://res.cloudinary.com/dqqh49kon/image/upload/q_auto/f_auto/v1780102717/CU001-M_ha3fdf.avif',
        title: 'Uniforme completo para niña — diseño especial',
        description: 'Versión femenina del uniforme con inspiración oriental de diseño especial para jardín de niños. Falda, chaleco y camisa elaborados con texturas distintas para dar profundidad visual. El corte oriental y las costuras artesanales reflejan la identidad única de la institución.',
        type: 'Chaleco, camisa, falda',
        tags: ['Jardín de niños: San José de Bacis']
      },
      {
        code: 'CUJM001',
        image: 'https://res.cloudinary.com/dqqh49kon/image/upload/q_auto/f_auto/v1780102777/CUJM001_jvb7mr.avif',
        title: 'Uniforme de gala en azules institucionales',
        description: 'Jumper en degradado azul marino y cielo, acompañado de moños elaborados en distintos formatos. Un conjunto que honra los colores del jardín de niños con acabados cuidados en cada ceremonia escolar.',
        type: 'Jumper, blusa, moños',
        tags: ['Preescolar: Profa. Trinidad Galvan Rivas', 'Primaria: Fernando Montes de Oca']
      },
      {
        code: 'CUJM002',
        image: 'https://res.cloudinary.com/dqqh49kon/image/upload/q_auto/f_auto/v1780102747/CUJM002_xmmxk3.avif',
        title: 'Blusa, falda y moños en tonos escarlata',
        description: 'Conjunto de gala en tela roja con contrastes blancos. Incluye falda plisada, blusa de cuello con acabados y moños artesanales alineados a la paleta oficial de la escuela. Cada pieza cosida para garantizar simetría y durabilidad lavado tras lavado.',
        type: 'Jumper, blusa, moños',
        tags: ['Primaria: Emancipación Proletaria']
      },
      {
        code: 'M001',
        image: 'https://res.cloudinary.com/dqqh49kon/image/upload/q_auto/f_auto/v1780102758/M001_nilkpa.avif',
        title: 'Mandil escolar con detalles institucionales',
        description: 'Mandil infantil en tela resistente y fácil de lavar. Cuenta con bolsillos funcionales y aplicaciones en los colores del plantel. Pensado para proteger el uniforme durante clases de arte, cocina o talleres, sin sacrificar estilo ni comodidad.',
        type: 'Mandil',
      },
      {
        code: 'CUJM003',
        image: 'https://res.cloudinary.com/dqqh49kon/image/upload/q_auto/f_auto/v1780102697/CUJM003_t0tebc.avif',
        title: 'Jumper de gala negro con detalles rojo profundo',
        description: 'Conjunto de gala en tela negra mate con remates en rojo escarlata que aportan carácter y elegancia. Los moños en distintos tamaños se confeccionaron para complementar el jumper y resaltar en ceremonias, actos cívicos y festivales escolares.',
        type: 'Jumper, blusa, moños',
        tags: ['Primaria: Héroes de México', 'Primaria: Enrique W. Sánchez', 'Preescolar: Francisco I. Madero']
      },
      {
        code: 'CUJM004',
        image: 'https://res.cloudinary.com/dqqh49kon/image/upload/q_auto/f_auto/v1780102731/CUJM004_rknsap.avif',
        title: 'Variante de gala — jumper negro y rojo bicolor',
        description: 'Cnjunto rojo y negro, con diferente distribución de pliegues y acabados en el ruedo. Prendas únicas adaptadas al gusto de cada familia.',
        type: 'Jumper, blusa, moños',
      },
    ],
    faqs: [
      { q: '¿Cuánto tiempo tarda la confección?', a: 'El tiempo promedio es de 3 a 5 días hábiles. Para pedidos especiales o tallas muy específicas, te daremos una fecha exacta al momento de la toma de medidas.' },
      { q: '¿Qué pasa si la prenda no le queda bien al estudiante?', a: 'Contamos con garantía de ajuste. Si algo no queda perfecto, realizamos los ajustes necesarios sin costo adicional para que tu hijo esté cómodo.' },
      { q: '¿Realizan toma de medidas en la escuela?', a: 'Sí, agendamos días específicos con las instituciones aliadas para facilitar el proceso a los padres, o podemos recibirte en nuestros puntos de atención.' },
      { q: '¿Cómo sé qué talla elegir si compro en línea?', a: 'Para tu tranquilidad, contamos con nuestro <a href="#calculadora" class="text-primary hover:underline font-bold">Asistente de Tallas</a>, donde puedes ingresar las medidas exactas y calcular automáticamente tu talla recomendada.' },
      { q: '¿Cuánto dinero es necesario de anticipo por uniforme?', a: 'Contamos con un plan de pago a cuotas donde solo requieres un 20% de anticipo para asegurar tu pedido; el resto se liquida al recibir tus prendas. ¡El precio de este plan de apartado es exactamente el mismo que de contado!' },
      { q: 'En caso de requerirlo ¿Hay devolución del anticipo?', a: '¡Sí!, después de dar tu primer abono tienes 5 días hábiles para solicitar tu dinero, seguro y sin contratiempos.' },
      { q: '¿Tienen descuentos por volumen?', a: '¡Claro! A partir de 2 uniformes completos (ej. para hermanos) ofrecemos un descuento especial. Pregúntanos por WhatsApp.' },
      { q: '¿Dónde entregan los uniformes?', a: 'Realizamos entregas directamente en la escuela en fechas programadas o envío a domicilio.' },
      { q: '¿Tienen tallas extras o especiales?', a: 'Sí, confeccionamos tallas a medida exacta. Usa nuestro <a href="#calculadora" class="text-primary hover:underline font-bold">Asistente de Tallas</a> y especifica cualquier detalle adicional antes de enviarnos tu solicitud por WhatsApp.' },
    ],
  },
  supplies: {
    tag: 'Útiles',
    headline: 'Tu lista de útiles completa, en un solo lugar.',
    subheadline: 'Olvídate de las filas y el caos. Surtimos tu lista escolar completa con las mejores marcas y precios competitivos.',
    bullets: [
      'Para alumnos y maestros',
      'Pregunta por nuestro plan de pagos',
      'Entrega directa y confiable en tu escuela o domicilio',
      'Sin artículos viejos o maltratados',
    ],
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=1200',
    whatsappMessage: '¡Hola Schoolify! 👋, me interesa el servicio de Útiles Escolares.',
    trustEmojis: ['✏️', '📓', '🎨', '🎒', '📏'],
    trustText: 'Surtimos más de 500 listas escolares cada año',
    stats: [
      { value: 10, suffix: '%', prefix: 'hasta ', label: 'Ahorro real', description: 'Comparado con papelerías y tiendas locales', emoji: '📉' },
      { value: 5, suffix: ' horas', prefix: '~', label: 'Tiempo ahorrado', description: 'Por cada lista surtida', emoji: '⏰' },
      { value: 50, suffix: '+', prefix: '', label: 'Marcas', description: 'Reconocidas en el mercado escolar', emoji: '📐' },
      { value: 0, suffix: ' estrés', prefix: '', label: 'Sin filas', description: 'Todo llega a tiempo', emoji: '😌' },
    ],
    ctaCarousel: [
      {
        image: 'https://agn.gt/wp-content/uploads/2026/01/WhatsApp-Image-2023-02-28-at-7.03.48-PM-e1677691286845-750x375.jpeg',
        title: 'Surtido ordenado y completo para cada estudiante',
        description: 'Nos encargamos de localizar cada artículo de tu lista, desde las marcas más comerciales hasta las más especializadas, para que no tengas que visitar múltiples papelerías buscando un solo producto.',
      },
      {
        image: 'https://i1.wp.com/tv4noticias.com/wp-content/uploads/2025/08/Maria-Gomez.png?w=1024&ssl=1',
        title: 'Entrega personal en escuelas o domicilio',
        description: 'Recibe tus útiles listos para usar. Ofrecemos etiquetas personalizadas de alta adherencia para que cada lápiz, cuaderno y regla regrese a casa, ahorrándote horas de trabajo manual.',
      },
      {
        image: 'https://yucatan.quadratin.com.mx/www/wp-content/uploads/2023/07/utiles-escolares.jpg',
        title: 'Marcas con presencia en el mercado estudiantil',
        description: 'Trabajamos con proveedores líderes como Prismacolor, Dixon y Scribe. Seleccionamos productos que no solo cumplen con la lista, sino que potencian la creatividad y el desempeño de cada estudiante.',
      },
    ],
    faqs: [
      { q: '¿Cómo funciona el servicio?', a: 'Es muy fácil: nos contactas por WhatsApp, nos compartes la lista escolar en imagen o PDF. Nosotros te responderemos con la cotización completa.' },
      { q: '¿Garantizan las marcas exactas solicitadas?', a: 'Sí, respetamos estrictamente las marcas solicitadas por los maestros. Si alguna no tiene stock, te consultamos antes de ofrecer un sustituto de calidad igual o superior.' },
      { q: '¿Cuentan con garantía si llega algún artículo en mal estado o faltante?', a: 'Entregamos el paquete escolar y lo revisamos frente a ti o el maestro, si algo falta o está en mal estado lo reponemos.' },
      { q: '¿Qué pasa si un artículo está agotado?', a: 'Te entregamos el resto de la lista y te avisamos en cuanto el artículo faltante llegue, entregándolo en alguna de las sucursales o envío sin costo (según el caso).' },
      { q: '¿Tienen opciones de pago flexibles?', a: 'Contamos con un Plan de Apartado para que vayas pagando tu lista poco a poco antes del inicio de clases.' },
      { q: 'En caso de requerirlo ¿Hay devolución del anticipo?', a: '¡Sí!, después de dar tu primer abono tienes 5 días hábiles para solicitar tu dinero, seguro y sin contratiempos.' },
      { q: '¿Emiten factura fiscal?', a: 'Aún estamos en este proceso, pronto emitiremos facturas electrónicas de inmediato. Solo solicita tu comprobante al momento de realizar tu pedido vía WhatsApp.' },
      { q: '¿Cuánto tiempo tarda la entrega?', a: 'Cualquiera de los servicios se realiza con tiempo de anticipación y se entregan en 7 días antes de la fecha designada por la escuela.' },
      { q: '¿Dónde realizan las entregas?', a: 'Nos estamos abriendo paso en el norte de México, esperando algún día alcanzar toda el Área Metropolitana. Directamente en instituciones participantes o en un punto estratégico.' },
      { q: '¿Pueden entregar los útiles ya etiquetados?', a: '¡Próximamente! Pronto ofreceremos el servicio de etiquetado personalizado para que cada lápiz, cuaderno y color lleve el nombre del estudiante.' },
      { q: '¿Surten material de arte o especializado para talleres?', a: 'Por supuesto, contamos con alianzas con los principales proveedores de arte, dibujo técnico y talleres. Solo sube tu foto a nuestro <a href="#escaner" class="text-primary hover:underline font-bold">Escáner de Lista Smart</a> y nosotros nos encargamos.' },
    ],
  },
  didactic: {
    tag: 'Próximamente',
    headline: 'Trabajando en nuevas ideas para ayudarte',
    subheadline: 'Acompañamiento durante todo el ciclo escolar. Personalización, temáticas, decoración y más dentro del aula y para eventos.',
    bullets: [
      // 'Forrado y etiquetado profesional incluido',
      // 'Materiales específicos por grado y escuela',
      // 'Organización total para el ciclo escolar',
      'Confección venta y renta de elementos textiles por temporadas o específicos que cubran necesidades en las instituciones.',
      'Renta y venta de equipo electronicos para uso/eventos internos.',
      'Venta de calzado escolar y deportivo.',
      'Servicios de personalización en útiles escolares por alumno (etiquetado y forrado).',
      'Venta y preventa de artículos de mercería.',
      'Servicio de personalización textil: Bordado, serigrafía y estampado.',
      'Productos complementarios para estudiantes y escuelas.',
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    whatsappMessage: '¡Hola Schoolify! 👋, me interesa saber sobre sus próximos servicios.',
    trustEmojis: ['📚', '🧩', '🧪', '🌍', '♟️'],
    trustText: 'Nuevos servicios para mejorar tu experiencia escolar',
    stats: [
      { value: 98, suffix: '%', prefix: '', label: 'Recomendación', description: 'Docentes aman nuestro material', emoji: '👩‍🏫' },
      { value: 5, suffix: ' días', prefix: '<', label: 'Preparación', description: 'Para eventos especiales', emoji: '⚡' },
      { value: 200, suffix: '+', prefix: '', label: 'Diseños', description: 'De etiquetas y materiales', emoji: '🖼️' },
      { value: 12, suffix: ' meses', prefix: '', label: 'Innovación', description: 'Actualizando contenidos', emoji: '🚀' },
    ],
    ctaCarousel: [
      {
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
        title: 'Protección con Forrado Profesional',
        description: 'Tus libros y cuadernos merecen durar todo el año. Utilizamos plásticos y vinilos de calibre industrial que protegen contra derrames y el desgaste diario, manteniendo los materiales como nuevos.',
      },
      {
        image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=800',
        title: 'Kits Adaptados por Grado y Nivel',
        description: 'Entendemos que cada nivel educativo tiene necesidades distintas. Desarrollamos paquetes específicos que incluyen exactamente lo que los docentes solicitan para cada etapa del desarrollo académico.',
      },
      {
        image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=800',
        title: 'Ambientes Temáticos y Creativos',
        description: 'Más que materiales, entregamos experiencias. Diseñamos sets de decoración y kits para eventos escolares que transforman el aula en un espacio de inspiración y aprendizaje dinámico.',
      },
    ],
    faqs: [
      { q: '¿Qué incluye el kit de material didáctico?', a: 'Incluye los libros del grado, cuadernos forrados en los colores solicitados y un set de etiquetas personalizadas resistentes al agua.' },
      { q: '¿El forrado y etiquetado tiene costo extra?', a: '¡No! Ya viene incluido en el paquete de Material Didáctico. Te entregamos todo listo para que el estudiante solo lo guarde en su mochila.' },
      { q: '¿Pueden personalizar las etiquetas con personajes?', a: 'Sí, tenemos un catálogo de diseños y personajes para que los niños se sientan motivados con sus útiles.' },
      { q: '¿Trabajan con libros de cualquier editorial?', a: 'Trabajamos con las editoriales más comunes en México. Al enviarnos tu lista, validamos la disponibilidad de cada título.' },
      { q: '¿Hacen entregas grupales para todo un salón?', a: 'Sí, ofrecemos beneficios especiales a las mesas directivas o grupos de padres que se organizan para surtir todo el salón con nosotros.' },
      { q: '¿Tienen opciones ecológicas en libretas?', a: 'Ofrecemos forros biodegradables y libretas de papel reciclado bajo pedido especial. Puedes consultarnos vía WhatsApp al cotizar tu paquete.' },
      { q: '¿Cómo envían el material para no maltratarlo?', a: 'Utilizamos cajas de cartón reforzado y material de embalaje protector para que todo llegue en perfectas condiciones, directo hasta la puerta de tu casa o escuela.' },
    ],
  },
};
