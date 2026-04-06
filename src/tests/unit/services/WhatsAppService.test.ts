import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WhatsAppService } from '@services/WhatsAppService';

// Mock window.open
const windowOpenMock = vi.fn();
vi.stubGlobal('open', windowOpenMock);

describe('WhatsAppService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sendMissionRedemption generates correct URL', () => {
    const missions = [{ title: 'Misión 1' }, { title: 'Misión 2' }];
    WhatsAppService.sendMissionRedemption(missions);
    
    expect(windowOpenMock).toHaveBeenCalled();
    const url = decodeURIComponent(windowOpenMock.mock.calls[0][0]);
    expect(url).toContain('Misión 1');
    expect(url).toContain('Misión 2');
    expect(url).toContain('¡Hola Schoolify!');
  });

  it('sendMissionRedemption does nothing if missions list is empty', () => {
    WhatsAppService.sendMissionRedemption([]);
    expect(windowOpenMock).not.toHaveBeenCalled();
  });

  it('sendBackpackQuote generates correct URL', () => {
    const items = [
      { name: 'Lápiz', qty: 2, note: 'Marca X' },
      { name: 'Goma', qty: 1, note: '' }
    ];
    WhatsAppService.sendBackpackQuote(items);

    expect(windowOpenMock).toHaveBeenCalled();
    const url = decodeURIComponent(windowOpenMock.mock.calls[0][0]);
    expect(url).toContain('2x Lápiz (Marca X)');
    expect(url).toContain('1x Goma');
    expect(url).toContain('Mi lista incluye');
  });

  it('sendGenericContact opens window with message', () => {
    const message = 'Test message';
    WhatsAppService.sendGenericContact(message);
    
    expect(windowOpenMock).toHaveBeenCalled();
    const url = decodeURIComponent(windowOpenMock.mock.calls[0][0]);
    expect(url).toContain('Test message');
  });

  it('sendSingleStudentSize handles garment size suggestion', () => {
    WhatsAppService.sendSingleStudentSize('Camisa', 'Nota extra', 'M');
    
    expect(windowOpenMock).toHaveBeenCalled();
    const url = decodeURIComponent(windowOpenMock.mock.calls[0][0]);
    expect(url).toContain('Camisa');
    expect(url).toContain('Nota extra');
    expect(url).toContain('✅ Talla sugerida: M');
  });

  it('sendMultipleStudentsSizes handles list of students', () => {
    const students = [
      { name: 'Juan', garmentType: 'Pantalón', advancedNote: 'Largo', suggestedSize: '32' } as any,
      { name: 'Ana', garmentType: 'Falda', advancedNote: '', suggestedSize: 'S' } as any
    ];
    WhatsAppService.sendMultipleStudentsSizes(students);

    expect(windowOpenMock).toHaveBeenCalled();
    const url = decodeURIComponent(windowOpenMock.mock.calls[0][0]);
    expect(url).toContain('Juan');
    expect(url).toContain('Pantalón');
    expect(url).toContain('Ana');
    expect(url).toContain('Falda');
    expect(url).toContain('✅ Talla Sugerida: 32');
    expect(url).toContain('✅ Talla Sugerida: S');
  });

  it('sendScannedListQuote handles scanned items and tier', () => {
    const items = [
      { name: 'Item 1', note: 'Note 1' },
      { name: 'Item 2', note: '' }
    ];
    WhatsAppService.sendScannedListQuote(items, 'Selecto');

    expect(windowOpenMock).toHaveBeenCalled();
    const url = decodeURIComponent(windowOpenMock.mock.calls[0][0]);
    expect(url).toContain('Item 1 (Note 1)');
    expect(url).toContain('Item 2');
    expect(url).toContain('Paquete Selecto');
  });
});