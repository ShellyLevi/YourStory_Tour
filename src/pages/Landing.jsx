import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, Sparkles, ChevronDown,
  MapPin, Camera, Heart, Laugh, Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import levinskyImg from "../levinsky.jpg";
import carmelImg from "../carmel.jpg";
import mapImg from "../israel-map.jpg";

// ── תמונות ────────────────────────────────────────────
const IMAGES = {
  logo:     "https://media.base44.com/images/public/6a0c15b43e3cb34c735a3a8d/603a3f431_image.png",
  hero:     "https://media.base44.com/images/public/6a0c15b43e3cb34c735a3a8d/aa32a4246_generated_55bac0d6.png",
  couple:   "https://media.base44.com/images/public/6a0c15b43e3cb34c735a3a8d/b4b14f6fc_generated_2459dba9.png",
  friends:  "https://media.base44.com/images/public/6a0c15b43e3cb34c735a3a8d/ad854439b_generated_f8d1fda2.png",
  bourekas: "https://media.base44.com/images/public/6a0c15b43e3cb34c735a3a8d/20f1716b2_image.png",
  birthday: "https://media.base44.com/images/public/6a0c15b43e3cb34c735a3a8d/54264590a_generated_fe7fe39d.png",
  levinsky: levinskyImg,
  carmel: carmelImg,
  map: mapImg,
};

