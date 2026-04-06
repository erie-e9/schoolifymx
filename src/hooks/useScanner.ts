import { useState, useEffect } from 'react';
import useFileUpload from '@customHooks/useFileUpload';

export interface ScannedItem {
  id: string;
  name: string;
  selected: boolean;
  note: string;
}

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook-test/quotation';

export const useScanner = (isOpen: boolean) => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'scanning' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [scanningText, setScanningText] = useState('Iniciando...');
  const [items, setItems] = useState<ScannedItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [tier, setTier] = useState<'Esencial' | 'Selecto'>('Selecto');
  const { uploadFile, data, error, loading } = useFileUpload(N8N_WEBHOOK_URL);

  const scanningSteps = [
    "Detectando caligrafía...",
    "Identificando cuadernos y libretas...",
    "Buscando marcas específicas...",
    "Calculando mejores ofertas...",
    "Finalizando análisis..."
  ];

  useEffect(() => {
    if (!isOpen) {
      setStatus('idle');
      setProgress(0);
      setSelectedFile(null);
      setFileType(null);
      setFileName('');
      setTier('Selecto');
      setItems([]);
    }
  }, [isOpen]);

  const startSimulation = () => {
    setStatus('scanning');

    const MOCK_NAMES = [
      "1 Paquete de crayolas gruesas 12 piezas",
      "1 Lápiz No. 2",
      "1 Goma de borrar blanca",
      "1 Sacapuntas con depósito",
      "1 Pegamento adhesivo grueso 40g",
      "200 Hojas de máquina blancas",
      "10 hojas de opalina blancas",
      "5 barras de silicón delgado",
      "5 barras de silicon grueso",
      "1 Plumón para pizarrón blanco",
      "1 Plumón permanente negro",
      "2 pliegos papel china",
      "2 hojas de papel bond (1 lisa, 1 cuadriculada)",
      "1 pliego grande de fomi diamantado",
      "1 pliego grande fomi simple",
      "1 cartulina blanca",
      "1 pliego de papel corrugado",
      "1 cinta adhesiva gruesa",
      "1 masking tape grueso",
      "1 bolsita de diamantina",
      "1 bote de pintura témpera vinílica 473ml",
      "¼ pintura de aceite",
      "1 pincel grueso",
      "1 carpeta oficio azul claro (Expediente)",
      "1 carpeta carta con broche Baco (Lectura)",
      "1 litro de cloro",
      "1 litro de limpiador multiusos",
      "1 jabón líquido para manos grande",
      "1 paquete de 4 rollos higiénicos",
      "1 paquete de toallitas húmedas",
      "1 juego didáctico (especial)",
      "1 franela para limpiar",
      "1 mandil escolar",
      "2 tapitas de garrafón limpias",
      "10 micas tamaño carta",
      "1 bolsa de globos de colores",
      "1 insecticida en aerosol",
      "10 bolsas para basura grandes",
      "1 paquete de cucharas desechables",
      "1 Fotografía tamaño infantil"
    ];

    let step = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const scannedItems = MOCK_NAMES.map((name, idx) => ({
            id: idx.toString(),
            name,
            selected: true,
            note: ''
          }));
          setItems(scannedItems);
          setStatus('completed');
          return 100;
        }

        if (Math.floor(prev / 20) > step) {
          step++;
          setScanningText(scanningSteps[step] || scanningSteps[scanningSteps.length - 1]);
        }

        return prev + 1;
      });
    }, 40);
  };

  const processFile = async (file: File) => {
    setFileName(file.name);
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      setFileType('pdf');
      setSelectedFile(null);
      setStatus('uploading');
    } else {
      setFileType('image');
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFile(event.target?.result as string);
        setStatus('uploading');
      };
      reader.readAsDataURL(file);
    }

    try {
      await uploadFile(file);
      // Start simulation after successful upload
      setTimeout(() => startSimulation(), 1000);
    } catch (err) {
      setStatus('error');
      console.error('Error uploading file:', err);
    }
  };

  return {
    status,
    setStatus,
    progress,
    scanningText,
    items,
    setItems,
    selectedFile,
    fileType,
    fileName,
    tier,
    setTier,
    processFile,
    error,
    loading
  };
};