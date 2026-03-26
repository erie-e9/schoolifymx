import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import {
  X,
  Backpack,
  Plus,
  Minus,
  Search,
  Notebook as NotebookIcon,
  PenTool,
  Palette,
  Ruler,
  Scissors,
  Star,
  Archive,
  Briefcase,
  FileText,
  Shapes,
  Paintbrush,
  Check,
  StickyNote,
} from 'lucide-react';
import WhatsApp from '../assets/whatsapp.svg?react';
import { getWhatsappLink } from '../types';

interface BackpackSimProps {
  isOpen: boolean;
  onClose: () => void;
  scannedItems?: { id: string; name: string; selected: boolean; note: string }[];
}

interface SupplyItem {
  id: string;
  name: string;
  category: string;
}

const CATEGORIES = [
  { id: 'all', name: 'Todos', icon: <Star className="w-3.5 h-3.5" /> },
  { id: 'escritura', name: 'Escritura', icon: <PenTool className="w-3.5 h-3.5" /> },
  { id: 'libretas', name: 'Libretas', icon: <NotebookIcon className="w-3.5 h-3.5" /> },
  { id: 'manualidades', name: 'Manualidades', icon: <Palette className="w-3.5 h-3.5" /> },
  { id: 'archivo', name: 'Archivo', icon: <Archive className="w-3.5 h-3.5" /> },
  { id: 'oficina', name: 'Oficina', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'geometria', name: 'Geometría', icon: <Ruler className="w-3.5 h-3.5" /> },
  { id: 'corte', name: 'Corte', icon: <Scissors className="w-3.5 h-3.5" /> },
  { id: 'papel', name: 'Papel', icon: <FileText className="w-3.5 h-3.5" /> },
  { id: 'pintura', name: 'Pinturas', icon: <Paintbrush className="w-3.5 h-3.5" /> },
  { id: 'didactico', name: 'Didáctico', icon: <Shapes className="w-3.5 h-3.5" /> },
  { id: 'otros', name: 'Otros', icon: <Backpack className="w-3.5 h-3.5" /> },
];

