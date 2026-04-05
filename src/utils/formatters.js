const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  let d, m, y;
  if (parts[0].length === 4) { [y, m, d] = parts; } else { [d, m, y] = parts; }
  const monthName = MONTHS[+m - 1];
  if (!monthName) return dateStr;
  const shortYear = y && y.length === 4 ? y.slice(2) : y;
  return `${+d} ${monthName} ${shortYear}`;
}

export function formatTime(timeStr) {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length !== 2) return timeStr;
  const [h, m] = parts;
  const hr = parseInt(h, 10);
  const min = m || "00";
  if (isNaN(hr)) return timeStr;
  const displayHr = hr % 12 || 12;
  const period = hr >= 12 ? "PM" : "AM";
  return `${displayHr}:${min.padStart(2, "0")} ${period}`;
}

export function buildWhatsAppMessage(occ, form, text) {
  const body = text || `You are all warmly invited to celebrate ${occ.name} with us!`;
  return `${occ.icons[0]}✨ *${occ.name.toUpperCase()} INVITATION* ✨${occ.icons[0]}\n\n${body}\n\n📅 *${formatDate(form.date)}* • ⏰ *${formatTime(form.time)}*\n📍 *${form.location}*\n\n— ${form.senderName}\n_Nimantran_ ✨`;
}

// ═══════════════════════════════════════════════════════════════
// BODY-ONLY English fallback templates — occasion-specific
// No greeting, no closing, no sender name
// Group-friendly, gender-neutral
// ═══════════════════════════════════════════════════════════════

