import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUniformSize } from '@hooks/useUniformSize';

describe('useUniformSize', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('alert', vi.fn());
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useUniformSize(false));
    expect(result.current.activeTab).toBe('shirt');
    expect(result.current.students).toEqual([]);
    expect(result.current.suggestedSize).toBe('6');
  });

  it('calculates suggested size for shirt based on chest', () => {
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setChest(65);
    });
    expect(result.current.suggestedSize).toBe('4');

    const checkShirtSize = (chest: number, expected: string) => {
      act(() => { result.current.setChest(chest); });
      expect(result.current.suggestedSize).toBe(expected);
    };

    checkShirtSize(55, '2');
    checkShirtSize(68, '6');
    checkShirtSize(72, '8');
    checkShirtSize(78, '10');
    checkShirtSize(83, '12');
    checkShirtSize(88, '14');
    checkShirtSize(93, '16');
    checkShirtSize(98, 'CH');
    checkShirtSize(108, 'G');
    checkShirtSize(115, 'XG');
  });

  it('calculates suggested size for pants based on waist', () => {
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setActiveTab('pants');
    });

    const checkPantsSize = (waist: number, expected: string) => {
      act(() => { result.current.setPWaist(waist); });
      expect(result.current.suggestedSize).toBe(expected);
    };

    checkPantsSize(50, '2');
    checkPantsSize(54, '4');
    checkPantsSize(59, '6');
    checkPantsSize(64, '8');
    checkPantsSize(69, '10');
    checkPantsSize(74, '12');
    checkPantsSize(79, '14');
    checkPantsSize(84, '16');
    checkPantsSize(90, '28/30');
    checkPantsSize(96, '32/34');
    checkPantsSize(102, '36/38');
    checkPantsSize(110, '40+');
  });

  it('calculates suggested size for skirt based on waist', () => {
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setActiveTab('skirt');
    });

    const checkSkirtSize = (waist: number, expected: string) => {
      act(() => { result.current.setFWaist(waist); });
      expect(result.current.suggestedSize).toBe(expected);
    };

    checkSkirtSize(50, '2');
    checkSkirtSize(54, '4');
    checkSkirtSize(59, '6');
    checkSkirtSize(64, '8');
    checkSkirtSize(69, '10');
    checkSkirtSize(74, '12');
    checkSkirtSize(79, '14');
    checkSkirtSize(84, '16');
    checkSkirtSize(90, 'CH/M');
  });

  it('calculates suggested size for jumper based on chest', () => {
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setActiveTab('jumper');
    });

    const checkJumperSize = (chest: number, expected: string) => {
      act(() => { result.current.setJChest(chest); });
      expect(result.current.suggestedSize).toBe(expected);
    };

    checkJumperSize(55, '2');
    checkJumperSize(62, '4');
    checkJumperSize(68, '6');
    checkJumperSize(72, '8');
    checkJumperSize(78, '10');
    checkJumperSize(83, '12');
    checkJumperSize(88, '14');
    checkJumperSize(93, '16');
    checkJumperSize(100, 'CH/M');
  });

  it('calculates suggested size for shoes based on foot length', () => {
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setActiveTab('shoes');
    });
    act(() => {
      result.current.setFootLength(24.2);
    });
    expect(result.current.suggestedSize).toBe("24");

    act(() => {
      result.current.setFootLength(24.8);
    });
    expect(result.current.suggestedSize).toBe("25");
  });

  it('shows alert if name is empty during add', () => {
    const alertSpy = vi.spyOn(window, 'alert');
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setCurrentStudentName('');
    });
    act(() => {
      result.current.handleAddStudent('Note', 'Camisa');
    });

    expect(alertSpy).toHaveBeenCalledWith("Por favor, ingresa el nombre del estudiante para agregarlo a la lista.");
    expect(result.current.students.length).toBe(0);
  });

  it('adds a student correctly', () => {
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setCurrentStudentName('John Doe');
    });
    act(() => {
      result.current.handleAddStudent('Test note', 'Camisa');
    });

    expect(result.current.students.length).toBe(1);
    expect(result.current.students[0].name).toBe('John Doe');
  });

  it('edits a student correctly and restores all measurements', () => {
    const { result } = renderHook(() => useUniformSize(true));

    // 1. Setup a student with complex measurements in different categories
    act(() => {
      result.current.setActiveTab('shoes');
      result.current.setCurrentStudentName('Jane Updated');
      result.current.setFootLength(25);
      result.current.setShoeGender('Niña');
      result.current.setShoeType('Deportivo');
    });
    act(() => {
      result.current.handleAddStudent('Note 1', 'Tenis');
    });

    const student = result.current.students[0];

    // 2. Clear state by editing or starting fresh render?
    // Actually handleEditStudent should overwrite the states.
    act(() => {
      result.current.handleEditStudent(student);
    });

    expect(result.current.editingStudentId).toBe(student.id);
    expect(result.current.currentStudentName).toBe('Jane Updated');
    expect(result.current.footLength).toBe(25);
    expect(result.current.shoeGender).toBe('Niña');
    expect(result.current.shoeType).toBe('Deportivo');

    // 3. Test restoration of other measurements (Shirt, Pants, Skirt, Jumper)
    // We can simulate a manual student entry with all fields for testing restoration
    const complexStudent = {
      ...student,
      // Use the actual ID from the hook state to ensure we are editing the right one
      id: result.current.students[0].id,
      activeTab: 'shirt' as const,
      rawMeasurements: {
        neck: 32, chest: 75, waist: 68, shoulders: 38, shoulder: 14, totalLength: 58, sleeveLength: 48, armWidth: 28, cuffWidth: 26,
        pWaist: 72, pHip: 88, pRise: 30, pLength: 92, pCuff: 20, pRiseToCuff: 68,
        fWaist: 67, fHip: 87, fLength: 47, hHip: 22,
        jTotalLength: 78, jChest: 72, jWaist: 70, jNeck: 32, jShoulder: 14, jSkirtLength: 42,
        footLength: 26
      }
    };

    act(() => {
      result.current.handleEditStudent(complexStudent);
    });

    expect(result.current.neck).toBe(32);
    expect(result.current.chest).toBe(75);
    expect(result.current.waist).toBe(68);
    expect(result.current.shoulders).toBe(38);
    expect(result.current.shoulder).toBe(14);
    expect(result.current.totalLength).toBe(58);
    expect(result.current.sleeveLength).toBe(48);
    expect(result.current.armWidth).toBe(28);
    expect(result.current.cuffWidth).toBe(26);

    expect(result.current.pWaist).toBe(72);
    expect(result.current.pHip).toBe(88);
    expect(result.current.pRise).toBe(30);
    expect(result.current.pLength).toBe(92);
    expect(result.current.pCuff).toBe(20);
    expect(result.current.pRiseToCuff).toBe(68);

    expect(result.current.fWaist).toBe(67);
    expect(result.current.fHip).toBe(87);
    expect(result.current.fLength).toBe(47);
    expect(result.current.hHip).toBe(22);

    expect(result.current.jTotalLength).toBe(78);
    expect(result.current.jChest).toBe(72);
    expect(result.current.jWaist).toBe(70);
    expect(result.current.jNeck).toBe(32);
    expect(result.current.jShoulder).toBe(14);
    expect(result.current.jSkirtLength).toBe(42);

    expect(result.current.footLength).toBe(26);

    // 4. Save the edit
    act(() => {
      result.current.setCurrentStudentName('Jane Updated');
      result.current.handleAddStudent('Updated note', 'Blusa');
    });

    expect(result.current.students[0].name).toBe('Jane Updated');
    expect(result.current.editingStudentId).toBeNull();
  });

  it('removes a student correctly', () => {
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setCurrentStudentName('John Doe');
    });
    act(() => {
      result.current.handleAddStudent('Note', 'Camisa');
    });

    expect(result.current.students.length).toBe(1);
    const id = result.current.students[0].id;

    act(() => {
      result.current.handleRemoveStudent(id);
    });

    expect(result.current.students.length).toBe(0);
  });

  it('clears all students', () => {
    const { result } = renderHook(() => useUniformSize(true));

    act(() => {
      result.current.setCurrentStudentName('Student 1');
    });
    act(() => {
      result.current.handleAddStudent('Note 1', 'Camisa');
    });

    act(() => {
      result.current.setCurrentStudentName('Student 2');
    });
    act(() => {
      result.current.handleAddStudent('Note 2', 'Camisa');
    });

    expect(result.current.students.length).toBe(2);

    act(() => {
      result.current.handleClearStudents();
    });

    expect(result.current.students.length).toBe(0);
  });
});
