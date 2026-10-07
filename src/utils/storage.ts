import { MemoryPhoto, LoveLetter, ReasonCard, SurpriseSettings, SweetTalk, VoiceNoteItem } from '../types';

export const INITIAL_PHOTOS: MemoryPhoto[] = [
  {
    id: 'p1',
    url: '/src/assets/images/hero_romantic_surprise_1791351078392.jpg',
    caption: 'Meri zindagi ka sab se pyara tohfa — Tumhara saath.',
    date: 'Forever & Always',
    location: 'Our Sacred World',
  },
  {
    id: 'p2',
    url: '/src/assets/images/gallery_cherished_moment_1791351091079.jpg',
    caption: 'Tumhara haath thaam kar chalna, meri qismat ka sab se bada inaam hai.',
    date: 'Golden Memories',
    location: 'Dil Ki Gehraiyon Se',
  },
  {
    id: 'p3',
    url: '/src/assets/images/gallery_roses_gift_1791351101691.jpg',
    caption: 'Gulab bhi tumhari masoom muskurahat ke samne pheeke lagte hain.',
    date: 'Salgirah Mubarak',
    location: 'Love & Respect',
  },
  {
    id: 'p4',
    url: '/src/assets/images/gallery_starlit_celebration_1791351111597.jpg',
    caption: 'Hazaron sitaron mein jaise chand ek hota hai, meri zindagi mein tum bas ek ho.',
    date: 'Special Night',
    location: 'Every Heartbeat',
  },
];

export const SWEET_TALKS: SweetTalk[] = [
  {
    id: 'talk-1',
    title: 'When I First Saw You',
    romanTitle: 'Jab Maine Tumhein Pehli Baar Dekha Tha',
    tag: 'Pehli Nazar',
    quote: 'Usi pal mere dil ne faisla kar liya tha ke meri manzil sirf tum ho...',
    fullMessage:
      'Woh pehla lamha mujhe aaj bhi bilkul kal ki tarah yaad hai. Tumhare chehre ki woh noorani masoomiyat, halki si sharam, aur woh pyari si jhijhak... Mujhe tabhi ehsaas ho gaya tha ke Allah ne meri qismat ki lakeeron ko tumhare naam se jodh diya hai. Aaj bhi jab tumhein dekhta hoon, mere dil mein wahi pehle din jaisi taazgi mehsoos hoti hai.',
  },
  {
    id: 'talk-2',
    title: 'Your Cutest Little Habits',
    romanTitle: 'Tumhari Pyari Choti Choti Aadatein',
    tag: 'Masoom Adaaen',
    quote: 'Chai ka cup dono haathon se pakadna aur choti choti baaton par fikar karna...',
    fullMessage:
      'Tumhara bina baat ke muh phula lena, phir meri halki si baat par hans padna... Tumhara chai ka cup dono haathon se pakad kar peena, aur jab main ghar der se aaon toh tumhara baar baar darwaza dekhna. Tumhein andaza bhi nahi hai ke tumhari yeh aam si aadatein mere dil ke liye kitna bada sukoon hain. Tum jaisi koi aur ho hi nahi sakti.',
  },
  {
    id: 'talk-3',
    title: 'Coming Home To You',
    romanTitle: 'Jab Main Thaka Hua Ghar Aata Hoon',
    tag: 'Mera Sukoon',
    quote: 'Duniya bhar ki thakan tumhari ek meethi muskaan se fana ho jaati hai...',
    fullMessage:
      'Din bhar ki mehnat, office ka bojh, aur bahir ki duniya ki saari pareshaaniyan us waqt hawa mein gayab ho jaati hain jab tum darwaza khol kar kehti ho: "Aap aa gaye? Chai banaon?". Tum sirf meri biwi nahi ho, tum mera ghar ho, meri panaah ho, jahan aakar meri rooh ko chain milta hai.',
  },
  {
    id: 'talk-4',
    title: 'Growing Old Together',
    romanTitle: 'Tumhare Sath Budha Hone Ka Khwaab',
    tag: 'Hamesha Ka Wada',
    quote: 'Jab humare baal safed honge, tab bhi main tumhara haath thamay chaloon ga...',
    fullMessage:
      'Mera sab se pyara khwaab yeh hai ke hum dono ek sath zindagi ke har daur se guzrein. Jab humare baal safed ho jayen, chehre par jhurriyan aa jayen, tab bhi main shaam ke waqt tumhara narm haath thaam kar yahi kahoonga: "Dekho meri jaan, tum aaj bhi mere liye duniya ki sab se khoobsurat larki ho."',
  },
  {
    id: 'talk-5',
    title: 'My Whole Wealth Is You',
    romanTitle: 'Meri Asal Daulat Tum Ho',
    tag: 'Sacha Pyar',
    quote: 'Mujhe mehal nahi chahiye, bas tumhara saath hi meri jannat hai...',
    fullMessage:
      'Log daulat aur shaukat ke peeche bhagte hain, lekin mujhe pata hai ke meri sab se qeemti daulat mere sath rehti hai. Tumhara narm lehja, tumhari samajhdaari aur tumhari duaon ne meri zindagi ko aabad kar diya hai. Main har sajde mein tumhare liye shukrana ada karta hoon.',
  },
];

