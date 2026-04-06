import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UniformSizeHelper from '@components/organisms/UniformSizeHelper';
import { useUniformSize } from '@hooks/useUniformSize';
import { WhatsAppService } from '@services/WhatsAppService';

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  const mockGsap = {
    ...actual.default,
    timeline: vi.fn((vars?: { onComplete?: () => void }) => {
      const timeline = {
        to: vi.fn().mockImplementation(function (this: any, _target: any, tVars: any) {
          if (tVars?.onComplete) tVars.onComplete();
          return this;
        }),
        fromTo: vi.fn().mockImplementation(function (this: any, _t, _f, tVars: any) {
          if (tVars?.onComplete) tVars.onComplete();
          return this;
        }),
      };
      if (vars?.onComplete) vars.onComplete();
      return timeline;
    }),
    to: vi.fn((_target: any, vars: any) => {
      if (vars?.onComplete) vars.onComplete();
      return { then: (cb: any) => cb?.() };
    }),
  };

  return {
    ...actual,
    default: mockGsap,
    gsap: mockGsap,
  };
});

const mockHelpers = {
  setActiveTab: vi.fn(),
  setSelectedTopTypes: vi.fn(),
  setCurrentStudentName: vi.fn(),
  handleAddStudent: vi.fn(),
  handleRemoveStudent: vi.fn(),
  handleClearStudents: vi.fn(),
  setSpecialUniformType: vi.fn(),
  setShowNextStepModal: vi.fn(),
};

// Mock useUniformSize hook
vi.mock('@hooks/useUniformSize', () => ({
  useUniformSize: vi.fn(() => ({
    activeTab: 'shirt',
    setActiveTab: mockHelpers.setActiveTab,
    selectedTopTypes: ['Camisa'],
    setSelectedTopTypes: mockHelpers.setSelectedTopTypes,
    selectedPantsTypes: [],
    students: [],
    currentStudentName: '',
    setCurrentStudentName: mockHelpers.setCurrentStudentName,
    editingStudentId: null,
    specialUniformType: '',
    setSpecialUniformType: mockHelpers.setSpecialUniformType,
    garmentNote: '',
    isMultiMode: false,
    setIsMultiMode: vi.fn(),
    showNextStepModal: false,
    setShowNextStepModal: mockHelpers.setShowNextStepModal,
    suggestedSize: '8',
    neck: 30,
    setNeck: vi.fn(),
    chest: 70,
    handleAddStudent: mockHelpers.handleAddStudent,
    handleEditStudent: vi.fn(),
    handleRemoveStudent: mockHelpers.handleRemoveStudent,
    handleClearStudents: mockHelpers.handleClearStudents,
  })),
}));

// Mock WhatsAppService
vi.mock('@services/WhatsAppService', () => ({
  WhatsAppService: {
    sendGenericContact: vi.fn(),
    sendSingleStudentSize: vi.fn(),
    sendMultipleStudentsSizes: vi.fn(),
  },
}));

