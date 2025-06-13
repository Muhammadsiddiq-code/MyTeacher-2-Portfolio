<template>
    <div class="qa-container">
      <div class="qa-header">
        <h1 class="qa-title">Savol-Javob AI</h1>
        <p class="qa-subtitle">Savollaringizni yuboring va tezkor javob oling</p>
      </div>
      
      <div class="qa-main">
        <!-- Search and Ask -->
        <div class="qa-search-box">
          <div class="qa-input-wrapper">
            <label for="question" class="qa-label">
              Savolingizni yozing
            </label>
            <div class="qa-input-container">
              <input 
                v-model="question"
                type="text" 
                id="question"
                placeholder="Masalan: HTML nima?" 
                class="qa-input"
                @keyup.enter="askQuestion"
              />
              <SearchIcon class="qa-search-icon" />
              <button 
                @click="askQuestion"
                class="qa-ask-button">
                So'rash
              </button>
            </div>
          </div>
          
          <div v-if="isLoading" class="qa-loading">
            <div class="qa-spinner"></div>
          </div>
          
          <div v-else-if="answer" class="qa-answer-box">
            <div class="qa-answer-header">
              <div class="qa-answer-icon">
                <BrainIcon />
              </div>
              <div>
                <h3 class="qa-answer-title">Javob</h3>
                <div class="qa-answer-content" v-html="formattedAnswer"></div>
              </div>
            </div>
            
            <div class="qa-feedback">
              <div class="qa-feedback-question">Bu javob foydali bo'ldimi?</div>
              <div class="qa-feedback-buttons">
                <button class="qa-feedback-button">
                  <ThumbsUpIcon />
                </button>
                <button class="qa-feedback-button">
                  <ThumbsDownIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Popular Questions -->
        <div class="qa-popular">
          <h2 class="qa-section-title">Ko'p so'raladigan savollar</h2>
          
          <div class="qa-popular-list">
            <div 
              v-for="(q, index) in popularQuestions" 
              :key="index"
              @click="setQuestion(q.question)"
              class="qa-popular-item">
              <div class="qa-popular-item-content">
                <HelpCircleIcon class="qa-popular-icon" />
                <span class="qa-popular-text">{{ q.question }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- FAQ Categories -->
        <div class="qa-categories">
          <h2 class="qa-section-title">Savollar kategoriyalari</h2>
          
          <div class="qa-categories-grid">
            <div 
              v-for="(category, index) in faqCategories" 
              :key="index"
              class="qa-category-card">
              <div class="qa-category-content">
                <div class="qa-category-header">
                  <component :is="category.icon" class="qa-category-icon" />
                  <h3 class="qa-category-title">{{ category.title }}</h3>
                </div>
                
                <p class="qa-category-description">{{ category.description }}</p>
                
                <ul class="qa-category-list">
                  <li v-for="(item, itemIndex) in category.items" :key="itemIndex" class="qa-category-list-item">
                    <CheckIcon class="qa-check-icon" />
                    <span class="qa-item-text">{{ item }}</span>
                  </li>
                </ul>
                
                <button 
                  @click="setQuestion(category.sampleQuestion)"
                  class="qa-example-button">
                  Misol uchun so'rang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { SearchIcon, BrainIcon, ThumbsUpIcon, ThumbsDownIcon, HelpCircleIcon, 
    CheckIcon, CodeIcon, BookIcon, GraduationCapIcon } from 'lucide-vue-next';
  import { marked } from 'marked';
  
  const question = ref('');
  const answer = ref('');
  const isLoading = ref(false);
  
  const formattedAnswer = computed(() => {
    return answer.value ? marked(answer.value) : '';
  });
  
  const askQuestion = async () => {
    if (!question.value.trim()) return;
    
    isLoading.value = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple AI response logic
    const q = question.value.toLowerCase();
    
    if (q.includes('html')) {
      answer.value = "HTML (HyperText Markup Language) veb-brauzerda ko'rsatish uchun mo'ljallangan hujjatlar uchun standart belgilash tilidir. U veb-sahifalarning tuzilishi va tarkibini belgilaydi.\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Mening birinchi sahifam</title>\n</head>\n<body>\n  <h1>Salom Dunyo!</h1>\n  <p>Bu paragraf.</p>\n</body>\n</html>\n```\n\nHTML sarlavhalar, paragraflar, ro'yxatlar, havolalar va rasmlar kabi elementlardan foydalanadi.";
    } else if (q.includes('css')) {
      answer.value = "CSS (Cascading Style Sheets) HTML-da yozilgan hujjatning ko'rinishini tasvirlash uchun ishlatiladigan uslublar tilidir. CSS taqdimot va tarkibni ajratish uchun mo'ljallangan.\n\n```css\n/* Asosiy uslublar */\nbody {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n  color: #333;\n}\n\nh1 {\n  color: #0066cc;\n}\n```\n\nCSS veb-sahifalarning ko'rinishi, tartib, ranglar va shriftlarni boshqaradi.";
    } else if (q.includes('javascript') || q.includes('js')) {
      answer.value = "JavaScript interaktiv veb-sahifalarni yaratish imkonini beruvchi dasturlash tilidir. U veb-ilovalarning muhim qismi hisoblanadi va ko'pchilik veb-saytlar mijoz tomonidagi xatti-harakatlar uchun undan foydalanadi.\n\n```javascript\n// Oddiy funksiya\nfunction salomlash(ism) {\n  return `Salom, ${ism}!`;\n}\n\n// Funksiyadan foydalanish\nconsole.log(salomlash('Talaba'));\n```\n\nJavaScript dinamik tarkib yaratish, multimedia boshqarish, rasmlarni animatsiya qilish va boshqa ko'p narsalarni amalga oshirish imkonini beradi.";
    } else if (q.includes('vue') || q.includes('vue.js')) {
      answer.value = "Vue.js foydalanuvchi interfeyslarini yaratish uchun progressiv JavaScript frameworkidir. Boshqa monolitik frameworklardan farqli o'laroq, Vue bosqichma-bosqich qabul qilish uchun mo'ljallangan.\n\n```javascript\n// Asosiy Vue 3 komponenti\nimport { ref } from 'vue'\n\nexport default {\n  setup() {\n    const count = ref(0)\n    \n    function increment() {\n      count.value++\n    }\n    \n    return {\n      count,\n      increment\n    }\n  }\n}\n```\n\nVue.js reaktiv va kompozitsion komponent tizimiga ega, bu uni ham oddiy, ham murakkab veb-ilovalar uchun ideal qiladi.";
    } else if (q.includes('kurs') || q.includes('dars')) {
      answer.value = "Bizning kurslarimiz veb-dasturlash, dasturlash va dizayn bo'yicha keng mavzularni qamrab oladi. Mana bizning mashhur kurslarimizdan ba'zilari:\n\n1. **Veb-dasturlash asoslari** - HTML, CSS va JavaScript asoslarini o'rganing\n2. **Ilg'or Vue.js** - Vue.js-ni o'zlashtiring va murakkab ilovalar yarating\n3. **UI/UX dizayn tamoyillari** - Chiroyli va funksional interfeyslar yaratishni o'rganing\n4. **Full Stack dasturlash** - Node.js va MongoDB bilan to'liq stack dasturchi bo'ling\n\nKurslar jadvalini Kurslar sahifasida topishingiz mumkin. Har bir kurs amaliy loyihalar va shaxsiy fikr-mulohazalarni o'z ichiga oladi.";
    } else if (q.includes('jadval') || q.includes('vaqt')) {
      answer.value = "Bizning joriy o'qitish jadvalimiz Jadval sahifasida mavjud. Darslar odatda ish kunlari soat 9:00 dan 18:00 gacha o'tkaziladi. \n\nShaxsiy konsultatsiyalar uchun siz odatda seshanba va payshanba kunlari soat 10:00 dan 12:00 gacha bo'lgan konsultatsiya soatlarida vaqt band qilishingiz mumkin.\n\nBarcha darslar IT binosida o'tkaziladi va aniq xona ma'lumotlari jadvalda ko'rsatilgan.";
    } else {
      answer.value = "Savolingiz uchun rahmat! Tez orada javob beramiz. Iltimos, savolingizni aniqroq qilib qayta yuboring yoki boshqa mavzu bo'yicha so'rang.";
    }
    
    isLoading.value = false;
  };
  
  const setQuestion = (q) => {
    question.value = q;
    askQuestion();
  };
  
  const popularQuestions = [
    { question: "HTML nima va qanday ishlaydi?" },
    { question: "Vue.js-ni o'rganish uchun qanday resurslar tavsiya qilasiz?" },
    { question: "Dasturlashni o'rganish uchun qancha vaqt kerak?" },
    { question: "Frontend va Backend dasturlash o'rtasidagi farq nima?" },
    { question: "Responsive dizayn nima?" }
  ];
  
  const faqCategories = [
    {
      title: "Dasturlash asoslari",
      description: "Dasturlash tillari va asosiy tushunchalar haqida savollar",
      icon: CodeIcon,
      items: [
        "HTML, CSS va JavaScript asoslari",
        "Dasturlash algoritmlari",
        "Ma'lumotlar tuzilmalari",
        "Dasturlash paradigmalari"
      ],
      sampleQuestion: "Dasturlashni o'rganish uchun qaysi tildan boshlash kerak?"
    },
    {
      title: "Kurslar haqida",
      description: "Kurslar, o'quv dasturlari va materiallar haqida ma'lumot",
      icon: BookIcon,
      items: [
        "Kurslar tarkibi va davomiyligi",
        "O'quv materiallari va resurslar",
        "Amaliy loyihalar",
        "Sertifikatlar va imtihonlar"
      ],
      sampleQuestion: "Vue.js kursi qancha davom etadi?"
    },
    {
      title: "Karera va rivojlanish",
      description: "Karera yo'llari va professional rivojlanish bo'yicha maslahatlar",
      icon: GraduationCapIcon,
      items: [
        "Portfolio yaratish",
        "Ish topish strategiyalari",
        "Intervyuga tayyorgarlik",
        "Kasbiy rivojlanish yo'llari"
      ],
      sampleQuestion: "Frontend dasturchi bo'lish uchun qanday ko'nikmalar kerak?"
    }
  ];
  </script>
  
  <style>
