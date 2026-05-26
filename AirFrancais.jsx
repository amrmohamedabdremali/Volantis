import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   AIRFRANÇAIS — French A2 Cabin Crew Language Learning App
   UI/UX Prototype with 10 complete lessons
   Design: Pixel-art retro × French elegance × Aviation mood
═══════════════════════════════════════════════════════════ */

const C = {
  navy:   '#08142E', darkBlue:'#0D1E40', blue:'#1B3A6B', blueM:'#2952A3',
  blueL:  '#5B8DD9', red:'#BF2D2D',     redL:'#E04545', cream:'#F4EFE4',
  gold:   '#D4A017', goldL:'#F0C43A',   teal:'#1E7EA1', cedar:'#2D6A4F',
  sand:   '#C8A87A', white:'#FFFFFF',
  glass:  'rgba(255,255,255,0.06)', glassMed:'rgba(255,255,255,0.11)',
  glassH: 'rgba(255,255,255,0.20)', card:'rgba(244,239,228,0.97)',
};

const CATS = [
  { id:'boarding',   label:'Boarding',        fr:'Embarquement',  emoji:'🛫', color:'#1B3A6B', accent:'#5B8DD9' },
  { id:'safety',     label:'Safety',           fr:'Sécurité',      emoji:'🛡️', color:'#8B1A1A', accent:'#E04545' },
  { id:'service',    label:'In-Flight Service',fr:'Service en vol',emoji:'🥂', color:'#1E5E3A', accent:'#3CA068' },
  { id:'assistance', label:'Passenger Help',   fr:'Assistance',    emoji:'🤝', color:'#7A5A00', accent:'#D4A017' },
  { id:'info',       label:'Flight Info',      fr:'Informations',  emoji:'✈️', color:'#0E5070', accent:'#1E9FCC' },
  { id:'complaints', label:'Complaints',       fr:'Réclamations',  emoji:'⚠️', color:'#5A1A7A', accent:'#A855D4' },
  { id:'landing',    label:'Landing',          fr:'Atterrissage',  emoji:'🛬', color:'#7A3000', accent:'#E67E22' },
];

