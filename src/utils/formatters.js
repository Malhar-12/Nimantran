const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;

  let d, m, y;
  if (parts[0].length === 4) {
    [y, m, d] = parts;
  } else {
    [d, m, y] = parts;
  }

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
// BODY-ONLY fallback templates — No greeting, no closing, no sender
// Group-friendly, gender-neutral
// Card template handles: "Dear X," (top) + "— SenderName" (bottom)
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
    `You are all thrilled to be invited to a baby shower celebration! 👶 Come shower the little one with love, blessings and joy. It's going to be an adorable and heartwarming time together! 🍼`,

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

// ── Translated generic fallback texts — BODY-ONLY, group-friendly, gender-neutral ──
const LANG_TEMPLATES = {
  hi: (occ) =>
    `${occ.name} के इस शुभ अवसर पर आप सभी को सादर आमंत्रित किया जाता है! ✨ इस विशेष उत्सव में सभी सपरिवार सहर्ष पधारें। आइए, साथ मिलकर इस खुशी के पल को और भी यादगार बनाएं! 🎉`,

  mr: (occ) =>
    `${occ.name} च्या या शुभ प्रसंगी आपणा सर्वांना सादर आमंत्रित करण्यात आले आहे! ✨ या विशेष सोहळ्यासाठी सर्वांनी सहकुटुंब उपस्थित राहावे. चला, एकत्र येऊन हा सोहळा अविस्मरणीय बनवूया! 🎉`,

  ta: (occ) =>
    `${occ.name} கொண்டாட்டத்தில் அனைவரையும் அன்புடன் அழைக்கிறோம்! ✨ இந்த சிறப்பு நிகழ்வில் அனைவரின் வருகையும் எங்களுக்கு மிகவும் மகிழ்ச்சி அளிக்கும். ஒன்றாக இணைந்து இந்த விழாவை மறக்கமுடியாததாக செய்வோம்! 🎉`,

  te: (occ) =>
    `${occ.name} వేడుకలకు మీ అందరినీ ఆహ్వానిస్తున్నాము! ✨ ఈ ప్రత్యేక సందర్భంలో అందరి సమక్షం మాకు చాలా ఆనందాన్ని ఇస్తుంది. కలిసి ఈ ఉత్సవాన్ని మరపురానిదిగా చేద్దాం! 🎉`,

  kn: (occ) =>
    `${occ.name} ಆಚರಣೆಯಲ್ಲಿ ಎಲ್ಲರನ್ನೂ ಪ್ರೀತಿಯಿಂದ ಆಹ್ವಾನಿಸುತ್ತಿದ್ದೇವೆ! ✨ ಈ ವಿಶೇಷ ಸಂದರ್ಭದಲ್ಲಿ ಎಲ್ಲರ ಉಪಸ್ಥಿತಿ ನಮಗೆ ಸಂತೋಷವನ್ನು ನೀಡುತ್ತದೆ. ಒಟ್ಟಿಗೆ ಸೇರಿ ಈ ಸಮಾರಂಭವನ್ನು ಅವಿಸ್ಮರಣೀಯವಾಗಿಸೋಣ! 🎉`,

  gu: (occ) =>
    `${occ.name} ની ઉજવણી માટે આપ સૌને હાર્દિક આમંત્રણ! ✨ આ વિશેષ પ્રસંગે સૌની હાજરી અમારા માટે ખૂબ જ આનંદની વાત હશે. ચાલો સાથે મળીને આ ઉત્સવને યાદગાર બનાવીએ! 🎉`,

  bn: (occ) =>
    `${occ.name} উদযাপনে আপনাদের সবাইকে সাদর আমন্ত্রণ জানাচ্ছি! ✨ এই বিশেষ অনুষ্ঠানে সকলের উপস্থিতি আমাদের জন্য অত্যন্ত আনন্দের হবে। আসুন, একসাথে এই উৎসবকে স্মরণীয় করে তুলি! 🎉`,

  pa: (occ) =>
    `${occ.name} ਮਨਾਉਣ ਲਈ ਤੁਹਾਨੂੰ ਸਾਰਿਆਂ ਨੂੰ ਦਿਲੋਂ ਸੱਦਾ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ! ✨ ਇਸ ਖਾਸ ਮੌਕੇ 'ਤੇ ਸਭ ਦੀ ਮੌਜੂਦਗੀ ਸਾਡੇ ਲਈ ਬਹੁਤ ਖੁਸ਼ੀ ਦੀ ਗੱਲ ਹੋਵੇਗੀ। ਆਓ, ਰਲ ਮਿਲ ਕੇ ਇਸ ਖੁਸ਼ੀ ਨੂੰ ਯਾਦਗਾਰ ਬਣਾਈਏ! 🎉`,

  ur: (occ) =>
    `${occ.name} منانے کے لیے آپ سب کو دل سے دعوت دی جاتی ہے! ✨ اس خاص موقع پر سب کی موجودگی ہمارے لیے انتہائی خوشی کی بات ہوگی۔ آئیے، مل کر اس جشن کو یادگار بنائیں! 🎉`,

  ml: (occ) =>
    `${occ.name} ആഘോഷിക്കാൻ എല്ലാവരെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു! ✨ ഈ പ്രത്യേക അവസരത്തിൽ എല്ലാവരുടെയും സാന്നിധ്യം ഞങ്ങൾക്ക് വളരെ സന്തോഷം നൽകും. ഒരുമിച്ച് ഈ ആഘോഷം മനോഹരമാക്കാം! 🎉`,

  or: (occ) =>
    `${occ.name} ପାଳନ ପାଇଁ ଆପଣମାନଙ୍କ ସମସ୍ତଙ୍କୁ ସାଦର ନିମନ୍ତ୍ରଣ! ✨ ଏହି ବିଶେଷ ଅବସରରେ ସମସ୍ତଙ୍କ ଉପସ୍ଥିତି ଆମ ପାଇଁ ଅତ୍ୟନ୍ତ ଆନନ୍ଦର ହେବ। ଆସନ୍ତୁ, ଏକାଠି ମିଳି ଏହି ଉତ୍ସବକୁ ସ୍ମରଣୀୟ କରିବା! 🎉`,

  ne: (occ) =>
    `${occ.name} मनाउन तपाईंहरू सबैलाई हार्दिक निम्तो छ! ✨ यो विशेष अवसरमा सबैको उपस्थिति हाम्रो लागि अत्यन्त खुशीको कुरा हुनेछ। आउनुहोस्, सँगै मिलेर यो उत्सवलाई यादगार बनाउँ! 🎉`,

  si: (occ) =>
    `${occ.name} සැමරීම සඳහා ඔබ සැමට සාදරයෙන් ආරාධනා! ✨ මෙම විශේෂ අවස්ථාවට සැමගේ සහභාගීත්වය අපට මහත් සතුටක් වනු ඇත. එකට එක්ව මෙය අමතක නොවන අවස්ථාවක් කරමු! 🎉`,

  fr: (occ) =>
    `Vous êtes tous cordialement invités à célébrer ${occ.name} avec nous! ✨ Votre présence à cette occasion spéciale serait un grand honneur. Rejoignez-nous pour créer ensemble des souvenirs inoubliables! 🎉`,

  es: (occ) =>
    `¡Están todos cordialmente invitados a celebrar ${occ.name} con nosotros! ✨ Su presencia en esta ocasión especial sería un gran honor. ¡Únanse a nosotros para crear recuerdos inolvidables! 🎉`,

  de: (occ) =>
    `Sie sind alle herzlich eingeladen, ${occ.name} mit uns zu feiern! ✨ Ihre Anwesenheit bei diesem besonderen Anlass wäre uns eine große Freude. Kommen Sie und feiern Sie mit uns! 🎉`,

  ar: (occ) =>
    `يسعدنا دعوتكم جميعاً للاحتفال بـ ${occ.name} معنا! ✨ حضوركم في هذه المناسبة الخاصة سيكون شرفاً كبيراً لنا. انضموا إلينا لنصنع معاً ذكريات لا تُنسى! 🎉`,

  zh: (occ) =>
    `诚挚邀请大家一起庆祝${occ.name}！✨ 各位的出席将使这个特别的日子更加美好。让我们一起创造难忘的回忆！🎉`,

  ja: (occ) =>
    `皆様を${occ.name}のお祝いに心よりご招待申し上げます！✨ この特別な機会に皆様にお越しいただければ大変光栄です。素晴らしいひとときを一緒に過ごしましょう！🎉`,

  pt: (occ) =>
    `Vocês estão todos cordialmente convidados para celebrar ${occ.name} conosco! ✨ Sua presença nesta ocasião especial seria uma grande honra. Juntem-se a nós para criar memórias inesquecíveis! 🎉`,

  ru: (occ) =>
    `Приглашаем всех вас отпраздновать ${occ.name} вместе с нами! ✨ Ваше присутствие на этом особенном мероприятии будет для нас большой честью. Присоединяйтесь! 🎉`,

  ko: (occ) =>
    `${occ.name}를 함께 축하하기 위해 여러분 모두를 진심으로 초대합니다! ✨ 이 특별한 자리에 함께해 주시면 큰 영광이겠습니다. 함께 잊지 못할 추억을 만들어요! 🎉`,

  it: (occ) =>
    `Siete tutti cordialmente invitati a celebrare ${occ.name} con noi! ✨ La vostra presenza in questa occasione speciale sarebbe un grande onore. Unitevi a noi per creare ricordi indimenticabili! 🎉`,

  tr: (occ) =>
    `${occ.name} kutlamasına hepinizi gönülden davet ediyoruz! ✨ Bu özel günde herkesin katılımı bizim için büyük bir mutluluk olacaktır. Gelin, birlikte unutulmaz anılar yaratalım! 🎉`,

  th: (occ) =>
    `ขอเรียนเชิญทุกท่านร่วมฉลอง${occ.name}ด้วยกัน! ✨ การมาร่วมงานของทุกท่านจะเป็นเกียรติอย่างยิ่ง มาร่วมสร้างความทรงจำที่ดีด้วยกันนะคะ! 🎉`,

  vi: (occ) =>
    `Kính mời tất cả quý vị cùng đến chung vui ${occ.name} với chúng tôi! ✨ Sự hiện diện của quý vị trong dịp đặc biệt này sẽ là niềm vinh hạnh lớn lao. Hãy cùng nhau tạo nên những kỷ niệm đáng nhớ! 🎉`,

  id: (occ) =>
    `Kami dengan gembira mengundang semuanya untuk merayakan ${occ.name} bersama kami! ✨ Kehadiran Anda di acara istimewa ini akan menjadi kehormatan besar bagi kami. Mari bersama menciptakan kenangan yang tak terlupakan! 🎉`,
};

export function fallbackText(occ, form, langCode = "en") {
  // For English, use occasion-specific templates
  if (langCode === "en" || !LANG_TEMPLATES[langCode]) {
    const occTemplate = OCCASION_TEMPLATES[occ.id];
    if (occTemplate) return occTemplate();
  }
  // For other languages, use translated generic templates
  const template = LANG_TEMPLATES[langCode];
  if (template) return template(occ);
  // Final fallback
  const fallback = OCCASION_TEMPLATES[occ.id] || OCCASION_TEMPLATES["other"];
  return fallback();
}
