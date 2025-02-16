 // البيانات
 const questions = [
    // أسئلة اختيارية (15 سؤالاً)
    { type: "choice", text: "ما هو جمع كلمة 'كتاب'؟", choices: ["مكتبات", "كتب", "كتيبات"], correct: "كتب" },
    { type: "choice", text: "من هو مؤلف كتاب 'الأيام'؟", choices: ["طه حسين", "نجيب محفوظ", "أحمد أمين"], correct: "طه حسين" },
    { type: "choice", text: "ما هي عاصمة المغرب؟", choices: ["الدار البيضاء", "الرباط", "مراكش"], correct: "الرباط" },
    { type: "choice", text: "ما هو البحر الذي يقع بين تركيا واليونان؟", choices: ["البحر الأحمر", "البحر الأبيض المتوسط", "بحر إيجة"], correct: "بحر إيجة" },
    { type: "choice", text: "من هو الشاعر الذي لقب بـ'أمير الشعراء'؟", choices: ["أحمد شوقي", "محمود درويش", "نزار قباني"], correct: "أحمد شوقي" },
    { type: "choice", text: "ما هي أطول قصيدة في الأدب العربي؟", choices: ["المعلقات", "ألفية ابن مالك", "البحر الطويل"], correct: "المعلقات" },
    { type: "choice", text: "ما هو اسم العملة اليابانية؟", choices: ["الدولار", "اليوان", "الين"], correct: "الين" },
    { type: "choice", text: "من هو العالم الذي اكتشف الجاذبية؟", choices: ["ألبرت أينشتاين", "إسحاق نيوتن", "غاليليو غاليلي"], correct: "إسحاق نيوتن" },
    { type: "choice", text: "ما هو أصغر كوكب في المجموعة الشمسية؟", choices: ["عطارد", "الزهرة", "المريخ"], correct: "عطارد" },
    { type: "choice", text: "ما هي اللغة الرسمية للبرازيل؟", choices: ["الإسبانية", "البرتغالية", "الإنجليزية"], correct: "البرتغالية" },
    { type: "choice", text: "من هو مؤلف كتاب 'صحيح البخاري'؟", choices: ["البخاري", "مسلم", "الترمذي"], correct: "البخاري" },
    { type: "choice", text: "ما هي السورة التي تسمى 'قلب القرآن'؟", choices: ["البقرة", "يس", "الفاتحة"], correct: "يس" },
    { type: "choice", text: "ما هو اسم أطول نهر في العالم؟", choices: ["نهر النيل", "نهر الأمازون", "نهر اليانغتسي"], correct: "نهر الأمازون" },
    { type: "choice", text: "من هو أول رئيس للولايات المتحدة الأمريكية؟", choices: ["جورج واشنطن", "توماس جيفرسون", "أبراهام لينكولن"], correct: "جورج واشنطن" },
    { type: "choice", text: "ما هي عاصمة فرنسا؟", choices: ["برلين", "روما", "باريس"], correct: "باريس" },

    // أسئلة مفتوحة (5 أسئلة)
    { type: "open", text: "ما هي عاصمة إسبانيا؟", correct: "مدريد" },
    { type: "open", text: "من هو مؤلف كتاب 'الكوميديا الإلهية'؟", correct: "دانتي أليغييري" },
    { type: "open", text: "ما هو اسم أطول جبل في العالم؟", correct: "جبل إيفرست" },
    { type: "open", text: "ما هي العملة الرسمية للمملكة المتحدة؟", correct: "الجنية الإسترليني" },
    { type: "open", text: "من هو العالم الذي اخترع المصباح الكهربائي؟", correct: "توماس إديسون" }
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let timeLeft = 15;
let timerInterval;

  // تحميل الصوت من الإنترنت:
  let correctSound = new Audio('./mp3/right-answer.mp3');  // رابط الصوت الصحيح
  let incorrectSound = new Audio('./mp3/wrong-answer.mp3');  // رابط الصوت الخاطئ


// عرض السؤال
function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.text;
    document.getElementById("choices").innerHTML = "";
    document.getElementById("open-question").style.display = "none";
    document.getElementById("result").textContent = "";

    if (question.type === "choice") {
        question.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.onclick = () => checkAnswer(choice);
            document.getElementById("choices").appendChild(button);
        });
    } else {
        document.getElementById("open-question").style.display = "block";
    }

    startTimer();
}

// التحقق من الإجابة
function checkAnswer(selectedAnswer) {
    clearInterval(timerInterval);
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (selectedAnswer === correctAnswer) {
        showResult("إجابة صحيحة! 😊", "🟢");
        correctAnswersCount++;
        playCorrect();  // تشغيل الصوت الصحيح عند الإجابة الصحيحة
    } else {
        showResult(`إجابة خاطئة! 😢 الإجابة الصحيحة هي: ${correctAnswer}`, "🔴");
        playIncorrect();  // تشغيل الصوت الخاطئ عند الإجابة الخاطئة
    }
    document.getElementById("next-btn").style.display = "block";
}

// التحقق من الإجابة المفتوحة
function checkOpenAnswer() {
    const userAnswer = document.getElementById("answer-input").value.trim();
    checkAnswer(userAnswer);
}


// عرض النتيجة
function showResult(message, emoji) {
    document.getElementById("result").innerHTML = `<span class="emoji">${emoji}</span> ${message}`;
}

// الانتقال إلى السؤال التالي
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById("next-btn").style.display = "none";
    } else {
        showFinalResult();
    }
}

// عرض النتيجة النهائية
function showFinalResult() {
    const resultMessage = `نتيجتك النهائية: ${correctAnswersCount} من ${questions.length}<br>`;
    let finalMessage = "";
    if (correctAnswersCount >= questions.length * 0.8) {
        finalMessage = "ممتاز! أنت بطل اللغة العربية! 🏆";
    } else if (correctAnswersCount >= questions.length * 0.5) {
        finalMessage = "جيد جداً! استمر في التعلم! 👍";
    } else {
        finalMessage = "لا بأس! المهم أنك تعلمت شيئاً جديداً. 💪";
    }
    document.getElementById("question").textContent = "";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("open-question").style.display = "none";
    document.getElementById("result").innerHTML = resultMessage + finalMessage + "<br>شكراً للمشاركة رحمون";
    document.getElementById("next-btn").style.display = "none";
}

// بدء العداد
function startTimer() {
    timeLeft = 15;
    document.getElementById("timer").textContent = `الوقت المتبقي: ${timeLeft} ثانية`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `الوقت المتبقي: ${timeLeft} ثانية`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showResult("انتهى الوقت! ⏰", "🔴");
            document.getElementById("next-btn").style.display = "block";
        }
    }, 1000);
}



  // دالة تشغيل الصوت الصحيح
  function playCorrect() {
      correctSound.currentTime = 0; // إعادة تشغيل الصوت من البداية
      correctSound.play()
      .then(() => console.log("✅ تشغيل الصوت بنجاح"))
      .catch(error => console.log("❌ خطأ في تشغيل الصوت:", error));
  }

  // دالة تشغيل الصوت الخاطئ
  function playIncorrect() {
      incorrectSound.currentTime = 0; // إعادة تشغيل الصوت من البداية
      incorrectSound.play()
      .then(() => console.log("✅ تشغيل الصوت بنجاح"))
      .catch(error => console.log("❌ خطأ في تشغيل الصوت:", error));
  }

// بدء المسابقة
showQuestion();