// ── כל הטקסטים בשתי שפות ─────────────────────────────
const CONTENT = {
  he: {
    dir: "rtl",
    whatsapp: "https://api.whatsapp.com/send?phone=972543101179&text=היי+שלי!+ראיתי+את+הסיורי+אוכל+האישיים+שלך+וממש+בא+לי+לשמוע+עוד+✨",
    hero: {
      badge: "חוויה קולינרית שלא חוויתם",
      title1: "סיור אוכל",
      title2: "בהתאמה אישית",
      title3: "לפי הסיפור שלכם! 🩷",
      subtitle: "חוויה קולינרית עצמאית שכולה בנויה סביב הסיפור שלכם",
      highlight1: "התמונות שלכם • הבדיחות הפרטיות שלכם",
      highlight2: "הכל מותאם אישית אליכם ולחוויה שלכם!",
      cta: "בואו נדבר על זה",
    },
    whatIsIt: {
      label: "איך זה עובד",
      title1: "לא סתם סיור אוכל.",
      title2: "החוויה שלכם.",
      badge: "✨ הכל דיגיטלי ונגיש מהנייד",
      features: [
        { title: "אפליקציית תחנות אישית", desc: "מעבר ממקום למקום עם הסברים, ניווט וקישורים - הכל מוכן בשבילכם!" },
        { title: "הבדיחות הפרטיות שלכם בפנים", desc: "כינויי חיבה, בדיחות פנימיות ורגעים מרגשים שרק אתם מכירים" },
        { title: "קולאז׳ שלכם למזכרת", desc: "מעלים תמונות לאורך הדרך ובסוף מקבלים קולאז׳ מהמם" },
        { title: "100% אישי ונתפר עליכם", desc: "לא תמצאו שני סיורים זהים — כל חוויה נוצרת מאפס עבורכם" },
      ],
    },
    locations: {
      label: "איפה מטיילים?",
      title1: "השווקים המובילים שלנו",
      title2: "או כל מקום שתבחרו!",
      market1: "שוק הכרמל",
      market1Desc: "השוק האייקוני של תל אביב. חוויה תוססת, צבעונית ומלאה בטעמים נוסטלגיים וחדשניים.",
      market2: "שוק לוינסקי",
      market2Desc: "חוויה קולינרית מתוחכמת. תבלינים, מעדניות קסומות, ביסים ייחודיים ואווירה חצי פלורנטינאית.",
      custom: "בכל מקום בארץ!",
      customDesc: "יש לכם מקום סנטימנטלי? רוצים סיור בשכונת ילדות, בעיר אחרת או במסלול ספציפי? נבנה לכם תחנות חדשות מאפס!",
    },

    forWho: {
      label: "למי זה מתאים?",
      title1: "נמאס לכם מעוד מסעדה רגילה",
      title2: "או מתנה גנרית?",
      boxTitle: "בואו תראו איך אפשר לקבל משהו",
      tags: ["✨ אישי", "🎯 חוויתי", "🎁 מפתיע"],
      boxSub: "סיור אוכל דיגיטלי — נתפר סביב הסיפור, התמונות והבדיחות שלכם",
      occasions: [
        { emoji: "💑", title: "יום נישואין / שנים ביחד", desc: "חוגגים 5 שנים? 10? תפתיעו עם חוויה אינטימית ומרגשת שמספרת את הסיפור שלכם" },
        { emoji: "🎂", title: "יום הולדת", desc: "תנו לחוגג/ת להרגיש שהעולם סובב סביבם — סיור שכולו מותאם אליהם" },
        { emoji: "👯‍♀️", title: "מסיבת רווקות", desc: "חוויה מיוחדת עם הבנות, בדיחות פנימיות, תמונות וזיכרונות לכל החיים" },
        { emoji: "🎉", title: "כל אירוע שתבחרו", desc: "קבלה לעבודה? סיום לימודים? לידה? יש אלף ואחד סיבות לחגוג" },
      ],
    },
    cta: {
      title1: "מוכנים ליצור חוויה",
      title2: "בלתי נשכחת?",
      sub: "שלחו לי הודעה בוואטסאפ ונתחיל לתכנן את הסיור המושלם שלכם",
      price: "במחיר נוח לכל כיס!",
      btn: "דברו איתי בוואטסאפ",
      pills: ["התמונות שלכם", "הבדיחות הפרטיות שלכם", "מחיר נוח"],
    },
    footerHeart: "נוצר עם",
    footerFor: "עבורכם",
    footer: "© כל הזכויות שמורות לשלי לוי",
  },

  en: {
    dir: "ltr",
    whatsapp: "https://api.whatsapp.com/send?phone=972543101179&text=Hey+Shelly!+I+saw+your+personalized+food+tours+and+I'd+love+to+hear+more+✨",
    hero: {
      badge: "A culinary experience like no other",
      title1: "A Food Tour",
      title2: "Created From",
      title3: "Your Story!🩷",
      subtitle: "A self-guided culinary experience tailored entirely around your story",
      highlight1: "Your photos • Your inside jokes",
      highlight2: "Everything personalized to you and your experience!",
      cta: "Let's Talk About Your Experience",
    },
    whatIsIt: {
      label: "How It Works",
      title1: "Not just a food tour.",
      title2: "Your experience.",
      badge: "✨ Fully digital, right on your phone",
      features: [
        { title: "Your Personal Stop-by-Stop App", desc: "Navigate from place to place with descriptions, directions and links" },
        { title: "Your Inside Jokes, Built In", desc: "Nicknames, private jokes, moments only you know, all included" },
        { title: "Memory Collage", desc: "Snap photos along the way and receive a beautiful collage" },
        { title: "100% Personal, Made for You", desc: "No two tours are ever the same, every experience is created for you!" },
      ],
    },

    locations: {
      label: "Where do we tour?",
      title1: "Our Top Markets",
      title2: "or anywhere you choose!",
      market1: "Carmel Market",
      market1Desc: "Tel Aviv's iconic market. A vibrant, colorful experience packed with nostalgic and innovative flavors.",
      market2: "Levinsky Market",
      market2Desc: "A sophisticated culinary experience. Spices, magical delis, unique bites, and a touch of Florentin vibe.",
      custom: "Anywhere in Israel!",
      customDesc: "Have a sentimental place? Want a tour in your childhood neighborhood, a different city, or a specific route? We'll build new stops from scratch!",
    },

    forWho: {
      label: "Who Is It For?",
      title1: "Tired of another generic dinner",
      title2: "or forgettable gift?",
      boxTitle: "Imagine getting something that's truly",
      tags: ["✨ Personal", "🎯 Experiential", "🎁 Surprising"],
      boxSub: "A digital food tour — crafted around your story, your photos and your inside jokes",
      occasions: [
        { emoji: "💑", title: "Anniversary", desc: "Celebrating 5 years? 10? Surprise them with an intimate, emotional experience that tells your story" },
        { emoji: "🎂", title: "Birthday", desc: "Make the birthday person feel like the whole world revolves around them — a tour made just for them" },
        { emoji: "👯‍♀️", title: "Bachelorette Party", desc: "A one-of-a-kind experience with the girls — inside jokes, photos and memories for life" },
        { emoji: "🎉", title: "Any Occasion You Choose", desc: "New job? Graduation? New baby? There are a thousand and one reasons to celebrate" },
      ],
    },
    cta: {
      title1: "Ready to create an experience",
      title2: "they'll never forget?",
      sub: "Send me a message on WhatsApp and let's start planning your perfect tour",
      price: "Affordable for every budget!",
      btn: "Chat With Me on WhatsApp",
      pills: ["Your photos inside", "Your inside jokes", "Affordable pricing"],
    },
    footerHeart: "Made with",
    footerFor: "for you",
    footer: "© All rights reserved to Shelly Levi",
  },
};