export const VOICE_NOTES: VoiceNoteItem[] = [
  {
    id: 'vn-1',
    title: 'Dil Ki Baat (For Your Birthday)',
    duration: '0:45',
    transcription: 'Salgirah Mubarak meri jaan. Main lafzon mein nahi bata sakta ke main tumse kitna pyar karta hoon...',
    romanAudioNote: 'Happy Birthday meri pyari biwi. Tum meri poori duniya ho. Hamesha muskuraati raho.',
  },
  {
    id: 'vn-2',
    title: 'Tumhara Shukriya',
    duration: '0:38',
    transcription: 'Shukriya ke tum meri zindagi mein aayi aur mere aam se ghar ko jannat bana diya.',
    romanAudioNote: 'Tum jaisi hamsafar paana meri qismat ka sab se bada moajza hai.',
  },
];

export const INITIAL_LETTERS: LoveLetter[] = [
  {
    id: 'letter-main',
    title: 'Meri Jaan Ke Naam',
    subtitle: 'A deeply emotional birthday letter from the depth of my heart',
    urduPoetry: {
      urdu: 'تمہاری مسکراہٹ سے ہے روشن میری دنیا / تم سلامت رہو یہی ہے دعا میری ہر لمحہ',
      roman: 'Tumhari muskurahat se hai roshan meri duniya, Tum salamat raho yahi hai dua meri har lamha.',
      meaning: 'My whole world is illuminated by your smile; my only prayer in every breath is your eternal happiness and well-being.',
    },
    content: [
      'Meri Pyaari Biwi, Meri Zindagi, Meri Jaan...',
      'Aaj tumhara janamdin hai, aur mere paas alfaz kam padh rahe hain yeh batane ke liye ke tum mere liye kya maani rakhti ho. Tum sirf meri biwi nahi ho, tum meri har dua ka woh meetha sa jawab ho jo Allah ne meri qismat mein bina maangey hi likh diya.',
      'Jab main thak kar ghar aata hoon, tumhari ek muskurahat meri saari thakan door kar deti hai. Tumne mere aam se ghar ko jannat jaisa pur-sukoon aashiyana banaya hai. Tumhara sabr, tumhara pyar, aur tumhari parwah meri sab se badi taqat hai.',
      'Log kehte hain ke chand asman par hai, par mere paas mera apna chand hai jo har lamha meri zindagi ko roshan karta hai. Meri khushi tumhari muskan se shuru hoti hai aur tumhare sukoon par khatam hoti hai.',
      'Dua hai ke aane wala har saal tumhari jholi mein itni khushiyan bhar de ke tumhare chehre se muskurahat kabhi kam na ho. Main wada karta hoon ke har mod par, har dhoop chaaon mein, main tumhara haath thaam kar khada rahoonga.',
      'Salgirah Mubarak ho meri pyari humsafar, meri jaaneman! Tum meri pehli aur aakhri mohabbat ho.',
    ],
  },
  {
    id: 'letter-shukriya',
    title: 'Shukriya Tumhara',
    subtitle: 'Gratitude for every little sacrifice and smile',
    urduPoetry: {
      urdu: 'شکریہ کہ تم نے میرے بے رنگ خوابوں کو اپنی محبت کے رنگوں سے سجا دیا',
      roman: 'Shukriya ke tum ne mere berang khwabon ko apni mohabbat ke rangon se saja diya.',
      meaning: 'Thank you for painting my once-colorless dreams with the vibrant colors of your pure devotion.',
    },
    content: [
      'Shukriya meri zindagi mein aane ke liye aur mujhe ek behtar insaan banane ke liye.',
      'Shukriya us har waqt ke liye jab tumne bina kuch bole meri aankhon se meri pareshani samajh li aur chupke se mera hosla badhaya.',
      'Shukriya ke tumne mere parivaar ko apna samjha, mere ghar ko itni mohabbat aur shafqat se sambhala ke har kona mehka diya.',
      'Tum jaisi sachi aur shareef-un-nafs hamsafar har kisi ko nahi milti. Main kitna khush-naseeb hoon, iska ehsaas mujhe har roz hota hai.',
    ],
  },
  {
    id: 'letter-wada',
    title: 'Mera Hamesha Ka Wada',
    subtitle: 'A husband’s sacred and unbreakable promise',
    urduPoetry: {
      urdu: 'ہاتھ تھاما ہے تو مرتے دم تک ساتھ نبھائیں گے / تیری ہر خوشی کو اپنا جہاں بنائیں گے',
      roman: 'Haath thama hai toh marte dam tak saath nibhayenge, Teri har khushi ko apna jahan banayenge.',
      meaning: 'Having held your hand, I will stand beside you until my last breath; your joy is the sacred horizon of my world.',
    },
    content: [
      'Aaj tumhare is khaas din par, main tumse ek sachha wada karta hoon:',
      'Main wada karta hoon ke jab duniya tumhare khilaaf khadi ho, main tumhara sab se mazboot sahara banoonga.',
      'Main wada karta hoon ke tumhari aankh mein aane wale aanso ko kabhi waja nahi banoonga, balke har aanso ko muskaan mein badal doonga.',
      'Umr badalti rahegi, baal safed ho jayenge, chehre par jhurriyan aayengi — lekin meri aankhon mein tumhari khoobsurati aur dil mein tumhari qadar har roz pehle se dugni hogi.',
    ],
  },
  {
    id: 'letter-dua',
    title: 'Dua-e-Khas',
    subtitle: 'A special birthday blessing and prayer for her health and destiny',
    urduPoetry: {
      urdu: 'خدا کرے کہ تری عمر ہو اتنی طویل / کہ ستارے بھی گننے میں تھک جائیں',
      roman: 'Khuda kare ke teri umr ho itni taweel, ke sitare bhi gin-ne mein thak jayen.',
      meaning: 'May the Divine grant you a life so blessed and long that even the stars would tire of counting its golden days.',
    },
    content: [
      'Ya Rab, meri biwi ko hamesha sehat, tandrusti aur aafiyat ata farma.',
      'Uski har pareshani ko door kar, uske raste mein khushiyon ke phool bicha de.',
      'Uski masoomiyat aur nek niyat ki hifazat farma, aur hum dono ke darmiyan yeh mohabbat, izzat aur barkat ta-hayat qayam rakh.',
      'Aameen Summa Aameen.',
    ],
  },
];

