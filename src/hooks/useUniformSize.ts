import { useState, useEffect } from 'react';
import gsap from 'gsap';

export interface StudentMeasurement {
  id: string;
  name: string;
  garmentType: string;
  suggestedSize: string;
  advancedNote: string;
  activeTab: 'shirt' | 'pants' | 'skirt' | 'jumper' | 'shoes';
  rawMeasurements: Record<string, number>;
  specialUniformType: string;
  gender?: 'Niño' | 'Niña';
  shoeType?: 'Escolar' | 'Deportivo';
  garmentNote?: string;
}

export const useUniformSize = (isOpen: boolean) => {
  const [activeTab, setActiveTab] = useState<'shirt' | 'pants' | 'skirt' | 'jumper' | 'shoes'>('shirt');
  const [selectedTopTypes, setSelectedTopTypes] = useState<string[]>(['Camisa']);
  const [selectedPantsTypes, setSelectedPantsTypes] = useState<string[]>(['Pantalón']);

  const [students, setStudents] = useState<StudentMeasurement[]>([]);
  const [currentStudentName, setCurrentStudentName] = useState<string>('');
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [specialUniformType, setSpecialUniformType] = useState<string>('');
  const [garmentNote, setGarmentNote] = useState<string>('');

  // Advanced A-F Measures (Shirt/Top)
  const [neck, setNeck] = useState(27);
  const [chest, setChest] = useState(60);
  const [waist, setWaist] = useState(56);
  const [shoulders, setShoulders] = useState(27);
  const [shoulder, setShoulder] = useState(8);
  const [totalLength, setTotalLength] = useState(65);
  const [sleeveLength, setSleeveLength] = useState(36);
  const [armWidth, setArmWidth] = useState(25);
  const [cuffWidth, setCuffWidth] = useState(12);

  // Advanced Measures (Pants)
  const [pWaist, setPWaist] = useState(56);
  const [pHip, setPHip] = useState(60);
  const [pRise, setPRise] = useState(15);
  const [pLength, setPLength] = useState(60);
  const [pRiseToCuff, setPRiseToCuff] = useState(45);
  const [pCuff, setPCuff] = useState(15);

  // Advanced Measures (Skirt)
  const [fWaist, setFWaist] = useState(56);
  const [fHip, setFHip] = useState(60);
  const [hHip, setWHip] = useState(15);
  const [fLength, setFLength] = useState(35);

  // Advanced Measures (Jumper)
  const [jTotalLength, setJTotalLength] = useState(70);
  const [jChest, setJChest] = useState(60);
  const [jWaist, setJWaist] = useState(56);
  const [jNeck, setJNeck] = useState(27);
  const [jShoulder, setJShoulder] = useState(8);
  const [jSkirtLength, setJSkirtLength] = useState(35);

  // Advanced Measures (Shoes)
  const [footLength, setFootLength] = useState(15);
  const [shoeGender, setShoeGender] = useState<'Niño' | 'Niña'>('Niño');
  const [shoeType, setShoeType] = useState<'Escolar' | 'Deportivo'>('Escolar');

  const [isMultiMode, setIsMultiMode] = useState<boolean>(false);
  const [showNextStepModal, setShowNextStepModal] = useState<boolean>(false);
  const [lastAddedStudentName, setLastAddedStudentName] = useState<string | null>(null);

  const [suggestedSize, setSuggestedSize] = useState('8');

  useEffect(() => {
    let size = '8';

    if (activeTab === 'shirt') {
      const c = chest;
      if (c < 60) size = '2';
      else if (c < 66) size = '4';
      else if (c < 71) size = '6';
      else if (c < 76) size = '8';
      else if (c < 81) size = '10';
      else if (c < 86) size = '12';
      else if (c < 91) size = '14';
      else if (c < 96) size = '16';
      else if (c < 101) size = 'CH';
      else if (c < 106) size = 'M';
      else if (c < 111) size = 'G';
      else size = 'XG';
    } else if (activeTab === 'pants') {
      const w = pWaist;
      if (w < 52) size = '2';
      else if (w < 57) size = '4';
      else if (w < 62) size = '6';
      else if (w < 67) size = '8';
      else if (w < 72) size = '10';
      else if (w < 77) size = '12';
      else if (w < 82) size = '14';
      else if (w < 87) size = '16';
      else if (w < 93) size = '28/30';
      else if (w < 99) size = '32/34';
      else if (w < 105) size = '36/38';
      else size = '40+';
    } else if (activeTab === 'skirt') {
      const w = fWaist;
      if (w < 52) size = '2';
      else if (w < 57) size = '4';
      else if (w < 62) size = '6';
      else if (w < 67) size = '8';
      else if (w < 72) size = '10';
      else if (w < 77) size = '12';
      else if (w < 82) size = '14';
      else if (w < 87) size = '16';
      else size = 'CH/M';
    } else if (activeTab === 'jumper') {
      const c = jChest;
      if (c < 60) size = '2';
      else if (c < 66) size = '4';
      else if (c < 71) size = '6';
      else if (c < 76) size = '8';
      else if (c < 81) size = '10';
      else if (c < 86) size = '12';
      else if (c < 91) size = '14';
      else if (c < 96) size = '16';
      else size = 'CH/M';
    } else if (activeTab === 'shoes') {
      const cm = footLength;
      size = Math.round(cm * 2) / 2 + "";
    }

    setSuggestedSize(size);
  }, [activeTab, chest, pWaist, fWaist, jChest, footLength]);

  const handleAddStudent = (advancedNote: string, currentGarmentType: string) => {
    if (!currentStudentName.trim()) {
      alert("Por favor, ingresa el nombre del estudiante para agregarlo a la lista.");
      return;
    }

    const raw = {
      neck, chest, waist, shoulders, shoulder, totalLength, sleeveLength, armWidth, cuffWidth,
      pWaist, pHip, pRise, pLength, pCuff, pRiseToCuff,
      fWaist, fHip, fLength, hHip,
      jTotalLength, jChest, jWaist, jNeck, jShoulder, jSkirtLength,
      footLength
    };

    const newStudent: StudentMeasurement = {
      id: editingStudentId || Date.now().toString(),
      name: currentStudentName.trim(),
      garmentType: currentGarmentType,
      suggestedSize,
      advancedNote,
      activeTab,
      rawMeasurements: raw,
      specialUniformType: specialUniformType.trim(),
      shoeType: activeTab === 'shoes' ? shoeType : undefined,
      gender: activeTab === 'shoes' ? shoeGender : undefined,
      garmentNote: garmentNote.trim()
    };

    if (editingStudentId) {
      setStudents(prev => prev.map(s => s.id === editingStudentId ? newStudent : s));
      setEditingStudentId(null);
      setCurrentStudentName('');
      setSpecialUniformType('');
      setGarmentNote('');
    } else {
      setStudents(prev => [...prev, newStudent]);
      setLastAddedStudentName(newStudent.name);

      // Dispatch mission progress
      window.dispatchEvent(new CustomEvent('schoolify-mission-progress', {
        detail: { missionId: 'add_student' }
      }));

      setShowNextStepModal(true);
      setGarmentNote('');
    }
  };

  const handleEditStudent = (student: StudentMeasurement) => {
    setActiveTab(student.activeTab);
    setCurrentStudentName(student.name);
    setSpecialUniformType(student.specialUniformType || '');
    setGarmentNote(student.garmentNote || '');
    setEditingStudentId(student.id);

    const r = student.rawMeasurements;
    if (r) {
      if (r.neck !== undefined) setNeck(r.neck);
      if (r.chest !== undefined) setChest(r.chest);
      if (r.waist !== undefined) setWaist(r.waist);
      if (r.shoulders !== undefined) setShoulders(r.shoulders);
      if (r.shoulder !== undefined) setShoulder(r.shoulder);
      if (r.totalLength !== undefined) setTotalLength(r.totalLength);
      if (r.sleeveLength !== undefined) setSleeveLength(r.sleeveLength);
      if (r.armWidth !== undefined) setArmWidth(r.armWidth);
      if (r.cuffWidth !== undefined) setCuffWidth(r.cuffWidth);

      if (r.pWaist !== undefined) setPWaist(r.pWaist);
      if (r.pHip !== undefined) setPHip(r.pHip);
      if (r.pRise !== undefined) setPRise(r.pRise);
      if (r.pLength !== undefined) setPLength(r.pLength);
      if (r.pCuff !== undefined) setPCuff(r.pCuff);
      if (r.pRiseToCuff !== undefined) setPRiseToCuff(r.pRiseToCuff);

      if (r.fWaist !== undefined) setFWaist(r.fWaist);
      if (r.fHip !== undefined) setFHip(r.fHip);
      if (r.fLength !== undefined) setFLength(r.fLength);
      if (r.hHip !== undefined) setWHip(r.hHip);

      if (r.jTotalLength !== undefined) setJTotalLength(r.jTotalLength);
      if (r.jChest !== undefined) setJChest(r.jChest);
      if (r.jWaist !== undefined) setJWaist(r.jWaist);
      if (r.jNeck !== undefined) setJNeck(r.jNeck);
      if (r.jShoulder !== undefined) setJShoulder(r.jShoulder);
      if (r.jSkirtLength !== undefined) setJSkirtLength(r.jSkirtLength);

      if (r.footLength !== undefined) setFootLength(r.footLength);
      if (student.gender) setShoeGender(student.gender);
      if (student.shoeType) setShoeType(student.shoeType);
    }
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleClearStudents = () => {
    setStudents([]);
  };

  return {
    activeTab, setActiveTab,
    selectedTopTypes, setSelectedTopTypes,
    selectedPantsTypes, setSelectedPantsTypes,
    students, setStudents,
    currentStudentName, setCurrentStudentName,
    editingStudentId, setEditingStudentId,
    specialUniformType, setSpecialUniformType,
    garmentNote, setGarmentNote,
    isMultiMode, setIsMultiMode,
    showNextStepModal, setShowNextStepModal,
    lastAddedStudentName,
    neck, setNeck,
    chest, setChest,
    waist, setWaist,
    shoulders, setShoulders,
    shoulder, setShoulder,
    totalLength, setTotalLength,
    sleeveLength, setSleeveLength,
    armWidth, setArmWidth,
    cuffWidth, setCuffWidth,
    pWaist, setPWaist,
    pHip, setPHip,
    pRise, setPRise,
    pLength, setPLength,
    pCuff, setPCuff,
    pRiseToCuff, setPRiseToCuff,
    fWaist, setFWaist,
    fHip, setFHip,
    fLength, setFLength,
    hHip, setWHip,
    jTotalLength, setJTotalLength,
    jChest, setJChest,
    jWaist, setJWaist,
    jNeck, setJNeck,
    jShoulder, setJShoulder,
    jSkirtLength, setJSkirtLength,
    footLength, setFootLength,
    shoeGender, setShoeGender,
    shoeType, setShoeType,
    suggestedSize,
    handleAddStudent,
    handleEditStudent,
    handleRemoveStudent,
    handleClearStudents
  };
};