const ITEMS: SupplyItem[] = [
  // Escritura
  { id: 'lapiz-grafito', name: 'Lápiz de Grafito', category: 'escritura' },
  { id: 'lapiceras', name: 'Lapiceras', category: 'escritura' },
  { id: 'lapices-colores', name: 'Lápices de Colores', category: 'escritura' },
  { id: 'marcatextos', name: 'Marcatextos', category: 'escritura' },
  { id: 'plumas-color', name: 'Plumas de Color', category: 'escritura' },
  { id: 'plumines', name: 'Plumines', category: 'escritura' },
  { id: 'lapiz-bicolor', name: 'Lápiz Bicolor', category: 'escritura' },
  { id: 'lapiz-duo', name: 'Lápiz Dúo', category: 'escritura' },
  { id: 'lapiz-entrenador', name: 'Lápiz Entrenador', category: 'escritura' },
  { id: 'lettering', name: 'Lettering', category: 'escritura' },
  { id: 'marcadores-cera', name: 'Marcadores de Cera', category: 'escritura' },

  // Libretas
  { id: 'cuadernos-pro', name: 'Cuadernos Profesionales', category: 'libretas' },
  { id: 'cuadernos-forma-italiana', name: 'Cuadernos Forma Italiana', category: 'libretas' },
  { id: 'cuadernos-forma-francesa', name: 'Cuadernos Forma Francesa', category: 'libretas' },
  { id: 'carpeta-espiral', name: 'Carpeta con Espiral', category: 'libretas' },

  // Manualidades
  { id: 'acuarelas', name: 'Acuarelas', category: 'manualidades' },
  { id: 'barras-silicon', name: 'Barras de Silicón', category: 'manualidades' },
  { id: 'bata-mandil', name: 'Bata y Mandil Infantil', category: 'manualidades' },
  { id: 'limpiapipas', name: 'Limpiapipas', category: 'manualidades' },
  { id: 'micro-pinzas', name: 'Micro Pinzas de Madera', category: 'manualidades' },
  { id: 'moldes-estiletes', name: 'Moldes y Estiletes', category: 'manualidades' },
  { id: 'ojos-moviles', name: 'Ojos Móviles', category: 'manualidades' },
  { id: 'cascabeles', name: 'Cascabeles', category: 'manualidades' },
  { id: 'palitos-madera', name: 'Palitos de Madera', category: 'manualidades' },
  { id: 'pasta-modelar', name: 'Pasta para Modelar', category: 'manualidades' },
  { id: 'perlas', name: 'Perlas', category: 'manualidades' },
  { id: 'piedras-adhesivo', name: 'Piedras con Adhesivo', category: 'manualidades' },
  { id: 'pistola-silicon', name: 'Pistola para Silicón', category: 'manualidades' },
  { id: 'pom-pom', name: 'Pom Pom', category: 'manualidades' },
  { id: 'diamantina', name: 'Diamantina', category: 'manualidades' },
  { id: 'foamy', name: 'Foamy', category: 'manualidades' },
  { id: 'foamy-moldeable', name: 'Foamy Moldeable', category: 'manualidades' },
  { id: 'stickers-foamy', name: 'Stickers de Foamy', category: 'manualidades' },
  { id: 'estrellas-autoadheribles', name: 'Estrellas Autoadheribles', category: 'manualidades' },

  // Archivo
  { id: 'archifuelles', name: 'Archifuelles', category: 'archivo' },
  { id: 'broches-archivo', name: 'Broches para Archivo', category: 'archivo' },
  { id: 'broches-latonados', name: 'Broches Latonados', category: 'archivo' },
  { id: 'broches-gafetes', name: 'Broches para Gafetes', category: 'archivo' },
  { id: 'bolsas-organizacion', name: 'Bolsas de Organización', category: 'archivo' },
  { id: 'folder-plastico', name: 'Fólderes de Plástico', category: 'archivo' },
  { id: 'sobre-plastico', name: 'Sobres Plásticos', category: 'archivo' },
  { id: 'tabla-clip', name: 'Tablas con Clip', category: 'archivo' },
  { id: 'protectores-hojas', name: 'Protectores de Hojas', category: 'archivo' },

  // Oficina
  { id: 'aplicador-cinta', name: 'Aplicador de Cinta', category: 'oficina' },
  { id: 'cajas-dinero', name: 'Cajas Metálicas para Dinero', category: 'oficina' },
  { id: 'cinta-velcro', name: 'Cinta Velcro', category: 'oficina' },
  { id: 'cinta-decorativa', name: 'Cinta Decorativa', category: 'oficina' },
  { id: 'cojines-sello', name: 'Cojines para Sello', category: 'oficina' },
  { id: 'contador-manual', name: 'Contador Manual', category: 'oficina' },
  { id: 'desengrapadores', name: 'Desengrapadores', category: 'oficina' },
  { id: 'despachador-cinta', name: 'Despachador de Cinta', category: 'oficina' },
  { id: 'engrapadora-pinza', name: 'Engrapadora de Pinza', category: 'oficina' },
  { id: 'engrapadora-media', name: 'Engrapadora Media Tira', category: 'oficina' },
  { id: 'engrapadora-completa', name: 'Engrapadora Tira Completa', category: 'oficina' },
  { id: 'etiquetadora', name: 'Etiquetadora y Etiquetas', category: 'oficina' },
  { id: 'grapas', name: 'Grapas', category: 'oficina' },
  { id: 'guillotinas', name: 'Guillotinas', category: 'oficina' },
  { id: 'sellos', name: 'Sellos', category: 'oficina' },
  { id: 'sujetapapeles', name: 'Sujetapapeles', category: 'oficina' },
  { id: 'tinta-sello', name: 'Tinta para Cojines', category: 'oficina' },

  // Geometria
  { id: 'compases', name: 'Compases', category: 'geometria' },
  { id: 'escalimetros', name: 'Escalímetros', category: 'geometria' },
  { id: 'escuadras', name: 'Escuadras', category: 'geometria' },
  { id: 'juego-geometria', name: 'Juego de Geometría', category: 'geometria' },
  { id: 'reglas', name: 'Reglas', category: 'geometria' },
  { id: 'transportadores', name: 'Transportadores', category: 'geometria' },
  { id: 'geoplano', name: 'Geoplano', category: 'geometria' },

  // Papel
  { id: 'papel-construccion', name: 'Block Papel Construcción', category: 'papel' },
  { id: 'papel-brillante', name: 'Papel Brillante/Fluorescente', category: 'papel' },
  { id: 'papel-crepe', name: 'Papel Crepé', category: 'papel' },
  { id: 'papel-contacto', name: 'Papel Contacto', category: 'papel' },
  { id: 'pelicula-autoadherible', name: 'Película Autoadherible', category: 'papel' },

  // Corte
  { id: 'alicates', name: 'Alicates', category: 'corte' },
  { id: 'cutters', name: 'Cutters y Escariador', category: 'corte' },
  { id: 'redondeadora', name: 'Redondeadora de Esquinas', category: 'corte' },
  { id: 'tapete-corte', name: 'Tapete para Corte', category: 'corte' },
  { id: 'tijeras-escolares', name: 'Tijeras Escolares', category: 'corte' },
  { id: 'tijeras-multiusos', name: 'Tijeras Multiusos', category: 'corte' },
  { id: 'tijeras-estilista', name: 'Tijeras de Estilista', category: 'corte' },
  { id: 'tijeras-grekas', name: 'Tijeras Grekas', category: 'corte' },
  { id: 'tijeras-industrial', name: 'Tijeras Industrial', category: 'corte' },
  { id: 'tijeras-textil', name: 'Tijeras Textilera', category: 'corte' },
  { id: 'tijeras-cocina', name: 'Tijeras para Cocina', category: 'corte' },

  // Didactico
  { id: 'barajas', name: 'Barajas', category: 'didactico' },
  { id: 'dados', name: 'Dados', category: 'didactico' },
  { id: 'flautas', name: 'Flautas', category: 'didactico' },
  { id: 'globos-terraqueos', name: 'Globos Terráqueos', category: 'didactico' },
  { id: 'lupas', name: 'Lupas', category: 'didactico' },

  // Pintura
  { id: 'pinceles', name: 'Pinceles', category: 'pintura' },
  { id: 'pintura-acrilica', name: 'Pintura Acrílica', category: 'pintura' },
  { id: 'godetes', name: 'Godetes', category: 'pintura' },
  { id: 'pizarrones', name: 'Pizarrones', category: 'pintura' },
  { id: 'esponjas-pintar', name: 'Esponjas para Pintar', category: 'pintura' },

  // Otros
  { id: 'gomas', name: 'Gomas', category: 'otros' },
  { id: 'sacapuntas', name: 'Sacapuntas', category: 'otros' },
  { id: 'pegamento-blanco', name: 'Pegamento Blanco', category: 'otros' },
  { id: 'lapiz-adhesivo', name: 'Lápiz Adhesivo', category: 'otros' },
  { id: 'silicon-liquido', name: 'Silicón Líquido', category: 'otros' },
  { id: 'micas-termicas', name: 'Micas Térmicas', category: 'otros' },
  { id: 'calculadoras', name: 'Calculadoras', category: 'otros' },
  { id: 'perforadoras-figuras', name: 'Perforadoras de Figuras', category: 'otros' },
  { id: 'perforadora-dos-orificios', name: 'Perforadora 2 Orificios', category: 'otros' },
  { id: 'perforadora-tres-orificios', name: 'Perforadora 3 Orificios', category: 'otros' },
  { id: 'correctores', name: 'Correctores', category: 'otros' },
  { id: 'clips', name: 'Clips', category: 'otros' },
  { id: 'clips-mariposa', name: 'Clips Mariposa', category: 'otros' },
  { id: 'chinches-pines', name: 'Chinches y Pines', category: 'otros' },
];

