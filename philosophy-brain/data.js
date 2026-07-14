const PHILOSOPHY_DATA = {
  "nodes": [
    {
      "id": "socrates",
      "name": "Sócrates",
      "type": "filosofo",
      "era": "Antigua",
      "desc": "Filósofo ateniense que desarrolló el método mayéutico (preguntas sucesivas) para examinar creencias. No dejó obra escrita; se le conoce por los diálogos de Platón."
    },
    {
      "id": "plato",
      "name": "Platón",
      "type": "filosofo",
      "era": "Antigua",
      "desc": "Discípulo de Sócrates, fundador de la Academia. Propuso la teoría de las Formas o Ideas como realidad última."
    },
    {
      "id": "aristoteles",
      "name": "Aristóteles",
      "type": "filosofo",
      "era": "Antigua",
      "desc": "Discípulo de Platón, fundador del Liceo. Sistematizó la lógica y defendió el empirismo frente al idealismo de su maestro."
    },
    {
      "id": "heraclito",
      "name": "Heráclito",
      "type": "filosofo",
      "era": "Antigua",
      "desc": "Filósofo presocrático conocido por la doctrina del devenir constante: 'todo fluye' (panta rhei)."
    },
    {
      "id": "parmenides",
      "name": "Parménides",
      "type": "filosofo",
      "era": "Antigua",
      "desc": "Presocrático que sostuvo que el ser es inmutable y uno; el cambio es ilusorio."
    },
    {
      "id": "pitagoras",
      "name": "Pitágoras",
      "type": "filosofo",
      "era": "Antigua",
      "desc": "Filósofo y matemático que vio en el número la esencia última de la realidad."
    },
    {
      "id": "epicuro",
      "name": "Epicuro",
      "type": "filosofo",
      "era": "Antigua",
      "desc": "Fundador del epicureísmo: la felicidad se alcanza mediante el placer moderado y la ausencia de perturbación (ataraxia)."
    },
    {
      "id": "zenon_citio",
      "name": "Zenón de Citio",
      "type": "filosofo",
      "era": "Antigua",
      "desc": "Fundador del estoicismo, escuela centrada en la virtud y el dominio de las pasiones."
    },
    {
      "id": "platonismo",
      "name": "Platonismo",
      "type": "escuela",
      "era": "Antigua",
      "desc": "Corriente que sostiene la existencia de un mundo de Ideas perfectas e inmutables, separado del mundo sensible."
    },
    {
      "id": "aristotelismo",
      "name": "Aristotelismo",
      "type": "escuela",
      "era": "Antigua",
      "desc": "Corriente basada en la lógica, la observación empírica y la teoría del hilemorfismo (forma y materia)."
    },
    {
      "id": "estoicismo",
      "name": "Estoicismo",
      "type": "escuela",
      "era": "Antigua",
      "desc": "Escuela que busca la virtud viviendo en acuerdo con la razón y la naturaleza, aceptando lo que no depende de uno."
    },
    {
      "id": "epicureismo",
      "name": "Epicureísmo",
      "type": "escuela",
      "era": "Antigua",
      "desc": "Escuela hedonista moderada que busca el placer estable y la ausencia de dolor."
    },
    {
      "id": "escepticismo",
      "name": "Escepticismo",
      "type": "escuela",
      "era": "Antigua",
      "desc": "Corriente que suspende el juicio (epojé) ante la imposibilidad de alcanzar certeza absoluta."
    },
    {
      "id": "agustin",
      "name": "San Agustín",
      "type": "filosofo",
      "era": "Medieval",
      "desc": "Filósofo cristiano que fusionó el platonismo con la teología, centrando la verdad en la interioridad del alma."
    },
    {
      "id": "aquino",
      "name": "Tomás de Aquino",
      "type": "filosofo",
      "era": "Medieval",
      "desc": "Teólogo escolástico que armonizó la filosofía aristotélica con la fe cristiana."
    },
    {
      "id": "averroes",
      "name": "Averroes",
      "type": "filosofo",
      "era": "Medieval",
      "desc": "Filósofo andalusí que comentó extensamente a Aristóteles, influyendo en la escolástica europea."
    },
    {
      "id": "avicena",
      "name": "Avicena",
      "type": "filosofo",
      "era": "Medieval",
      "desc": "Filósofo y médico persa que combinó el aristotelismo con la metafísica islámica."
    },
    {
      "id": "escolastica",
      "name": "Escolástica",
      "type": "escuela",
      "era": "Medieval",
      "desc": "Método filosófico-teológico medieval que buscaba conciliar razón y fe mediante la lógica aristotélica."
    },
    {
      "id": "descartes",
      "name": "René Descartes",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Padre del racionalismo moderno. Su duda metódica culmina en 'pienso, luego existo' (cogito ergo sum)."
    },
    {
      "id": "spinoza",
      "name": "Baruch Spinoza",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Racionalista que propuso un monismo panteísta: Dios y la Naturaleza son una misma sustancia."
    },
    {
      "id": "leibniz",
      "name": "Gottfried Leibniz",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Racionalista que concibió la realidad como una infinidad de mónadas armonizadas por Dios."
    },
    {
      "id": "locke",
      "name": "John Locke",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Empirista que sostuvo que la mente nace como una tabula rasa, llenada por la experiencia."
    },
    {
      "id": "hume",
      "name": "David Hume",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Empirista escéptico que cuestionó la causalidad como hábito de la mente, no como necesidad lógica."
    },
    {
      "id": "berkeley",
      "name": "George Berkeley",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Empirista idealista: 'ser es ser percibido' (esse est percipi)."
    },
    {
      "id": "hobbes",
      "name": "Thomas Hobbes",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Filósofo político que describió el estado de naturaleza como guerra de todos contra todos, resuelto por el contrato social."
    },
    {
      "id": "rousseau",
      "name": "Jean-Jacques Rousseau",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Pensador del contrato social basado en la voluntad general y la bondad natural del hombre."
    },
    {
      "id": "kant",
      "name": "Immanuel Kant",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Sintetizó racionalismo y empirismo en el idealismo trascendental; propuso el imperativo categórico en ética."
    },
    {
      "id": "hegel",
      "name": "G. W. F. Hegel",
      "type": "filosofo",
      "era": "Moderna",
      "desc": "Idealista que concibió la historia como despliegue dialéctico del Espíritu (tesis-antítesis-síntesis)."
    },
    {
      "id": "racionalismo",
      "name": "Racionalismo",
      "type": "escuela",
      "era": "Moderna",
      "desc": "Corriente que sostiene que la razón, no la experiencia, es la fuente principal del conocimiento."
    },
    {
      "id": "empirismo",
      "name": "Empirismo",
      "type": "escuela",
      "era": "Moderna",
      "desc": "Corriente que sostiene que todo conocimiento proviene de la experiencia sensible."
    },
    {
      "id": "idealismo_aleman",
      "name": "Idealismo alemán",
      "type": "escuela",
      "era": "Moderna",
      "desc": "Corriente que sitúa a la razón o el espíritu como estructurantes de la realidad conocida."
    },
    {
      "id": "contrato_social",
      "name": "Contractualismo",
      "type": "concepto",
      "era": "Moderna",
      "desc": "Teoría política según la cual la legitimidad del poder surge de un pacto entre individuos."
    },
    {
      "id": "dialectica",
      "name": "Dialéctica",
      "type": "concepto",
      "era": "Moderna",
      "desc": "Método de razonamiento por oposición de contrarios (tesis-antítesis-síntesis) que resuelve contradicciones en un plano superior."
    },
    {
      "id": "imperativo_categorico",
      "name": "Imperativo categórico",
      "type": "concepto",
      "era": "Moderna",
      "desc": "Principio ético kantiano: obra sólo según una máxima que puedas querer que se vuelva ley universal."
    },
    {
      "id": "marx",
      "name": "Karl Marx",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Invirtió la dialéctica hegeliana en materialismo histórico: la base económica determina la superestructura social."
    },
    {
      "id": "nietzsche",
      "name": "Friedrich Nietzsche",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Crítico radical de la moral tradicional; propuso la voluntad de poder y el eterno retorno."
    },
    {
      "id": "kierkegaard",
      "name": "Søren Kierkegaard",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Padre del existencialismo; enfatizó la angustia y el salto de fe frente al sistema racional de Hegel."
    },
    {
      "id": "schopenhauer",
      "name": "Arthur Schopenhauer",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Sostuvo que una voluntad ciega e irracional subyace a toda la realidad, fuente de sufrimiento."
    },
    {
      "id": "mill",
      "name": "John Stuart Mill",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Desarrolló el utilitarismo, evaluando las acciones por su capacidad de maximizar el bienestar general."
    },
    {
      "id": "bentham",
      "name": "Jeremy Bentham",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Fundador del utilitarismo clásico: el bien es lo que maximiza el placer y minimiza el dolor."
    },
    {
      "id": "utilitarismo",
      "name": "Utilitarismo",
      "type": "escuela",
      "era": "Contemporánea",
      "desc": "Ética consecuencialista que juzga las acciones según la utilidad o felicidad que producen."
    },
    {
      "id": "existencialismo",
      "name": "Existencialismo",
      "type": "escuela",
      "era": "Contemporánea",
      "desc": "Corriente centrada en la existencia individual, la libertad y la angustia de decidir sin esencia previa."
    },
    {
      "id": "marxismo",
      "name": "Marxismo",
      "type": "escuela",
      "era": "Contemporánea",
      "desc": "Teoría social y política basada en el materialismo histórico y la lucha de clases."
    },
    {
      "id": "husserl",
      "name": "Edmund Husserl",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Fundador de la fenomenología: estudio de las estructuras de la conciencia mediante la reducción eidética."
    },
    {
      "id": "heidegger",
      "name": "Martin Heidegger",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Discípulo de Husserl; investigó el sentido del Ser a través del análisis del Dasein (el ser-ahí humano)."
    },
    {
      "id": "sartre",
      "name": "Jean-Paul Sartre",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Existencialista ateo: 'la existencia precede a la esencia'; el hombre está condenado a ser libre."
    },
    {
      "id": "camus",
      "name": "Albert Camus",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Filósofo del absurdo: la vida carece de sentido último, pero cabe rebelarse afirmándola (Sísifo feliz)."
    },
    {
      "id": "wittgenstein",
      "name": "Ludwig Wittgenstein",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Transformó la filosofía del lenguaje: del atomismo lógico del Tractatus a los juegos de lenguaje de las Investigaciones."
    },
    {
      "id": "foucault",
      "name": "Michel Foucault",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Analizó cómo el poder y el saber se entrelazan para producir sujetos e instituciones (prisión, clínica, sexualidad)."
    },
    {
      "id": "derrida",
      "name": "Jacques Derrida",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Creador de la deconstrucción: desmonta las oposiciones binarias ocultas en los textos filosóficos."
    },
    {
      "id": "habermas",
      "name": "Jürgen Habermas",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Teórico de la acción comunicativa: la razón se legitima en el diálogo racional entre sujetos libres."
    },
    {
      "id": "rawls",
      "name": "John Rawls",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Renovó el contractualismo con la 'posición original' y el 'velo de ignorancia' para fundar la justicia como equidad."
    },
    {
      "id": "arendt",
      "name": "Hannah Arendt",
      "type": "filosofo",
      "era": "Contemporánea",
      "desc": "Analizó los totalitarismos y la 'banalidad del mal'; reflexionó sobre la acción política y la esfera pública."
    },
    {
      "id": "fenomenologia",
      "name": "Fenomenología",
      "type": "escuela",
      "era": "Contemporánea",
      "desc": "Estudio descriptivo de los fenómenos tal como se presentan a la conciencia, suspendiendo presupuestos previos."
    },
    {
      "id": "filosofia_analitica",
      "name": "Filosofía analítica",
      "type": "escuela",
      "era": "Contemporánea",
      "desc": "Tradición que privilegia el análisis lógico y lingüístico riguroso de los problemas filosóficos."
    },
    {
      "id": "postestructuralismo",
      "name": "Posestructuralismo",
      "type": "escuela",
      "era": "Contemporánea",
      "desc": "Corriente que cuestiona las estructuras fijas de significado, poder y verdad postuladas por el estructuralismo."
    },
    {
      "id": "voluntad_poder",
      "name": "Voluntad de poder",
      "type": "concepto",
      "era": "Contemporánea",
      "desc": "Concepto nietzscheano: el impulso fundamental de todo ser vivo a expandir y afirmar su propia fuerza."
    },
    {
      "id": "confucio",
      "name": "Confucio",
      "type": "filosofo",
      "era": "Oriental",
      "desc": "Pensador chino centrado en la virtud, el ritual (li) y las relaciones sociales armoniosas."
    },
    {
      "id": "laozi",
      "name": "Laozi",
      "type": "filosofo",
      "era": "Oriental",
      "desc": "Fundador tradicional del taoísmo; autor atribuido del Tao Te Ching, sobre el Tao y el no-actuar (wu wei)."
    },
    {
      "id": "zhuangzi",
      "name": "Zhuangzi",
      "type": "filosofo",
      "era": "Oriental",
      "desc": "Filósofo taoísta que exploró la relatividad de los puntos de vista y la espontaneidad natural."
    },
    {
      "id": "buda",
      "name": "Siddhartha Gautama (Buda)",
      "type": "filosofo",
      "era": "Oriental",
      "desc": "Fundador del budismo; enseñó las Cuatro Nobles Verdades y el camino para cesar el sufrimiento (dukkha)."
    },
    {
      "id": "nagarjuna",
      "name": "Nāgārjuna",
      "type": "filosofo",
      "era": "Oriental",
      "desc": "Filósofo budista fundador de la escuela Madhyamaka; desarrolló el concepto de vacuidad (śūnyatā)."
    },
    {
      "id": "shankara",
      "name": "Adi Shankara",
      "type": "filosofo",
      "era": "Oriental",
      "desc": "Filósofo hindú que sistematizó el Advaita Vedanta: la no-dualidad entre el Atman individual y el Brahman universal."
    },
    {
      "id": "confucianismo",
      "name": "Confucianismo",
      "type": "escuela",
      "era": "Oriental",
      "desc": "Tradición ético-política china centrada en la piedad filial, el ritual y la virtud del gobernante."
    },
    {
      "id": "taoismo",
      "name": "Taoísmo",
      "type": "escuela",
      "era": "Oriental",
      "desc": "Tradición china centrada en vivir en armonía con el Tao mediante la espontaneidad y el no-esfuerzo."
    },
    {
      "id": "budismo",
      "name": "Budismo",
      "type": "escuela",
      "era": "Oriental",
      "desc": "Tradición fundada por Buda que busca el fin del sufrimiento mediante la comprensión de la impermanencia y el desapego."
    },
    {
      "id": "advaita_vedanta",
      "name": "Advaita Vedanta",
      "type": "escuela",
      "era": "Oriental",
      "desc": "Escuela hindú no-dualista: la realidad última es una conciencia única sin segundo (Brahman)."
    },
    {
      "id": "tao",
      "name": "Tao",
      "type": "concepto",
      "era": "Oriental",
      "desc": "El principio último e inefable que fluye a través de todas las cosas en el pensamiento chino."
    },
    {
      "id": "wu_wei",
      "name": "Wu wei",
      "type": "concepto",
      "era": "Oriental",
      "desc": "'No-acción' o acción sin esfuerzo forzado, en armonía espontánea con el Tao."
    },
    {
      "id": "nirvana",
      "name": "Nirvana",
      "type": "concepto",
      "era": "Oriental",
      "desc": "Cese del sufrimiento y del ciclo de renacimientos al extinguir el deseo y la ignorancia, en el budismo."
    },
    {
      "id": "sunyata",
      "name": "Vacuidad (śūnyatā)",
      "type": "concepto",
      "era": "Oriental",
      "desc": "En el budismo Madhyamaka, la ausencia de existencia inherente y fija en todos los fenómenos."
    }
  ],
  "edges": [
    {
      "source": "socrates",
      "target": "plato",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "plato",
      "target": "aristoteles",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "heraclito",
      "target": "parmenides",
      "relation": "opuso",
      "label": "se opone a"
    },
    {
      "source": "plato",
      "target": "platonismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "aristoteles",
      "target": "aristotelismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "socrates",
      "target": "estoicismo",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "zenon_citio",
      "target": "estoicismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "epicuro",
      "target": "epicureismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "pitagoras",
      "target": "platonismo",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "parmenides",
      "target": "platonismo",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "escepticismo",
      "target": "platonismo",
      "relation": "critico",
      "label": "cuestiona la certeza de"
    },
    {
      "source": "platonismo",
      "target": "agustin",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "aristotelismo",
      "target": "aquino",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "aristoteles",
      "target": "averroes",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "aristoteles",
      "target": "avicena",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "averroes",
      "target": "aquino",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "avicena",
      "target": "escolastica",
      "relation": "parte_de",
      "label": "aporta a"
    },
    {
      "source": "agustin",
      "target": "escolastica",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "aquino",
      "target": "escolastica",
      "relation": "parte_de",
      "label": "sistematizó"
    },
    {
      "source": "descartes",
      "target": "racionalismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "spinoza",
      "target": "racionalismo",
      "relation": "parte_de",
      "label": "pertenece a"
    },
    {
      "source": "leibniz",
      "target": "racionalismo",
      "relation": "parte_de",
      "label": "pertenece a"
    },
    {
      "source": "descartes",
      "target": "spinoza",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "descartes",
      "target": "leibniz",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "locke",
      "target": "empirismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "hume",
      "target": "empirismo",
      "relation": "parte_de",
      "label": "radicalizó"
    },
    {
      "source": "berkeley",
      "target": "empirismo",
      "relation": "parte_de",
      "label": "pertenece a"
    },
    {
      "source": "locke",
      "target": "berkeley",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "berkeley",
      "target": "hume",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "racionalismo",
      "target": "kant",
      "relation": "influyo",
      "label": "influyó en (tesis)"
    },
    {
      "source": "empirismo",
      "target": "kant",
      "relation": "influyo",
      "label": "influyó en (antítesis)"
    },
    {
      "source": "hume",
      "target": "kant",
      "relation": "influyo",
      "label": "lo despertó del sueño dogmático"
    },
    {
      "source": "kant",
      "target": "imperativo_categorico",
      "relation": "desarrollo",
      "label": "formuló"
    },
    {
      "source": "kant",
      "target": "idealismo_aleman",
      "relation": "fundo",
      "label": "inauguró"
    },
    {
      "source": "kant",
      "target": "hegel",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "hegel",
      "target": "idealismo_aleman",
      "relation": "parte_de",
      "label": "culminó"
    },
    {
      "source": "hegel",
      "target": "dialectica",
      "relation": "desarrollo",
      "label": "sistematizó"
    },
    {
      "source": "hobbes",
      "target": "contrato_social",
      "relation": "desarrollo",
      "label": "formuló"
    },
    {
      "source": "hobbes",
      "target": "rousseau",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "locke",
      "target": "contrato_social",
      "relation": "desarrollo",
      "label": "reformuló"
    },
    {
      "source": "rousseau",
      "target": "contrato_social",
      "relation": "desarrollo",
      "label": "reformuló"
    },
    {
      "source": "rousseau",
      "target": "kant",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "contrato_social",
      "target": "rawls",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "hegel",
      "target": "marx",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "marx",
      "target": "dialectica",
      "relation": "desarrollo",
      "label": "invirtió (materialismo histórico)"
    },
    {
      "source": "marx",
      "target": "marxismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "hegel",
      "target": "kierkegaard",
      "relation": "opuso",
      "label": "se opuso a su sistema"
    },
    {
      "source": "kierkegaard",
      "target": "existencialismo",
      "relation": "fundo",
      "label": "sentó las bases de"
    },
    {
      "source": "schopenhauer",
      "target": "nietzsche",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "nietzsche",
      "target": "voluntad_poder",
      "relation": "desarrollo",
      "label": "formuló"
    },
    {
      "source": "nietzsche",
      "target": "existencialismo",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "bentham",
      "target": "utilitarismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "bentham",
      "target": "mill",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "mill",
      "target": "utilitarismo",
      "relation": "parte_de",
      "label": "refinó"
    },
    {
      "source": "husserl",
      "target": "fenomenologia",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "husserl",
      "target": "heidegger",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "heidegger",
      "target": "fenomenologia",
      "relation": "parte_de",
      "label": "reorientó (ontología)"
    },
    {
      "source": "kierkegaard",
      "target": "heidegger",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "heidegger",
      "target": "sartre",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "nietzsche",
      "target": "sartre",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "sartre",
      "target": "existencialismo",
      "relation": "parte_de",
      "label": "sistematizó"
    },
    {
      "source": "sartre",
      "target": "camus",
      "relation": "opuso",
      "label": "debatió con"
    },
    {
      "source": "camus",
      "target": "existencialismo",
      "relation": "parte_de",
      "label": "próximo a (filosofía del absurdo)"
    },
    {
      "source": "wittgenstein",
      "target": "filosofia_analitica",
      "relation": "parte_de",
      "label": "transformó"
    },
    {
      "source": "heidegger",
      "target": "foucault",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "nietzsche",
      "target": "foucault",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "foucault",
      "target": "postestructuralismo",
      "relation": "parte_de",
      "label": "pertenece a"
    },
    {
      "source": "heidegger",
      "target": "derrida",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "derrida",
      "target": "postestructuralismo",
      "relation": "fundo",
      "label": "fundó (deconstrucción)"
    },
    {
      "source": "marx",
      "target": "habermas",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "kant",
      "target": "habermas",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "kant",
      "target": "rawls",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "hegel",
      "target": "arendt",
      "relation": "influyo",
      "label": "influyó en (marco histórico)"
    },
    {
      "source": "heidegger",
      "target": "arendt",
      "relation": "influyo",
      "label": "fue su maestro"
    },
    {
      "source": "confucio",
      "target": "confucianismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "laozi",
      "target": "taoismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "laozi",
      "target": "tao",
      "relation": "desarrollo",
      "label": "formuló"
    },
    {
      "source": "laozi",
      "target": "wu_wei",
      "relation": "desarrollo",
      "label": "formuló"
    },
    {
      "source": "zhuangzi",
      "target": "taoismo",
      "relation": "parte_de",
      "label": "desarrolló"
    },
    {
      "source": "confucianismo",
      "target": "taoismo",
      "relation": "opuso",
      "label": "contrasta con"
    },
    {
      "source": "buda",
      "target": "budismo",
      "relation": "fundo",
      "label": "fundó"
    },
    {
      "source": "buda",
      "target": "nirvana",
      "relation": "desarrollo",
      "label": "formuló"
    },
    {
      "source": "nagarjuna",
      "target": "budismo",
      "relation": "parte_de",
      "label": "sistematizó (Madhyamaka)"
    },
    {
      "source": "nagarjuna",
      "target": "sunyata",
      "relation": "desarrollo",
      "label": "formuló"
    },
    {
      "source": "shankara",
      "target": "advaita_vedanta",
      "relation": "fundo",
      "label": "sistematizó"
    },
    {
      "source": "budismo",
      "target": "advaita_vedanta",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "buda",
      "target": "schopenhauer",
      "relation": "influyo",
      "label": "influyó en"
    },
    {
      "source": "advaita_vedanta",
      "target": "schopenhauer",
      "relation": "influyo",
      "label": "influyó en"
    }
  ]
};
