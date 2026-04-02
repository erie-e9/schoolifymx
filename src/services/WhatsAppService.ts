import type { StudentMeasurement } from '../hooks/useUniformSize';
import { getWhatsappLink } from '../types';

export const WhatsAppService = {
  sendMissionRedemption: (completedMissions: { title: string }[]) => {
    if (completedMissions.length === 0) return;

    const missionList = completedMissions.map(m => `• ${m.title}`).join('\n');
    const message = `¡Hola Schoolify! 👋 He completado las siguientes misiones y me gustaría reclamar mi premio:\n\n${missionList}\n\n¿Qué beneficios tengo activos? ✨`;
    window.open(getWhatsappLink(message), '_blank');
  },

  sendBackpackQuote: (items: { name: string; qty: number; note: string }[]) => {
    const list = items
      .map(item => `• ${item.qty}x ${item.name}${item.note ? ` (${item.note})` : ''}`)
      .join('\n');

    const message = `¡Hola Schoolify! 👋 He creado mi lista escolar.\n\n📚 Mi lista incluye:\n${list}`;
    window.open(getWhatsappLink(message), '_blank');
  },

  sendGenericContact: (message: string) => {
    window.open(getWhatsappLink(message), '_blank');
  },

  sendSingleStudentSize: (currentGarmentType: string, advancedNote: string, suggestedSize: string) => {
    const message = `¡Hola Schoolify! 👋 He usado su Asistente de Tallas para: ${currentGarmentType}\n${advancedNote}\n✅ Talla sugerida: ${suggestedSize}.`;
    window.open(getWhatsappLink(message), '_blank');
  },

  sendMultipleStudentsSizes: (students: StudentMeasurement[]) => {
    let message = '';
    message = `¡Hola Schoolify! 👋 Les comparto tallas para mi grupo:\n\n`;
    students.forEach(s => {
      message += `👤 Estudiante: ${s.name}\n Prenda: ${s.garmentType}\n${s.advancedNote}\n✅ Talla Sugerida: ${s.suggestedSize}\n--------------------------------------------\n`;
    });
    window.open(getWhatsappLink(message), '_blank');
  },
};
