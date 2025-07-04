import { Category } from '@/types/challenges';

export const categories: Category[] = [
  {
    id: 'fitness',
    name: 'Fitness',
    icon: 'dumbbell',
    color: '#ff6b6b',
    gradientColors: ['#ff6b6b', '#ee5a52'],
    challenges: [
      { id: 1, day: 1, title: '10 sentadillas', description: 'Haz 10 sentadillas con buena forma' },
      { id: 2, day: 2, title: '15 flexiones de pared', description: 'Apóyate en la pared y realiza 15 flexiones' },
      { id: 3, day: 3, title: '30 segundos de plancha', description: 'Mantén la posición de plancha durante 30 segundos' },
      { id: 4, day: 4, title: '20 saltos', description: 'Realiza 20 saltos en el lugar con brazos arriba' },
      { id: 5, day: 5, title: '12 sentadillas', description: 'Incrementa a 12 sentadillas' },
      { id: 6, day: 6, title: '10 abdominales', description: 'Haz 10 abdominales clásicos' },
      { id: 7, day: 7, title: 'Camina 10 minutos', description: 'Camina durante 10 minutos a paso moderado' },
      { id: 8, day: 8, title: '18 flexiones de pared', description: 'Aumenta a 18 flexiones de pared' },
      { id: 9, day: 9, title: '45 segundos de plancha', description: 'Mantén la plancha por 45 segundos' },
      { id: 10, day: 10, title: '25 saltos', description: 'Realiza 25 saltos coordinando brazos y piernas' },
      { id: 11, day: 11, title: '15 sentadillas', description: 'Continúa progresando con 15 sentadillas' },
      { id: 12, day: 12, title: '15 abdominales', description: 'Incrementa a 15 abdominales' },
      { id: 13, day: 13, title: 'Estiramiento 5 min', description: 'Dedica 5 minutos a estirar todo el cuerpo' },
      { id: 14, day: 14, title: '20 flexiones de pared', description: 'Sigue aumentando las flexiones de pared' },
      { id: 15, day: 15, title: '1 minuto de plancha', description: 'Alcanza el minuto completo de plancha' },
      { id: 16, day: 16, title: '30 saltos', description: 'Incrementa a 30 saltos consecutivos' },
      { id: 17, day: 17, title: '18 sentadillas', description: 'Continúa fortaleciendo piernas con 18 sentadillas' },
      { id: 18, day: 18, title: '20 abdominales', description: 'Fortalece el core con 20 abdominales' },
      { id: 19, day: 19, title: 'Camina 15 minutos', description: 'Aumenta el tiempo de caminata a 15 minutos' },
      { id: 20, day: 20, title: '25 flexiones de pared', description: 'Desafíate con 25 flexiones de pared' },
      { id: 21, day: 21, title: '1:15 min plancha', description: 'Mantén la plancha por 1 minuto y 15 segundos' },
      { id: 22, day: 22, title: '35 saltos', description: 'Aumenta la intensidad con 35 saltos' },
      { id: 23, day: 23, title: '20 sentadillas', description: 'Alcanza las 20 sentadillas perfectas' },
      { id: 24, day: 24, title: '25 abdominales', description: 'Fortalece más el abdomen con 25 repeticiones' },
      { id: 25, day: 25, title: 'Estiramiento 8 min', description: 'Dedica más tiempo al estiramiento: 8 minutos' },
      { id: 26, day: 26, title: '30 flexiones de pared', description: 'Desafío avanzado: 30 flexiones de pared' },
      { id: 27, day: 27, title: '1:30 min plancha', description: 'Mantén la plancha por 1 minuto y 30 segundos' },
      { id: 28, day: 28, title: '40 saltos', description: 'Termina fuerte con 40 saltos energéticos' },
      { id: 29, day: 29, title: '25 sentadillas', description: 'Casi terminando: 25 sentadillas perfectas' },
      { id: 30, day: 30, title: '30 abdominales', description: '¡Día final! 30 abdominales para completar el reto' },
    ]
  },
  {
    id: 'mental-health',
    name: 'Salud Mental',
    icon: 'brain',
    color: '#4c9aff',
    gradientColors: ['#4c9aff', '#3182ce'],
    challenges: [
      { id: 1, day: 1, title: 'Medita 2 minutos', description: 'Encuentra un lugar tranquilo y medita 2 minutos' },
      { id: 2, day: 2, title: '3 cosas por las que estás agradecido', description: 'Escribe tres cosas que agradeces hoy' },
      { id: 3, day: 3, title: 'Respira profundo 5 veces', description: 'Realiza 5 respiraciones profundas y conscientes' },
      { id: 4, day: 4, title: 'Medita 3 minutos', description: 'Aumenta tu tiempo de meditación a 3 minutos' },
      { id: 5, day: 5, title: 'Llama a un amigo', description: 'Conecta con alguien importante para ti' },
      { id: 6, day: 6, title: 'Escribe tus emociones', description: 'Dedica 5 minutos a escribir cómo te sientes' },
      { id: 7, day: 7, title: 'Camina sin teléfono', description: 'Sal a caminar 10 minutos sin distracciones digitales' },
      { id: 8, day: 8, title: 'Medita 4 minutos', description: 'Continúa aumentando tu práctica meditativa' },
      { id: 9, day: 9, title: 'Practica autocompasión', description: 'Trátate con la misma gentileza que a un buen amigo' },
      { id: 10, day: 10, title: 'Visualiza tu día ideal', description: 'Imagina y siente cómo sería tu día perfecto' },
      { id: 11, day: 11, title: 'Medita 5 minutos', description: 'Alcanza los 5 minutos de meditación diaria' },
      { id: 12, day: 12, title: 'Expresa gratitud a alguien', description: 'Agradece directamente a una persona especial' },
      { id: 13, day: 13, title: 'Desconéctate 1 hora', description: 'Pasa una hora sin dispositivos electrónicos' },
      { id: 14, day: 14, title: 'Medita 6 minutos', description: 'Sigue progresando en tu práctica de mindfulness' },
      { id: 15, day: 15, title: 'Haz algo que amas', description: 'Dedica tiempo a una actividad que realmente disfrutas' },
      { id: 16, day: 16, title: 'Escribe 3 logros', description: 'Reconoce tres cosas que has logrado recientemente' },
      { id: 17, day: 17, title: 'Medita 7 minutos', description: 'Continúa expandiendo tu capacidad de atención plena' },
      { id: 18, day: 18, title: 'Practica la escucha activa', description: 'En tus conversaciones, enfócate completamente en escuchar' },
      { id: 19, day: 19, title: 'Observa la naturaleza', description: 'Dedica tiempo a observar conscientemente la naturaleza' },
      { id: 20, day: 20, title: 'Medita 8 minutos', description: 'Alcanza los 8 minutos de meditación concentrada' },
      { id: 21, day: 21, title: 'Perdónate por algo', description: 'Practica el autoperdón por algún error pasado' },
      { id: 22, day: 22, title: 'Haz un acto de bondad', description: 'Realiza una acción amable hacia otra persona' },
      { id: 23, day: 23, title: 'Medita 9 minutos', description: 'Continúa fortaleciendo tu práctica meditativa' },
      { id: 24, day: 24, title: 'Reflexiona sobre tu crecimiento', description: 'Piensa en cómo has crecido en estas 3+ semanas' },
      { id: 25, day: 25, title: 'Desconéctate completamente', description: 'Pasa medio día sin redes sociales ni noticias' },
      { id: 26, day: 26, title: 'Medita 10 minutos', description: 'Alcanza los 10 minutos de meditación diaria' },
      { id: 27, day: 27, title: 'Escribe una carta a tu yo futuro', description: 'Redacta una carta motivacional para ti mismo' },
      { id: 28, day: 28, title: 'Celebra tus progresos', description: 'Reconoce y celebra todo lo que has logrado' },
      { id: 29, day: 29, title: 'Medita 12 minutos', description: 'Desafío final: 12 minutos de meditación profunda' },
      { id: 30, day: 30, title: 'Planifica tu bienestar futuro', description: 'Define cómo continuarás cuidando tu salud mental' },
    ]
  },
  {
    id: 'productivity',
    name: 'Productividad',
    icon: 'target',
    color: '#10b981',
    gradientColors: ['#10b981', '#059669'],
    challenges: [
      { id: 1, day: 1, title: 'Lista de 3 tareas', description: 'Escribe 3 tareas importantes para hoy y complétalas' },
      { id: 2, day: 2, title: 'Organiza tu escritorio', description: 'Despeja y organiza tu espacio de trabajo' },
      { id: 3, day: 3, title: 'Pomodoro de 25 minutos', description: 'Trabaja enfocado durante 25 minutos sin distracciones' },
      { id: 4, day: 4, title: 'Revisa tus objetivos', description: 'Dedica tiempo a revisar y ajustar tus metas' },
      { id: 5, day: 5, title: 'Elimina una distracción', description: 'Identifica y elimina algo que te distrae habitualmente' },
      { id: 6, day: 6, title: '2 Pomodoros seguidos', description: 'Realiza dos sesiones de trabajo concentrado de 25 minutos' },
      { id: 7, day: 7, title: 'Planifica la semana', description: 'Dedica tiempo a planificar las actividades de la próxima semana' },
      { id: 8, day: 8, title: 'Aprende algo nuevo 15 min', description: 'Dedica 15 minutos a aprender una nueva habilidad' },
      { id: 9, day: 9, title: 'Delega una tarea', description: 'Identifica algo que puedas delegar o automatizar' },
      { id: 10, day: 10, title: '3 Pomodoros', description: 'Completa tres sesiones de trabajo concentrado' },
      { id: 11, day: 11, title: 'Revisa tu progreso', description: 'Evalúa qué has logrado en estos primeros 10 días' },
      { id: 12, day: 12, title: 'Organiza archivos digitales', description: 'Ordena tus documentos y carpetas en el ordenador' },
      { id: 13, day: 13, title: 'Define prioridades', description: 'Identifica tus 3 prioridades más importantes del mes' },
      { id: 14, day: 14, title: 'Aprende 20 minutos', description: 'Aumenta tu tiempo de aprendizaje a 20 minutos' },
      { id: 15, day: 15, title: 'Elimina notificaciones', description: 'Desactiva notificaciones innecesarias de tus dispositivos' },
      { id: 16, day: 16, title: '4 Pomodoros', description: 'Desafíate con cuatro sesiones de trabajo concentrado' },
      { id: 17, day: 17, title: 'Crea un sistema', description: 'Desarrolla un sistema para una tarea que repites a menudo' },
      { id: 18, day: 18, title: 'Lee sobre productividad', description: 'Lee un artículo o capítulo sobre técnicas de productividad' },
      { id: 19, day: 19, title: 'Evalúa tus herramientas', description: 'Revisa las apps y herramientas que usas para trabajar' },
      { id: 20, day: 20, title: 'Aprende 25 minutos', description: 'Continúa expandiendo tus conocimientos durante 25 minutos' },
      { id: 21, day: 21, title: 'Planifica objetivos trimestrales', description: 'Define qué quieres lograr en los próximos 3 meses' },
      { id: 22, day: 22, title: '5 Pomodoros', description: 'Alcanza las cinco sesiones de trabajo concentrado' },
      { id: 23, day: 23, title: 'Optimiza una rutina', description: 'Mejora una rutina diaria para hacerla más eficiente' },
      { id: 24, day: 24, title: 'Networking 30 min', description: 'Dedica tiempo a conectar con profesionales de tu área' },
      { id: 25, day: 25, title: 'Aprende 30 minutos', description: 'Invierte media hora en desarrollar una habilidad nueva' },
      { id: 26, day: 26, title: 'Revisa y ajusta metas', description: 'Evalúa tus objetivos y haz ajustes si es necesario' },
      { id: 27, day: 27, title: 'Crea un plan de acción', description: 'Desarrolla un plan detallado para un proyecto importante' },
      { id: 28, day: 28, title: '6 Pomodoros', description: 'Desafío máximo: seis sesiones de trabajo concentrado' },
      { id: 29, day: 29, title: 'Comparte tu progreso', description: 'Cuenta a alguien sobre lo que has logrado este mes' },
      { id: 30, day: 30, title: 'Planifica el siguiente mes', description: 'Define tus objetivos y estrategias para el próximo mes' },
    ]
  }
];