/* QA Container Styles */
.qa-container {
  padding: 3rem 1rem;
  background-color: var(--bg-color);
  min-height: 100vh;
}

.qa-header {
  text-align: center;
  margin-bottom: 3rem;
}

.qa-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.qa-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 36rem;
  margin: 0 auto;
}

.qa-main {
  max-width: 64rem;
  margin: 0 auto;
}

/* Search Box Styles */
.qa-search-box {
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.qa-input-wrapper {
  margin-bottom: 1.5rem;
}

.qa-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.qa-input-container {
  position: relative;
}

.qa-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.qa-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.qa-search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-muted);
}

.qa-ask-button {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.qa-ask-button:hover {
  background-color: var(--primary-dark);
}

/* Loading Styles */
.qa-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}

.qa-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid transparent;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Answer Box Styles */
.qa-answer-box {
  background-color: var(--bg-light);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.qa-answer-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.qa-answer-icon {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qa-answer-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.qa-answer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.qa-answer-content {
  color: var(--text-secondary);
  line-height: 1.6;
}

.qa-answer-content pre {
  background-color: var(--code-bg);
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.qa-answer-content code {
  font-family: monospace;
  color: var(--code-color);
}

/* Feedback Styles */
.qa-feedback {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.qa-feedback-question {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.qa-feedback-buttons {
  display: flex;
  gap: 0.5rem;
}

.qa-feedback-button {
  padding: 0.25rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s;
}

.qa-feedback-button:hover:first-child {
  color: var(--success-color);
}

.qa-feedback-button:hover:last-child {
  color: var(--danger-color);
}

.qa-feedback-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Popular Questions Styles */
.qa-popular {
  margin-bottom: 3rem;
}

.qa-section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.qa-popular-list {
  display: grid;
  gap: 1rem;
}

.qa-popular-item {
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.qa-popular-item:hover {
  background-color: var(--card-hover);
  transform: translateY(-2px);
}

.qa-popular-item-content {
  display: flex;
  align-items: center;
}

.qa-popular-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--primary-color);
  margin-right: 0.75rem;
}

.qa-popular-text {
  color: var(--text-color);
}

/* FAQ Categories Styles */
.qa-categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1.5rem;
}

.qa-category-card {
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.qa-category-content {
  padding: 1.5rem;
}

.qa-category-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.qa-category-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--primary-color);
  margin-right: 0.75rem;
}

.qa-category-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
}

.qa-category-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.qa-category-list {
  margin-bottom: 1.5rem;
  list-style: none;
  padding: 0;
}

.qa-category-list-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.qa-check-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--success-color);
  margin-right: 0.5rem;
  margin-top: 0.125rem;
}

