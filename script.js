// ========== ভাষা পরিবর্তন সিস্টেম ==========
document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");
  const allLangElements = document.querySelectorAll(".lang");

  const hadithDiv = document.getElementById("hadithText");
  const wrapper = document.querySelector(".hadith-wrapper");
  
  // ✅ হাদিস ডেটা
  const hadiths_bn = [
    "❝ যে ব্যক্তি দান করে, আল্লাহ তা’আলা তাকে আরও বেশি দেন। (সহীহ মুসলিম) ❞",
    "❝ দান করার মাধ্যমে সম্পদ কখনোই কমে না। বরং দান করলে আল্লাহ তা বাড়িয়ে দেন। (সহীহ মুসলিম) ❞",
    "❝ তিনটি জিনিস মৃত্যুর পরেও সওয়াব পৌঁছায়: সদকায়ে জারিয়া, উপকারী জ্ঞান, এবং নেক সন্তান। (সহীহ মুসলিম) ❞",
    "❝ আগুন থেকে বাঁচো—even যদি তা হয় একটি খেজুর দান করার মাধ্যমেও। (সহীহ বুখারী) ❞",
    "❝ দান করো, তা বিপদ-আপদ দূর করে। (তাবরানী) ❞"
  ];

  const hadiths_en = [
    "❝ Whoever gives charity, Allah increases it for him. (Sahih Muslim) ❞",
    "❝ Charity never decreases wealth. Rather, Allah multiplies it. (Sahih Muslim) ❞",
    "❝ Three deeds continue after death: Sadaqah Jariyah, beneficial knowledge, and a righteous child. (Sahih Muslim) ❞",
    "❝ Save yourself from Hellfire, even with half a date. (Sahih Bukhari) ❞",
    "❝ Give charity; it repels calamities. (Tabarani) ❞"
  ];

  let currentList = hadiths_bn;
  let currentIndex = 0;
  let scrollTimeout = null;

  function scrollHadith() {
    if (!hadithDiv || !wrapper) return;
    if (scrollTimeout) clearTimeout(scrollTimeout);

    hadithDiv.style.transition = "none";
    hadithDiv.style.left = wrapper.offsetWidth + "px";
    hadithDiv.innerText = currentList[currentIndex];

    requestAnimationFrame(() => {
      const textWidth = hadithDiv.offsetWidth;
      const distance = wrapper.offsetWidth + textWidth;
      const speed = 100;
      const duration = distance / speed;

      hadithDiv.style.transition = `left ${duration}s linear`;
      hadithDiv.style.left = `-${textWidth}px`;

      scrollTimeout = setTimeout(() => {
        currentIndex = (currentIndex + 1) % currentList.length;
        scrollHadith();
      }, duration * 1000);
    });
  }

  function applyLanguage(lang) {
    allLangElements.forEach(el => el.classList.remove("active"));
    document.querySelectorAll(`.lang.${lang}`).forEach(el => el.classList.add("active"));

    currentList = lang === "en" ? hadiths_en : hadiths_bn;
    currentIndex = 0;
    scrollHadith();
  }

  const savedLang = localStorage.getItem("language") || "bn";
  applyLanguage(savedLang);

  if (languageSelect) {
    languageSelect.value = savedLang;

    languageSelect.addEventListener("change", function () {
      const selectedLang = this.value;
      localStorage.setItem("language", selectedLang);
      applyLanguage(selectedLang);
    });
  }

  // ========== স্লাইডার ==========
  const slider = document.getElementById("slider");
  const dotsContainer = document.getElementById("dots");

  if (slider && dotsContainer) {
    const slides = slider.children;
    const totalSlides = slides.length;
    let slideIndex = 0;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.children;

    function showSlide(index) {
      if (index >= totalSlides) slideIndex = 0;
      else if (index < 0) slideIndex = totalSlides - 1;
      else slideIndex = index;

      slider.style.transform = `translateX(-${slideIndex * 100}%)`;

      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
      }
      dots[slideIndex].classList.add('active');
    }

    setInterval(() => {
      showSlide(slideIndex + 1);
    }, 3000);

    showSlide(slideIndex);
  }
});


//Hamburge Manu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  // মেনু খুলে দেওয়া
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    sidebar.classList.add("open");
    hamburger.classList.add("hidden");
  });

  // স্লাইডার এর ভিতরে ক্লিক করলে কিছু হবে না
  sidebar.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // যেকোনো বাইরের অংশে ক্লিক করলে sidebar বন্ধ হবে
  document.addEventListener("click", function () {
    sidebar.classList.remove("open");
    hamburger.classList.remove("hidden");
  });
});