export const REASONS_LIST: ReasonCard[] = [
  {
    id: 1,
    title: 'Your Contagious Warmth',
    romanTitle: 'Tumhari Pyari Muskurahat',
    description: 'Tumhari ek halki si hansi mere din bhar ki saari thakan aur fikr mita deti hai.',
    iconName: 'Smile',
  },
  {
    id: 2,
    title: 'The Way You Care for Home',
    romanTitle: 'Tumhara Ghar Ko Sawarna',
    description: 'Tumne chaar deewaron ke makan ko ek pur-sukoon aur mehke hue ghar mein badal diya.',
    iconName: 'Home',
  },
  {
    id: 3,
    title: 'Your Kind & Pure Heart',
    romanTitle: 'Tumhara Pak & Shafaf Dil',
    description: 'Tum sab ke sath itni meethi aur narm-dil ho ke har shakhs tumhari izzat karta hai.',
    iconName: 'Heart',
  },
  {
    id: 4,
    title: 'Belief in Me',
    romanTitle: 'Mujh Par Tumhara Yaqeen',
    description: 'Jab main khud par shaq karta hoon, tumhari aankhein mujhe batati hain ke main sab kuch kar sakta hoon.',
    iconName: 'Sparkles',
  },
  {
    id: 5,
    title: 'Your Silent Patience',
    romanTitle: 'Tumhara Sabr & Samajhdaari',
    description: 'Har mushkil waqt mein tumne meri himmat badhayi aur kabhi shikwa nahi kiya.',
    iconName: 'ShieldCheck',
  },
  {
    id: 6,
    title: 'Morning Chai & Conversations',
    romanTitle: 'Subah Ki Chai Aur Baatein',
    description: 'Tumhare saath baith kar chai peena aur aam si baatein karna meri din ka sab se behtareen hissa hai.',
    iconName: 'Coffee',
  },
  {
    id: 7,
    title: 'Your Innocence & Grace',
    romanTitle: 'Tumhari Masoom Adaaen',
    description: 'Tumhara choti choti baton par khush ho jana meri rooh ko sukoon deta hai.',
    iconName: 'Flower2',
  },
  {
    id: 8,
    title: 'My Peace & Sanctuary',
    romanTitle: 'Mera Sukoon Aur Meri Panaah',
    description: 'Is shor-sharaba bhari duniya mein tum mera sab se mehfooz aur pur-aman thikana ho.',
    iconName: 'Moon',
  },
  {
    id: 9,
    title: 'Unconditional Love',
    romanTitle: 'Bila-Shart Mohabbat',
    description: 'Mujhe mere har aib ke bawajood itni be-panah mohabbat dena sirf tumhara hi kamal hai.',
    iconName: 'Sun',
  },
  {
    id: 10,
    title: 'My Soulmate for Eternity',
    romanTitle: 'Mera Hamesha Ka Saath',
    description: 'Duniya mein bhi tum, aur aakhirat mein bhi tum. Tumhare bina meri koi pehchan nahi.',
    iconName: 'Infinity',
  },
];

const SETTINGS_KEY = 'jaaneman_birthday_settings_v2';

export function getSavedSettings(): SurpriseSettings {
  if (typeof window === 'undefined') {
    return getDefaultSettings();
  }
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...getDefaultSettings(),
        ...parsed,
      };
    }
  } catch {
    // fallback
  }
  return getDefaultSettings();
}

export function saveSettings(settings: SurpriseSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function getDefaultSettings(): SurpriseSettings {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

  return {
    wifeName: 'Meri Jaan',
    husbandName: 'Tumhara Humsafar',
    secretPasscode: 'love',
    birthdayDate: targetDate.toISOString(),
    customMessage: 'Tum meri zindagi ka sab se khoobsurat tohfa ho. Salgirah Mubarak meri pyaari biwi!',
    videoTitle: 'A Special Birthday Film For My Wife',
    videoUrl: '', // empty defaults to rich cinematic animation video player
    photos: INITIAL_PHOTOS,
  };
}