describe('UniformSizeHelper', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = 'unset';
    vi.mocked(useUniformSize).mockReturnValue({
      activeTab: 'shirt',
      setActiveTab: mockHelpers.setActiveTab,
      selectedTopTypes: ['Camisa'],
      setSelectedTopTypes: mockHelpers.setSelectedTopTypes,
      selectedPantsTypes: [],
      students: [],
      currentStudentName: '',
      setCurrentStudentName: mockHelpers.setCurrentStudentName,
      editingStudentId: null,
      specialUniformType: '',
      setSpecialUniformType: mockHelpers.setSpecialUniformType,
      garmentNote: '',
      isMultiMode: false,
      setIsMultiMode: vi.fn(),
      showNextStepModal: false,
      setShowNextStepModal: mockHelpers.setShowNextStepModal,
      suggestedSize: '8',
      neck: 30,
      setNeck: vi.fn(),
      chest: 70,
      handleAddStudent: mockHelpers.handleAddStudent,
      handleEditStudent: vi.fn(),
      handleRemoveStudent: mockHelpers.handleRemoveStudent,
      handleClearStudents: mockHelpers.handleClearStudents,
    } as any);
  });

  it('renders modal and switches tabs', () => {
    render(<UniformSizeHelper {...defaultProps} />);
    expect(screen.getByText(/Asistente de/)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Pantalón'));
    expect(mockHelpers.setActiveTab).toHaveBeenCalledWith('pants');
  });

  it('handles student name input and addition', () => {
    vi.mocked(useUniformSize).mockReturnValue({
      ...vi.mocked(useUniformSize)(true),
      isMultiMode: true,
    } as any);

    render(<UniformSizeHelper {...defaultProps} />);
    const input = screen.getByPlaceholderText(/Nombre completo/);
    fireEvent.change(input, { target: { value: 'Eric' } });
    expect(mockHelpers.setCurrentStudentName).toHaveBeenCalledWith('Eric');

    const addBtn = screen.getByRole('button', { name: /Añadir/i });
    fireEvent.click(addBtn);
    expect(mockHelpers.handleAddStudent).toHaveBeenCalled();
  });

  it('renders student list and handles removal', () => {
    const mockStudent = { id: '1', name: 'Eric', garmentType: 'Camisa', suggestedSize: '8' };
    vi.mocked(useUniformSize).mockReturnValue({
      ...vi.mocked(useUniformSize)(true),
      isMultiMode: true,
      students: [mockStudent],
    } as any);

    render(<UniformSizeHelper {...defaultProps} />);
    expect(screen.getByText('Eric')).toBeInTheDocument();

    const removeBtn = screen.getByTitle('Eliminar Estudiante');
    fireEvent.click(removeBtn);
    expect(mockHelpers.handleRemoveStudent).toHaveBeenCalledWith('1');
  });

  it('calls WhatsAppService for single student', () => {
    render(<UniformSizeHelper {...defaultProps} />);
    const waBtn = screen.getByTestId('whatsapp-button');
    fireEvent.click(waBtn);
    expect(WhatsAppService.sendSingleStudentSize).toHaveBeenCalled();
  });

  it('calls WhatsAppService for multiple students', () => {
    vi.mocked(useUniformSize).mockReturnValue({
      ...vi.mocked(useUniformSize)(true),
      students: [{ id: '1', name: 'Eric' }],
    } as any);

    render(<UniformSizeHelper {...defaultProps} />);
    const waBtn = screen.getByTestId('whatsapp-button');
    fireEvent.click(waBtn);
    expect(WhatsAppService.sendMultipleStudentsSizes).toHaveBeenCalled();
  });

  it('shows next step modal and handles its actions', () => {
    vi.mocked(useUniformSize).mockReturnValue({
      ...vi.mocked(useUniformSize)(true),
      showNextStepModal: true,
      lastAddedStudentName: 'Eric',
    } as any);

    render(<UniformSizeHelper {...defaultProps} />);
    expect(screen.getByText(/Eric agregado/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Registrar otra prenda'));
    expect(mockHelpers.setShowNextStepModal).toHaveBeenCalledWith(false);
  });

  it('toggles top garment types', () => {
    render(<UniformSizeHelper {...defaultProps} />);
    const sueterBtn = screen.getByText('Suéter');
    fireEvent.click(sueterBtn);
    expect(mockHelpers.setSelectedTopTypes).toHaveBeenCalled();
  });

  it('calls onClose and backdrop click', () => {
    render(<UniformSizeHelper {...defaultProps} />);
    
    // Close button
    fireEvent.click(screen.getByLabelText('Cerrar'));
    expect(defaultProps.onClose).toHaveBeenCalled();

    // Backdrop click
    const backdrop = document.querySelector('.bg-dark-bg\\/80')!;
    fireEvent.click(backdrop);
    // onClose should have been called again if mock is cleared or via total calls
    expect(defaultProps.onClose).toHaveBeenCalledTimes(2);
  });

  it('calls contact button for custom prendas', () => {
    render(<UniformSizeHelper {...defaultProps} />);
    const contactBtn = screen.getByText(/No está la prenda/);
    fireEvent.click(contactBtn);
    expect(WhatsAppService.sendGenericContact).toHaveBeenCalled();
  });
});