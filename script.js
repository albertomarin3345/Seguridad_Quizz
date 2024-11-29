var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "¿Cómo se le llama  al procedimiento de seguridad que consiste en alejar a la población de la zona de peligro?",
    o : [
      "Desplazamiento Seguro",
      "Evacuación",
      "Escuela Abierta",
      "Zona Segura"
    ],
    a : 1 // arrays start with 0, so answer is 70 meters
  },
  {
    q : "Es la instrucción o aviso para que quienes se encuentran en espacios abiertos, jardines, pasillos, etc. Se resguarden de inmediato en el aula",
    o : [
      "Punto de reunión",
      "Aviso de emergencia",
      "Llamado de encierro",
      "Llamado de evacuación"
    ],
    a : 2
  },
  {
    q : "Es el lugar específico, predeterminado y señalado claramente en el patio, jardín o zona abierta de la escuela que sirve para concentrar a las personas en caso de fenómenos perturbadores.",
    o : [
      "Punto de reunión",
      "Ruta de evacuación",
      "Señalamientos",
      "Salida de emergencia"
    ],
    a : 0
  },
  {
    q : "Evento físico o acción potencialmente perjudicial, natural o derivada de la actividad humana, que puede causar pérdida de vidas o lesiones, daños materiales, grave perturbación de la vida social y económica o degradación ambiental.",
    o : [
      "Eventualidad",
      "Contingencia",
      "Crisis",
      "Amenaza"
    ],
    a : 3
  },
  {
    q : "Es la combinación de situaciones de riesgo y condiciones de vulnerabilidad, que ocurren a una o varias personas, incidiendo en sus actividades cotidianas, que rebasan su capacidad de atención, requiriendo de apoyo externo.",
    o : [
      "Amenaza",
      "Crisis",
      "Contingencia",
      "Emergencia"
    ],
    a : 1
  },
  {
    q : "Representación mediante una simulación de las acciones de respuesta previamente planeadas con el fin de observar, probar y corregir una respuesta eficaz ante posibles situaciones reales de emergencia o desastre.",
    o : [
      "Intervención en crisis",
      "Representación de posibles riesgos",
      "Simulacro",
      "Prevención de riesgos"
    ],
    a : 2
  },
  {
    q : "Espacio territorial determinado en el que existe la probabilidad de que se produzca un daño, originado por un fenómeno perturbador",
    o : [
      "Zona de riesgo",
      "Zona de desastre",
      "Punto de reunión",
      "Riesgo inminente"
    ],
    a : 0
  },
  {
    q : "Acto mediante el cual una persona domina sus temores y ansiedades para enfocarse en la solución de una crisis.",
    o : [
      "Manejo de situación",
      "Respuesta corporal",
      "Conocimiento de sí mismo",
      "Autocontrol"
    ],
    a : 3
  },
  {
    q : "Grupo de personas capacitadas, equipadas y coordinadas por las autoridades, los responsables o administradores, aplican sus conocimientos para implementar las medidas de Gestión Integral de Riesgos y Protección Civil en un inmueble o comunidad ante una emergencia o desastre.",
    o : [
      "Contingente",
      "Personal escolar",
      "Brigadas",
      "Protección Civil"
    ],
    a : 3
  },
  {
    q : "Plan escrito y detallado de un programa de acción que se realiza ante una emergencia o desastre.",
    o : [
      "Guía de actuación",
      "Plan de contingencia",
      "Protocolo",
      "Implementación de acciones"
    ],
    a : 2
  }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `Respondiste ${quiz.score} de ${quiz.data.length} correctamente.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);