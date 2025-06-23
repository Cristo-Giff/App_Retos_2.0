import { Category } from '@/types/challenges';

export const categories: Category[] = [
  {
    id: 'fitness',
    name: 'Fitness',
    icon: 'dumbbell',
    color: '#ff6b6b',
    gradientColors: ['#ff6b6b', '#ee5a52'],
    challenges: [
      { day: 1, tasks: [
        { id: 1, title: '10 sentadillas' },
        { id: 2, title: '10 flexiones de brazos' },
        { id: 3, title: '1 min estiramiento de piernas' }
      ] },
      { day: 2, tasks: [
        { id: 4, title: '15 sentadillas' },
        { id: 5, title: '15 abdominales' }
      ] },
      { day: 3, tasks: [
        { id: 6, title: '20 saltos' },
        { id: 7, title: '10 burpees' },
        { id: 8, title: '1 min plancha' }
      ] },
      { day: 4, tasks: [{ id: 9, title: '20 saltos' }] },
      { day: 5, tasks: [{ id: 10, title: '12 sentadillas' }] },
      { day: 6, tasks: [{ id: 11, title: '10 abdominales' }] },
      { day: 7, tasks: [{ id: 12, title: 'Camina 10 minutos' }] },
      { day: 8, tasks: [{ id: 13, title: '18 flexiones de pared' }] },
      { day: 9, tasks: [{ id: 14, title: '45 segundos de plancha' }] },
      { day: 10, tasks: [{ id: 15, title: '25 saltos' }] },
      { day: 11, tasks: [{ id: 16, title: '15 sentadillas' }] },
      { day: 12, tasks: [{ id: 17, title: '15 abdominales' }] },
      { day: 13, tasks: [{ id: 18, title: 'Estiramiento 5 min' }] },
      { day: 14, tasks: [{ id: 19, title: '20 flexiones de pared' }] },
      { day: 15, tasks: [{ id: 20, title: '1 minuto de plancha' }] },
      { day: 16, tasks: [{ id: 21, title: '30 saltos' }] },
      { day: 17, tasks: [{ id: 22, title: '18 sentadillas' }] },
      { day: 18, tasks: [{ id: 23, title: '20 abdominales' }] },
      { day: 19, tasks: [{ id: 24, title: 'Camina 15 minutos' }] },
      { day: 20, tasks: [{ id: 25, title: '25 flexiones de pared' }] },
      { day: 21, tasks: [{ id: 26, title: '1:15 min plancha' }] },
      { day: 22, tasks: [{ id: 27, title: '35 saltos' }] },
      { day: 23, tasks: [{ id: 28, title: '20 sentadillas' }] },
      { day: 24, tasks: [{ id: 29, title: '25 abdominales' }] },
      { day: 25, tasks: [{ id: 30, title: 'Estiramiento 8 min' }] },
      { day: 26, tasks: [{ id: 31, title: '30 flexiones de pared' }] },
      { day: 27, tasks: [{ id: 32, title: '1:30 min plancha' }] },
      { day: 28, tasks: [{ id: 33, title: '40 saltos' }] },
      { day: 29, tasks: [{ id: 34, title: '25 sentadillas' }] },
      { day: 30, tasks: [{ id: 35, title: '30 abdominales' }] },
    ]
  },
  {
    id: 'mental-health',
    name: 'Salud Mental',
    icon: 'brain',
    color: '#4c9aff',
    gradientColors: ['#4c9aff', '#3182ce'],
    challenges: [
      { day: 1, tasks: [
        { id: 1, title: 'Medita 2 minutos' },
        { id: 2, title: 'Escribe 1 cosa positiva de tu día' }
      ] },
      { day: 2, tasks: [
        { id: 3, title: '3 cosas por las que estás agradecido' },
        { id: 4, title: 'Respira profundo 5 veces' }
      ] },
      { day: 3, tasks: [
        { id: 5, title: 'Medita 3 minutos' },
        { id: 6, title: 'Dibuja algo que te relaje' }
      ] },
      { day: 4, tasks: [{ id: 7, title: 'Llama a un amigo' }] },
      { day: 5, tasks: [{ id: 8, title: 'Escribe tus emociones' }] },
      { day: 6, tasks: [{ id: 9, title: 'Camina sin teléfono' }] },
      { day: 7, tasks: [{ id: 10, title: 'Medita 4 minutos' }] },
      { day: 8, tasks: [{ id: 11, title: 'Practica autocompasión' }] },
      { day: 9, tasks: [{ id: 12, title: 'Visualiza tu día ideal' }] },
      { day: 10, tasks: [{ id: 13, title: 'Medita 5 minutos' }] },
      { day: 11, tasks: [{ id: 14, title: 'Expresa gratitud a alguien' }] },
      { day: 12, tasks: [{ id: 15, title: 'Desconéctate 1 hora' }] },
      { day: 13, tasks: [{ id: 16, title: 'Medita 6 minutos' }] },
      { day: 14, tasks: [{ id: 17, title: 'Haz algo que amas' }] },
      { day: 15, tasks: [{ id: 18, title: 'Escribe 3 logros' }] },
      { day: 16, tasks: [{ id: 19, title: 'Medita 7 minutos' }] },
      { day: 17, tasks: [{ id: 20, title: 'Practica la escucha activa' }] },
      { day: 18, tasks: [{ id: 21, title: 'Observa la naturaleza' }] },
      { day: 19, tasks: [{ id: 22, title: 'Medita 8 minutos' }] },
      { day: 20, tasks: [{ id: 23, title: 'Perdónate por algo' }] },
      { day: 21, tasks: [{ id: 24, title: 'Haz un acto de bondad' }] },
      { day: 22, tasks: [{ id: 25, title: 'Medita 9 minutos' }] },
      { day: 23, tasks: [{ id: 26, title: 'Reflexiona sobre tu crecimiento' }] },
      { day: 24, tasks: [{ id: 27, title: 'Desconéctate completamente' }] },
      { day: 25, tasks: [{ id: 28, title: 'Medita 10 minutos' }] },
      { day: 26, tasks: [{ id: 29, title: 'Escribe una carta a tu yo futuro' }] },
      { day: 27, tasks: [{ id: 30, title: 'Celebra tus progresos' }] },
      { day: 28, tasks: [{ id: 31, title: 'Medita 12 minutos' }] },
      { day: 29, tasks: [{ id: 32, title: 'Planifica tu bienestar futuro' }] },
      { day: 30, tasks: [{ id: 33, title: 'Escribe un diario de gratitud' }] },
    ]
  },
  {
    id: 'productivity',
    name: 'Productividad',
    icon: 'target',
    color: '#10b981',
    gradientColors: ['#10b981', '#059669'],
    challenges: [
      { day: 1, tasks: [
        { id: 1, title: 'Lista de 3 tareas' },
        { id: 2, title: 'Organiza tu escritorio' }
      ] },
      { day: 2, tasks: [
        { id: 3, title: 'Pomodoro de 25 minutos' },
        { id: 4, title: 'Revisa tus objetivos' }
      ] },
      { day: 3, tasks: [
        { id: 5, title: 'Elimina una distracción' },
        { id: 6, title: 'Planifica la semana' },
        { id: 7, title: 'Aprende algo nuevo 15 min' }
      ] },
      { day: 4, tasks: [{ id: 8, title: 'Delega una tarea' }] },
      { day: 5, tasks: [{ id: 9, title: '3 Pomodoros' }] },
      { day: 6, tasks: [{ id: 10, title: 'Organiza archivos digitales' }] },
      { day: 7, tasks: [{ id: 11, title: 'Define prioridades' }] },
      { day: 8, tasks: [{ id: 12, title: 'Aprende 20 minutos' }] },
      { day: 9, tasks: [{ id: 13, title: 'Elimina notificaciones' }] },
      { day: 10, tasks: [{ id: 14, title: '4 Pomodoros' }] },
      { day: 11, tasks: [{ id: 15, title: 'Crea un sistema' }] },
      { day: 12, tasks: [{ id: 16, title: 'Lee sobre productividad' }] },
      { day: 13, tasks: [{ id: 17, title: 'Evalúa tus herramientas' }] },
      { day: 14, tasks: [{ id: 18, title: 'Aprende 25 minutos' }] },
      { day: 15, tasks: [{ id: 19, title: 'Planifica objetivos trimestrales' }] },
      { day: 16, tasks: [{ id: 20, title: '5 Pomodoros' }] },
      { day: 17, tasks: [{ id: 21, title: 'Optimiza una rutina' }] },
      { day: 18, tasks: [{ id: 22, title: 'Networking 30 min' }] },
      { day: 19, tasks: [{ id: 23, title: 'Aprende 30 minutos' }] },
      { day: 20, tasks: [{ id: 24, title: 'Revisa y ajusta metas' }] },
      { day: 21, tasks: [{ id: 25, title: 'Crea un plan de acción' }] },
      { day: 22, tasks: [{ id: 26, title: '6 Pomodoros' }] },
      { day: 23, tasks: [{ id: 27, title: 'Comparte tu progreso' }] },
      { day: 24, tasks: [{ id: 28, title: 'Planifica el siguiente mes' }] },
      { day: 25, tasks: [{ id: 29, title: 'Revisa tus logros' }] },
      { day: 26, tasks: [{ id: 30, title: 'Establece nuevas metas' }] },
      { day: 27, tasks: [{ id: 31, title: 'Organiza un espacio de trabajo' }] },
      { day: 28, tasks: [{ id: 32, title: 'Investiga sobre productividad' }] },
      { day: 29, tasks: [{ id: 33, title: 'Reflexiona sobre tu mes' }] },
      { day: 30, tasks: [{ id: 34, title: 'Ajusta tu plan de acción' }] },
    ]
  }
];