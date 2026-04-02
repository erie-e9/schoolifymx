import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import {
  X,
  Backpack,
  Star,
  Archive,
  Briefcase,
  FileText,
  Shapes,
  Paintbrush,
  Check,
  Camera,
  Notebook as NotebookIcon,
  PenTool,
  Palette,
  Ruler,
  Scissors,
} from 'lucide-react';
import WhatsApp from '../../assets/whatsapp.svg?react';
import { WhatsAppService } from '../../services/WhatsAppService';
import { useBackpack } from '../../hooks/useBackpack';
import ListScanner from '../organisms/ListScanner';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import ItemCard from '../molecules/ItemCard';
import SummaryItem from '../molecules/SummaryItem';
import type { SupplyItem, SupplyCategory, ScannedItem } from '../../types';

interface BackpackSimProps {
  isOpen: boolean;
  onClose: () => void;
  scannedItems?: ScannedItem[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const CATEGORIES: Category[] = [
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

  { id: 'cuadernos-pro', name: 'Cuadernos Profesionales', category: 'libretas' },
  { id: 'cuadernos-forma-italiana', name: 'Cuadernos Forma Italiana', category: 'libretas' },
  { id: 'cuadernos-forma-francesa', name: 'Cuadernos Forma Francesa', category: 'libretas' },
  { id: 'carpeta-espiral', name: 'Carpeta con Espiral', category: 'libretas' },

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

  { id: 'archifuelles', name: 'Archifuelles', category: 'archivo' },
  { id: 'broches-archivo', name: 'Broches para Archivo', category: 'archivo' },
  { id: 'broches-latonados', name: 'Broches Latonados', category: 'archivo' },
  { id: 'broches-gafetes', name: 'Broches para Gafetes', category: 'archivo' },
  { id: 'bolsas-organizacion', name: 'Bolsas de Organización', category: 'archivo' },
  { id: 'folder-plastico', name: 'Fólderes de Plástico', category: 'archivo' },
  { id: 'sobre-plastico', name: 'Sobres Plásticos', category: 'archivo' },
  { id: 'tabla-clip', name: 'Tablas con Clip', category: 'archivo' },
  { id: 'protectores-hojas', name: 'Protectores de Hojas', category: 'archivo' },

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

  { id: 'compases', name: 'Compases', category: 'geometria' },
  { id: 'escalimetros', name: 'Escalímetros', category: 'geometria' },
  { id: 'escuadras', name: 'Escuadras', category: 'geometria' },
  { id: 'juego-geometria', name: 'Juego de Geometría', category: 'geometria' },
  { id: 'reglas', name: 'Reglas', category: 'geometria' },
  { id: 'transportadores', name: 'Transportadores', category: 'geometria' },
  { id: 'geoplano', name: 'Geoplano', category: 'geometria' },

  { id: 'papel-construccion', name: 'Block Papel Construcción', category: 'papel' },
  { id: 'papel-brillante', name: 'Papel Brillante/Fluorescente', category: 'papel' },
  { id: 'papel-crepe', name: 'Papel Crepé', category: 'papel' },
  { id: 'papel-contacto', name: 'Papel Contacto', category: 'papel' },
  { id: 'pelicula-autoadherible', name: 'Película Autoadherible', category: 'papel' },

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

  { id: 'barajas', name: 'Barajas', category: 'didactico' },
  { id: 'dados', name: 'Dados', category: 'didactico' },
  { id: 'flautas', name: 'Flautas', category: 'didactico' },
  { id: 'globos-terraqueos', name: 'Globos Terráqueos', category: 'didactico' },
  { id: 'lupas', name: 'Lupas', category: 'didactico' },

  { id: 'pinceles', name: 'Pinceles', category: 'pintura' },
  { id: 'pintura-acrilica', name: 'Pintura Acrílica', category: 'pintura' },
  { id: 'godetes', name: 'Godetes', category: 'pintura' },
  { id: 'pizarrones', name: 'Pizarrones', category: 'pintura' },
  { id: 'esponjas-pintar', name: 'Esponjas para Pintar', category: 'pintura' },

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
  const {
    selectedItems,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isCompleted,
    setIsCompleted,
    noteOpenId,
    setNoteOpenId,
    scannedSection,
    setScannedSection,
    updateQuantity,
    updateNote,
    importScanned,
    totalItemCount,
    selectedCount
  } = useBackpack(isOpen, scannedItems);

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const catScrollRef = useRef<HTMLDivElement>(null);
  const [isScannerOpen, setIsScannerOpen] = React.useState(false);

  const filteredItems = React.useMemo(() => {
    return ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, duration: 0.25 })
        .fromTo(modalRef.current,
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' },
          '-=0.15'
        );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.96, duration: 0.35, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.25 }, '-=0.15');
  };

  const handleFinalize = () => {
    setIsCompleted(true);
    setTimeout(() => {
      gsap.from('.complete-check', { scale: 0, rotation: -45, duration: 0.5, ease: 'back.out(2)' });
    }, 50);
  };

  const handleWhatsAppSend = () => {
    const items = Object.entries(selectedItems).map(([id, info]) => {
      const item = ITEMS.find(i => i.id === id);
      return {
        name: info.name || item?.name || 'Artículo',
        qty: info.qty,
        note: info.note
      };
    });
    WhatsAppService.sendBackpackQuote(items);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1001] flex items-center sm:items-center justify-center sm:p-4 md:p-6">
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
          {/* Header */}
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

          {/* Scanned items section */}
          {scannedSection.length > 0 && (
            <div className="px-4 pt-3 pb-2 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">📋 Lista Escaneada</p>
                <button
                  onClick={importScanned}
                  className="text-[10px] text-secondary dark:text-primary font-bold hover:underline"
                >
                  Importar todo
                </button>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1">
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

          {/* Selected Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
                return (
                  <SummaryItem
                    key={id}
                    id={id}
                    name={info.name || item?.name || 'Artículo'}
                    qty={info.qty}
                    note={info.note}
                    categoryName={item ? CATEGORIES.find(c => c.id === item.category)?.name : 'Escaneado'}
                    onUpdateQuantity={(delta) => updateQuantity(id, delta)}
                    onUpdateNote={(note) => updateNote(id, note)}
                  />
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-white/10">
            <Button
              variant="secondary"
              className="w-full py-3 dark:bg-primary dark:text-gray-900"
              disabled={selectedCount === 0}
              onClick={handleFinalize}
            >
              {selectedCount === 0 ? 'Selecciona artículos' : `Confirmar Lista (${totalItemCount})`}
            </Button>
          </div>
        </div>

        {/* ── RIGHT PANEL: Selector ───────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {!isCompleted ? (
            <>
              <div className="px-5 pt-5 pb-0 space-y-3">
                <h2 className="text-xl text-gray-900 dark:text-white tracking-tight">Crea tu lista escolar</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Toca un artículo para agregarlo a tu lista, también puedes incluir una nota descriptiva.</p>
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Buscar artículos..."
                  rightElement={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsScannerOpen(true)}
                      className="px-4 py-2 border-primary bg-primary/20 text-text-main dark:text-white"
                      leftIcon={<Camera className="w-4 h-4" />}
                    >
                      <span className="hidden sm:inline">Escanear</span>
                    </Button>
                  }
                />

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

              <div className="flex-1 overflow-y-auto px-5 pb-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 content-start">
                {filteredItems.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    qty={selectedItems[item.id]?.qty || 0}
                    onUpdateQuantity={(delta) => updateQuantity(item.id, delta)}
                    onUpdateNote={(note) => updateNote(item.id, note)}
                    isNoteOpen={noteOpenId === item.id}
                    onToggleNote={() => setNoteOpenId(noteOpenId === item.id ? null : item.id)}
                    noteValue={selectedItems[item.id]?.note || ''}
                    categoryName={CATEGORIES.find(c => c.id === item.category)?.name}
                  />
                ))}
              </div>

              {/* Mobile bottom bar */}
              <div className="md:hidden px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1a1f2e] flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1 dark:bg-primary dark:text-gray-900"
                  disabled={selectedCount === 0}
                  onClick={handleFinalize}
                >
                  {selectedCount === 0 ? 'Selecciona artículos' : `Confirmar lista (${totalItemCount})`}
                </Button>
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
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
              <div className="complete-check w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">¡Lista Armada!</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-xs mx-auto">
                  {totalItemCount} artículos en {selectedCount} categorías. Envía la cotización por WhatsApp.
                </p>
              </div>
              <Button
                variant="success"
                className="w-full max-w-sm text-white py-4 text-base"
                onClick={handleWhatsAppSend}
                leftIcon={<WhatsApp className="w-5 h-5" />}
              >
                Enviar lista
              </Button>
              <Button
                variant="thirdary"
                className="w-full max-w-sm"
                onClick={() => setIsCompleted(false)}
              >
                Seguir editando
              </Button>
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
      <ListScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanComplete={(items) => {
          setScannedSection(items);
          setIsScannerOpen(false);
        }}
      />
    </div>,
    document.body
  );
};

export default BackpackSim;
