import { useState, useEffect, useRef } from 'react';
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
  const [requestID, setRequestID] = useState<string>('');
  const { uploadFile, data, error, loading } = useFileUpload(N8N_WEBHOOK_URL);

  const scanningSteps = [
    "Detectando caligrafía...",
    "Usando IA para identificar cuadernos y libretas...",
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

  const loadingRef = useRef(loading);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const startSimulation = () => {
    setStatus('scanning');

    let step = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          if (!loadingRef.current) {
            clearInterval(interval);
            setStatus('completed');
            return 100;
          }
          return 99; // Hold at 99% until webhook finishes
        }

        if (Math.floor(prev / 20) > step) {
          step++;
          setScanningText(scanningSteps[step] || scanningSteps[scanningSteps.length - 1]);
        }

        return prev + 1;
      });
    }, 100);
  };

  useEffect(() => {
    if (status === 'completed') {
      let finalItems: ScannedItem[] = [];
      let requestListID = "MOCKED-REQUEST-ID";
      // Extract from data if valid
      const parsedData = data as any;
      if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0]?.items?.length > 0) {
        finalItems = parsedData[0].items.map((item: any, idx: number) => ({
          id: idx.toString(),
          name: `${item.quantity ? item.quantity + ' ' : ''}${item.matchedProduct}`,
          selected: true,
          note: ''
        }));
        requestListID = parsedData[0].requestId
      } else {
        // Fallback to mocks
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
        finalItems = MOCK_NAMES.map((name, idx) => ({
          id: idx.toString(),
          name,
          selected: true,
          note: ''
        }));
      }
      setRequestID(requestListID);
      setItems(finalItems);
    }
  }, [status, data]);

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
      // Start simulation after successful upload
      setTimeout(() => startSimulation(), 1000);
      await uploadFile(file);
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
    requestID,
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