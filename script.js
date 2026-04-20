const counterElement = document.getElementById('counter');
const decrementButton = document.getElementById('decrement-btn');
const incrementButton = document.getElementById('increment-btn');
const resetButton = document.getElementById('reset-btn');
const randomImageElement = document.getElementById('random-image');
const promptLogElement = document.getElementById('prompt-log');

const imageOptions = [
  'https://picsum.photos/seed/earth-night-01/640/360',
  'https://picsum.photos/seed/aurora-sky-02/640/360',
  'https://picsum.photos/seed/mountains-world-03/640/360',
  'https://picsum.photos/seed/ocean-planet-04/640/360',
  'https://picsum.photos/seed/forest-earth-05/640/360',
  'https://picsum.photos/seed/desert-world-06/640/360',
  'https://picsum.photos/seed/moon-craters-07/640/360',
  'https://picsum.photos/seed/saturn-rings-08/640/360',
  'https://picsum.photos/seed/nebula-color-09/640/360',
  'https://picsum.photos/seed/galaxy-stars-10/640/360',
  'https://picsum.photos/seed/jupiter-clouds-11/640/360',
  'https://picsum.photos/seed/milky-way-12/640/360',
  'https://picsum.photos/seed/planet-horizon-13/640/360',
  'https://picsum.photos/seed/earth-sunrise-14/640/360',
  'https://picsum.photos/seed/comet-tail-15/640/360',
  'https://picsum.photos/seed/deep-space-16/640/360'
];

const aiPrompts = [
  'Actúa como tutor de IA y explícame en 5 pasos cómo crear un prompt claro para principiantes.',
  'Resume este artículo técnico en 8 viñetas para ejecutivos, con riesgos y acciones recomendadas.',
  'Convierte estas notas sueltas en un plan de estudio de 4 semanas con metas semanales medibles.',
  'Dame 3 versiones de este correo: formal, cercano y breve; conserva el mismo objetivo.',
  'Analiza este texto y devuélveme tabla con: problema, causa raíz, impacto y propuesta de solución.',
  'Genera 10 ideas de contenido para redes sobre IA responsable con título, gancho y CTA.',
  'Explica este concepto de machine learning con analogía cotidiana y luego con definición técnica.',
  'Reescribe este prompt para mejorar precisión: añade rol, contexto, formato de salida y criterios de calidad.',
  'Evalúa esta respuesta de IA con rúbrica de 1 a 5 en claridad, exactitud, utilidad y sesgo potencial.',
  'Diseña un mini chatbot de soporte: intención, respuestas ejemplo, y fallback cuando no entienda.',
  'Dame un checklist para validar datos antes de entrenar un modelo (calidad, sesgo, privacidad).',
  'Genera preguntas de entrevista sobre IA generativa para nivel junior, medio y senior.',
  'Crea un prompt que compare dos herramientas de IA en costo, facilidad de uso y casos ideales.',
  'Propón 5 experimentos A/B para mejorar prompts en atención al cliente y cómo medir resultados.',
  'Transforma este texto largo en FAQ de 7 preguntas y respuestas claras para usuarios finales.',
  'Actúa como auditor: identifica alucinaciones potenciales en esta salida y sugiere cómo mitigarlas.'
];

let count = Number.parseInt(localStorage.getItem('counterValue') ?? '0', 10);

if (Number.isNaN(count)) {
  count = 0;
}

let imagePool = [];
let promptPool = [];

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const resetPools = () => {
  imagePool = shuffleArray(imageOptions);
  promptPool = shuffleArray(aiPrompts);
};

const appendPromptLine = (line) => {
  promptLogElement.value = `${promptLogElement.value}${line}\n`;
  promptLogElement.scrollTop = promptLogElement.scrollHeight;
};

const takeNextImage = () => {
  if (imagePool.length === 0) {
    return false;
  }

  randomImageElement.src = imagePool.pop();
  return true;
};

const takeNextPrompt = () => {
  if (promptPool.length === 0) {
    appendPromptLine('⚠️ Ya se mostraron todos los prompts. Presiona Reiniciar para volver a empezar.');
    return;
  }

  const nextPrompt = promptPool.pop();
  appendPromptLine(`• ${nextPrompt}`);
};

const updateCounter = () => {
  counterElement.textContent = count;
  localStorage.setItem('counterValue', String(count));

  counterElement.classList.add('bump');
  setTimeout(() => {
    counterElement.classList.remove('bump');
  }, 170);
};

const handlePlusOrMinus = (delta) => {
  count += delta;
  updateCounter();

  const changedImage = takeNextImage();
  if (!changedImage) {
    appendPromptLine('⚠️ Ya se mostraron todas las imágenes. Presiona Reiniciar para recargar la galería.');
  }

  takeNextPrompt();
};

incrementButton.addEventListener('click', () => {
  handlePlusOrMinus(1);
});

decrementButton.addEventListener('click', () => {
  handlePlusOrMinus(-1);
});

resetButton.addEventListener('click', () => {
  count = 0;
  updateCounter();
  promptLogElement.value = '';
  resetPools();
  takeNextImage();
  appendPromptLine('🔄 Reiniciado: imágenes y prompts habilitados nuevamente.');
});

resetPools();
updateCounter();
takeNextImage();
appendPromptLine('✨ Listo: cada clic en + o - agregará un prompt de IA y una imagen nueva.');