const icons = [MapPin, Laugh, Camera, Heart];

function LangToggle({ lang, setLang }) {
  return (
    <div className="fixed top-3 right-3 z-50 flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setLang("he")}
        className={`px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
          lang === "he"
            ? "bg-orange-500 text-white"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        🇮🇱 עב
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
          lang === "en"
            ? "bg-orange-500 text-white"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────
function HeroSection({ t }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="food tour" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
      </div>
      <motion.div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-yellow-400/20 blur-2xl"
        animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-orange-400/20 blur-3xl"
        animate={{ y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity }} />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8">
          <img src={IMAGES.logo} alt="Your Story Tour"
            className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-2xl object-cover shadow-2xl shadow-black/30 border-4 border-white/20" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2 mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-light">{t.hero.badge}</span>
          </div>
        </motion.div>

        <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold text-white mb-4 leading-tight"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {t.hero.title1}<br />
          <span className="text-yellow-400">{t.hero.title2}</span>
          <br />
          <span className="text-white text-2xl sm:text-3xl font-normal block mt-2">
            {t.hero.title3}
          </span>
        </motion.h1>

        <motion.p className="text-lg sm:text-xl text-white/85 font-light mb-4 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}>
          {t.hero.subtitle}
        </motion.p>

        <motion.div className="inline-block bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-6 py-4 mb-8"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <p className="text-white font-semibold text-lg sm:text-xl">{t.hero.highlight1}</p>
          <p className="text-white font-semibold text-xl sm:text-2xl mt-2">{t.hero.highlight2}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}>
          <a href={t.whatsapp} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6 text-lg font-medium shadow-2xl transition-all duration-300 hover:scale-105">
              <MessageCircle className="w-5 h-5 mr-2" />
              {t.hero.cta}
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div 
      className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer"
      animate={{ y: [0, 8, 0] }} 
      transition={{ duration: 2, repeat: Infinity }}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <ChevronDown className="w-6 h-6 text-white/40" />
    </motion.div>
    </section>
  );
}

// ── What Is It ────────────────────────────────────────
function WhatIsItSection({ t }) {
  return (
    <section className="py-24 px-6 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-orange-500 text-base sm:text-lg font-bold tracking-widest uppercase">{t.whatIsIt.label}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-800 mt-3">
            {t.whatIsIt.title1}<br />
            <span className="text-orange-500">{t.whatIsIt.title2}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {t.whatIsIt.features.map((f, i) => {
              const Icon = icons[i];
              return (
                <motion.div key={i} className="flex gap-5 items-start"
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}>
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{f.title}</h3>
                    <p className="text-gray-500 font-light leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div className="relative" initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto">
              <img src={IMAGES.bourekas} alt="app screenshot" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <motion.div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-800 rounded-2xl px-5 py-3 shadow-lg font-semibold text-sm"
              animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              {t.whatIsIt.badge}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── LOCATIONS ───────────────────────────────────────────
function LocationsSection({ t }) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-base sm:text-lg font-bold tracking-widest uppercase block mb-3">
            {t.locations.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-800">
            {t.locations.title1} <span className="text-orange-500">{t.locations.title2}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {/* שוק לוינסקי */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col text-center">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-6 shadow-sm">
              <img 
                src={IMAGES.levinsky} 
                alt="Levinsky Market" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{t.locations.market2}</h3>
            <p className="text-gray-600 font-light leading-relaxed text-lg sm:text-xl flex-grow">{t.locations.market2Desc}</p>
          </div>

          {/* שוק הכרמל */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col text-center">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-6 shadow-sm">
              <img 
                src={IMAGES.carmel} 
                alt="Carmel Market" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{t.locations.market1}</h3>
            <p className="text-gray-600 font-light leading-relaxed text-lg sm:text-xl flex-grow">{t.locations.market1Desc}</p>
          </div>

          {/* מותאם אישית בכל הארץ */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col text-center">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-6 shadow-sm">
              <img 
                src={IMAGES.map} 
                alt="Israel Map" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{t.locations.custom}</h3>
            <p className="text-gray-600 font-light leading-relaxed text-lg sm:text-xl flex-grow">{t.locations.customDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
// ── For Who ───────────────────────────────────────────
function ForWhoSection({ t }) {
  const images = [IMAGES.couple, IMAGES.friends, IMAGES.birthday];
  return (
    <section className="py-24 px-6 bg-amber-50">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-orange-500 text-base sm:text-lg font-bold tracking-widest uppercase">{t.forWho.label}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-800 mt-3 mb-6">
            {t.forWho.title1}<br />
            <span className="text-orange-500">{t.forWho.title2}</span>
          </h2>
        </motion.div>

        <motion.div className="text-center mb-14 bg-white border border-orange-100 rounded-3xl px-8 py-10 max-w-3xl mx-auto shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-2xl sm:text-3xl font-playfair font-bold text-gray-800 leading-relaxed mb-4">{t.forWho.boxTitle}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {t.forWho.tags.map((tag, i) => (
              <span key={i} className="bg-orange-100 text-orange-600 rounded-full px-5 py-2 font-semibold text-xl sm:text-2xl">{tag}</span>
            ))}
          </div>
          <p className="text-gray-500 font-light text-lg">{t.forWho.boxSub}</p>
        </motion.div>

        <motion.div className="grid grid-cols-3 gap-4 mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {images.map((img, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {t.forWho.occasions.map((o, i) => (
            <motion.div key={i}
              className="bg-white rounded-2xl p-6 border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-lg group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="flex items-start gap-4">
                <span className="text-3xl">{o.emoji}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">{o.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed text-sm">{o.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────
function CTASection({ t }) {
  return (
    <section className="py-24 px-6 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-6 leading-tight">
            {t.cta.title1}<br />
            <span className="text-yellow-400">{t.cta.title2}</span>
          </h2>
          <p className="text-white/75 font-light text-lg mb-6 max-w-xl mx-auto">{t.cta.sub}</p>
          <motion.div className="inline-flex items-center gap-3 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl px-8 py-5 mb-10"
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <Wallet className="w-7 h-7 text-yellow-400 flex-shrink-0" />
            <p className="text-yellow-400 font-bold text-2xl sm:text-3xl">{t.cta.price}</p>
          </motion.div>
          <div className="block">
            <a href={t.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-10 py-7 text-xl font-medium shadow-2xl transition-all duration-300 hover:scale-105">
                <MessageCircle className="w-6 h-6 mr-2" />
                {t.cta.btn}
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-white/75 text-base sm:text-xl font-medium">
            {t.cta.pills.map((p, i) => <span key={i}>{p}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────
function FooterSection({ t }) {
  return (
    <footer className="py-8 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
          {t.footerHeart} <Heart className="w-4 h-4 text-orange-500 fill-orange-500 mx-1" /> {t.footerFor}
        </p>
        <p className="text-gray-300 text-xs">
          {t.footer} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

// ── כפתור WhatsApp צף ─────────────────────────────────
function FloatingWhatsApp({ t }) {
  return (
    <motion.a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-colors"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </motion.a>
  );
}

// ── הדף הראשי ─────────────────────────────────────────
export default function Landing() {
  const [lang, setLang] = useState("he");
  const t = CONTENT[lang];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        className="min-h-screen"
        dir={t.dir}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LangToggle lang={lang} setLang={setLang} />
        <HeroSection t={t} />
        <WhatIsItSection t={t} />
        <LocationsSection t={t} />
        <ForWhoSection t={t} />
        <CTASection t={t} />
        <FooterSection t={t} />
        <FloatingWhatsApp t={t} />
      </motion.div>
    </AnimatePresence>
  );
}