.qa-item-text {
  color: var(--text-secondary);
}

.qa-example-button {
  color: var(--primary-color);
  font-weight: 500;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;
}

.qa-example-button:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* Dark Mode Variables */
:root {
  --bg-color: #ffffff;
  --card-bg: #ffffff;
  --card-hover: #f9fafb;
  --bg-light: #f3f4f6;
  --input-bg: #ffffff;
  --text-color: #1f2937;
  --text-secondary: #4b5563;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --primary-color: #3b82f6;
  --primary-dark: #2563eb;
  --success-color: #10b981;
  --danger-color: #ef4444;
  --code-bg: #f1f5f9;
  --code-color: #0f172a;
}

/* Dark Mode */
.dark {
  --bg-color: #111827;
  --card-bg: #1f2937;
  --card-hover: #374151;
  --bg-light: #1f2937;
  --input-bg: #111827;
  --text-color: #f9fafb;
  --text-secondary: #e5e7eb;
  --text-muted: #9ca3af;
  --border-color: #374151;
  --primary-color: #60a5fa;
  --primary-dark: #3b82f6;
  --success-color: #34d399;
  --danger-color: #f87171;
  --code-bg: #1e293b;
  --code-color: #e2e8f0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .qa-categories-grid {
    grid-template-columns: 1fr;
  }
  
  .qa-title {
    font-size: 1.75rem;
  }
  
  .qa-subtitle {
    font-size: 1rem;
  }
  
  .qa-ask-button {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>