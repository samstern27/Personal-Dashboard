const greetings = {
  English: {
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
  },
  Spanish: {
    goodMorning: "Buenos días",
    goodAfternoon: "Buenas tardes",
    goodEvening: "Buenas noches",
  },
  French: {
    goodMorning: "Bonjour",
    goodAfternoon: "Bon après-midi",
    goodEvening: "Bonsoir",
  },
  German: {
    goodMorning: "Guten Morgen",
    goodAfternoon: "Guten Tag",
    goodEvening: "Guten Abend",
  },
  Italian: {
    goodMorning: "Buongiorno",
    goodAfternoon: "Buon pomeriggio",
    goodEvening: "Buonasera",
  },
  Portuguese: {
    goodMorning: "Bom dia",
    goodAfternoon: "Boa tarde",
    goodEvening: "Boa noite",
  },
  Dutch: {
    goodMorning: "Goedemorgen",
    goodAfternoon: "Goedemiddag",
    goodEvening: "Goedenavond",
  },
  Russian: {
    goodMorning: "Доброе утро",
    goodAfternoon: "Добрый день",
    goodEvening: "Добрый вечер",
  },
  Chinese: {
    goodMorning: "早上好",
    goodAfternoon: "下午好",
    goodEvening: "晚上好",
  },
  Japanese: {
    goodMorning: "おはようございます",
    goodAfternoon: "こんにちは",
    goodEvening: "こんばんは",
  },
  Korean: {
    goodMorning: "좋은 아침",
    goodAfternoon: "좋은 오후",
    goodEvening: "좋은 저녁",
  },
  Arabic: {
    goodMorning: "صباح الخير",
    goodAfternoon: "مساء الخير",
    goodEvening: "مساء الخير",
  },
  Hindi: {
    goodMorning: "सुप्रभात",
    goodAfternoon: "नमस्कार",
    goodEvening: "शुभ संध्या",
  },
  Bengali: {
    goodMorning: "সুপ্রভাত",
    goodAfternoon: "শুভ অপরাহ্ন",
    goodEvening: "শুভ সন্ধ্যা",
  },
  Turkish: {
    goodMorning: "Günaydın",
    goodAfternoon: "İyi öğleden sonra",
    goodEvening: "İyi akşamlar",
  },
  Greek: {
    goodMorning: "Καλημέρα",
    goodAfternoon: "Καλό απόγευμα",
    goodEvening: "Καλησπέρα",
  },
  Hebrew: {
    goodMorning: "בוקר טוב",
    goodAfternoon: "צהריים טובים",
    goodEvening: "ערב טוב",
  },
  Thai: {
    goodMorning: "สวัสดีตอนเช้า",
    goodAfternoon: "สวัสดีตอนบ่าย",
    goodEvening: "สวัสดีตอนเย็น",
  },
  Vietnamese: {
    goodMorning: "Chào buổi sáng",
    goodAfternoon: "Chào buổi chiều",
    goodEvening: "Chào buổi tối",
  },
  Ukrainian: {
    goodMorning: "Доброго ранку",
    goodAfternoon: "Доброго дня",
    goodEvening: "Доброго вечора",
  },
  Polish: {
    goodMorning: "Dzień dobry",
    goodAfternoon: "Dzień dobry",
    goodEvening: "Dobry wieczór",
  },
  Swedish: {
    goodMorning: "God morgon",
    goodAfternoon: "God eftermiddag",
    goodEvening: "God kväll",
  },
  Norwegian: {
    goodMorning: "God morgen",
    goodAfternoon: "God ettermiddag",
    goodEvening: "God kveld",
  },
  Danish: {
    goodMorning: "God morgen",
    goodAfternoon: "God eftermiddag",
    goodEvening: "God aften",
  },
  Finnish: {
    goodMorning: "Hyvää huomenta",
    goodAfternoon: "Hyvää iltapäivää",
    goodEvening: "Hyvää iltaa",
  },
  Hungarian: {
    goodMorning: "Jó reggelt",
    goodAfternoon: "Jó napot",
    goodEvening: "Jó estét",
  },
  Czech: {
    goodMorning: "Dobré ráno",
    goodAfternoon: "Dobré odpoledne",
    goodEvening: "Dobrý večer",
  },
  Slovak: {
    goodMorning: "Dobré ráno",
    goodAfternoon: "Dobré popoludnie",
    goodEvening: "Dobrý večer",
  },
  Romanian: {
    goodMorning: "Bună dimineața",
    goodAfternoon: "Bună ziua",
    goodEvening: "Bună seara",
  },
  Serbian: {
    goodMorning: "Добро јутро",
    goodAfternoon: "Добар дан",
    goodEvening: "Добро вече",
  },
  Croatian: {
    goodMorning: "Dobro jutro",
    goodAfternoon: "Dobar dan",
    goodEvening: "Dobra večer",
  },
  Bulgarian: {
    goodMorning: "Добро утро",
    goodAfternoon: "Добър ден",
    goodEvening: "Добър вечер",
  },
  Lithuanian: {
    goodMorning: "Labas rytas",
    goodAfternoon: "Laba diena",
    goodEvening: "Labas vakaras",
  },
  Latvian: {
    goodMorning: "Labrīt",
    goodAfternoon: "Labdien",
    goodEvening: "Labvakar",
  },
  Estonian: {
    goodMorning: "Tere hommikust",
    goodAfternoon: "Tere päevast",
    goodEvening: "Tere õhtust",
  },
  Indonesian: {
    goodMorning: "Selamat pagi",
    goodAfternoon: "Selamat siang",
    goodEvening: "Selamat malam",
  },
  Malay: {
    goodMorning: "Selamat pagi",
    goodAfternoon: "Selamat petang",
    goodEvening: "Selamat malam",
  },
  Filipino: {
    goodMorning: "Magandang umaga",
    goodAfternoon: "Magandang hapon",
    goodEvening: "Magandang gabi",
  },
  Swahili: {
    goodMorning: "Habari za asubuhi",
    goodAfternoon: "Habari za mchana",
    goodEvening: "Habari za jioni",
  },
  Zulu: {
    goodMorning: "Sawubona ekuseni",
    goodAfternoon: "Sawubona emini",
    goodEvening: "Sawubona kusihlwa",
  },
  Xhosa: {
    goodMorning: "Molo ekuseni",
    goodAfternoon: "Molo emini",
    goodEvening: "Molo ngokuhlwa",
  },
  Yoruba: {
    goodMorning: "E kaaro",
    goodAfternoon: "E kaasan",
    goodEvening: "E kaale",
  },
  Hausa: {
    goodMorning: "Ina kwana",
    goodAfternoon: "Ina yini",
    goodEvening: "Barka da yamma",
  },
  Persian: {
    goodMorning: "صبح بخیر",
    goodAfternoon: "بعد از ظهر بخیر",
    goodEvening: "شب بخیر",
  },
  Pashto: {
    goodMorning: "سهار مو پخیر",
    goodAfternoon: "ماښام مو پخیر",
    goodEvening: "ماښام مو نیکمرغه",
  },
};

console.log(greetings);

export default greetings;