const LESSONS = [
  {
    id:1, cat:'boarding', emoji:'🛫',
    title:'Welcoming a Passenger', fr:'Accueillir un passager', xp:50, done:false,
    sit_en:'A passenger boards the plane. The flight attendant welcomes them warmly and checks their boarding pass.',
    sit_ar:'يصعد المسافر على متن الطائرة. مضيف الطيران يرحب به بحرارة ويتحقق من بطاقة صعوده.',
    vocab:[
      {fr:'Bonjour',                 en:'Hello / Good morning',   ar:'أهلاً / صباح الخير',          pron:'bon-ZHOOR'},
      {fr:'Bienvenue à bord',        en:'Welcome on board',       ar:'أهلاً بك على متن الطائرة',    pron:'byaN-vuh-NEW ah BOR'},
      {fr:'Monsieur / Madame',       en:'Sir / Madam',            ar:'سيدي / سيدتي',               pron:'muh-SYUH / mah-DAM'},
      {fr:"Carte d'embarquement",    en:'Boarding pass',          ar:'بطاقة الصعود',               pron:'kart daN-bar-kuh-maN'},
      {fr:'Votre siège',             en:'Your seat',              ar:'مقعدك',                       pron:'votr SYEZH'},
      {fr:'Par ici',                 en:'This way',               ar:'من هنا',                      pron:'par ee-SEE'},
      {fr:"S'il vous plaît",         en:'Please',                 ar:'من فضلك',                    pron:'seel-voo-PLEH'},
      {fr:'Je vous en prie',         en:"You're welcome",         ar:'على الرحب والسعة',            pron:'zhuh-voo-zaN-PREE'},
    ],
    dialogue:[
      {spk:'FA',fr:'Bonjour Monsieur, bienvenue à bord !',                          en:'Hello sir, welcome on board!',                   ar:'صباح الخير يا سيدي، أهلاً بك على متن الطائرة!'},
      {spk:'P', fr:'Bonjour, merci.',                                                en:'Hello, thank you.',                              ar:'صباح الخير، شكراً.'},
      {spk:'FA',fr:"Puis-je voir votre carte d'embarquement, s'il vous plaît ?",    en:'May I see your boarding pass, please?',          ar:'ممكن أشوف بطاقة الصعود من فضلك؟'},
      {spk:'P', fr:'Oui, bien sûr. La voilà.',                                       en:'Yes, of course. Here it is.',                    ar:'نعم، بالتأكيد. ها هي.'},
      {spk:'FA',fr:"Votre siège est le 12A. C'est par ici.",                         en:"Your seat is 12A. It's this way.",               ar:'مقعدك هو 12A. من هنا.'},
      {spk:'P', fr:'Merci beaucoup.',                                                en:'Thank you very much.',                           ar:'شكراً جزيلاً.'},
      {spk:'FA',fr:'Je vous en prie. Bon voyage !',                                  en:"You're welcome. Have a great trip!",             ar:'على الرحب والسعة. رحلة سعيدة!'},
    ],
    phrases:["Bienvenue à bord !", "Puis-je voir votre carte d'embarquement ?", "Votre siège est le...", "C'est par ici.", "Je vous en prie.", "Bon voyage !"],
    quiz:[
      {q:"How do you say 'Welcome on board'?",   opts:['Bon voyage','Bienvenue à bord','Au revoir','Merci'],    ans:1},
      {q:"What does 'Par ici' mean?",             opts:['Thank you','This way','Your seat','Boarding pass'],    ans:1},
      {q:"How do you say 'You're welcome'?",      opts:["S'il vous plaît",'Merci','Je vous en prie','Bonjour'],ans:2},
      {q:"'S'il vous plaît' means:",              opts:['Thank you','Goodbye','Please','Welcome'],              ans:2},
    ],
    roleplay:"You are a flight attendant. A passenger just boarded. Welcome them politely in French and ask to see their boarding pass.",
  },
  {
    id:2, cat:'boarding', emoji:'💺',
    title:'Helping Find a Seat', fr:'Aider à trouver un siège', xp:50, done:false,
    sit_en:"A passenger can't find their seat. The flight attendant helps guide them patiently.",
    sit_ar:'لا يجد المسافر مقعده. مضيف الطيران يساعده بصبر في إيجاده.',
    vocab:[
      {fr:'Je ne trouve pas',    en:"I can't find",        ar:'لا أجد',          pron:'zhuh nuh TROOV pah'},
      {fr:'Le couloir',          en:'The aisle',           ar:'الممر',            pron:'luh koo-LWAR'},
      {fr:'La fenêtre',          en:'The window',          ar:'النافذة',          pron:'la fuh-NETR'},
      {fr:'À gauche',            en:'On the left',         ar:'على اليسار',       pron:'ah GOSH'},
      {fr:'À droite',            en:'On the right',        ar:'على اليمين',       pron:'ah DRWAT'},
      {fr:'Là-bas',              en:'Over there',          ar:'هناك',             pron:'la-BAH'},
      {fr:'Pas de problème',     en:'No problem',          ar:'لا مشكلة',         pron:'pah duh prob-LEM'},
      {fr:'De rien',             en:"You're welcome",      ar:'عفواً',            pron:'duh RYAN'},
    ],
    dialogue:[
      {spk:'P', fr:'Excusez-moi, je ne trouve pas mon siège.',             en:"Excuse me, I can't find my seat.",                      ar:'عذراً، لا أجد مقعدي.'},
      {spk:'FA',fr:'Pas de problème ! Puis-je voir votre carte ?',         en:'No problem! May I see your card?',                      ar:'لا مشكلة! ممكن أشوف بطاقتك؟'},
      {spk:'P', fr:'Oui, voilà.',                                           en:'Yes, here you go.',                                    ar:'نعم، تفضل.'},
      {spk:'FA',fr:"Votre siège est le 24C. C'est côté couloir, là-bas à droite.",en:"Your seat is 24C. It's the aisle seat, over there on the right.",ar:'مقعدك هو 24C. إنه جانب الممر، هناك على اليمين.'},
      {spk:'P', fr:'Merci beaucoup !',                                      en:'Thank you very much!',                                 ar:'شكراً جزيلاً!'},
      {spk:'FA',fr:'De rien. Bonne installation !',                         en:"You're welcome. Enjoy your seat!",                     ar:'عفواً. استمتع بمقعدك!'},
    ],
    phrases:['Je ne trouve pas mon siège.',"Pas de problème !",'C\'est côté couloir.','C\'est côté fenêtre.','À droite / À gauche','Là-bas'],
    quiz:[
      {q:"What does 'Le couloir' mean?",       opts:['The window','The aisle','The exit','The seat'],    ans:1},
      {q:"How do you say 'On the right'?",     opts:['À gauche','Là-bas','À droite','Par ici'],          ans:2},
      {q:"'Pas de problème' means:",           opts:['No seat','No problem','Not here','No card'],       ans:1},
      {q:"What does 'Là-bas' mean?",           opts:['Here','Left','Over there','Right'],                ans:2},
    ],
    roleplay:"A passenger says they can't find seat 25B. Help them — tell them it's a window seat on the left side.",
  },
  {
    id:3, cat:'safety', emoji:'🛡️',
    title:'Fastening Seatbelts', fr:'Attacher les ceintures', xp:60, done:false,
    sit_en:'Before takeoff, the flight attendant asks passengers to fasten seatbelts and put seats upright.',
    sit_ar:'قبل الإقلاع، يطلب مضيف الطيران من المسافرين ربط أحزمة الأمان وإرجاع مقاعدهم للوضع المستقيم.',
    vocab:[
      {fr:'La ceinture de sécurité',en:'The seatbelt',           ar:'حزام الأمان',            pron:'la saN-tyr duh say-kyoo-ree-TAY'},
      {fr:'Attachez / Attacher',    en:'Fasten / To fasten',     ar:'اربطوا / ربط',           pron:'ah-ta-SHAY'},
      {fr:'Le décollage',           en:'Takeoff',                ar:'الإقلاع',                pron:'luh day-ko-LAZH'},
      {fr:'Redresser le siège',     en:'Put seat upright',       ar:'أعِد المقعد للوضع المستقيم',pron:'ruh-dray-SAY luh SYEZH'},
      {fr:'La tablette',            en:'The tray table',         ar:'طاولة الصينية',           pron:'la ta-BLET'},
      {fr:'Replier',                en:'To fold up',             ar:'اطوِ / أقفل',             pron:'ruh-plee-YAY'},
      {fr:'Bientôt',                en:'Soon',                   ar:'قريباً',                  pron:'byaN-TOH'},
      {fr:'Veuillez',               en:'Please (formal)',        ar:'الرجاء (رسمي)',            pron:'vuh-YAY'},
    ],
    dialogue:[
      {spk:'FA',fr:'Mesdames et Messieurs, nous allons bientôt décoller.',        en:'Ladies and gentlemen, we will take off soon.',        ar:'السيدات والسادة، سنقلع قريباً.'},
      {spk:'FA',fr:"Veuillez attacher vos ceintures de sécurité, s'il vous plaît.",en:'Please fasten your seatbelts.',                       ar:'الرجاء ربط أحزمة الأمان من فضلكم.'},
      {spk:'P', fr:'Excusez-moi, comment ça marche ?',                            en:'Excuse me, how does it work?',                        ar:'عذراً، كيف تعمل؟'},
      {spk:'FA',fr:"Comme ça, Madame. Vous insérez ici et vous tirez.",           en:'Like this, madam. You insert here and pull.',         ar:'هكذا يا سيدتي. تدخلينه هنا وتشدين.'},
      {spk:'P', fr:'Ah, merci !',                                                 en:'Ah, thank you!',                                      ar:'آه، شكراً!'},
      {spk:'FA',fr:'Veuillez aussi redresser votre siège et replier votre tablette.',en:'Please also put your seat upright and fold your tray table.',ar:'الرجاء أيضاً إرجاع مقعدك وطي طاولة الصينية.'},
      {spk:'P', fr:"D'accord, pas de problème.",                                  en:'OK, no problem.',                                     ar:'حسناً، لا مشكلة.'},
    ],
    phrases:['Veuillez attacher vos ceintures.','Nous allons bientôt décoller.','Veuillez redresser votre siège.','Veuillez replier votre tablette.',"Merci de votre compréhension."],
    quiz:[
      {q:"What does 'La ceinture de sécurité' mean?",  opts:['The window','The seatbelt','The tray table','The aisle'],  ans:1},
      {q:"How do you say 'takeoff' in French?",         opts:['Atterrissage','Décollage','Départ','Arrivée'],              ans:1},
      {q:"'Veuillez' is used to:",                      opts:['Ask a question','Say goodbye','Give a polite instruction','Say thank you'],ans:2},
      {q:"'Bientôt' means:",                            opts:['Never','Always','Soon','Now'],                              ans:2},
    ],
    roleplay:"The plane is about to take off. Politely ask passengers to fasten their seatbelts, put their seats upright, and fold their tray tables.",
  },
  {
    id:4, cat:'service', emoji:'🥤',
    title:'Offering Drinks', fr:'Proposer des boissons', xp:55, done:false,
    sit_en:'The flight attendant offers beverages during in-flight service. The passenger orders water and juice.',
    sit_ar:'يقدم مضيف الطيران المشروبات خلال الخدمة. يطلب المسافر ماءً وعصيراً.',
    vocab:[
      {fr:'Vous désirez ?',    en:'What would you like?',  ar:'ماذا تريد؟',      pron:'voo day-zee-RAY'},
      {fr:'De l\'eau',         en:'Water',                 ar:'ماء',              pron:'duh LOH'},
      {fr:'Du jus d\'orange',  en:'Orange juice',          ar:'عصير برتقال',      pron:'doo zhoo doh-RANZH'},
      {fr:'Du café',           en:'Coffee',                ar:'قهوة',             pron:'doo ka-FAY'},
      {fr:'Du thé',            en:'Tea',                   ar:'شاي',              pron:'doo TAY'},
      {fr:'Avec plaisir',      en:'With pleasure',         ar:'بكل سرور',         pron:'ah-vek play-ZEER'},
      {fr:'Voilà pour vous',   en:'Here you are',          ar:'تفضل',             pron:'vwa-LAH poor voo'},
      {fr:'Autre chose ?',     en:'Anything else?',        ar:'شيء آخر؟',         pron:'oh-tr SHOHZ'},
    ],
    dialogue:[
      {spk:'FA',fr:'Bonjour Madame, vous désirez quelque chose à boire ?',  en:'Hello madam, would you like something to drink?',    ar:'صباح الخير يا سيدتي، هل تريدين شيئاً للشرب؟'},
      {spk:'P', fr:"Oui, je voudrais de l'eau, s'il vous plaît.",           en:'Yes, I would like water, please.',                   ar:'نعم، أريد ماء من فضلك.'},
      {spk:'FA',fr:'Avec plaisir. Et autre chose ?',                        en:'With pleasure. And anything else?',                  ar:'بكل سرور. وشيء آخر؟'},
      {spk:'P', fr:"Un jus d'orange aussi, merci.",                         en:'An orange juice also, thank you.',                   ar:'عصير برتقال أيضاً، شكراً.'},
      {spk:'FA',fr:"Bien sûr. Voilà votre eau et votre jus d'orange.",      en:"Of course. Here is your water and orange juice.",    ar:'بالتأكيد. تفضلي ماؤك وعصير البرتقال.'},
      {spk:'P', fr:'Merci beaucoup.',                                        en:'Thank you very much.',                               ar:'شكراً جزيلاً.'},
      {spk:'FA',fr:'Je vous en prie. Bon appétit !',                        en:"You're welcome. Enjoy!",                             ar:'على الرحب والسعة. بالهناء والشفاء!'},
    ],
    phrases:['Vous désirez quelque chose à boire ?',"Je voudrais de l'eau.",'Avec plaisir.','Voilà pour vous.','Autre chose ?','Je vous en prie.'],
    quiz:[
      {q:"What does 'De l'eau' mean?",                opts:['Juice','Coffee','Water','Tea'],                                    ans:2},
      {q:"How do you offer a drink politely?",        opts:['Tu veux boire ?','Vous désirez quelque chose à boire ?','Eau ou jus ?','Boire maintenant ?'],ans:1},
      {q:"'Avec plaisir' means:",                     opts:['No problem','With pleasure',"You're welcome",'Of course'],         ans:1},
      {q:"'Autre chose ?' means:",                    opts:['More water?','Anything else?','Thank you?','Which drink?'],        ans:1},
    ],
    roleplay:"A passenger calls you. Offer them a drink. Take their order (coffee, no sugar) and serve them politely.",
  },
  {
    id:5, cat:'service', emoji:'🍽️',
    title:'Offering Meals', fr:'Proposer les repas', xp:55, done:false,
    sit_en:'Meal time on the flight. The flight attendant offers two options and takes the passenger\'s choice.',
    sit_ar:'وقت الوجبة على الطائرة. يقدم مضيف الطيران خيارين للطعام ويأخذ طلب المسافر.',
    vocab:[
      {fr:'Le repas',               en:'The meal',             ar:'الوجبة',           pron:'luh ruh-PAH'},
      {fr:'Le poulet',              en:'Chicken',              ar:'الدجاج',           pron:'luh poo-LAY'},
      {fr:'Le poisson',             en:'Fish',                 ar:'السمك',            pron:'luh pwa-SON'},
      {fr:'Végétarien(ne)',         en:'Vegetarian',           ar:'نباتي',             pron:'vay-zhay-ta-RYAN'},
      {fr:'Vous avez le choix entre',en:'You have a choice between',ar:'لديك الاختيار بين',pron:'voo-za-vay luh shwa aNtr'},
      {fr:'Je préfère',             en:'I prefer',             ar:'أفضّل',             pron:'zhuh pray-FAIR'},
      {fr:'Bon appétit',            en:'Enjoy your meal',      ar:'بالهناء والشفاء',  pron:'boh-na-pay-TEE'},
      {fr:'Du pain',                en:'Bread',                ar:'خبز',              pron:'doo PAN'},
    ],
    dialogue:[
      {spk:'FA',fr:"C'est l'heure du repas. Vous avez le choix entre poulet et poisson.",en:"It's meal time. You have a choice between chicken and fish.",ar:'حان وقت الوجبة. لديك الاختيار بين الدجاج والسمك.'},
      {spk:'P', fr:"Je préfère le poulet, s'il vous plaît.",                              en:'I prefer chicken, please.',                                ar:'أفضّل الدجاج من فضلك.'},
      {spk:'FA',fr:'Très bien. Avez-vous des restrictions alimentaires ?',                en:'Very well. Do you have any dietary restrictions?',         ar:'ممتاز. هل لديك أي قيود غذائية؟'},
      {spk:'P', fr:'Non, aucune, merci.',                                                 en:'No, none, thank you.',                                    ar:'لا، لا يوجد، شكراً.'},
      {spk:'FA',fr:'Voilà votre repas. Bon appétit !',                                   en:"Here is your meal. Enjoy!",                               ar:'تفضل وجبتك. بالهناء والشفاء!'},
      {spk:'P', fr:'Merci. Puis-je avoir du pain aussi ?',                               en:'Thank you. May I also have some bread?',                  ar:'شكراً. هل يمكنني الحصول على خبز أيضاً؟'},
      {spk:'FA',fr:'Bien sûr, voilà.',                                                   en:'Of course, here you go.',                                 ar:'بالتأكيد، تفضل.'},
    ],
    phrases:["C'est l'heure du repas.",'Vous avez le choix entre... et...','Je préfère le poulet.','Bon appétit !','Avez-vous des restrictions alimentaires ?'],
    quiz:[
      {q:"What does 'Le poulet' mean?",              opts:['Fish','Chicken','Bread','Vegetarian'],                           ans:1},
      {q:"How do you say 'I prefer fish'?",          opts:['Je veux du poisson','J\'aime poisson','Je préfère le poisson','Poisson s\'il vous plaît'],ans:2},
      {q:"'Bon appétit' is said:",                   opts:['When someone boards','Before landing','During meal service','During safety demo'],ans:2},
      {q:"'Du pain' means:",                         opts:['Pain','Dessert','Bread','Butter'],                              ans:2},
    ],
    roleplay:"It's meal time. Tell a passenger about the two options (chicken or vegetarian) and take their order politely.",
  },
  {
    id:6, cat:'assistance', emoji:'🥶',
    title:'Passenger Feels Cold', fr:'Un passager a froid', xp:50, done:false,
    sit_en:'A passenger feels very cold and asks for a blanket. The flight attendant responds with care.',
    sit_ar:'يشعر المسافر بالبرد الشديد ويطلب بطانية. مضيف الطيران يتجاوب معه باهتمام.',
    vocab:[
      {fr:'J\'ai froid',           en:"I'm cold",              ar:'أشعر بالبرد',      pron:'zhay FRWA'},
      {fr:'Une couverture',         en:'A blanket',             ar:'بطانية',           pron:'oon koo-ver-TYR'},
      {fr:'Un oreiller',           en:'A pillow',              ar:'وسادة',             pron:'aN noh-ray-YAY'},
      {fr:'Tout de suite',         en:'Right away',            ar:'فوراً',             pron:'toot SWEET'},
      {fr:'Vous sentez-vous bien ?',en:'Are you feeling well?',ar:'هل تشعر بأنك بخير؟',pron:'voo saN-tay-voo byaN'},
      {fr:'Je vous apporte',       en:'I will bring you',      ar:'سأحضر لك',          pron:'zhuh voo-za-PORT'},
      {fr:'Beaucoup mieux',        en:'Much better',           ar:'أفضل بكثير',        pron:'boh-koo MYUH'},
    ],
    dialogue:[
      {spk:'P', fr:"Excusez-moi, j'ai très froid.",                           en:"Excuse me, I'm very cold.",                          ar:'عذراً، أشعر بالبرد الشديد.'},
      {spk:'FA',fr:"Je suis désolée. Vous souhaitez une couverture ?",        en:"I'm sorry to hear that. Would you like a blanket?",  ar:'أنا آسفة لسماع ذلك. هل تريد بطانية؟'},
      {spk:'P', fr:"Oui, s'il vous plaît. Et un oreiller si possible.",       en:'Yes please. And a pillow if possible.',              ar:'نعم، من فضلك. ووسادة إن أمكن.'},
      {spk:'FA',fr:'Bien sûr. Je vous apporte ça tout de suite.',             en:"Of course. I'll bring that right away.",             ar:'بالتأكيد. سأحضر ذلك لك فوراً.'},
      {spk:'P', fr:'Merci beaucoup.',                                          en:'Thank you very much.',                               ar:'شكراً جزيلاً.'},
      {spk:'FA',fr:'Voilà votre couverture et votre oreiller. Vous sentez-vous bien maintenant ?',en:'Here is your blanket and pillow. Are you feeling well now?',ar:'تفضل بطانيتك ووسادتك. هل تشعر بتحسن الآن؟'},
      {spk:'P', fr:'Oui, beaucoup mieux. Merci !',                            en:'Yes, much better. Thank you!',                      ar:'نعم، أفضل بكثير. شكراً!'},
    ],
    phrases:["J'ai froid.",'Je vous apporte ça tout de suite.','Une couverture / Un oreiller','Vous sentez-vous bien ?','Beaucoup mieux, merci !'],
    quiz:[
      {q:"What does 'J'ai froid' mean?",          opts:["I'm hungry","I'm cold","I'm tired","I'm sick"],  ans:1},
      {q:"How do you say 'right away'?",          opts:['Tout de suite','Pas de problème','Bien sûr','Voilà'],ans:0},
      {q:"'Une couverture' means:",               opts:['A pillow','A blanket','A window','A drink'],      ans:1},
      {q:"'Beaucoup mieux' means:",               opts:['Much worse','Much faster','Much better','Much later'],ans:2},
    ],
    roleplay:"A passenger tells you they are very cold. Offer them a blanket and pillow. Ask if they feel better afterwards.",
  },
  {
    id:7, cat:'info', emoji:'⏱️',
    title:'Flight Duration & Arrival', fr:"Durée du vol et arrivée", xp:60, done:false,
    sit_en:'A passenger asks about the flight duration and expected arrival time at the destination.',
    sit_ar:'يسأل المسافر عن مدة الرحلة وموعد الوصول المتوقع.',
    vocab:[
      {fr:'La durée du vol',    en:'The flight duration',       ar:'مدة الرحلة',      pron:'la doo-RAY doo VOL'},
      {fr:"L'heure d'arrivée", en:'The arrival time',           ar:'موعد الوصول',     pron:'leur dah-ree-VAY'},
      {fr:'Environ',            en:'About / Approximately',     ar:'تقريباً',          pron:'aN-vee-RON'},
      {fr:'Heure locale',       en:'Local time',                ar:'التوقيت المحلي',  pron:'eur lo-KAL'},
      {fr:'Le décalage horaire',en:'The time difference',       ar:'فارق التوقيت',    pron:'luh day-ka-LAZH oh-RAIR'},
      {fr:'Nous arriverons',    en:'We will arrive',            ar:'سنصل',             pron:'noo-za-ree-vuh-RON'},
      {fr:'Combien de temps ?', en:'How long?',                 ar:'كم يستغرق؟',      pron:'kom-byaN duh TaN'},
    ],
    dialogue:[
      {spk:'P', fr:'Excusez-moi, combien de temps dure le vol ?',       en:'Excuse me, how long is the flight?',             ar:'عذراً، كم تستغرق الرحلة؟'},
      {spk:'FA',fr:'Le vol dure environ quatre heures.',                 en:'The flight is about four hours.',                ar:'تستغرق الرحلة حوالي أربع ساعات.'},
      {spk:'P', fr:'Et on arrive à quelle heure ?',                     en:'And what time do we arrive?',                   ar:'وفي أي ساعة سنصل؟'},
      {spk:'FA',fr:'Nous arriverons à Paris à 15h00, heure locale.',    en:'We will arrive in Paris at 3 PM, local time.',   ar:'سنصل إلى باريس في الساعة 15:00 بالتوقيت المحلي.'},
      {spk:'P', fr:'Merci. Y a-t-il un décalage horaire ?',             en:'Thank you. Is there a time difference?',         ar:'شكراً. هل يوجد فارق في التوقيت؟'},
      {spk:'FA',fr:"Oui, il y a une heure de décalage.",                en:'Yes, there is one hour of difference.',          ar:'نعم، يوجد ساعة واحدة فارق.'},
      {spk:'P', fr:"D'accord, merci beaucoup.",                         en:'I see, thank you very much.',                    ar:'حسناً، شكراً جزيلاً.'},
    ],
    phrases:['Le vol dure environ...','Nous arriverons à...','Heure locale','Il y a un décalage de...','Combien de temps dure le vol ?'],
    quiz:[
      {q:"How do you ask 'How long is the flight?'",opts:["Quelle heure est-il ?",'Combien de temps dure le vol ?','Où sommes-nous ?','Quand décollons-nous ?'],ans:1},
      {q:"What does 'Environ' mean?",               opts:['Exactly','Never','About/Approximately','Always'],             ans:2},
      {q:"'Heure locale' means:",                   opts:['Flight time','Local time','Departure time','Duration'],      ans:1},
      {q:"'Nous arriverons' means:",                opts:['We arrived','We are arriving','We will arrive','We landed'], ans:2},
    ],
    roleplay:"A passenger asks how long the flight is and what time you land. Tell them: 3 hours flight, arriving at 18:00 local time.",
  },
  {
    id:8, cat:'complaints', emoji:'😤',
    title:'Passenger Wants to Change Seat', fr:'Changer de siège', xp:65, done:false,
    sit_en:'A passenger is unhappy with their seat. The flight attendant handles the request professionally.',
    sit_ar:'المسافر غير راضٍ عن مقعده. مضيف الطيران يتعامل مع الطلب باحترافية وهدوء.',
    vocab:[
      {fr:'Changer de siège',    en:'Change seat',                ar:'تغيير المقعد',           pron:'shaN-zhay duh SYEZH'},
      {fr:'Un siège libre',      en:'A free/empty seat',          ar:'مقعد خالٍ',               pron:'aN syezh LEE-bruh'},
      {fr:'Je vais vérifier',    en:'I will check',               ar:'سأتحقق',                  pron:'zhuh vay vay-ree-FYAY'},
      {fr:'Malheureusement',     en:'Unfortunately',              ar:'للأسف',                   pron:'mal-uh-ruhz-maN'},
      {fr:'Je comprends',        en:'I understand',               ar:'أفهم',                    pron:'zhuh kOM-praN'},
      {fr:'La gêne',             en:'The inconvenience',          ar:'الإزعاج',                 pron:'la ZHEN'},
      {fr:'Je suis vraiment désolé(e)',en:'I am truly sorry',    ar:'أنا آسف جداً',            pron:'zhuh swee VRAY-maN day-zo-LAY'},
    ],
    dialogue:[
      {spk:'P', fr:'Excusez-moi, je voudrais changer de siège. Mon voisin ronfle.',en:"Excuse me, I'd like to change seats. My neighbor snores.",ar:'عذراً، أريد تغيير مقعدي. جاري يشخر.'},
      {spk:'FA',fr:'Je comprends. Je vais vérifier s\'il y a des sièges libres.',  en:"I understand. I'll check if there are free seats.",       ar:'أفهم. سأتحقق إذا كان هناك مقاعد خالية.'},
      {spk:'FA',fr:"Malheureusement, le vol est complet. Mais je vais faire de mon mieux.",en:"Unfortunately, the flight is full. But I'll do my best.",ar:'للأسف، الرحلة ممتلئة. لكنني سأبذل قصارى جهدي.'},
      {spk:'P', fr:"D'accord, je comprends. Merci d'essayer.",                     en:"OK, I understand. Thank you for trying.",                ar:'حسناً، أفهم. شكراً على المحاولة.'},
      {spk:'FA',fr:'Je suis vraiment désolée pour la gêne.',                       en:"I'm truly sorry for the inconvenience.",                 ar:'أنا آسفة جداً على الإزعاج.'},
      {spk:'P', fr:'Ce n\'est pas votre faute. Merci quand même.',                en:"It's not your fault. Thank you anyway.",                 ar:'ليس غلطك. شكراً على كل حال.'},
    ],
    phrases:['Je voudrais changer de siège.','Je vais vérifier.','Malheureusement...','Je suis désolé(e) pour la gêne.','Je vais faire de mon mieux.','Je comprends.'],
    quiz:[
      {q:"'Un siège libre' means:",          opts:['A broken seat','A free/empty seat','A window seat','A first-class seat'],ans:1},
      {q:"'Malheureusement' means:",         opts:['Fortunately','Unfortunately','Immediately','Completely'],               ans:1},
      {q:"How do you say 'I understand'?",   opts:["Je suis désolé",'Je vais vérifier','Je comprends','Je voudrais'],      ans:2},
      {q:"'La gêne' means:",                 opts:['The seat','The flight','The inconvenience','The passenger'],            ans:2},
    ],
    roleplay:"A passenger complains their seat doesn't recline. Apologize, check for alternatives, and respond professionally.",
  },
  {
    id:9, cat:'assistance', emoji:'🤒',
    title:'Passenger Feels Sick', fr:'Un passager se sent mal', xp:70, done:false,
    sit_en:'A passenger feels unwell during the flight. The flight attendant assists them quickly and calmly.',
    sit_ar:'يشعر المسافر بتوعك خلال الرحلة. يساعده مضيف الطيران بسرعة وهدوء.',
    vocab:[
      {fr:'Je me sens mal',             en:'I feel sick / unwell',  ar:'أشعر بتوعك',               pron:'zhuh muh saN MAL'},
      {fr:"J'ai mal au cœur",           en:'I feel nauseous',       ar:'أشعر بالغثيان',            pron:'zhay mal oh KOOR'},
      {fr:'Un sac à vomi',              en:'A sick bag',            ar:'كيس القيء',                pron:'aN sak ah vo-MEE'},
      {fr:"De l'eau fraîche",           en:'Cold water',            ar:'ماء بارد',                 pron:'duh loh FRESH'},
      {fr:'Y a-t-il un médecin à bord ?',en:'Is there a doctor on board?',ar:'هل يوجد طبيب على متن الطائرة؟',pron:'ee ya-teel aN mayd-SAN ah bor'},
      {fr:'Respirez lentement',         en:'Breathe slowly',        ar:'تنفس ببطء',                pron:'res-pee-RAY laN-tuh-maN'},
      {fr:'Vous êtes très gentil(le)',  en:'You are very kind',     ar:'أنت لطيف جداً',            pron:'voo-zet tray zhaN-TEE'},
    ],
    dialogue:[
      {spk:'P', fr:'Excusez-moi... je me sens très mal.',                         en:'Excuse me... I feel very sick.',                         ar:'عذراً... أشعر بتوعك شديد.'},
      {spk:'FA',fr:"Oh, je suis désolé(e). Vous avez mal au cœur ?",             en:"Oh, I'm sorry. Do you feel nauseous?",                   ar:'يا إلهي، أنا آسف. هل تشعر بالغثيان؟'},
      {spk:'P', fr:"Oui, et j'ai très chaud.",                                   en:"Yes, and I'm very hot.",                                 ar:'نعم، وأشعر بالحرارة الشديدة.'},
      {spk:'FA',fr:"Respirez lentement. Je vous apporte de l'eau fraîche et un sac.",en:"Breathe slowly. I'll bring you cold water and a bag.",ar:"تنفس ببطء. سأحضر لك ماءً بارداً وكيساً."},
      {spk:'P', fr:'Merci, vous êtes très gentil(le).',                          en:'Thank you, you are very kind.',                          ar:'شكراً، أنت لطيف جداً.'},
      {spk:'FA',fr:'Y a-t-il un médecin à bord qui peut aider ?',               en:'Is there a doctor on board who can help?',               ar:'هل يوجد طبيب على متن الطائرة يمكنه المساعدة؟'},
      {spk:'P', fr:"Je pense que ça va mieux maintenant. Merci.",               en:"I think it's getting better now. Thank you.",             ar:'أعتقد أنني أتحسن الآن. شكراً.'},
    ],
    phrases:["Je me sens mal.","J'ai mal au cœur.",'Respirez lentement.',"Je vous apporte de l'eau.",'Y a-t-il un médecin à bord ?','Vous êtes très gentil(le).'],
    quiz:[
      {q:"What does 'Je me sens mal' mean?",   opts:["I feel happy","I feel cold","I feel sick","I feel hungry"],   ans:2},
      {q:"'Respirez lentement' means:",        opts:['Sit down slowly','Breathe slowly','Drink slowly','Walk slowly'],ans:1},
      {q:"What does 'J'ai mal au cœur' mean?", opts:["My heart hurts","I feel nauseous","I'm sad","I'm scared"],   ans:1},
      {q:"'De l'eau fraîche' means:",          opts:['Hot water','Juice','Fresh juice','Cold water'],               ans:3},
    ],
    roleplay:"A passenger looks pale and says they feel sick. Help them: offer water, a sick bag, ask them to breathe slowly, and call for a doctor if needed.",
  },
  {
    id:10, cat:'landing', emoji:'🛬',
    title:'Preparing for Landing', fr:"Préparer l'atterrissage", xp:65, done:false,
    sit_en:'The plane is about to land. The flight attendant announces landing preparations and says a warm goodbye.',
    sit_ar:'الطائرة على وشك الهبوط. مضيف الطيران يعلن عن استعدادات الهبوط ويودع المسافرين بحرارة.',
    vocab:[
      {fr:"L'atterrissage",              en:'Landing',                   ar:'الهبوط',                  pron:'la-teh-ree-SAZH'},
      {fr:'Dans quelques minutes',       en:'In a few minutes',          ar:'خلال بضع دقائق',          pron:'daN kel-kuh mee-NOOT'},
      {fr:'Regagner votre siège',        en:'Return to your seat',       ar:'العودة إلى مقعدك',        pron:'ruh-ga-NYAY votr SYEZH'},
      {fr:'Au revoir',                   en:'Goodbye',                   ar:'وداعاً',                  pron:'oh ruh-VWAR'},
      {fr:'Bonne continuation',          en:'Safe travels / All the best',ar:'رحلة موفقة',             pron:'bon kon-tee-noo-ah-SYOHN'},
      {fr:'Nous espérons vous revoir',   en:'We hope to see you again',  ar:'نأمل رؤيتك مرة أخرى',   pron:'noo-zes-pay-RON voo ruh-VWAR'},
      {fr:'Bonne journée',              en:'Have a good day',            ar:'يوم سعيد',               pron:'bon zhoor-NAY'},
    ],
    dialogue:[
      {spk:'FA',fr:'Mesdames et Messieurs, nous allons atterrir dans quelques minutes.',  en:'Ladies and gentlemen, we will land in a few minutes.',  ar:'السيدات والسادة، سنهبط خلال بضع دقائق.'},
      {spk:'FA',fr:'Veuillez regagner votre siège et attacher votre ceinture.',           en:'Please return to your seat and fasten your seatbelt.',  ar:'الرجاء العودة إلى مقعدك وربط حزام الأمان.'},
      {spk:'FA',fr:'Veuillez redresser votre siège et replier votre tablette.',           en:'Please put your seat upright and fold your tray table.',ar:'الرجاء إرجاع مقعدك وطي طاولة الصينية.'},
      {spk:'P', fr:'Merci pour tout.',                                                    en:'Thank you for everything.',                             ar:'شكراً على كل شيء.'},
      {spk:'FA',fr:"C'était un plaisir. Au revoir et bonne continuation !",              en:'It was a pleasure. Goodbye and safe travels!',          ar:'كان من دواعي سروري. وداعاً ورحلة موفقة!'},
      {spk:'P', fr:'Merci. À bientôt peut-être !',                                      en:'Thank you. See you again perhaps!',                     ar:'شكراً. إلى اللقاء ربما!'},
      {spk:'FA',fr:'Nous espérons vous revoir bientôt. Bonne journée !',                en:'We hope to see you again soon. Have a good day!',       ar:'نأمل رؤيتك قريباً. يوم سعيد!'},
    ],
    phrases:['Nous allons atterrir dans quelques minutes.','Veuillez regagner votre siège.','Attachez votre ceinture.','Au revoir et bonne continuation !','Nous espérons vous revoir bientôt.'],
    quiz:[
      {q:"What does 'L'atterrissage' mean?",      opts:['Takeoff','Landing','Boarding','Delay'],                      ans:1},
      {q:"How do you say 'In a few minutes'?",    opts:['Dans une heure','Dans quelques minutes','Bientôt','Maintenant'],ans:1},
      {q:"'Au revoir' means:",                    opts:['Hello','Welcome','Goodbye','Please'],                        ans:2},
      {q:"'Bonne continuation' means:",           opts:['Good luck','Safe travels / All the best','Good morning','Good flight'],ans:1},
    ],
    roleplay:"The plane is landing. Announce preparations, ask passengers to sit and fasten belts, then say a warm goodbye as they exit.",
  },
];