const BackpackSim: React.FC<BackpackSimProps> = ({ isOpen, onClose, scannedItems = [] }) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, { qty: number; note: string }>>({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [noteOpenId, setNoteOpenId] = useState<string | null>(null);
  const [scannedSection, setScannedSection] = useState<{ id: string; name: string; note: string; selected: boolean }[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const catScrollRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    return ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalItemCount = useMemo(() => {
    return Object.values(selectedItems).reduce((acc, item) => acc + item.qty, 0);
  }, [selectedItems]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (scannedItems.length > 0) {
        setScannedSection(scannedItems);
      }
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, duration: 0.25 })
        .fromTo(modalRef.current,
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' },
          '-=0.15'
        );
    } else {
      document.body.style.overflow = 'unset';
      setSelectedItems({});
      setIsCompleted(false);
      setSearchQuery('');
      setActiveCategory('all');
      setNoteOpenId(null);
      setScannedSection([]);
    }
  }, [isOpen, scannedItems]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.96, duration: 0.35, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.25 }, '-=0.15');
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedItems(prev => {
      const current = prev[id]?.qty || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: { qty: next, note: prev[id]?.note || '' }
      };
    });
  };

  const updateNote = (id: string, note: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: { ...prev[id], note }
    }));
  };

  const finalize = () => {
    setIsCompleted(true);
    setTimeout(() => {
      gsap.from('.complete-check', { scale: 0, rotation: -45, duration: 0.5, ease: 'back.out(2)' });
    }, 50);
  };

  if (!isOpen) return null;

  const getWhatsAppMsg = () => {
    const list = Object.entries(selectedItems)
      .map(([id, info]) => {
        const item = ITEMS.find(i => i.id === id);
        return `• ${info.qty}x ${item?.name}${info.note ? ` (${info.note})` : ''}`;
      })
      .join('\n');

    return `¡Hola Schoolify! 👋 He creado mi lista escolar.\n\n📚 Mi lista incluye:\n${list}\n\n¿Me pueden enviar una cotización? ✨`;
  };

  const waLink = getWhatsappLink(getWhatsAppMsg());
  const selectedCount = Object.keys(selectedItems).length;

  return createPortal(
    <div className="fixed inset-0 z-[1001] flex items-end sm:items-center justify-center sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl bg-white dark:bg-dark-surface rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl opacity-0 flex flex-col md:flex-row"
        style={{ height: 'min(640px, 92vh)' }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>

        {/* ── LEFT PANEL: Summary ──────────────────────────────── */}
        <div className="hidden md:flex flex-col w-72 lg:w-80 bg-gray-50 dark:bg-dark-bg border-r border-gray-200 dark:border-white/10 rounded-l-[2rem]">
          {/* Backpack visual header */}
          <div className="p-6 pb-4 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-yellow animate-float flex-shrink-0">
                <Backpack className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h3 className="font-heading font-700 text-sm text-gray-900 dark:text-white leading-tight">Tu Lista</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {selectedCount === 0 ? 'Sin artículos aún' : `${selectedCount} ${selectedCount === 1 ? 'tipo' : 'tipos'}, ${totalItemCount} piezas`}
                </p>
              </div>
            </div>
          </div>

          {/* Scanned items from ListScanner */}
          {scannedSection.length > 0 && (
            <div className="px-4 pt-3 pb-2 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">📋 Lista Escaneada</p>
                <button
                  onClick={() => {
                    // Import all scanned items into manual list
                    setSelectedItems(prev => {
                      const next = { ...prev };
                      scannedSection.filter(i => i.selected).forEach(item => {
                        const key = `scanned-${item.id}`;
                        if (!next[key]) next[key] = { qty: 1, note: item.note };
                      });
                      return next;
                    });
                    setScannedSection([]);
                  }}
                  className="text-[10px] text-primary font-bold hover:underline"
                >
                  Importar todo
                </button>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1" style={{ scrollbarWidth: 'thin' }}>
                {scannedSection.map(item => (
                  <div key={item.id} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-white/5 group">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={e => setScannedSection(prev => prev.map(i => i.id === item.id ? { ...i, selected: e.target.checked } : i))}
                      className="h-3.5 w-3.5 cursor-pointer appearance-none rounded border border-gray-300 dark:border-gray-600 checked:bg-primary checked:border-primary transition-all flex-shrink-0"
                    />
                    <span className="text-[10px] text-gray-700 dark:text-gray-300 leading-tight flex-1 truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ scrollbarWidth: 'thin' }}>
            {selectedCount === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 opacity-40 select-none py-8">
                <Archive className="w-10 h-10 text-gray-400" />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-tight">
                  Selecciona artículos<br />de la derecha
                </p>
              </div>
            ) : (
              Object.entries(selectedItems).map(([id, info]) => {
                const item = ITEMS.find(i => i.id === id);
                if (!item) return null;
                const catName = CATEGORIES.find(c => c.id === item.category)?.name;
                return (
                  <div key={id} className="bg-white dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/10">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs text-gray-900 dark:text-white leading-tight truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{catName}</p>
                      </div>
                      {/* Inline qty controls */}
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/10 rounded-lg p-0.5 flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(id, -1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center bg-white dark:bg-white/20 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 transition-all active:scale-90 shadow-sm"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs text-gray-900 dark:text-white min-w-[18px] text-center">{info.qty}</span>
                        <button
                          onClick={() => updateQuantity(id, 1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center bg-primary text-gray-900 hover:scale-105 active:scale-90 transition-all shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    {/* Note input */}
                    <input
                      type="text"
                      placeholder="Incluir nota (marca, color…)"
                      value={info.note}
                      onChange={(e) => updateNote(id, e.target.value)}
                      className="w-full text-[10px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg px-2 py-1 outline-none text-gray-500 dark:text-gray-400 placeholder:text-gray-400 dark:placeholder:text-white/50 focus:border-primary/50 transition-colors"
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Confirm button */}
          <div className="p-4 border-t border-gray-200 dark:border-white/10">
            <button
              onClick={finalize}
              disabled={selectedCount === 0}
              className="w-full py-3 bg-secondary dark:bg-primary text-white dark:text-gray-900 font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-lg"
            >
              {selectedCount === 0 ? 'Selecciona artículos' : `Confirmar Lista (${totalItemCount})`}
            </button>
          </div>
        </div>

        {/* ── RIGHT PANEL: Item Selector ───────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {!isCompleted ? (
            <>
              {/* Header */}
              <div className="px-5 pt-5 pb-0 space-y-3">
                <div className="flex items-center justify-between pr-8">
                  <div>
                    <h2 className="text-xl text-gray-900 dark:text-white tracking-tight">Crea tu lista escolar</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Toca un artículo para agregarlo a tu lista, también puedes incluir una nota descriptiva.</p>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-white/10 rounded-xl border border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-white/15 transition-all outline-none text-sm text-gray-800 dark:text-white placeholder:text-gray-400"
                  />
                </div>

                {/* Categories horizontal scroll */}
                <div
                  ref={catScrollRef}
                  className="flex gap-2 overflow-x-auto pb-3"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-xs whitespace-nowrap transition-all flex-shrink-0 active:scale-95 ${activeCategory === cat.id
                        ? 'bg-primary text-gray-900 shadow-yellow'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                        }`}
                    >
                      {cat.icon}
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Grid */}
              <div
                className="flex-1 overflow-y-auto px-5 pb-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 content-start"
                style={{ scrollbarWidth: 'thin' }}
              >
                {filteredItems.length === 0 ? (
                  <div className="col-span-full py-12 flex flex-col items-center gap-2 text-gray-400">
                    <Search className="w-8 h-8 opacity-40" />
                    <p className="text-sm">Sin resultados para "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredItems.map(item => {
                    const itemData = selectedItems[item.id];
                    const qty = itemData?.qty || 0;
                    const isSelected = qty > 0;

                    return (
                      <div
                        key={item.id}
                        className={`relative rounded-2xl border-2 transition-all duration-200 ${isSelected
                          ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-yellow'
                          : 'border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/40 hover:bg-primary/5'
                          }`}
                      >
                        {/* Selected badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                            <Check className="w-3 h-3 text-gray-900" />
                          </div>
                        )}

                        {/* Main card content — click to add/increment */}
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-full text-left p-3 pb-2"
                          aria-label={`Agregar ${item.name}`}
                        >
                          <p className={`font-semibold text-xs leading-tight pr-5 ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                            {item.name}
                          </p>
                          <p className="text-[8px] text-gray-400 mt-1 tracking-wide">
                            {CATEGORIES.find(c => c.id === item.category)?.name}
                          </p>
                        </button>

                        {/* Controls row */}
                        <div className="px-3 pb-3">
                          {isSelected ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                                className="h-7 w-7 rounded-lg bg-gray-100 dark:bg-white/20 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 transition-all active:scale-90 flex-shrink-0"
                                aria-label="Quitar uno"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="flex-1 text-center font-bold text-sm text-gray-900 dark:text-white">
                                {qty}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                                className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center hover:scale-105 active:scale-90 transition-all flex-shrink-0 shadow-sm"
                                aria-label="Agregar uno más"
                              >
                                <Plus className="w-3.5 h-3.5 text-gray-900" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setNoteOpenId(noteOpenId === item.id ? null : item.id); }}
                                className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all active:scale-90 flex-shrink-0 ${itemData?.note ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 dark:bg-white/20 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                  }`}
                                aria-label="Agregar nota"
                              >
                                <StickyNote className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-full h-7 rounded-lg bg-primary/10 dark:bg-primary/20 hover:bg-primary text-gray-700 dark:text-gray-200 hover:text-gray-900 font-semibold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
                            >
                              <Plus className="w-3 h-3" />
                              Agregar
                            </button>
                          )}

                          {/* Note input (inline, toggleable) */}
                          {isSelected && noteOpenId === item.id && (
                            <input
                              type="text"
                              autoFocus
                              placeholder="Incluir nota (marca, color…)"
                              value={itemData?.note || ''}
                              onChange={(e) => updateNote(item.id, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="mt-2 w-full text-[10px] bg-white dark:bg-white/10 border border-primary/30 rounded-lg px-2.5 py-1.5 outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-300 focus:border-primary transition-colors"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Mobile bottom bar */}
              <div className="md:hidden px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1a1f2e] flex gap-3">
                <div className="flex-1">
                  <button
                    onClick={finalize}
                    disabled={selectedCount === 0}
                    className="w-full py-3 bg-secondary dark:bg-primary text-white dark:text-gray-900 font-bold text-sm rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {selectedCount === 0 ? 'Selecciona artículos' : `Confirmar lista (${totalItemCount})`}
                  </button>
                </div>
                {selectedCount > 0 && (
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-xl relative flex-shrink-0">
                    <Backpack className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full text-[10px] font-bold text-gray-900 flex items-center justify-center">
                      {selectedCount}
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* ── SUCCESS STATE ───────────────────────────────────── */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-6">
              <div className="complete-check w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500 stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">¡Lista Armada!</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-xs mx-auto">
                  {totalItemCount} {totalItemCount === 1 ? 'artículo' : 'artículos'} en {selectedCount} {selectedCount === 1 ? 'categoría' : 'categorías'}.
                  Envía la solicitud de cotización por WhatsApp.
                </p>
              </div>

              <div className="w-full max-w-sm space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-base py-4 rounded-2xl shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200 group"
                >
                  <WhatsApp className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Enviar por WhatsApp
                </a>
                <button
                  onClick={() => setIsCompleted(false)}
                  className="w-full py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-2xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-95"
                >
                  Seguir editando
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 w-full max-w-sm pt-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 p-3 rounded-xl text-left">
                  <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">👨‍🏫 Maestro</p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 leading-tight">Comparte esta lista con tus alumnos.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BackpackSim;
