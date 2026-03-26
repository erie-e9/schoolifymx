export type ServiceType = 'uniforms' | 'supplies' | 'didactic';

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
    subheadline: 'Diseñamos y confeccionamos el uniforme escolar, deportivo o de escolta con los colores y especificaciones para estudiantes y maestros de preescolar, primaria y secundaria. Simplificando tu proceso de compra para todo el ciclo.',
    bullets: [
      'Confección a la medida y reparaciones',
      'Telas duraderas y selectas',
      'Entrega directa en tu escuela o domicilio',
    ],
    image: 'https://www.unicef.org/honduras/sites/unicef.org.honduras/files/styles/hero_extended/public/WhatsApp%20Image%202023-06-08%20at%204.36.48%20PM_0.jpeg.webp?itok=VETTkvVL',
    whatsappMessage: 'Hola, me interesa el servicio de Uniformes Escolares.',
    trustEmojis: ['🧑‍🏫', '👩‍👧', '👨‍👩‍👦', '👩‍🎓', '🧑‍💼'],
    trustText: '+1,000 familias ya confían en nosotros',
    stats: [
      { value: 3, suffix: ' días', prefix: '<', label: 'Tiempo de elaboración', description: 'Promedio de confección por uniforme completo', emoji: '📦' },
      { value: 100, suffix: '%', prefix: '', label: 'Personalizado', description: 'Siguiendo manual de identidad', emoji: '🎨' },
      { value: 10, suffix: ' años', prefix: '+', label: 'Experiencia', description: 'En el sector textil escolar', emoji: '🧵' },
      { value: 10, suffix: ' mil', prefix: '+', label: 'Prendas', description: 'Entregadas con éxito', emoji: '👕' },
    ],
    ctaCarousel: [
      {
        image: 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1773894607/ChatGPT_Image_4_oct_2025_12_00_13_p.m_svkvlp.avif',
        title: 'Escuela Primaria Patria y Libertad',
        description: 'Confeccionamos el uniforme completo para estudiantes de la comunidad de Santiago Bayacora Dgo., cuidando cada detalle desde el jumper hasta los moños decorativos en diferentes tamaños para verse impecable.',
        type: 'Jumper, moños'
      },
      {
        image: 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1773889449/ChatGPT_Image_2_oct_2025_10_35_19_p.m_u5ss7h.avif',
        title: 'Jumper de niña para uniforme de gala',
        description: 'Con diseño específico a petición de un padre de familia se crea este jumper de niña para primaria. El estampado de la tela fue proporcionado por él y nosotros lo hicimos realidad.',
        type: 'Jumper, blusa, moños'
      },
      {
        image: 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1773894608/ChatGPT_Image_14_sept_2025_09_17_55_a.m_njkbgl.avif',
        title: 'Escuela Preescolar de San José de Bacis, Dgo',
        description: 'Uniforme completo para niños y niñas de la comunidad de San José de Bacis Dgo. Para los niños incluyó la elaboración de chaleco, camisa y pantalón mientras que para las niñas chaleco, camisa y falda. A cada niño y niña se le tomaron las medidas ya sea en persona o a distancia. Coordinamos con las madres fecha de entrega y envío.',
        type: 'Saco, camisa, pantalón y falda'
      },
      {
        image: 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1773894606/ChatGPT_Image_3_oct_2025_12_21_39_a.m_esaygu.avif',
        title: 'Jumper de niña para uniforme de gala',
        description: 'Se hace la solicitud de crear jumper de niña, camisa y moños para la escuela primaria. El diseño de la tela fue proporcionado vía mensaje y la entrega fue en persona en el centro de la ciudad de Durango, Dgo.',
        type: 'Jumper, blusa, moños'
      },
    ],
    faqs: [
      { q: '¿Cuánto tiempo tarda la confección?', a: 'El tiempo promedio es de 3 a 5 días hábiles. Para pedidos especiales o tallas muy específicas, te daremos una fecha exacta al momento de la toma de medidas.' },
      { q: '¿Qué pasa si la prenda no le queda bien al estudiante?', a: 'Contamos con garantía de ajuste. Si algo no queda perfecto, realizamos los ajustes necesarios sin costo adicional para que tu hijo esté cómodo.' },
      { q: '¿Realizan toma de medidas en la escuela?', a: 'Sí, agendamos días específicos con las instituciones aliadas para facilitar el proceso a los padres, o podemos recibirte en nuestros puntos de atención.' },
      { q: '¿Cómo sé qué talla elegir si compro en línea?', a: 'Para tu tranquilidad, contamos con nuestro <a href="#calculadora" class="text-primary hover:underline font-bold">Asistente de Tallas Virtual</a>, donde puedes ingresar las medidas exactas y calcular automáticamente tu talla recomendada.' },
      { q: '¿Cuánto dinero es necesario de anticipo por uniforme?', a: 'Contamos con un plan de apartados donde solo requieres un 20% de anticipo para asegurar tu pedido; el resto se liquida al recibir tus prendas. ¡El precio de este plan de apartado es exactamente el mismo que de contado!' },
      { q: '¿Tienen descuentos por volumen?', a: '¡Claro! A partir de 2 uniformes completos (ej. para hermanos) ofrecemos un descuento especial. Pregúntanos por WhatsApp.' },
      { q: '¿Dónde entregan los uniformes?', a: 'Realizamos entregas directamente en la escuela en fechas programadas o envío a domicilio.' },
      { q: '¿Tienen tallas extras o especiales?', a: 'Sí, confeccionamos tallas a medida exacta. Usa nuestro <a href="#calculadora" class="text-primary hover:underline font-bold">Asistente de Tallas Virtual</a> y especifica cualquier detalle adicional antes de enviarnos tu solicitud por WhatsApp.' },
    ],
  },
  supplies: {
    tag: 'Útiles',
    headline: 'Tu lista de útiles completa, en un solo lugar.',
    subheadline: 'Olvídate de las filas y el caos. Surtimos tu lista escolar completa con las mejores marcas y precios competitivos.',
    bullets: [
      'Ahorra tiempo y dinero en cada ciclo escolar',
      'Pregunta por nuestro plan de pagos',
      'Entrega directa y confiable en tu escuela o domicilio',
    ],
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=1200',
    whatsappMessage: 'Hola, me interesa el servicio de Útiles Escolares.',
    trustEmojis: ['✏️', '📓', '🎨', '🎒', '📏'],
    trustText: 'Surtimos más de 500 listas escolares cada año',
    stats: [
      { value: 10, suffix: '%', prefix: 'hasta ', label: 'Ahorro real', description: 'Comparado con papelerías locales', emoji: '📉' },
      { value: 5, suffix: ' horas', prefix: '~', label: 'Tiempo ganado', description: 'Por cada lista surtida', emoji: '⏰' },
      { value: 50, suffix: '+', prefix: '', label: 'Marcas', description: 'Líderes en el mercado escolar', emoji: '📐' },
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
      { q: '¿Qué pasa si un artículo está agotado?', a: 'Te entregamos el resto de la lista y te avisamos en cuanto el artículo faltante llegue, entregándolo en alguna de las sucursales o envío sin costo (según el caso).' },
      { q: '¿Tienen opciones de pago flexibles?', a: 'Contamos con un Plan de Apartado para que vayas pagando tu lista poco a poco antes del inicio de clases.' },
      { q: '¿Emiten factura fiscal?', a: 'Aún estamos en este proceso, pronto emitiremos facturas electrónicas de inmediato. Solo solicita tu comprobante al momento de realizar tu pedido vía WhatsApp.' },
      { q: '¿Cuánto tiempo tarda la entrega?', a: 'Cualquiera de los servicios se realiza con tiempo de anticipación y se entregan en 7 días antes de la fecha designada por la escuela. Los uniformes a medida tienen un tiempo de producción de 5–7 días hábiles dependiendo de la complejidad.' },
      { q: '¿Dónde realizan las entregas?', a: 'Nos estamos abriendo paso en el norte de México, esperando algún día alcanzar toda el Área Metropolitana. También tenemos días de "Entrega Gratuita" directamente en instituciones participantes.' },
      { q: '¿Pueden entregar los útiles ya etiquetados?', a: '¡Próximamente! Pronto ofreceremos el servicio de etiquetado personalizado para que cada lápiz, cuaderno y color lleve el nombre del estudiante.' },
      { q: '¿Surten material de arte o especializado para talleres?', a: 'Por supuesto, contamos con alianzas con los principales proveedores de arte, dibujo técnico y talleres. Solo sube tu foto a nuestro <a href="#escaner" class="text-primary hover:underline font-bold">Escáner de Lista Smart</a> y nosotros nos encargamos.' },
    ],
  },
  didactic: {
    tag: 'Material Didáctico',
    headline: 'Material didáctico listo para el aprendizaje.',
    subheadline: 'Libros, cuadernos forrados y etiquetas personalizadas. Todo lo que tus hijos necesitan para empezar con el pie derecho.',
    bullets: [
      'Forrado y etiquetado profesional incluido',
      'Materiales específicos por grado y escuela',
      'Organización total para el ciclo escolar',
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    whatsappMessage: 'Hola, me interesa el servicio de Material Didáctico.',
    trustEmojis: ['📚', '🧩', '🧪', '🌍', '♟️'],
    trustText: 'Próximamente: Material personalizado para cada grado',
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