/* ═══════════════════════════════════════════════════════════
   STYLE HELPERS
═══════════════════════════════════════════════════════════ */
const catColor = id => (CATS.find(c=>c.id===id)||CATS[0]).color;
const catAccent = id => (CATS.find(c=>c.id===id)||CATS[0]).accent;
const catEmoji = id => (CATS.find(c=>c.id===id)||CATS[0]).emoji;

const PX_BORDER = (color='#D4A017',sz=3) => ({
  border:`${sz}px solid ${color}`,
  boxShadow:`${sz}px ${sz}px 0 ${color}`,
});

/* ═══════════════════════════════════════════════════════════
   PIXEL PLANE SVG (decorative)
═══════════════════════════════════════════════════════════ */
const PixelPlane = ({size=32,color='#F0C43A'})=>(
  <svg width={size} height={size} viewBox="0 0 16 16" style={{imageRendering:'pixelated'}}>
    <rect x="6" y="7" width="8" height="2" fill={color}/>
    <rect x="5" y="6" width="2" height="4" fill={color}/>
    <rect x="3" y="5" width="2" height="1" fill={color}/>
    <rect x="3" y="10" width="2" height="1" fill={color}/>
    <rect x="8" y="5" width="3" height="2" fill={color} opacity="0.8"/>
    <rect x="8" y="9" width="3" height="2" fill={color} opacity="0.8"/>
    <rect x="13" y="8" width="2" height="1" fill={color}/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   PIXEL SKYLINE (decorative header background)
═══════════════════════════════════════════════════════════ */
const PixelSkyline = ()=>(
  <svg width="100%" height="56" viewBox="0 0 360 56" preserveAspectRatio="none"
    style={{position:'absolute',bottom:0,left:0,imageRendering:'pixelated',opacity:0.18}}>
    {/* Eiffel-ish */}
    <rect x="30" y="10" width="4" height="40" fill="#fff"/>
    <rect x="26" y="30" width="12" height="4" fill="#fff"/>
    <rect x="24" y="44" width="16" height="6" fill="#fff"/>
    <rect x="31" y="6" width="2" height="6" fill="#fff"/>
    {/* Building */}
    <rect x="60" y="20" width="20" height="30" fill="#fff"/>
    <rect x="64" y="24" width="4" height="4" fill={C.navy}/>
    <rect x="72" y="24" width="4" height="4" fill={C.navy}/>
    <rect x="64" y="32" width="4" height="4" fill={C.navy}/>
    {/* Minaret-ish */}
    <rect x="100" y="14" width="6" height="36" fill="#fff"/>
    <rect x="98" y="40" width="10" height="6" fill="#fff"/>
    <rect x="102" y="10" width="2" height="6" fill="#fff"/>
    <rect x="96" y="50" width="14" height="4" fill="#fff"/>
    {/* Tower */}
    <rect x="140" y="24" width="18" height="26" fill="#fff"/>
    <rect x="146" y="16" width="6" height="10" fill="#fff"/>
    <rect x="148" y="12" width="2" height="6" fill="#fff"/>
    {/* Small buildings */}
    <rect x="170" y="30" width="14" height="20" fill="#fff"/>
    <rect x="190" y="26" width="22" height="24" fill="#fff"/>
    <rect x="220" y="18" width="10" height="32" fill="#fff"/>
    <rect x="236" y="32" width="16" height="18" fill="#fff"/>
    <rect x="258" y="22" width="20" height="28" fill="#fff"/>
    <rect x="284" y="30" width="12" height="20" fill="#fff"/>
    <rect x="302" y="16" width="8" height="34" fill="#fff"/>
    <rect x="316" y="28" width="30" height="22" fill="#fff"/>
    {/* Ground */}
    <rect x="0" y="52" width="360" height="4" fill="#fff"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   CSS KEYFRAME INJECTION
═══════════════════════════════════════════════════════════ */
const GlobalStyles = ()=>(
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;600&display=swap');
    * { box-sizing:border-box; margin:0; padding:0; }
    body { background:#08142E; }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:rgba(255,255,255,0.05); }
    ::-webkit-scrollbar-thumb { background:#D4A017; border-radius:2px; }
    @keyframes fly { from{transform:translateX(-120%)} to{transform:translateX(120vw)} }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.04)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    .fadein { animation: fadeUp 0.4s ease forwards; }
    .plane-fly { animation: fly 12s linear infinite; }
    .pulse { animation: pulse 2s ease-in-out infinite; }
    .bounce { animation: bounce 1.5s ease-in-out infinite; }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════
   BOTTOM NAV
═══════════════════════════════════════════════════════════ */
const BottomNav = ({active, onNav})=>{
  const items=[
    {id:'home', emoji:'🏠', label:'Home'},
    {id:'lessons', emoji:'📚', label:'Lessons'},
    {id:'practice', emoji:'🎯', label:'Practice'},
    {id:'passport', emoji:'🗺️', label:'Passport'},
  ];
  return (
    <nav style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',
      width:'100%',maxWidth:480,background:'rgba(8,20,46,0.97)',
      borderTop:`2px solid ${C.gold}`,display:'flex',zIndex:100,
      boxShadow:'0 -4px 20px rgba(0,0,0,0.5)'}}>
      {items.map(it=>(
        <button key={it.id} onClick={()=>onNav(it.id)}
          style={{flex:1,padding:'10px 4px 8px',background:'none',border:'none',cursor:'pointer',
            display:'flex',flexDirection:'column',alignItems:'center',gap:3,
            opacity:active===it.id?1:0.45,transition:'opacity 0.2s'}}>
          <span style={{fontSize:18}}>{it.emoji}</span>
          <span style={{fontSize:8,color:active===it.id?C.gold:C.cream,
            fontFamily:"'Press Start 2P',monospace",letterSpacing:0.3}}>{it.label}</span>
          {active===it.id&&<span style={{width:16,height:2,background:C.gold,borderRadius:1,marginTop:2}}/>}
        </button>
      ))}
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════════
   HEADER BAR
═══════════════════════════════════════════════════════════ */
const Header = ({title,onBack,subtitle})=>(
  <header style={{background:`linear-gradient(135deg, ${C.blue} 0%, ${C.navy} 100%)`,
    padding:'16px 16px 14px',position:'relative',overflow:'hidden',
    borderBottom:`2px solid ${C.gold}`}}>
    <PixelSkyline/>
    <div style={{position:'relative',display:'flex',alignItems:'center',gap:10}}>
      {onBack&&<button onClick={onBack} style={{background:C.glass,border:`1px solid ${C.gold}`,
        borderRadius:4,color:C.gold,padding:'6px 10px',cursor:'pointer',fontSize:14,
        fontFamily:"'Press Start 2P',monospace",boxShadow:'2px 2px 0 #D4A017'}}>‹</button>}
      <div>
        <h1 style={{fontFamily:"'Press Start 2P',monospace",fontSize:onBack?10:12,
          color:C.gold,letterSpacing:0.5,lineHeight:1.4,textShadow:'2px 2px 0 rgba(0,0,0,0.5)'}}>{title}</h1>
        {subtitle&&<p style={{color:C.cream,fontSize:9,opacity:0.7,marginTop:2,
          fontFamily:"'IBM Plex Mono',monospace"}}>{subtitle}</p>}
      </div>
    </div>
  </header>
);

/* ═══════════════════════════════════════════════════════════
   VOCAB CARD
═══════════════════════════════════════════════════════════ */
const VocabCard = ({item,idx})=>(
  <div className="fadein" style={{...PX_BORDER(C.gold,2),background:C.card,
    borderRadius:6,padding:'12px 14px',marginBottom:10,
    animationDelay:`${idx*0.07}s`,animationFillMode:'both'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
      <div style={{flex:1}}>
        <p style={{fontFamily:"'Crimson Pro',serif",fontSize:20,fontWeight:700,
          color:C.blue,fontStyle:'italic',marginBottom:2}}>{item.fr}</p>
        <p style={{fontSize:12,color:'#333',marginBottom:3,fontFamily:"'IBM Plex Mono',monospace"}}>{item.en}</p>
        <p style={{fontSize:13,color:'#555',direction:'rtl',textAlign:'right',
          fontFamily:"'Crimson Pro',serif"}}>{item.ar}</p>
      </div>
      <div style={{background:C.blue,...PX_BORDER(C.blueL,1),borderRadius:4,
        padding:'4px 8px',marginLeft:10,flexShrink:0}}>
        <p style={{fontSize:8,color:C.goldL,fontFamily:"'IBM Plex Mono',monospace",
          textAlign:'center',lineHeight:1.5}}>{item.pron}</p>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   DIALOGUE BUBBLE
═══════════════════════════════════════════════════════════ */
const DialogueLine = ({line,idx})=>{
  const isFA = line.spk==='FA';
  return (
    <div className="fadein" style={{display:'flex',flexDirection:'column',
      alignItems:isFA?'flex-start':'flex-end',marginBottom:14,
      animationDelay:`${idx*0.1}s`,animationFillMode:'both'}}>
      <div style={{display:'flex',alignItems:'flex-end',gap:6,flexDirection:isFA?'row':'row-reverse'}}>
        <div style={{width:30,height:30,borderRadius:'50%',flexShrink:0,
          background:isFA?C.blue:C.red,...PX_BORDER(isFA?C.blueL:C.redL,2),
          display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>
          {isFA?'✈️':'👤'}
        </div>
        <div style={{maxWidth:'78%',background:isFA?`${C.blue}F0`:'rgba(191,45,45,0.9)',
          borderRadius:isFA?'0 10px 10px 10px':'10px 0 10px 10px',
          padding:'10px 12px',...PX_BORDER(isFA?C.blueL:C.redL,2)}}>
          <p style={{fontSize:8,color:isFA?C.goldL:'#FFB3B3',fontFamily:"'Press Start 2P',monospace",
            marginBottom:4}}>{isFA?'CABIN CREW':'PASSENGER'}</p>
          <p style={{fontSize:14,color:C.white,fontFamily:"'Crimson Pro',serif",
            fontWeight:600,lineHeight:1.4,marginBottom:6}}>{line.fr}</p>
          <p style={{fontSize:11,color:'rgba(255,255,255,0.75)',fontStyle:'italic',
            marginBottom:3,fontFamily:"'Crimson Pro',serif"}}>🇬🇧 {line.en}</p>
          <p style={{fontSize:11,color:'rgba(255,255,255,0.75)',direction:'rtl',
            textAlign:'right',fontFamily:"'Crimson Pro',serif"}}>🇸🇦 {line.ar}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   QUIZ COMPONENT
═══════════════════════════════════════════════════════════ */
const QuizView = ({quiz,lessonTitle})=>{
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);

  const q = quiz[idx];
  const choose = (i)=>{
    if(answered)return;
    setSel(i);
    setAnswered(true);
    if(i===q.ans) setScore(s=>s+1);
  };
  const next = ()=>{
    if(idx+1>=quiz.length){ setDone(true); return; }
    setIdx(i=>i+1); setSel(null); setAnswered(false);
  };
  const restart = ()=>{ setIdx(0);setSel(null);setAnswered(false);setScore(0);setDone(false); };

  if(done) return (
    <div className="fadein" style={{padding:20,textAlign:'center'}}>
      <div style={{fontSize:48,marginBottom:12}} className="bounce">{score===quiz.length?'🏆':score>=quiz.length/2?'🌟':'💪'}</div>
      <div style={{...PX_BORDER(C.gold,3),background:C.card,borderRadius:8,padding:24,marginBottom:16}}>
        <p style={{fontFamily:"'Press Start 2P',monospace",fontSize:10,color:C.blue,marginBottom:8}}>QUIZ COMPLETE!</p>
        <p style={{fontFamily:"'Crimson Pro',serif",fontSize:28,fontWeight:700,color:C.blue}}>
          {score} / {quiz.length}</p>
        <p style={{fontSize:12,color:'#555',marginTop:6,fontFamily:"'IBM Plex Mono',monospace"}}>
          {score===quiz.length?'Perfect score! Magnifique !':score>=quiz.length/2?'Good job! Bien fait !':'Keep practicing! Continuez !'}
        </p>
      </div>
      <button onClick={restart} style={{...PX_BORDER(C.blue,3),background:C.blue,color:C.cream,
        fontFamily:"'Press Start 2P',monospace",fontSize:9,padding:'12px 20px',cursor:'pointer',
        borderRadius:4}}>RETRY QUIZ ↺</button>
    </div>
  );

  return (
    <div style={{padding:16}}>
      {/* Progress */}
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
        {quiz.map((_,i)=>(
          <div key={i} style={{flex:1,height:4,borderRadius:2,
            background:i<idx?C.cedar:i===idx?C.gold:'rgba(255,255,255,0.15)'}}/>
        ))}
        <span style={{fontSize:9,color:C.gold,fontFamily:"'Press Start 2P',monospace",flexShrink:0}}>
          {idx+1}/{quiz.length}
        </span>
      </div>

      {/* Question */}
      <div className="fadein" style={{...PX_BORDER(C.gold,2),background:C.card,
        borderRadius:8,padding:16,marginBottom:14}}>
        <p style={{fontSize:9,color:C.sand,fontFamily:"'Press Start 2P',monospace",marginBottom:8}}>
          QUESTION {idx+1}
        </p>
        <p style={{fontFamily:"'Crimson Pro',serif",fontSize:17,fontWeight:600,
          color:C.darkBlue,lineHeight:1.4}}>{q.q}</p>
      </div>

      {/* Options */}
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
        {q.opts.map((opt,i)=>{
          const isCorrect = i===q.ans;
          const isSelected = i===sel;
          let bg='rgba(255,255,255,0.06)'; let border=C.blueL; let col=C.cream;
          if(answered){
            if(isCorrect){bg='rgba(45,106,79,0.85)';border='#3CA068';col=C.white;}
            else if(isSelected){bg='rgba(191,45,45,0.7)';border=C.red;col=C.white;}
            else{bg='rgba(255,255,255,0.04)';border='rgba(255,255,255,0.1)';col='rgba(255,255,255,0.4)';}
          }
          return (
            <button key={i} onClick={()=>choose(i)}
              style={{background:bg,border:`2px solid ${border}`,boxShadow:answered&&isCorrect?`3px 3px 0 #3CA068`:answered&&isSelected?`3px 3px 0 ${C.red}`:'2px 2px 0 rgba(255,255,255,0.1)',
                borderRadius:6,padding:'12px 14px',cursor:answered?'default':'pointer',
                textAlign:'left',transition:'all 0.2s',color:col,
                fontFamily:"'Crimson Pro',serif",fontSize:15,display:'flex',alignItems:'center',gap:10}}>
              <span style={{width:22,height:22,borderRadius:3,border:`2px solid ${border}`,
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,flexShrink:0,
                fontFamily:"'Press Start 2P',monospace",color:col}}>
                {answered?(isCorrect?'✓':isSelected?'✗':String.fromCharCode(65+i)):String.fromCharCode(65+i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered&&<button onClick={next}
        style={{width:'100%',...PX_BORDER(C.gold,3),background:C.gold,color:C.navy,
          fontFamily:"'Press Start 2P',monospace",fontSize:9,padding:'12px 16px',
          cursor:'pointer',borderRadius:4}}>
        {idx+1>=quiz.length?'SEE RESULTS 🏆':'NEXT QUESTION →'}
      </button>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   LESSON SCREEN
═══════════════════════════════════════════════════════════ */
const LessonScreen = ({lesson, onBack})=>{
  const [tab,setTab]=useState('vocab');
  const cc = catColor(lesson.cat);
  const ca = catAccent(lesson.cat);
  const tabs=[{id:'vocab',label:'📖 Vocab'},{id:'dialogue',label:'💬 Talk'},{id:'quiz',label:'🎯 Quiz'},{id:'phrases',label:'⭐ Phrases'},{id:'role',label:'🎭 Role-play'}];

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      {/* Lesson Header */}
      <div style={{background:`linear-gradient(135deg,${cc},${C.navy})`,
        padding:'14px 14px 0',borderBottom:`2px solid ${ca}`,flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <button onClick={onBack} style={{background:'rgba(255,255,255,0.1)',border:`2px solid ${ca}`,
            color:ca,padding:'6px 10px',cursor:'pointer',fontFamily:"'Press Start 2P',monospace",
            fontSize:12,borderRadius:4,boxShadow:`2px 2px 0 ${ca}`}}>‹</button>
          <div style={{flex:1}}>
            <span style={{fontSize:8,color:ca,fontFamily:"'Press Start 2P',monospace",
              opacity:0.8}}>{catEmoji(lesson.cat)} LESSON {lesson.id}</span>
            <h2 style={{fontFamily:"'Press Start 2P',monospace",fontSize:9,color:C.gold,
              lineHeight:1.5,marginTop:2,textShadow:'2px 2px 0 rgba(0,0,0,0.6)'}}>{lesson.title.toUpperCase()}</h2>
            <p style={{fontFamily:"'Crimson Pro',serif",fontSize:13,color:C.cream,
              fontStyle:'italic',opacity:0.85}}>{lesson.fr}</p>
          </div>
          <div style={{background:'rgba(0,0,0,0.3)',...PX_BORDER(ca,2),
            borderRadius:6,padding:'8px 10px',textAlign:'center',flexShrink:0}}>
            <p style={{fontSize:9,color:ca,fontFamily:"'Press Start 2P',monospace"}}>+{lesson.xp}</p>
            <p style={{fontSize:7,color:'rgba(255,255,255,0.5)',fontFamily:"'IBM Plex Mono',monospace"}}>XP</p>
          </div>
        </div>
        {/* Tabs */}
        <div style={{display:'flex',overflowX:'auto',gap:2,paddingBottom:0}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{background:tab===t.id?C.gold:'rgba(255,255,255,0.08)',
                border:`2px solid ${tab===t.id?C.gold:'rgba(255,255,255,0.15)'}`,
                color:tab===t.id?C.navy:C.cream,padding:'7px 10px',cursor:'pointer',
                fontFamily:"'Press Start 2P',monospace",fontSize:7,whiteSpace:'nowrap',
                borderRadius:'4px 4px 0 0',borderBottom:'none',
                boxShadow:tab===t.id?`inset 0 -2px 0 rgba(255,255,255,0.3)`:undefined}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{flex:1,overflowY:'auto',background:C.darkBlue,paddingBottom:80}}>

        {/* Situation */}
        {(tab==='vocab'||tab==='dialogue')&&(
          <div style={{margin:'12px 12px 0',background:'rgba(255,255,255,0.05)',
            borderLeft:`3px solid ${ca}`,padding:'10px 12px',borderRadius:'0 4px 4px 0'}}>
            <p style={{fontSize:8,color:ca,fontFamily:"'Press Start 2P',monospace",marginBottom:4}}>SITUATION</p>
            <p style={{fontSize:12,color:C.cream,fontFamily:"'IBM Plex Mono',monospace",
              lineHeight:1.6,marginBottom:4}}>{lesson.sit_en}</p>
            <p style={{fontSize:13,color:'rgba(200,168,122,0.9)',fontFamily:"'Crimson Pro',serif",
              direction:'rtl',textAlign:'right'}}>{lesson.sit_ar}</p>
          </div>
        )}

        {/* VOCAB TAB */}
        {tab==='vocab'&&(
          <div style={{padding:'12px 12px 0'}}>
            <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",
              marginBottom:10,marginTop:4}}>VOCABULARY LIST</p>
            {lesson.vocab.map((v,i)=><VocabCard key={i} item={v} idx={i}/>)}
          </div>
        )}

        {/* DIALOGUE TAB */}
        {tab==='dialogue'&&(
          <div style={{padding:12}}>
            <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:12}}>FULL DIALOGUE</p>
            {lesson.dialogue.map((d,i)=><DialogueLine key={i} line={d} idx={i}/>)}
          </div>
        )}

        {/* QUIZ TAB */}
        {tab==='quiz'&&<QuizView quiz={lesson.quiz} lessonTitle={lesson.title}/>}

        {/* PHRASES TAB */}
        {tab==='phrases'&&(
          <div style={{padding:16}}>
            <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:12}}>
              ⭐ KEY PHRASES TO MEMORIZE
            </p>
            {lesson.phrases.map((ph,i)=>(
              <div key={i} className="fadein"
                style={{...PX_BORDER(C.gold,2),background:'rgba(212,160,23,0.1)',
                  borderRadius:6,padding:'12px 14px',marginBottom:10,
                  animationDelay:`${i*0.08}s`,animationFillMode:'both'}}>
                <p style={{fontFamily:"'Crimson Pro',serif",fontSize:17,fontWeight:700,
                  color:C.goldL,fontStyle:'italic',marginBottom:4}}>❝ {ph} ❞</p>
                <p style={{fontSize:9,color:C.cream,fontFamily:"'IBM Plex Mono',monospace",opacity:0.5}}>
                  PHRASE {String(i+1).padStart(2,'0')}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ROLE-PLAY TAB */}
        {tab==='role'&&(
          <div style={{padding:16}}>
            <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:12}}>
              🎭 ROLE-PLAY TASK
            </p>
            <div style={{...PX_BORDER('#A855D4',3),background:'rgba(168,85,212,0.1)',
              borderRadius:8,padding:18,marginBottom:16}}>
              <p style={{fontSize:9,color:'#A855D4',fontFamily:"'Press Start 2P',monospace",marginBottom:10}}>
                YOUR MISSION
              </p>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:16,color:C.cream,
                lineHeight:1.6}}>{lesson.roleplay}</p>
            </div>
            <div style={{...PX_BORDER(C.teal,2),background:'rgba(30,126,161,0.1)',
              borderRadius:8,padding:14,marginBottom:14}}>
              <p style={{fontSize:9,color:C.teal,fontFamily:"'Press Start 2P',monospace",marginBottom:8}}>
                🎙️ HOW TO PRACTICE
              </p>
              <p style={{fontSize:12,color:C.cream,fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.7}}>
                1. Read the scenario above{'\n'}
                2. Think of your French response{'\n'}
                3. Say it out loud or write it down{'\n'}
                4. Compare with the dialogue tab{'\n'}
                5. Repeat until confident!
              </p>
            </div>
            <div style={{...PX_BORDER(C.cedar,2),background:'rgba(45,106,79,0.15)',
              borderRadius:8,padding:14}}>
              <p style={{fontSize:9,color:'#3CA068',fontFamily:"'Press Start 2P',monospace",marginBottom:8}}>
                💡 REMEMBER
              </p>
              <p style={{fontSize:12,color:C.cream,fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.7}}>
                ✓ Use "Bonjour / Bonsoir" to greet{'\n'}
                ✓ Use "s'il vous plaît" — always!{'\n'}
                ✓ Use "Je vous en prie" to say welcome{'\n'}
                ✓ Smile and speak slowly. Bonne chance ! 🍀
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   LESSONS LIST SCREEN
═══════════════════════════════════════════════════════════ */
const LessonsScreen = ({lessons, catId, onBack, onSelect})=>{
  const cat = CATS.find(c=>c.id===catId)||CATS[0];
  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      <Header title={cat.label.toUpperCase()} subtitle={`${cat.fr} • ${lessons.length} lessons`} onBack={onBack}/>
      <div style={{flex:1,overflowY:'auto',background:C.darkBlue,padding:'12px 12px 90px'}}>
        {lessons.map((l,i)=>(
          <button key={l.id} onClick={()=>onSelect(l)} className="fadein"
            style={{width:'100%',background:'rgba(255,255,255,0.05)',
              border:`2px solid ${cat.accent}`,
              boxShadow:`3px 3px 0 ${cat.color}`,
              borderRadius:8,padding:'14px 16px',marginBottom:10,cursor:'pointer',
              textAlign:'left',display:'flex',alignItems:'center',gap:12,
              animationDelay:`${i*0.07}s`,animationFillMode:'both',transition:'transform 0.1s'}}>
            <div style={{width:44,height:44,background:`${cat.color}CC`,...PX_BORDER(cat.accent,2),
              borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:22,flexShrink:0}}>{l.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:9,color:cat.accent,fontFamily:"'Press Start 2P',monospace",marginBottom:4}}>
                LESSON {l.id}
              </p>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:15,fontWeight:700,
                color:C.cream,marginBottom:2}}>{l.title}</p>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:12,fontStyle:'italic',
                color:'rgba(200,168,122,0.8)'}}>{l.fr}</p>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <p style={{fontSize:9,color:C.gold,fontFamily:"'Press Start 2P',monospace"}}>+{l.xp}</p>
              <p style={{fontSize:7,color:'rgba(255,255,255,0.3)',fontFamily:"'IBM Plex Mono',monospace"}}>XP</p>
              <p style={{fontSize:14,marginTop:4}}>›</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CATEGORIES SCREEN
═══════════════════════════════════════════════════════════ */
const CategoriesScreen = ({onBack, onSelect})=>(
  <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
    <Header title="LESSON CATEGORIES" subtitle="Choose your training scenario"/>
    <div style={{flex:1,overflowY:'auto',background:C.darkBlue,padding:'14px 12px 90px'}}>
      <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:12}}>
        SELECT A CATEGORY
      </p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {CATS.map((cat,i)=>{
          const count = LESSONS.filter(l=>l.cat===cat.id).length;
          return(
            <button key={cat.id} onClick={()=>onSelect(cat.id)} className="fadein"
              style={{background:`linear-gradient(135deg,${cat.color}CC,${cat.color}66)`,
                border:`2px solid ${cat.accent}`,boxShadow:`4px 4px 0 ${cat.color}`,
                borderRadius:8,padding:'16px 12px',cursor:'pointer',textAlign:'left',
                animationDelay:`${i*0.06}s`,animationFillMode:'both'}}>
              <p style={{fontSize:26,marginBottom:6}}>{cat.emoji}</p>
              <p style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,
                color:cat.accent,lineHeight:1.6,marginBottom:4}}>{cat.label.toUpperCase()}</p>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:11,color:C.cream,
                fontStyle:'italic',opacity:0.75}}>{cat.fr}</p>
              <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,
                color:'rgba(255,255,255,0.4)',marginTop:6}}>{count} lesson{count!==1?'s':''}</p>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   HOME SCREEN
═══════════════════════════════════════════════════════════ */
const HomeScreen = ({onCat, onLesson})=>{
  const dailyLesson = LESSONS[0];
  const completedXP = 0;
  const totalXP = LESSONS.reduce((a,l)=>a+l.xp,0);

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      {/* App Header */}
      <div style={{background:`linear-gradient(135deg,${C.blue} 0%,${C.navy} 100%)`,
        padding:'18px 16px 14px',position:'relative',overflow:'hidden',
        borderBottom:`2px solid ${C.gold}`}}>
        <PixelSkyline/>
        {/* Flying plane */}
        <div className="plane-fly" style={{position:'absolute',top:10,zIndex:5}}>
          <PixelPlane size={24} color={C.goldL}/>
        </div>
        <div style={{position:'relative',zIndex:2}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
            <PixelPlane size={20} color={C.gold}/>
            <h1 style={{fontFamily:"'Press Start 2P',monospace",fontSize:14,
              color:C.gold,textShadow:'3px 3px 0 rgba(0,0,0,0.6)',letterSpacing:1}}>
              AirFrançais
            </h1>
          </div>
          <p style={{fontFamily:"'Crimson Pro',serif",fontSize:13,color:C.cream,
            fontStyle:'italic',opacity:0.8}}>French A2 for Cabin Crew ✈️</p>
        </div>
      </div>

      <div style={{flex:1,overflowY:'auto',background:C.darkBlue,paddingBottom:90}}>

        {/* Welcome & XP */}
        <div style={{margin:12,background:'rgba(255,255,255,0.06)',...PX_BORDER(C.gold,2),
          borderRadius:8,padding:'14px 16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <div>
              <p style={{fontFamily:"'Press Start 2P',monospace",fontSize:8,
                color:C.gold,marginBottom:3}}>BIENVENUE ! 👋</p>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:14,color:C.cream}}>
                Ready to fly through French?
              </p>
            </div>
            <div style={{...PX_BORDER(C.gold,2),background:'rgba(212,160,23,0.15)',
              borderRadius:6,padding:'8px 12px',textAlign:'center'}}>
              <p style={{fontFamily:"'Press Start 2P',monospace",fontSize:11,color:C.gold}}>{completedXP}</p>
              <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:C.sand,marginTop:2}}>XP EARNED</p>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{background:'rgba(255,255,255,0.1)',borderRadius:4,height:10,
            border:'1px solid rgba(255,255,255,0.1)',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${(completedXP/totalXP)*100}%`,
              background:`linear-gradient(90deg,${C.gold},${C.goldL})`,
              borderRadius:4,transition:'width 1s ease'}}/>
          </div>
          <p style={{fontSize:9,color:'rgba(255,255,255,0.4)',fontFamily:"'IBM Plex Mono',monospace",
            marginTop:4}}>{completedXP}/{totalXP} XP • {LESSONS.length} lessons total</p>
        </div>

        {/* Daily Lesson */}
        <div style={{marginInline:12,marginBottom:12}}>
          <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:8}}>
            📅 TODAY'S LESSON
          </p>
          <button onClick={()=>onLesson(dailyLesson)}
            style={{width:'100%',background:`linear-gradient(135deg,${C.blue},${C.blueM})`,
              border:`3px solid ${C.gold}`,boxShadow:`4px 4px 0 ${C.gold}`,
              borderRadius:10,padding:16,cursor:'pointer',textAlign:'left',display:'flex',
              alignItems:'center',gap:14}}>
            <div style={{fontSize:36}} className="bounce">{dailyLesson.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:5}}>
                LESSON {dailyLesson.id} • {dailyLesson.xp} XP
              </p>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:16,fontWeight:700,
                color:C.white,marginBottom:2}}>{dailyLesson.title}</p>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:12,
                color:'rgba(200,168,122,0.8)',fontStyle:'italic'}}>{dailyLesson.fr}</p>
              <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,
                color:'rgba(255,255,255,0.4)',marginTop:4}}>
                {dailyLesson.vocab.length} vocab • {dailyLesson.dialogue.length} lines • {dailyLesson.quiz.length} quiz
              </p>
            </div>
            <div style={{fontSize:20,color:C.gold}}>›</div>
          </button>
        </div>

        {/* Category Grid */}
        <div style={{marginInline:12,marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace"}}>
              CATEGORIES
            </p>
            <button onClick={onCat} style={{background:'none',border:'none',cursor:'pointer',
              fontSize:9,color:C.blueL,fontFamily:"'Press Start 2P',monospace"}}>
              SEE ALL →
            </button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
            {CATS.map(cat=>(
              <button key={cat.id} onClick={()=>onCat(cat.id)}
                style={{background:`${cat.color}BB`,border:`2px solid ${cat.accent}`,
                  borderRadius:8,padding:'10px 6px',cursor:'pointer',
                  boxShadow:`3px 3px 0 ${cat.color}`,display:'flex',
                  flexDirection:'column',alignItems:'center',gap:4}}>
                <span style={{fontSize:20}}>{cat.emoji}</span>
                <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:5.5,
                  color:cat.accent,textAlign:'center',lineHeight:1.4}}>
                  {cat.label.toUpperCase().replace('IN-FLIGHT SERVICE','SERVICE').replace('PASSENGER HELP','HELP').replace('FLIGHT INFO','INFO').replace('LANDING','LAND')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* All Lessons Quick Access */}
        <div style={{marginInline:12}}>
          <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:8}}>
            ALL 10 LESSONS
          </p>
          {LESSONS.map((l,i)=>{
            const cat = CATS.find(c=>c.id===l.cat)||CATS[0];
            return(
              <button key={l.id} onClick={()=>onLesson(l)}
                style={{width:'100%',background:'rgba(255,255,255,0.04)',
                  border:`1px solid rgba(255,255,255,0.08)`,borderLeft:`3px solid ${cat.accent}`,
                  borderRadius:6,padding:'10px 12px',marginBottom:6,cursor:'pointer',
                  textAlign:'left',display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:18,width:24,textAlign:'center',flexShrink:0}}>{l.emoji}</span>
                <div style={{flex:1}}>
                  <p style={{fontFamily:"'Crimson Pro',serif",fontSize:14,fontWeight:600,
                    color:C.cream}}>{l.title}</p>
                  <p style={{fontFamily:"'Crimson Pro',serif",fontSize:11,fontStyle:'italic',
                    color:'rgba(200,168,122,0.6)'}}>{l.fr}</p>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace"}}>+{l.xp}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PASSPORT SCREEN (Progress)
═══════════════════════════════════════════════════════════ */
const PassportScreen = ()=>(
  <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
    <Header title="MON PASSEPORT" subtitle="Your Francophone journey"/>
    <div style={{flex:1,overflowY:'auto',background:C.darkBlue,padding:'14px 12px 90px'}}>
      {/* Passport Book */}
      <div style={{...PX_BORDER(C.gold,3),background:'#1a3060',borderRadius:8,
        padding:16,marginBottom:14,textAlign:'center'}}>
        <p style={{fontSize:40,marginBottom:6}}>🛂</p>
        <p style={{fontFamily:"'Press Start 2P',monospace",fontSize:9,color:C.gold,marginBottom:4}}>
          PASSEPORT DE L'APPRENANT
        </p>
        <p style={{fontFamily:"'Crimson Pro',serif",fontSize:13,color:C.cream,fontStyle:'italic'}}>
          RÉPUBLIQUE DE LA LANGUE FRANÇAISE
        </p>
      </div>

      {/* Stamp Grid */}
      <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:10}}>
        🏷️ COLLECTION BADGES
      </p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:14}}>
        {[
          {emoji:'🗼',label:'Paris',desc:'Boarding'},
          {emoji:'🕌',label:'Maroc',desc:'Safety'},
          {emoji:'🌿',label:'Liban',desc:'Service'},
          {emoji:'🌴',label:'Dakar',desc:'Assist.'},
          {emoji:'⛩️',label:'Hanoï',desc:'Info'},
          {emoji:'🏰',label:'Lyon',desc:'Complaints'},
          {emoji:'🏖️',label:'Tunis',desc:'Landing'},
          {emoji:'⭐',label:'Expert',desc:'All done'},
        ].map((b,i)=>(
          <div key={i} style={{...PX_BORDER(i<1?C.gold:'rgba(255,255,255,0.15)',2),
            background:i<1?'rgba(212,160,23,0.2)':'rgba(255,255,255,0.03)',
            borderRadius:8,padding:'10px 4px',textAlign:'center',opacity:i<1?1:0.35}}>
            <p style={{fontSize:22,marginBottom:4}}>{b.emoji}</p>
            <p style={{fontSize:7,color:i<1?C.gold:C.cream,fontFamily:"'Press Start 2P',monospace",
              marginBottom:2}}>{b.label}</p>
            <p style={{fontSize:6,color:'rgba(255,255,255,0.4)',fontFamily:"'IBM Plex Mono',monospace"}}>{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Cultural Destinations */}
      <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:10}}>
        🗺️ FRANCOPHONE DESTINATIONS
      </p>
      {[
        {country:'🇫🇷 FRANCE',city:'Paris • Lyon • Marseille',note:'The heart of the French language',color:'#1B3A6B'},
        {country:'🇲🇦 MAROC',city:'Casablanca • Marrakech • Rabat',note:'Vibrant Francophone North Africa',color:'#7A3000'},
        {country:'🇱🇧 LIBAN',city:'Beyrouth • Byblos',note:'Mediterranean elegance & culture',color:'#1E5E3A'},
        {country:'🇸🇳 SÉNÉGAL',city:'Dakar • Saint-Louis',note:'West African Francophone hub',color:'#7A5A00'},
        {country:'🇻🇳 VIETNAM',city:'Hanoï • Hồ Chí Minh',note:'Asian Francophone heritage',color:'#5A1A7A'},
      ].map((d,i)=>(
        <div key={i} style={{background:`${d.color}22`,border:`1px solid ${d.color}55`,
          borderRadius:6,padding:'10px 12px',marginBottom:8,display:'flex',alignItems:'center',gap:10}}>
          <div style={{flex:1}}>
            <p style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:C.gold,marginBottom:3}}>
              {d.country}
            </p>
            <p style={{fontFamily:"'Crimson Pro',serif",fontSize:13,color:C.cream,marginBottom:2}}>
              {d.city}
            </p>
            <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:'rgba(255,255,255,0.35)'}}>
              {d.note}
            </p>
          </div>
          <span style={{fontSize:9,color:'rgba(255,255,255,0.2)',fontFamily:"'Press Start 2P',monospace"}}>
            LOCKED
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PRACTICE SCREEN (Quick drills)
═══════════════════════════════════════════════════════════ */
const PracticeScreen = ({onLesson})=>{
  const [mode,setMode]=useState(null);
  const [lessonIdx,setLessonIdx]=useState(0);
  const lesson = LESSONS[lessonIdx];

  if(mode==='quiz') return(
    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      <Header title="QUICK QUIZ" subtitle={lesson.fr} onBack={()=>setMode(null)}/>
      <div style={{flex:1,overflowY:'auto',background:C.darkBlue,paddingBottom:80}}>
        <div style={{padding:'8px 0'}}>
          <div style={{display:'flex',overflowX:'auto',padding:'8px 12px',gap:6}}>
            {LESSONS.map((l,i)=>(
              <button key={l.id} onClick={()=>setLessonIdx(i)}
                style={{background:i===lessonIdx?C.gold:'rgba(255,255,255,0.08)',
                  border:`1px solid ${i===lessonIdx?C.gold:'rgba(255,255,255,0.15)'}`,
                  color:i===lessonIdx?C.navy:C.cream,padding:'5px 8px',cursor:'pointer',
                  borderRadius:4,fontFamily:"'Press Start 2P',monospace",fontSize:7,whiteSpace:'nowrap'}}>
                L{l.id} {l.emoji}
              </button>
            ))}
          </div>
        </div>
        <QuizView key={lessonIdx} quiz={lesson.quiz} lessonTitle={lesson.title}/>
      </div>
    </div>
  );

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      <Header title="PRACTICE" subtitle="Drills & exercises"/>
      <div style={{flex:1,overflowY:'auto',background:C.darkBlue,padding:'14px 12px 90px'}}>
        <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:12}}>
          CHOOSE PRACTICE MODE
        </p>
        {[
          {id:'quiz',emoji:'🎯',label:'Quick Quiz',desc:'Test your knowledge with MCQ questions from any lesson.',color:'#1B3A6B',accent:C.blueL},
          {id:'review',emoji:'📖',label:'Vocabulary Review',desc:'Browse all vocabulary from all 10 lessons.',color:'#1E5E3A',accent:'#3CA068'},
          {id:'roleplay',emoji:'🎭',label:'Role-play Prompts',desc:'See all role-play scenarios to practice speaking.',color:'#5A1A7A',accent:'#A855D4'},
        ].map(m=>(
          <button key={m.id} onClick={()=>setMode(m.id)}
            style={{width:'100%',background:`${m.color}88`,border:`2px solid ${m.accent}`,
              boxShadow:`4px 4px 0 ${m.color}`,borderRadius:8,padding:16,cursor:'pointer',
              textAlign:'left',display:'flex',gap:14,alignItems:'center',marginBottom:10}}>
            <span style={{fontSize:32}}>{m.emoji}</span>
            <div>
              <p style={{fontFamily:"'Press Start 2P',monospace",fontSize:9,
                color:m.accent,marginBottom:6}}>{m.label.toUpperCase()}</p>
              <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,
                color:C.cream,lineHeight:1.5}}>{m.desc}</p>
            </div>
          </button>
        ))}

        {mode==='review'&&(
          <div style={{marginTop:8}}>
            <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:10}}>
              ALL VOCABULARY
            </p>
            {LESSONS.map(l=>(
              <div key={l.id} style={{marginBottom:14}}>
                <p style={{fontSize:8,color:catAccent(l.cat),fontFamily:"'Press Start 2P',monospace",
                  marginBottom:6}}>{l.emoji} LESSON {l.id}: {l.title.toUpperCase()}</p>
                {l.vocab.map((v,i)=><VocabCard key={i} item={v} idx={i}/>)}
              </div>
            ))}
          </div>
        )}

        {mode==='roleplay'&&(
          <div style={{marginTop:8}}>
            <p style={{fontSize:8,color:C.gold,fontFamily:"'Press Start 2P',monospace",marginBottom:10}}>
              ROLE-PLAY SCENARIOS
            </p>
            {LESSONS.map((l,i)=>(
              <div key={l.id} style={{...PX_BORDER('#A855D4',2),
                background:'rgba(168,85,212,0.08)',borderRadius:8,padding:14,marginBottom:10}}>
                <p style={{fontSize:9,color:'#A855D4',fontFamily:"'Press Start 2P',monospace",marginBottom:6}}>
                  {l.emoji} LESSON {l.id} — {l.title.toUpperCase()}
                </p>
                <p style={{fontFamily:"'Crimson Pro',serif",fontSize:14,color:C.cream,lineHeight:1.5}}>
                  {l.roleplay}
                </p>
                <button onClick={()=>onLesson(l)} style={{marginTop:8,background:'none',
                  border:`1px solid #A855D4`,color:'#A855D4',padding:'5px 10px',
                  cursor:'pointer',borderRadius:4,fontFamily:"'Press Start 2P',monospace",fontSize:7}}>
                  SEE DIALOGUE →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function AirFrancaisApp() {
  const [screen, setScreen] = useState('home');   // home|categories|lessons|lesson|practice|passport
  const [catFilter, setCatFilter] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const goLesson = (lesson) => { setActiveLesson(lesson); setScreen('lesson'); };
  const goCat = (catId=null) => { setCatFilter(catId); setScreen(catId?'lessons':'categories'); };

  const handleNav = (id) => {
    if(id==='home')setScreen('home');
    else if(id==='lessons'){setScreen('categories');}
    else if(id==='practice')setScreen('practice');
    else if(id==='passport')setScreen('passport');
  };

  const navActive = {home:'home',categories:'lessons',lessons:'lessons',lesson:'lessons',
    practice:'practice',passport:'passport'}[screen]||'home';

  return (
    <div style={{fontFamily:"'Crimson Pro',Georgia,serif",background:C.navy,
      minHeight:'100vh',maxWidth:480,margin:'0 auto',position:'relative',
      overflow:'hidden',color:C.white}}>
      <GlobalStyles/>

      {screen==='home'&&
        <HomeScreen onCat={goCat} onLesson={goLesson}/>}

      {screen==='categories'&&
        <CategoriesScreen onBack={()=>setScreen('home')} onSelect={goCat}/>}

      {screen==='lessons'&&
        <LessonsScreen
          lessons={catFilter?LESSONS.filter(l=>l.cat===catFilter):LESSONS}
          catId={catFilter||'boarding'}
          onBack={()=>setScreen('categories')}
          onSelect={goLesson}/>}

      {screen==='lesson'&&activeLesson&&
        <LessonScreen lesson={activeLesson}
          onBack={()=>setScreen(catFilter?'lessons':'categories')}/>}

      {screen==='practice'&&
        <PracticeScreen onLesson={goLesson}/>}

      {screen==='passport'&&
        <PassportScreen/>}

      <BottomNav active={navActive} onNav={handleNav}/>
    </div>
  );
}