const OCCASION_TEMPLATES = {
  diwali: () =>
    `As the festival of lights fills every corner with warmth and joy, you are all warmly invited to celebrate Diwali together! 🪔 May this auspicious occasion bring prosperity, happiness and divine blessings into everyone's lives. Let's light up this celebration with love and togetherness! ✨`,
  holi: () =>
    `Get ready to splash into the most colorful celebration of the year! 🎨 Everyone is invited to celebrate Holi with vibrant colors, delicious treats and endless fun. Let's paint the world in every shade of happiness together! 💜`,
  navratri: () =>
    `Everyone is invited to celebrate the divine energy of Navratri with devotion and joy! 🙏 Let us come together to honor the goddess with prayers, garba and celebration. May this sacred festival fill all our lives with spiritual strength and happiness! ✨`,
  ganesh: () =>
    `You are all cordially invited to seek the blessings of Lord Ganesha on this auspicious Ganesh Chaturthi! 🙏 Join us in prayer, devotion and celebration as we welcome the remover of obstacles into our hearts and homes. Ganpati Bappa Morya! 🪔`,
  dussehra: () =>
    `Everyone is invited to celebrate the triumph of good over evil this Dussehra! 🏹 Let us come together to honor courage, righteousness and the victory of light. May this meaningful occasion inspire strength and positivity in all our lives! 🪔`,
  pongal: () =>
    `You are all warmly invited to celebrate Pongal — a time of gratitude, harvest and togetherness! 🌾 Let us gather to give thanks for nature's abundance and share the joy of this beautiful tradition together. Pongalo Pongal! ☀️`,
  onam: () =>
    `Everyone is joyfully invited to celebrate Onam — the festival of prosperity and cultural pride! 🌸 Join us for a feast of flavors, a splash of colors and the warmth of togetherness. Let's make this Onam truly memorable! 🎉`,
  baisakhi: () =>
    `You are all invited to celebrate Baisakhi with energy and enthusiasm! 🌾 Let's come together to rejoice in the spirit of harvest, happiness and new beginnings. Everyone's presence will make this festive occasion even more special! 🎉`,
  rakhi: () =>
    `Everyone is cheerfully invited to celebrate Raksha Bandhan — the beautiful bond of love between siblings! 🎀 Join us for a day filled with joy, laughter and heartfelt moments that celebrate this precious relationship! 💕`,
  makar: () =>
    `You are all invited to celebrate Makar Sankranti with festive cheer! 🪁 Let kites soar high, sweets flow freely and positivity fill the air as we welcome brighter days together! ☀️`,
  eid: () =>
    `Everyone is warmly invited to share the blessings of Eid! 🌙 Let us come together in gratitude, love and togetherness. May this blessed occasion bring peace and joy to all. Eid Mubarak! ✨`,
  christmas: () =>
    `You are all joyfully invited to celebrate Christmas — a time of love, warmth and festive cheer! 🎄 Join us for a magical celebration filled with carols, laughter and the spirit of giving. Merry Christmas! 🎅`,
  newyear: () =>
    `Everyone is invited to ring in the New Year together! 🎆 Let's celebrate new beginnings, exciting possibilities and the promise of a wonderful year ahead. Here's to making unforgettable memories! 🥂`,
  valentine: () =>
    `You are lovingly invited to celebrate Valentine's Day — a day dedicated to love and heartfelt emotions! 💕 Let's make this special day beautiful with cherished moments together. Spread the love! 💝`,
  easter: () =>
    `Everyone is invited to celebrate Easter — a time of hope, renewal and blessings! 🐣 Join us as we embrace the joy of new beginnings and share the warmth of togetherness! 🌷`,
  halloween: () =>
    `Boo! You are all invited to a spooktacular Halloween celebration! 🎃 Get your costumes ready for a night of thrills, chills and plenty of treats. It's going to be frightfully fun! 👻`,
  birthday: () =>
    `Everyone is invited to a wonderful birthday celebration! 🎂 Come join the fun with cake, laughter, music and amazing memories. Let's make this birthday absolutely unforgettable! 🎉`,
  wedding: () =>
    `With great joy and love, you are all cordially invited to a beautiful wedding celebration! 💒 As two hearts unite in a sacred bond, your gracious presence and blessings would make this occasion truly complete! 💍`,
  anniversary: () =>
    `Everyone is lovingly invited to celebrate a special anniversary — a milestone of love, togetherness and beautiful memories! 💑 Join us as we cherish this journey and look forward to more wonderful years! 🥂`,
  babyshower: () =>
    `You are all invited to a beautiful baby shower celebration! 👶 Come shower the little one with love, blessings and joy. It's going to be an adorable and heartwarming time together! 🍼`,
  graduation: () =>
    `Everyone is proudly invited to celebrate a graduation milestone! 🎓 Hard work, dedication and dreams have led to this moment of triumph. Join us in honoring this incredible achievement! 🌟`,
  engagement: () =>
    `You are all happily invited to celebrate an engagement — the beautiful beginning of a lifelong journey of love! 💍 Everyone's presence and blessings will make this joyous occasion even more special! 💕`,
  retirement: () =>
    `Everyone is warmly invited to celebrate a retirement — honoring years of dedication, cherished memories and the exciting new chapter that lies ahead! 🎊 Join us in this heartfelt tribute! 🌟`,
  naming: () =>
    `You are all joyfully invited to a naming ceremony — a beautiful moment as we welcome and name our little blessing! 👶 Everyone's love and presence will make this family celebration truly special! 🌟`,
  housewarming: () =>
    `Everyone is warmly invited to a housewarming celebration! 🏠 Come help us fill our new home with love, laughter and wonderful memories. Your presence will make it feel like home! 🎉`,
  kitty: () =>
    `You are all invited to a fabulous kitty party! 🎀 Get ready for an evening of fun, laughter, games and great company. It's going to be a party nobody will want to miss! 🥂`,
  farewell: () =>
    `Everyone is invited to a farewell celebration — a time to cherish beautiful memories, share laughter and wish the very best for new adventures ahead! 🌟 Let's make this goodbye a memorable one! 💫`,
  poolparty: () =>
    `You are all invited to dive into an awesome pool party! 🏊 Bring your swimsuit, sunscreen and good vibes for a splashing good time with great music, cool drinks and endless fun! 🌊`,
  rooftop: () =>
    `Everyone is invited to a stylish rooftop party under the stars! 🌃 Join us for an evening of great music, stunning views and unforgettable vibes. It's going to be a night to remember! 🎶`,
  potluck: () =>
    `You are all invited to a potluck party! 🍲 Bring your favorite dish and join us for an evening of delicious food, wonderful company and shared happiness. The more flavors, the merrier! 🎉`,
  society: () =>
    `All residents are respectfully invited to attend the society meeting. 🏢 Your participation and valuable input are important for our community. We look forward to a constructive discussion together. 📋`,
  school: () =>
    `All parents and guardians are cordially invited to attend the school meeting. 🏫 Your presence and involvement play a vital role in the growth and development of our students. We look forward to everyone's participation! 📚`,
  pta: () =>
    `All parents and guardians are respectfully invited to the PTA meeting. 🤝 Together, we can collaborate for the betterment of our children's education and well-being. Every voice matters! 📋`,
  agm: () =>
    `All members are formally invited to attend the Annual General Meeting / Committee Meeting. 📊 Important matters will be discussed and everyone's presence is essential for key decisions. We value your participation! 🤝`,
  corporate: () =>
    `You are all cordially invited to a corporate event. 💼 Join us for an evening of professional networking, insightful discussions and meaningful connections. Everyone's esteemed presence would be valued! 🌟`,
  seminar: () =>
    `Everyone is invited to an informative seminar/workshop. 📚 Join us for a session of learning, knowledge sharing and professional growth. Don't miss this opportunity to gain valuable insights! 🎯`,
  pooja: () =>
    `You are all humbly invited to a pooja / prayer ceremony. 🙏 Seek divine blessings as we come together in devotion and faith. Everyone's presence will bring peace and positivity to this sacred gathering! 🪔`,
  mehndi: () =>
    `Everyone is joyfully invited to a vibrant mehndi ceremony! 🌿 Come celebrate with beautiful henna designs, traditional music, laughter and the colors of love. It's going to be a gorgeous celebration! 💃`,
  mundan: () =>
    `You are all respectfully invited to the mundan ceremony — a sacred milestone for our little one. 👶 Everyone's blessings and presence on this auspicious occasion will mean the world to our family! 🙏`,
  fundraiser: () =>
    `Everyone is invited to support a meaningful fundraiser. 🤝 Together, we can make a real difference and create a positive impact. Your generous support and presence will help bring this cause to life! ❤️`,
  workanniv: () =>
    `You are all proudly invited to celebrate a work anniversary — honoring years of dedication, hard work and remarkable achievements! 🏆 Join us in recognizing this professional milestone! 🎉`,
  other: () =>
    `You are all warmly invited to a special event! ✨ Everyone's presence will make this occasion truly memorable. Let's come together and make this a wonderful celebration! 🎉`,
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY MAPPING — each occasion belongs to a tone category
// ═══════════════════════════════════════════════════════════════

const OCCASION_CATEGORY = {
  // FESTIVAL — spiritual, festive, blessings
  diwali: "festival", holi: "festival", navratri: "festival", ganesh: "festival",
  dussehra: "festival", pongal: "festival", onam: "festival", baisakhi: "festival",
  rakhi: "festival", makar: "festival", eid: "festival", christmas: "festival",
  newyear: "festival", easter: "festival", halloween: "festival", valentine: "festival",
  // PARTY — fun, casual, exciting
  birthday: "party", kitty: "party", poolparty: "party", rooftop: "party",
  potluck: "party", farewell: "party",
  // MEETING — formal, professional
  society: "meeting", school: "meeting", pta: "meeting", agm: "meeting",
  corporate: "meeting", seminar: "meeting",
  // CEREMONY — traditional, blessings, auspicious
  wedding: "ceremony", engagement: "ceremony", babyshower: "ceremony",
  naming: "ceremony", mundan: "ceremony", mehndi: "ceremony", pooja: "ceremony",
  // CELEBRATION — milestone, achievement
  anniversary: "celebration", graduation: "celebration", retirement: "celebration",
  housewarming: "celebration", fundraiser: "celebration", workanniv: "celebration",
  // OTHER
  other: "other",
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY-BASED language templates
// Each language has 6 category templates with appropriate tone
// ALL: body-only, group-friendly, gender-neutral
// ═══════════════════════════════════════════════════════════════

const CATEGORY_LANG_TEMPLATES = {
  hi: {
    festival: (occ) => `${occ.name} के इस पावन अवसर पर आप सभी को सादर आमंत्रित किया जाता है! ✨ इस शुभ त्योहार को साथ मिलकर मनाएं — खुशियां बांटें, आशीर्वाद लें और एक-दूसरे के साथ इस उत्सव को यादगार बनाएं! 🪔`,
    party: (occ) => `${occ.name} की धमाकेदार पार्टी में आप सभी को बुलाया जाता है! 🎉 ढेर सारी मस्ती, म्यूज़िक, खाना-पीना और शानदार माहौल — सब तैयार है! बस आप सबकी कमी है, आइए और मज़ा करें! 🥳`,
    meeting: (occ) => `${occ.name} में आप सभी की उपस्थिति अपेक्षित है। 📋 महत्वपूर्ण विषयों पर चर्चा की जाएगी और सबके सुझाव एवं सहयोग आवश्यक है। कृपया समय पर पधारें! 🤝`,
    ceremony: (occ) => `${occ.name} के इस शुभ और मंगल अवसर पर आप सभी सपरिवार सादर आमंत्रित हैं! 🙏 आपका आशीर्वाद और शुभकामनाएं इस पवित्र अवसर को और भी विशेष बना देंगी। सभी का स्वागत है! ✨`,
    celebration: (occ) => `${occ.name} की इस खुशी के अवसर पर आप सभी को सादर आमंत्रित किया जाता है! 🎊 इस खास पड़ाव को साथ मिलकर मनाएं और इसे एक अविस्मरणीय पल बनाएं! आइए, खुशियां साझा करें! 🌟`,
    other: (occ) => `${occ.name} के इस विशेष अवसर पर आप सभी को हार्दिक आमंत्रण! ✨ आइए, साथ मिलकर इस मौके को खास और यादगार बनाएं! सभी सपरिवार सादर आमंत्रित हैं! 🎉`,
  },
  mr: {
    festival: (occ) => `${occ.name} च्या या पवित्र सणाच्या निमित्ताने आपणा सर्वांना सादर आमंत्रित करण्यात येत आहे! ✨ हा सण एकत्र येऊन साजरा करूया — आनंद वाटूया, आशीर्वाद घेऊया आणि हा उत्सव अविस्मरणीय बनवूया! 🪔`,
    party: (occ) => `${occ.name} च्या जबरदस्त पार्टीसाठी सर्वांना आमंत्रण! 🎉 भरपूर मजा, म्युझिक, खाणं-पिणं आणि धम्माल — सगळं तयार आहे! फक्त तुमची कमी आहे, या आणि एन्जॉय करा! 🥳`,
    meeting: (occ) => `${occ.name} साठी सर्वांची उपस्थिती अपेक्षित आहे. 📋 महत्त्वाच्या विषयांवर चर्चा होणार असून सर्वांचे सहकार्य आणि सूचना आवश्यक आहेत. कृपया वेळेवर उपस्थित राहावे! 🤝`,
    ceremony: (occ) => `${occ.name} च्या या शुभ आणि मंगल प्रसंगी आपणा सर्वांना सहकुटुंब सादर आमंत्रित करण्यात येत आहे! 🙏 तुमचे आशीर्वाद आणि शुभेच्छा या पवित्र प्रसंगाला अधिक विशेष बनवतील. सर्वांचे स्वागत आहे! ✨`,
    celebration: (occ) => `${occ.name} च्या या आनंदाच्या प्रसंगी सर्वांना सादर आमंत्रित करण्यात येत आहे! 🎊 या खास क्षणाला एकत्र येऊन साजरा करूया आणि अविस्मरणीय बनवूया! आनंद वाटूया! 🌟`,
    other: (occ) => `${occ.name} च्या या विशेष प्रसंगी आपणा सर्वांना हार्दिक आमंत्रण! ✨ चला, एकत्र येऊन हा प्रसंग खास आणि अविस्मरणीय बनवूया! सर्वांचे सहकुटुंब स्वागत आहे! 🎉`,
  },
  ta: {
    festival: (occ) => `${occ.name} பண்டிகையின் இந்த மங்கலமான நாளில் அனைவரையும் அன்புடன் அழைக்கிறோம்! ✨ ஒன்றாக இணைந்து இந்த திருவிழாவை கொண்டாடுவோம் — மகிழ்ச்சியை பகிர்வோம், ஆசீர்வாதங்களைப் பெறுவோம்! 🪔`,
    party: (occ) => `${occ.name} பார்ட்டிக்கு அனைவரையும் அழைக்கிறோம்! 🎉 நிறைய வேடிக்கை, இசை, உணவு மற்றும் குதூகலம் — எல்லாம் தயார்! நீங்கள் மட்டும் வாருங்கள், ஜாலியாக கொண்டாடுவோம்! 🥳`,
    meeting: (occ) => `${occ.name} கூட்டத்தில் அனைவரின் பங்கேற்பு எதிர்பார்க்கப்படுகிறது. 📋 முக்கியமான விஷயங்கள் விவாதிக்கப்படும், அனைவரின் ஒத்துழைப்பும் கருத்துக்களும் அவசியம். தயவுசெய்து நேரத்திற்கு வரவும்! 🤝`,
    ceremony: (occ) => `${occ.name} இந்த மங்கலமான நிகழ்வுக்கு அனைவரையும் குடும்பத்துடன் அன்புடன் அழைக்கிறோம்! 🙏 உங்கள் ஆசீர்வாதமும் வாழ்த்துக்களும் இந்த புனிதமான நிகழ்வை மேலும் சிறப்பாக்கும்! ✨`,
    celebration: (occ) => `${occ.name} இந்த மகிழ்ச்சியான தருணத்தில் அனைவரையும் அழைக்கிறோம்! 🎊 இந்த சிறப்பான தருணத்தை ஒன்றாக கொண்டாடி மறக்கமுடியாததாக மாற்றுவோம்! 🌟`,
    other: (occ) => `${occ.name} இந்த சிறப்பு நிகழ்வுக்கு அனைவரையும் அன்புடன் அழைக்கிறோம்! ✨ ஒன்றாக இணைந்து இந்த நிகழ்வை யாதும் மறக்கமுடியாததாக செய்வோம்! 🎉`,
  },
  te: {
    festival: (occ) => `${occ.name} పండుగ సందర్భంగా మీ అందరినీ ఆత్మీయంగా ఆహ్వానిస్తున్నాము! ✨ కలిసి ఈ పండుగను జరుపుకుందాం — ఆనందాన్ని పంచుకుందాం, ఆశీర్వాదాలు అందుకుందాం! 🪔`,
    party: (occ) => `${occ.name} పార్టీకి అందరినీ ఆహ్వానిస్తున్నాము! 🎉 చాలా ఫన్, మ్యూజిక్, భోజనం మరియు సరదా — అంతా రెడీ! మీరు రావాల్సిందే, కలిసి ఎంజాయ్ చేద్దాం! 🥳`,
    meeting: (occ) => `${occ.name} సమావేశంలో అందరి హాజరు ఆవశ్యకం. 📋 ముఖ్యమైన అంశాలు చర్చించబడతాయి, అందరి సహకారం మరియు సూచనలు అవసరం. దయచేసి సమయానికి రావలసిందిగా కోరుతున్నాము! 🤝`,
    ceremony: (occ) => `${occ.name} ఈ శుభ సందర్భంలో మీ అందరినీ కుటుంబ సమేతంగా ఆహ్వానిస్తున్నాము! 🙏 మీ ఆశీర్వాదాలు మరియు శుభాకాంక్షలు ఈ పవిత్ర సందర్భాన్ని మరింత ప్రత్యేకంగా చేస్తాయి! ✨`,
    celebration: (occ) => `${occ.name} ఈ ఆనంద సందర్భంలో అందరినీ ఆహ్వానిస్తున్నాము! 🎊 ఈ ప్రత్యేక క్షణాన్ని కలిసి జరుపుకొని మరపురానిదిగా చేద్దాం! 🌟`,
    other: (occ) => `${occ.name} ఈ ప్రత్యేక సందర్భానికి మీ అందరినీ ఆహ్వానిస్తున్నాము! ✨ కలిసి ఈ సందర్భాన్ని మరపురానిదిగా చేద్దాం! 🎉`,
  },
  kn: {
    festival: (occ) => `${occ.name} ಹಬ್ಬದ ಈ ಮಂಗಳಕರ ಸಂದರ್ಭದಲ್ಲಿ ಎಲ್ಲರನ್ನೂ ಪ್ರೀತಿಯಿಂದ ಆಹ್ವಾನಿಸುತ್ತಿದ್ದೇವೆ! ✨ ಒಟ್ಟಿಗೆ ಸೇರಿ ಈ ಹಬ್ಬವನ್ನು ಸಂಭ್ರಮಿಸೋಣ! 🪔`,
    party: (occ) => `${occ.name} ಪಾರ್ಟಿಗೆ ಎಲ್ಲರಿಗೂ ಆಹ್ವಾನ! 🎉 ಮಜಾ, ಸಂಗೀತ, ಊಟ ಮತ್ತು ಮೋಜು — ಎಲ್ಲಾ ರೆಡಿ! ನೀವೆಲ್ಲ ಬನ್ನಿ, ಒಟ್ಟಿಗೆ ಎಂಜಾಯ್ ಮಾಡೋಣ! 🥳`,
    meeting: (occ) => `${occ.name} ಸಭೆಯಲ್ಲಿ ಎಲ್ಲರ ಹಾಜರಾತಿ ಅಗತ್ಯ. 📋 ಪ್ರಮುಖ ವಿಷಯಗಳ ಚರ್ಚೆ ನಡೆಯಲಿದೆ. ದಯವಿಟ್ಟು ಸಮಯಕ್ಕೆ ಬನ್ನಿ! 🤝`,
    ceremony: (occ) => `${occ.name} ಈ ಶುಭ ಸಂದರ್ಭದಲ್ಲಿ ಎಲ್ಲರನ್ನೂ ಕುಟುಂಬ ಸಮೇತ ಆಹ್ವಾನಿಸುತ್ತಿದ್ದೇವೆ! 🙏 ನಿಮ್ಮ ಆಶೀರ್ವಾದ ಈ ಸಮಾರಂಭವನ್ನು ಅವಿಸ್ಮರಣೀಯವಾಗಿಸುತ್ತದೆ! ✨`,
    celebration: (occ) => `${occ.name} ಈ ಸಂತೋಷದ ಸಂದರ್ಭದಲ್ಲಿ ಎಲ್ಲರನ್ನೂ ಆಹ್ವಾನಿಸುತ್ತಿದ್ದೇವೆ! 🎊 ಒಟ್ಟಿಗೆ ಸೇರಿ ಈ ಸಮಾರಂಭವನ್ನು ಅವಿಸ್ಮರಣೀಯವಾಗಿಸೋಣ! 🌟`,
    other: (occ) => `${occ.name} ಈ ವಿಶೇಷ ಸಂದರ್ಭಕ್ಕೆ ಎಲ್ಲರನ್ನೂ ಪ್ರೀತಿಯಿಂದ ಆಹ್ವಾನಿಸುತ್ತಿದ್ದೇವೆ! ✨ ಬನ್ನಿ, ಒಟ್ಟಿಗೆ ಈ ಕ್ಷಣವನ್ನು ಅವಿಸ್ಮರಣೀಯವಾಗಿಸೋಣ! 🎉`,
  },
  gu: {
    festival: (occ) => `${occ.name} ના આ પાવન અવસર પર આપ સૌને સાદર આમંત્રણ! ✨ આવો, સાથે મળીને આ તહેવાર ઉજવીએ — ખુશીઓ વહેંચીએ, આશીર્વાદ મેળવીએ! 🪔`,
    party: (occ) => `${occ.name} ની ધમાકેદાર પાર્ટીમાં સૌને આમંત્રણ! 🎉 ભરપૂર મજા, મ્યુઝિક, ખાણું-પીણું — બધું તૈયાર! ફક્ત તમારી કમી છે, આવો ને મજા કરો! 🥳`,
    meeting: (occ) => `${occ.name} માં સૌની ઉપસ્થિતિ આવશ્યક છે. 📋 મહત્વના મુદ્દાઓ પર ચર્ચા થશે. સૌનો સહકાર જરૂરી છે. કૃપા કરીને સમય પર આવો! 🤝`,
    ceremony: (occ) => `${occ.name} ના આ શુભ પ્રસંગે આપ સૌને સહકુટુંબ સાદર આમંત્રણ! 🙏 તમારા આશીર્વાદ અને શુભેચ્છાઓ આ પવિત્ર પ્રસંગને વધુ ખાસ બનાવશે! ✨`,
    celebration: (occ) => `${occ.name} ના આ ખુશીના અવસર પર સૌને સાદર આમંત્રણ! 🎊 આ ખાસ ક્ષણને સાથે મળીને ઉજવીએ અને યાદગાર બનાવીએ! 🌟`,
    other: (occ) => `${occ.name} ના આ વિશેષ અવસર પર સૌને હાર્દિક આમંત્રણ! ✨ ચાલો, સાથે મળીને આ પ્રસંગને ખાસ બનાવીએ! 🎉`,
  },
  bn: {
    festival: (occ) => `${occ.name} এর এই পবিত্র উৎসবে সবাইকে সাদর আমন্ত্রণ! ✨ একসাথে এই উৎসব উদযাপন করি — আনন্দ ভাগ করি, আশীর্বাদ নিই! 🪔`,
    party: (occ) => `${occ.name} পার্টিতে সবাইকে আমন্ত্রণ! 🎉 প্রচুর মজা, গান, খাওয়া-দাওয়া আর আনন্দ — সব তৈয়ার! শুধু তোমরা এসো, একসাথে মজা করি! 🥳`,
    meeting: (occ) => `${occ.name} সভায় সকলের উপস্থিতি প্রয়োজন। 📋 গুরুত্বপূর্ণ বিষয়ে আলোচনা হবে। সকলের সহযোগিতা ও মতামত দরকার। অনুগ্রহ করে সময়মতো আসবেন! 🤝`,
    ceremony: (occ) => `${occ.name} এর এই শুভ অনুষ্ঠানে সবাইকে সপরিবারে সাদর আমন্ত্রণ! 🙏 আপনাদের আশীর্বাদ ও শুভকামনা এই পবিত্র অনুষ্ঠানকে আরও বিশেষ করে তুলবে! ✨`,
    celebration: (occ) => `${occ.name} এর এই আনন্দের মুহূর্তে সবাইকে সাদর আমন্ত্রণ! 🎊 একসাথে এই বিশেষ মুহূর্ত উদযাপন করে স্মরণীয় করে তুলি! 🌟`,
    other: (occ) => `${occ.name} এর এই বিশেষ অনুষ্ঠানে সবাইকে আন্তরিক আমন্ত্রণ! ✨ আসুন, একসাথে এই মুহূর্তকে স্মরণীয় করে তুলি! 🎉`,
  },
  pa: {
    festival: (occ) => `${occ.name} ਦੇ ਇਸ ਪਾਵਨ ਮੌਕੇ 'ਤੇ ਤੁਹਾਨੂੰ ਸਾਰਿਆਂ ਨੂੰ ਸੱਦਾ! ✨ ਆਓ, ਰਲ ਮਿਲ ਕੇ ਇਹ ਤਿਉਹਾਰ ਮਨਾਈਏ — ਖੁਸ਼ੀਆਂ ਵੰਡੀਏ, ਅਸ਼ੀਰਵਾਦ ਲਈਏ! 🪔`,
    party: (occ) => `${occ.name} ਦੀ ਧਮਾਕੇਦਾਰ ਪਾਰਟੀ ਲਈ ਸਾਰਿਆਂ ਨੂੰ ਸੱਦਾ! 🎉 ਬੇਹੱਦ ਮੌਜ-ਮਸਤੀ, ਸੰਗੀਤ, ਖਾਣਾ-ਪੀਣਾ — ਸਭ ਤਿਆਰ! ਬੱਸ ਤੁਸੀਂ ਆ ਜਾਓ, ਖੂਬ ਐਂਜੁਆਏ ਕਰਾਂਗੇ! 🥳`,
    meeting: (occ) => `${occ.name} ਵਿੱਚ ਸਭ ਦੀ ਹਾਜ਼ਰੀ ਜ਼ਰੂਰੀ ਹੈ। 📋 ਅਹਿਮ ਮੁੱਦਿਆਂ 'ਤੇ ਗੱਲਬਾਤ ਹੋਵੇਗੀ। ਕਿਰਪਾ ਕਰਕੇ ਸਮੇਂ 'ਤੇ ਪਹੁੰਚੋ! 🤝`,
    ceremony: (occ) => `${occ.name} ਦੇ ਇਸ ਸ਼ੁਭ ਮੌਕੇ 'ਤੇ ਸਾਰਿਆਂ ਨੂੰ ਪਰਿਵਾਰ ਸਮੇਤ ਸੱਦਾ! 🙏 ਤੁਹਾਡੇ ਅਸ਼ੀਰਵਾਦ ਇਸ ਮੌਕੇ ਨੂੰ ਹੋਰ ਵੀ ਖਾਸ ਬਣਾ ਦੇਣਗੇ! ✨`,
    celebration: (occ) => `${occ.name} ਦੀ ਖੁਸ਼ੀ ਵਿੱਚ ਸਾਰਿਆਂ ਨੂੰ ਸੱਦਾ! 🎊 ਰਲ ਮਿਲ ਕੇ ਇਸ ਖਾਸ ਪਲ ਨੂੰ ਯਾਦਗਾਰ ਬਣਾਈਏ! 🌟`,
    other: (occ) => `${occ.name} ਦੇ ਇਸ ਵਿਸ਼ੇਸ਼ ਮੌਕੇ 'ਤੇ ਸਾਰਿਆਂ ਨੂੰ ਦਿਲੋਂ ਸੱਦਾ! ✨ ਆਓ, ਰਲ ਮਿਲ ਕੇ ਇਸ ਨੂੰ ਖਾਸ ਬਣਾਈਏ! 🎉`,
  },
  ur: {
    festival: (occ) => `${occ.name} کے اس مبارک موقع پر آپ سب کو دل سے دعوت! ✨ آئیے، مل کر یہ تہوار منائیں — خوشیاں بانٹیں اور دعائیں لیں! 🪔`,
    party: (occ) => `${occ.name} کی شاندار پارٹی میں سب کو دعوت! 🎉 بہت مزہ، موسیقی، کھانا پینا — سب تیار! بس آپ آ جائیں، خوب مزے کریں! 🥳`,
    meeting: (occ) => `${occ.name} میں سب کی حاضری ضروری ہے۔ 📋 اہم معاملات پر بات چیت ہوگی۔ سب کا تعاون اور تجاویز ضروری ہیں! 🤝`,
    ceremony: (occ) => `${occ.name} کے اس مبارک موقع پر آپ سب کو اہل خانہ سمیت دعوت! 🙏 آپ کی دعائیں اس پاکیزہ موقع کو مزید خاص بنائیں گی! ✨`,
    celebration: (occ) => `${occ.name} کی خوشی میں سب کو دعوت! 🎊 مل کر اس خاص لمحے کو یادگار بنائیں! 🌟`,
    other: (occ) => `${occ.name} کے اس خاص موقع پر سب کو دل سے دعوت! ✨ آئیے، مل کر اسے یادگار بنائیں! 🎉`,
  },
  ml: {
    festival: (occ) => `${occ.name} ഉത്സവത്തിന്റെ ഈ മംഗളകരമായ അവസരത്തിൽ എല്ലാവരെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു! ✨ ഒരുമിച്ച് ഈ ആഘോഷം മനോഹരമാക്കാം! 🪔`,
    party: (occ) => `${occ.name} പാർട്ടിയിലേക്ക് എല്ലാവരെയും ക്ഷണിക്കുന്നു! 🎉 ഒരുപാട് രസകരമായ സമയം, സംഗീതം, ഭക്ഷണം — എല്ലാം തയ്യാർ! വരൂ, ഒരുമിച്ച് ആസ്വദിക്കാം! 🥳`,
    meeting: (occ) => `${occ.name} യോഗത്തിൽ എല്ലാവരുടെയും സാന്നിധ്യം ആവശ്യമാണ്. 📋 പ്രധാന വിഷയങ്ങൾ ചർച്ച ചെയ്യപ്പെടും. എല്ലാവരുടെയും സഹകരണം ആവശ്യമാണ്! 🤝`,
    ceremony: (occ) => `${occ.name} ഈ ശുഭ മുഹൂർത്തത്തിൽ എല്ലാവരെയും കുടുംബ സമേതം ക്ഷണിക്കുന്നു! 🙏 നിങ്ങളുടെ അനുഗ്രഹങ്ങൾ ഈ പവിത്ര അവസരത്തെ കൂടുതൽ പ്രത്യേകമാക്കും! ✨`,
    celebration: (occ) => `${occ.name} ഈ സന്തോഷ സന്ദർഭത്തിൽ എല്ലാവരെയും ക്ഷണിക്കുന്നു! 🎊 ഒരുമിച്ച് ഈ പ്രത്യേക നിമിഷം മറക്കാനാകാത്തതാക്കാം! 🌟`,
    other: (occ) => `${occ.name} ഈ പ്രത്യേക അവസരത്തിലേക്ക് എല്ലാവരെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു! ✨ ഒരുമിച്ച് ഇത് മറക്കാനാകാത്തതാക്കാം! 🎉`,
  },
  fr: {
    festival: (occ) => `Vous êtes tous cordialement invités à célébrer ${occ.name} avec nous! ✨ Partageons ensemble la joie, les bénédictions et la magie de cette belle fête! 🪔`,
    party: (occ) => `Vous êtes tous invités à la fête ${occ.name}! 🎉 Musique, bonne humeur, délicieux repas — tout est prêt! Venez vous amuser avec nous! 🥳`,
    meeting: (occ) => `Votre présence est requise à la réunion ${occ.name}. 📋 Des sujets importants seront discutés. Votre participation et vos idées sont essentielles! 🤝`,
    ceremony: (occ) => `Vous êtes tous invités avec vos familles à la cérémonie ${occ.name}! 🙏 Vos bénédictions rendront cette occasion sacrée encore plus spéciale! ✨`,
    celebration: (occ) => `Vous êtes tous invités à célébrer ${occ.name}! 🎊 Rejoignez-nous pour rendre ce moment inoubliable! 🌟`,
    other: (occ) => `Vous êtes tous chaleureusement invités à ${occ.name}! ✨ Venez partager ce moment spécial avec nous! 🎉`,
  },
  es: {
    festival: (occ) => `¡Están todos invitados a celebrar ${occ.name} con nosotros! ✨ ¡Compartamos juntos la alegría, las bendiciones y la magia de esta hermosa festividad! 🪔`,
    party: (occ) => `¡Todos están invitados a la fiesta de ${occ.name}! 🎉 Música, diversión, comida deliciosa — ¡todo está listo! ¡Vengan a pasarla increíble! 🥳`,
    meeting: (occ) => `Se requiere la presencia de todos en la reunión de ${occ.name}. 📋 Se discutirán temas importantes. ¡Su participación es esencial! 🤝`,
    ceremony: (occ) => `¡Todos están invitados con sus familias a la ceremonia de ${occ.name}! 🙏 ¡Sus bendiciones harán esta ocasión aún más especial! ✨`,
    celebration: (occ) => `¡Están todos invitados a celebrar ${occ.name}! 🎊 ¡Únanse a nosotros para hacer este momento inolvidable! 🌟`,
    other: (occ) => `¡Están todos cordialmente invitados a ${occ.name}! ✨ ¡Vengan a compartir este momento especial! 🎉`,
  },
  de: {
    festival: (occ) => `Sie sind alle herzlich eingeladen, ${occ.name} mit uns zu feiern! ✨ Lasst uns gemeinsam die Freude und den Segen dieses wunderschönen Festes teilen! 🪔`,
    party: (occ) => `Ihr seid alle zur ${occ.name}-Party eingeladen! 🎉 Musik, gute Laune, leckeres Essen — alles ist bereit! Kommt und feiert mit uns! 🥳`,
    meeting: (occ) => `Ihre Anwesenheit bei der ${occ.name}-Sitzung ist erforderlich. 📋 Wichtige Themen werden besprochen. Ihre Teilnahme ist wesentlich! 🤝`,
    ceremony: (occ) => `Sie sind alle mit Ihren Familien zur ${occ.name}-Zeremonie eingeladen! 🙏 Ihr Segen wird diesen Anlass noch besonderer machen! ✨`,
    celebration: (occ) => `Sie sind alle eingeladen, ${occ.name} zu feiern! 🎊 Feiern Sie mit uns diesen unvergesslichen Moment! 🌟`,
    other: (occ) => `Sie sind alle herzlich zu ${occ.name} eingeladen! ✨ Kommen Sie und teilen Sie diesen besonderen Moment mit uns! 🎉`,
  },
  ar: {
    festival: (occ) => `يسعدنا دعوتكم جميعاً للاحتفال بـ ${occ.name} معنا! ✨ فلنتشارك معاً فرحة وبركات هذه المناسبة الجميلة! 🪔`,
    party: (occ) => `الجميع مدعوون لحفلة ${occ.name}! 🎉 موسيقى، مرح، طعام لذيذ — كل شيء جاهز! تعالوا واستمتعوا معنا! 🥳`,
    meeting: (occ) => `حضوركم جميعاً مطلوب في اجتماع ${occ.name}. 📋 ستُناقش مواضيع مهمة. مشاركتكم ضرورية! 🤝`,
    ceremony: (occ) => `الجميع مدعوون مع عائلاتهم لحضور حفل ${occ.name}! 🙏 بركاتكم ستجعل هذه المناسبة أكثر تميزاً! ✨`,
    celebration: (occ) => `الجميع مدعوون للاحتفال بـ ${occ.name}! 🎊 انضموا إلينا لجعل هذه اللحظة لا تُنسى! 🌟`,
    other: (occ) => `الجميع مدعوون بحرارة لـ ${occ.name}! ✨ تعالوا وشاركونا هذه اللحظة الخاصة! 🎉`,
  },
  zh: {
    festival: (occ) => `诚挚邀请大家一起庆祝${occ.name}！✨ 让我们共同分享这个美好节日的喜悦与祝福！🪔`,
    party: (occ) => `诚邀大家参加${occ.name}派对！🎉 音乐、美食、欢乐——一切就绪！快来一起嗨吧！🥳`,
    meeting: (occ) => `请大家准时参加${occ.name}会议。📋 将讨论重要议题，需要大家的参与和建议！🤝`,
    ceremony: (occ) => `诚邀各位携家人参加${occ.name}仪式！🙏 您的祝福将使这个神圣时刻更加特别！✨`,
    celebration: (occ) => `诚邀大家一起庆祝${occ.name}！🎊 让我们共同创造难忘的美好回忆！🌟`,
    other: (occ) => `诚挚邀请大家参加${occ.name}！✨ 期待与大家共度这个特别时刻！🎉`,
  },
  ja: {
    festival: (occ) => `皆様を${occ.name}のお祝いに心よりご招待いたします！✨ 一緒にこの素晴らしいお祭りの喜びと祝福を分かち合いましょう！🪔`,
    party: (occ) => `${occ.name}パーティーに皆様をご招待します！🎉 音楽、おいしい料理、楽しい時間——準備万端です！ぜひお越しください！🥳`,
    meeting: (occ) => `${occ.name}会議への皆様のご出席をお願いいたします。📋 重要な議題について話し合います。皆様のご参加が不可欠です！🤝`,
    ceremony: (occ) => `${occ.name}の式典に皆様をご家族とともにご招待いたします！🙏 皆様の祝福がこの神聖な機会をさらに特別なものにします！✨`,
    celebration: (occ) => `${occ.name}のお祝いに皆様をご招待します！🎊 一緒にこの忘れられない瞬間を作りましょう！🌟`,
    other: (occ) => `${occ.name}に皆様を心よりご招待いたします！✨ 一緒にこの特別な時間を過ごしましょう！🎉`,
  },
  pt: {
    festival: (occ) => `Vocês estão todos convidados para celebrar ${occ.name} conosco! ✨ Vamos compartilhar juntos a alegria e as bênçãos desta linda festividade! 🪔`,
    party: (occ) => `Todos estão convidados para a festa de ${occ.name}! 🎉 Música, diversão, comida deliciosa — tudo pronto! Venham se divertir! 🥳`,
    meeting: (occ) => `A presença de todos é necessária na reunião de ${occ.name}. 📋 Assuntos importantes serão discutidos. Sua participação é essencial! 🤝`,
    ceremony: (occ) => `Todos estão convidados com suas famílias para a cerimônia de ${occ.name}! 🙏 Suas bênçãos tornarão esta ocasião ainda mais especial! ✨`,
    celebration: (occ) => `Todos estão convidados para celebrar ${occ.name}! 🎊 Venham fazer deste momento algo inesquecível! 🌟`,
    other: (occ) => `Todos estão cordialmente convidados para ${occ.name}! ✨ Venham compartilhar este momento especial! 🎉`,
  },
  ru: {
    festival: (occ) => `Приглашаем всех вас отпраздновать ${occ.name} вместе с нами! ✨ Давайте разделим радость и благословения этого прекрасного праздника! 🪔`,
    party: (occ) => `Все приглашены на вечеринку ${occ.name}! 🎉 Музыка, веселье, вкусная еда — всё готово! Приходите и веселитесь с нами! 🥳`,
    meeting: (occ) => `Присутствие всех необходимо на собрании ${occ.name}. 📋 Будут обсуждаться важные вопросы. Ваше участие необходимо! 🤝`,
    ceremony: (occ) => `Приглашаем всех с семьями на церемонию ${occ.name}! 🙏 Ваши благословения сделают это событие ещё более особенным! ✨`,
    celebration: (occ) => `Все приглашены на празднование ${occ.name}! 🎊 Присоединяйтесь, чтобы сделать этот момент незабываемым! 🌟`,
    other: (occ) => `Все сердечно приглашены на ${occ.name}! ✨ Приходите разделить этот особый момент с нами! 🎉`,
  },
  ko: {
    festival: (occ) => `${occ.name}를 함께 축하하기 위해 여러분 모두를 초대합니다! ✨ 이 아름다운 축제의 기쁨과 축복을 함께 나누어요! 🪔`,
    party: (occ) => `${occ.name} 파티에 모두를 초대합니다! 🎉 음악, 맛있는 음식, 즐거운 시간 — 모든 게 준비되어 있어요! 함께 즐겨요! 🥳`,
    meeting: (occ) => `${occ.name} 회의에 모든 분의 참석이 필요합니다. 📋 중요한 안건이 논의될 예정입니다. 여러분의 참여가 필수적입니다! 🤝`,
    ceremony: (occ) => `${occ.name} 행사에 가족과 함께 모든 분을 초대합니다! 🙏 여러분의 축복이 이 뜻깊은 자리를 더욱 특별하게 만들어 줄 것입니다! ✨`,
    celebration: (occ) => `${occ.name}를 축하하기 위해 모두를 초대합니다! 🎊 함께 이 잊지 못할 순간을 만들어요! 🌟`,
    other: (occ) => `${occ.name}에 여러분 모두를 진심으로 초대합니다! ✨ 함께 이 특별한 순간을 나누어요! 🎉`,
  },
  it: {
    festival: (occ) => `Siete tutti invitati a celebrare ${occ.name} con noi! ✨ Condividiamo insieme la gioia e le benedizioni di questa bella festa! 🪔`,
    party: (occ) => `Siete tutti invitati alla festa di ${occ.name}! 🎉 Musica, divertimento, cibo delizioso — tutto pronto! Venite a divertirvi! 🥳`,
    meeting: (occ) => `La presenza di tutti è richiesta alla riunione ${occ.name}. 📋 Verranno discussi argomenti importanti. La vostra partecipazione è essenziale! 🤝`,
    ceremony: (occ) => `Siete tutti invitati con le vostre famiglie alla cerimonia ${occ.name}! 🙏 Le vostre benedizioni renderanno questa occasione ancora più speciale! ✨`,
    celebration: (occ) => `Siete tutti invitati a celebrare ${occ.name}! 🎊 Unitevi a noi per rendere questo momento indimenticabile! 🌟`,
    other: (occ) => `Siete tutti cordialmente invitati a ${occ.name}! ✨ Venite a condividere questo momento speciale! 🎉`,
  },
  tr: {
    festival: (occ) => `${occ.name} kutlamasına hepinizi gönülden davet ediyoruz! ✨ Bu güzel bayramın neşesini ve bereketini birlikte paylaşalım! 🪔`,
    party: (occ) => `${occ.name} partisine hepiniz davetlisiniz! 🎉 Müzik, eğlence, lezzetli yemekler — her şey hazır! Gelin, birlikte eğlenelim! 🥳`,
    meeting: (occ) => `${occ.name} toplantısına herkesin katılımı gerekmektedir. 📋 Önemli konular görüşülecektir. Katılımınız gereklidir! 🤝`,
    ceremony: (occ) => `${occ.name} törenine hepinizi ailelerinizle birlikte davet ediyoruz! 🙏 Dualarınız bu kutsal anı daha özel kılacaktır! ✨`,
    celebration: (occ) => `${occ.name} kutlamasına hepinizi davet ediyoruz! 🎊 Gelin, birlikte unutulmaz anılar yaratalım! 🌟`,
    other: (occ) => `${occ.name} için hepinizi içtenlikle davet ediyoruz! ✨ Bu özel anı birlikte paylaşalım! 🎉`,
  },
  th: {
    festival: (occ) => `ขอเรียนเชิญทุกท่านร่วมฉลอง${occ.name}ด้วยกัน! ✨ มาแบ่งปันความสุขและพรอันดีงามของเทศกาลนี้ร่วมกัน! 🪔`,
    party: (occ) => `ขอเชิญทุกคนมาร่วมงานปาร์ตี้${occ.name}! 🎉 ดนตรี อาหาร ความสนุก — พร้อมหมดแล้ว! มาสนุกด้วยกันนะ! 🥳`,
    meeting: (occ) => `ขอให้ทุกท่านเข้าร่วมประชุม${occ.name} 📋 จะมีการหารือเรื่องสำคัญ การมีส่วนร่วมของทุกท่านเป็นสิ่งจำเป็น! 🤝`,
    ceremony: (occ) => `ขอเชิญทุกท่านพร้อมครอบครัวร่วมพิธี${occ.name}! 🙏 คำอวยพรของท่านจะทำให้โอกาสนี้พิเศษยิ่งขึ้น! ✨`,
    celebration: (occ) => `ขอเชิญทุกท่านร่วมฉลอง${occ.name}! 🎊 มาสร้างความทรงจำที่ดีด้วยกัน! 🌟`,
    other: (occ) => `ขอเรียนเชิญทุกท่านร่วมงาน${occ.name}! ✨ มาแบ่งปันช่วงเวลาพิเศษนี้ด้วยกัน! 🎉`,
  },
  vi: {
    festival: (occ) => `Kính mời tất cả quý vị cùng đón mừng ${occ.name}! ✨ Hãy cùng chia sẻ niềm vui và phước lành của ngày lễ tuyệt vời này! 🪔`,
    party: (occ) => `Mời tất cả mọi người đến bữa tiệc ${occ.name}! 🎉 Âm nhạc, vui vẻ, đồ ăn ngon — tất cả đã sẵn sàng! Hãy đến và cùng vui! 🥳`,
    meeting: (occ) => `Sự có mặt của tất cả mọi người là cần thiết tại cuộc họp ${occ.name}. 📋 Các vấn đề quan trọng sẽ được thảo luận! 🤝`,
    ceremony: (occ) => `Kính mời quý vị cùng gia đình đến dự lễ ${occ.name}! 🙏 Lời chúc phúc của quý vị sẽ làm dịp này thêm đặc biệt! ✨`,
    celebration: (occ) => `Mời tất cả mọi người cùng chung vui ${occ.name}! 🎊 Hãy cùng tạo nên khoảnh khắc đáng nhớ! 🌟`,
    other: (occ) => `Kính mời tất cả quý vị tham dự ${occ.name}! ✨ Hãy cùng chia sẻ khoảnh khắc đặc biệt này! 🎉`,
  },
  id: {
    festival: (occ) => `Kami mengundang semuanya untuk merayakan ${occ.name} bersama! ✨ Mari berbagi kebahagiaan dan berkah dari perayaan indah ini! 🪔`,
    party: (occ) => `Semua diundang ke pesta ${occ.name}! 🎉 Musik, kesenangan, makanan lezat — semuanya siap! Ayo bergabung dan bersenang-senang! 🥳`,
    meeting: (occ) => `Kehadiran semua diperlukan di rapat ${occ.name}. 📋 Topik penting akan dibahas. Partisipasi Anda sangat diperlukan! 🤝`,
    ceremony: (occ) => `Semua diundang bersama keluarga ke upacara ${occ.name}! 🙏 Doa restu Anda akan membuat acara ini semakin istimewa! ✨`,
    celebration: (occ) => `Semua diundang untuk merayakan ${occ.name}! 🎊 Ayo bersama membuat momen ini tak terlupakan! 🌟`,
    other: (occ) => `Semua diundang dengan hangat ke ${occ.name}! ✨ Mari bersama berbagi momen spesial ini! 🎉`,
  },
  or: {
    festival: (occ) => `${occ.name} ର ଏହି ପବିତ୍ର ପର୍ବରେ ଆପଣମାନଙ୍କ ସମସ୍ତଙ୍କୁ ସାଦର ନିମନ୍ତ୍ରଣ! ✨ ଆସନ୍ତୁ, ଏକାଠି ମିଳି ଏହି ଉତ୍ସବକୁ ସ୍ମରଣୀୟ କରିବା — ଖୁସି ବାଣ୍ଟିବା, ଆଶୀର୍ବାଦ ନେବା! 🪔`,
    party: (occ) => `${occ.name} ପାର୍ଟିକୁ ସମସ୍ତଙ୍କୁ ନିମନ୍ତ୍ରଣ! 🎉 ବହୁତ ମଜା, ସଙ୍ଗୀତ, ଖାଇବା ଏବଂ ଧମାଲ — ସବୁ ପ୍ରସ୍ତୁତ! ଆସନ୍ତୁ ଏବଂ ମଜା କରନ୍ତୁ! 🥳`,
    meeting: (occ) => `${occ.name} ସଭାରେ ସମସ୍ତଙ୍କ ଉପସ୍ଥିତି ଆବଶ୍ୟକ। 📋 ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ବିଷୟରେ ଆଲୋଚନା ହେବ। ସମସ୍ତଙ୍କ ସହଯୋଗ ଦରକାର! 🤝`,
    ceremony: (occ) => `${occ.name} ର ଏହି ଶୁଭ ଅବସରରେ ସମସ୍ତଙ୍କୁ ସପରିବାର ସାଦର ନିମନ୍ତ୍ରଣ! 🙏 ଆପଣଙ୍କ ଆଶୀର୍ବାଦ ଏହି ପବିତ୍ର ଅବସରକୁ ଆହୁରି ବିଶେଷ କରିବ! ✨`,
    celebration: (occ) => `${occ.name} ର ଏହି ଖୁସିର ଅବସରରେ ସମସ୍ତଙ୍କୁ ସାଦର ନିମନ୍ତ୍ରଣ! 🎊 ଏକାଠି ମିଳି ଏହି ବିଶେଷ ମୁହୂର୍ତ୍ତକୁ ସ୍ମରଣୀୟ କରିବା! 🌟`,
    other: (occ) => `${occ.name} ର ଏହି ବିଶେଷ ଅବସରରେ ସମସ୍ତଙ୍କୁ ହାର୍ଦ୍ଦିକ ନିମନ୍ତ୍ରଣ! ✨ ଆସନ୍ତୁ, ଏକାଠି ଏହାକୁ ସ୍ମରଣୀୟ କରିବା! 🎉`,
  },
  ne: {
    festival: (occ) => `${occ.name} को यो पावन अवसरमा तपाईंहरू सबैलाई हार्दिक निम्तो! ✨ आउनुहोस्, सँगै मिलेर यो चाड मनाऔं — खुशी बाँडौं, आशीर्वाद लिऔं! 🪔`,
    party: (occ) => `${occ.name} को धमाकेदार पार्टीमा सबैलाई निम्तो! 🎉 धेरै मज्जा, म्युजिक, खानपिन र रमाइलो — सबै तयार छ! आउनुहोस् र रमाइलो गर्नुहोस्! 🥳`,
    meeting: (occ) => `${occ.name} मा सबैको उपस्थिति आवश्यक छ। 📋 महत्वपूर्ण विषयमा छलफल हुनेछ। सबैको सहयोग र सुझाव आवश्यक छ! 🤝`,
    ceremony: (occ) => `${occ.name} को यो शुभ अवसरमा सबैलाई सपरिवार हार्दिक निम्तो! 🙏 तपाईंहरूको आशीर्वाद र शुभकामनाले यो पवित्र अवसरलाई झन् विशेष बनाउनेछ! ✨`,
    celebration: (occ) => `${occ.name} को यो खुशीको अवसरमा सबैलाई निम्तो! 🎊 सँगै मिलेर यो खास पललाई यादगार बनाऔं! 🌟`,
    other: (occ) => `${occ.name} को यो विशेष अवसरमा सबैलाई हार्दिक निम्तो! ✨ आउनुहोस्, सँगै मिलेर यसलाई यादगार बनाऔं! 🎉`,
  },
  si: {
    festival: (occ) => `${occ.name} මෙම මංගල අවස්ථාවට ඔබ සැමට සාදරයෙන් ආරාධනා! ✨ එකට එක්ව මෙම උත්සවය සැමරීමට එන්න — සතුට බෙදා ගනිමු, ආශිර්වාද ලබා ගනිමු! 🪔`,
    party: (occ) => `${occ.name} පාටියට සැමට ආරාධනා! 🎉 විනෝදය, සංගීතය, ආහාර — සියල්ල සූදානම්! ඔබ එන්න, එකට විනෝද වෙමු! 🥳`,
    meeting: (occ) => `${occ.name} රැස්වීමට සැමගේ සහභාගීත්වය අවශ්‍යයි. 📋 වැදගත් කරුණු සාකච්ඡා කෙරේ. ඔබේ සහයෝගය අත්‍යවශ්‍යයි! 🤝`,
    ceremony: (occ) => `${occ.name} මෙම ශුභ අවස්ථාවට ඔබ සැමට පවුල් සමඟ සාදරයෙන් ආරාධනා! 🙏 ඔබගේ ආශිර්වාදය මෙම පූජනීය අවස්ථාව තවත් විශේෂ කරනු ඇත! ✨`,
    celebration: (occ) => `${occ.name} මෙම සතුටුදායක අවස්ථාවට සැමට ආරාධනා! 🎊 එකට එක්ව මෙම විශේෂ මොහොත අමතක නොවන එකක් කරමු! 🌟`,
    other: (occ) => `${occ.name} මෙම විශේෂ අවස්ථාවට ඔබ සැමට හෘදයාංගම ආරාධනා! ✨ එන්න, එකට මෙය අමතක නොවන අවස්ථාවක් කරමු! 🎉`,
  },
};

export function fallbackText(occ, form, langCode = "en") {
  // For English, use occasion-specific templates
  if (langCode === "en" || (!CATEGORY_LANG_TEMPLATES[langCode])) {
    const occTemplate = OCCASION_TEMPLATES[occ.id];
    if (occTemplate) return occTemplate();
    return OCCASION_TEMPLATES["other"]();
  }
  // For other languages, use CATEGORY-based templates
  const langCats = CATEGORY_LANG_TEMPLATES[langCode];
  if (langCats) {
    const category = OCCASION_CATEGORY[occ.id] || "other";
    const template = langCats[category] || langCats["other"];
    if (template) return template(occ);
  }
  // Final fallback — English
  const fallback = OCCASION_TEMPLATES[occ.id] || OCCASION_TEMPLATES["other"];
  return fallback();
}
