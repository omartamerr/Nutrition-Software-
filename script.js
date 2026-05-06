// script.js

// Toggle between login/signup forms
function showForm(formId) {
  document.querySelectorAll(".content").forEach(el => el.classList.remove("active"));
  document.getElementById(formId).classList.add("active");
}


function showApp() {
  document.getElementById("main-nav").style.display = "flex";
  scrollToSection("dashboard");
  document.querySelector(".auth-toggle").style.display = "none";
}

function scrollToSection(id) {
  document.querySelectorAll(".content").forEach(sec => sec.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
    history.replaceState(null, "", `#${id}`); // updates URL hash
    target.scrollIntoView({ behavior: 'smooth' });
  }
}


function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function validatePassword(password) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return pattern.test(password);
}

function signupUser() {
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const message = document.getElementById("signup-message");

  if (!validatePassword(password)) {
    message.innerText = "Password must include uppercase, lowercase, number, symbol, and be at least 8 characters.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(user => user.email === email)) {
    message.innerText = "Email already registered.";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  message.innerText = "Signup successful. Please log in.";
  showForm("login");
}

function loginUser() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const message = document.getElementById("login-message");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    document.getElementById("user-name").innerText = user.name;
    showApp();
  } else {
    message.innerText = "Invalid email or password.";
  }
}

async function generateMealPlan(promptText) {
  const outputElement = document.getElementById("meal-plan-output");
  outputElement.innerText = "Generating your meal plan, please wait...";

  try {
    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: promptText })
    });

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    outputElement.innerText = reply || "Gemini responded, but no content was returned.";

    const macros = extractMacros(reply);
    if (macros) {
      renderMacroChart(macros);
    }

    addPoints(10, "Meal plan generated");
    if (!userStats.badges.includes("first-plan")) {
      userStats.badges.push("first-plan");
      localStorage.setItem("userStats", JSON.stringify(userStats));
    }
  } catch (error) {
    console.error("Backend error:", error);
    outputElement.innerText = "Oops! Failed to generate a meal plan. Please try again.";
  }
}

function generateMealPlanFromUI() {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const pref = document.getElementById("meal-preferences")?.value.trim() || user.prefs || "balanced";
  const age = document.getElementById("age")?.value.trim() || user.age;
  const weight = document.getElementById("weight")?.value.trim() || user.weight;
  const goal = document.getElementById("goal")?.value.trim() || user.goal;
  const outputElement = document.getElementById("meal-plan-output");

  if (!pref || !age || !weight || !goal || isNaN(age) || isNaN(weight) || isNaN(goal)) {
    outputElement.innerText = "⚠️ Please provide valid age, weight, goal, and preferences before generating a plan.";
    return;
  }

  const prompt = `Create a detailed daily meal plan for:
- Diet preference: ${pref}
- Age: ${age}
- Weight: ${weight} kg
- Goal weight: ${goal} kg

Include breakfast, lunch, dinner, snacks, calories, and macronutrient breakdown.`;

  generateMealPlan(prompt);
}



function saveProfile() {
  const age = document.getElementById("age").value.trim();
  const weight = document.getElementById("weight").value.trim();
  const goal = document.getElementById("goal").value.trim();
  const prefs = document.getElementById("profile-preferences").value.trim();
  const reminderEnabled = document.getElementById("enable-reminders").checked;

  if (!age || !weight || !goal || isNaN(age) || isNaN(weight) || isNaN(goal)) {
    alert("❌ Please enter valid numeric values for age, weight, and goal.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    user.age = age;
    user.weight = weight;
    user.goal = goal;
    user.prefs = prefs;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("✅ Profile saved successfully!");

    // Save reminder toggle state
    localStorage.setItem("remindersEnabled", reminderEnabled ? "yes" : "no");

    // Update today's progress
    const today = new Date().toISOString().split("T")[0];
    const currentLog = userStats.weightLogs.find(log => log.date === today);
    
    if (currentLog) {
      currentLog.weight = parseFloat(weight);
    } else {
      userStats.weightLogs.push({ date: today, weight: parseFloat(weight), calories: 0 });
    }

    localStorage.setItem("userStats", JSON.stringify(userStats));
    renderProgressChart();
    updateProgressSummary();
  }
}




function requestApproval() {
  alert("Meal plan sent for approval!");
}

function sendFeedback() {
  alert("Feedback sent to Nutritionist!");
}

function updateProgress() {
  const weightInput = parseFloat(document.getElementById("current-weight").value);
  const caloriesInput = parseInt(document.getElementById("current-calories").value);
  if (!weightInput || !caloriesInput) return alert("Please enter both weight and calories!");

  const today = new Date().toISOString().split("T")[0];
  userStats.weightLogs.push({ date: today, weight: weightInput, calories: caloriesInput });
  localStorage.setItem("userStats", JSON.stringify(userStats));

  addPoints(20, "Progress updated");

  if (!userStats.badges.includes("tracker")) {
    userStats.badges.push("tracker");
    localStorage.setItem("userStats", JSON.stringify(userStats));
  }

  renderProgressChart();
  updateProgressSummary();
}


window.onload = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    // Load profile fields
    if (user.age) document.getElementById("age").value = user.age;
    if (user.weight) document.getElementById("weight").value = user.weight;
    if (user.goal) document.getElementById("goal").value = user.goal;
    if (user.prefs) document.getElementById("profile-preferences").value = user.prefs;
    if (user.weight) document.getElementById("bmi-weight").value = user.weight;

    // Show UI
    document.getElementById("user-name").innerText = user.name;
    showApp();

    // Use URL hash to scroll to a specific section
    const hash = window.location.hash.replace("#", "") || "dashboard";
    scrollToSection(hash);

    // Countdown & dashboard features
    displayCountdown();
    updateStreak();
    showTipOfTheDay();
  } else {
    showForm("signup");
  }

  // Load Challenges
  if (typeof loadChallenges === "function") {
    loadChallenges();
  }

  // Charts and food logs
  renderProgressChart();
  renderFoodLogs();

  // Set reminders if enabled
  if (localStorage.getItem("remindersEnabled") === "yes") {
    setTimeout(() => {
      showHealthTip();
      setInterval(showHealthTip, 86400000); // 24h tip loop
    }, 5000); // First one after 5s
  }

  // Set the checkbox to match reminders state
  const reminderToggle = document.getElementById("enable-reminders");
  if (reminderToggle) {
    reminderToggle.checked = localStorage.getItem("remindersEnabled") === "yes";
  }
};

function updateStreak() {
  const streak = localStorage.getItem("streakDays") || 1;
  const el = document.getElementById("streak-days");
  if (el) el.innerText = streak;
}

function getUserKey(key) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return user ? `${user.email}_${key}` : key;
}


function showTipOfTheDay() {
  const tips = [
    "💧 Stay hydrated – drink 8+ glasses of water.",
    "🥗 Add more greens to your meals today.",
    "🚶‍♂️ Take a 10-minute walk after meals.",
    "🍎 Swap processed snacks for fruit.",
    "⏱️ Stick to your meal times today!"
  ];
  const today = new Date().getDate();
  const tip = tips[today % tips.length];
  const tipElement = document.getElementById("tip-of-the-day");
  if (tipElement) tipElement.innerText = tip;
}




function extractMacros(text) {
  const proteinMatch = text.match(/protein.*?(\d{1,3})\s?g/i);
  const carbsMatch = text.match(/carbs?.*?(\d{1,3})\s?g/i);
  const fatsMatch = text.match(/fat.*?(\d{1,3})\s?g/i);

  if (proteinMatch && carbsMatch && fatsMatch) {
    return {
      protein: parseInt(proteinMatch[1]),
      carbs: parseInt(carbsMatch[1]),
      fats: parseInt(fatsMatch[1])
    };
  }
  return null;
}

function renderMacroChart({ protein, carbs, fats }) {
  const ctx = document.getElementById("nutrition-chart").getContext("2d");
  if (window.macroChart) {
    window.macroChart.destroy();
  }

  window.macroChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Protein", "Carbs", "Fats"],
      datasets: [{
        label: "Macronutrients (g)",
        data: [protein, carbs, fats],
        backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          text: "Macronutrient Breakdown (g)"
        }
      }
    }
  });
}

function renderProgressChart() {
  const ctx = document.getElementById("progress-chart").getContext("2d");
  const logs = userStats.weightLogs || [];

  if (!logs.length) {
    const summaryContainer = document.querySelector(".progress-summary");
    summaryContainer.innerHTML = "<p>📉 No progress data yet. Start logging your weight and calories to track progress!</p>";
    return;
  }

  const dates = logs.map(entry => entry.date);
  const weights = logs.map(entry => entry.weight);
  const calories = logs.map(entry => entry.calories);
  const goal = parseFloat(document.getElementById("goal")?.value) || weights[0];

  if (window.weightChart) window.weightChart.destroy();

  window.weightChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Your Weight (kg)",
          data: weights,
          borderColor: "#4CAF50",
          yAxisID: 'y',
          fill: false,
          tension: 0.3
        },
        {
          label: "Goal Weight",
          data: Array(dates.length).fill(goal),
          borderDash: [5, 5],
          borderColor: "#FF5722",
          yAxisID: 'y',
          fill: false
        },
        {
          label: "Calories (kcal)",
          data: calories,
          borderColor: "#2196F3",
          backgroundColor: "#BBDEFB",
          yAxisID: 'y1',
          fill: false,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Progress: Weight & Calories" }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: { display: true, text: 'Weight (kg)' }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: { display: true, text: 'Calories (kcal)' },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}


let userStats = JSON.parse(localStorage.getItem(getUserKey("userStats"))) || {
  points: 0,
  badges: [],
  weightLogs: []
};


function addPoints(amount, reason) {
  userStats.points += amount;
  localStorage.setItem("userStats", JSON.stringify(userStats));
  console.log(`+${amount} pts for ${reason}`);
}
function averageCaloriesLast7Days() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const logs = userStats.weightLogs.filter(log => new Date(log.date) >= sevenDaysAgo);

  if (!logs.length) return "N/A";
  const avg = logs.reduce((sum, l) => sum + l.calories, 0) / logs.length;
  return `${Math.round(avg)} kcal/day`;
}
function updateProgressSummary() {
  const logs = userStats.weightLogs;
  if (!logs.length) return;

  const start = logs[0].weight;
  const latest = logs[logs.length - 1].weight;
  const goal = parseFloat(document.getElementById("goal")?.value) || start;
  const lost = (start - latest).toFixed(1);
  const avgCalories = averageCaloriesLast7Days();

  const summaryContainer = document.querySelector(".progress-summary");
  if (!summaryContainer) return;

  summaryContainer.innerHTML = `
    <p><strong>Starting Weight:</strong> ${start} kg</p>
    <p><strong>Latest Weight:</strong> ${latest} kg</p>
    <p><strong>Goal Weight:</strong> ${goal} kg</p>
    <p><strong>Total Lost:</strong> ${lost} kg</p>
    <p><strong>Avg Calories (7d):</strong> ${avgCalories}</p>
  `;
}

// Request password reset (simulated token)
function requestPasswordReset() {
  const email = document.getElementById("reset-email").value.trim();
  const message = document.getElementById("reset-request-message");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email);
  if (!user) {
    message.innerText = "No account found with that email.";
    return;
  }

  const token = Math.random().toString(36).substring(2, 10).toUpperCase();
  user.resetToken = token;
  localStorage.setItem("users", JSON.stringify(users));
  message.innerText = `Reset link sent! (Use this token: ${token})`; // Simulate email
}

// Reset password using token
function resetPassword() {
  const token = document.getElementById("reset-token-input").value.trim().toUpperCase();
  const newPassword = document.getElementById("reset-new-password").value;
  const message = document.getElementById("reset-message");

  if (!validatePassword(newPassword)) {
    message.innerText = "Password must include uppercase, lowercase, number, symbol, and be at least 8 characters.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.resetToken === token);

  if (!user) {
    message.innerText = "Invalid or expired token.";
    return;
  }

  user.password = newPassword;
  delete user.resetToken;
  localStorage.setItem("users", JSON.stringify(users));
  message.innerText = "Password reset successful! Please log in.";
  showForm("login");
}

const challenges = [
  { id: 1, title: "Lose 2 kg in 2 Weeks", active: true, capacity: 10, joined: false },
  { id: 2, title: "100,000 Steps in 7 Days", active: true, capacity: 5, joined: false },
  { id: 3, title: "No Sugar for 3 Days", active: true, capacity: 5, joined: false }
];

function loadChallenges() {
  const list = document.getElementById("challenge-list");
  list.innerHTML = "";

  challenges.forEach((c, index) => {
    const buttonText = c.joined ? "Joined ✅" : "Join";
    const disabled = c.joined || !c.active || c.capacity <= 0;

    const item = document.createElement("div");
    item.innerHTML = `
      <h4>${c.title}</h4>
      <button onclick="joinChallenge(${index})" ${disabled ? "disabled" : ""}>${buttonText}</button>
    `;
    list.appendChild(item);
  });
}

function joinChallenge(index) {
  const c = challenges[index];

  if (!c.active || c.capacity <= 0) {
    alert("❌ This challenge is currently full or inactive.");
    return;
  }

  c.joined = true;
  c.capacity -= 1;
  localStorage.setItem("joinedChallenge", JSON.stringify(c));
  alert(`✅ You have joined: ${c.title}`);
  loadChallenges();
}
function toggleReminders() {
  const enabled = document.getElementById("enable-reminders").checked;
  localStorage.setItem("remindersEnabled", enabled ? "yes" : "no");
}
function showHealthTip() {
  const tips = [
    "💧 Stay hydrated! Drink a glass of water now.",
    "🥗 Add greens to your next meal!",
    "🚶‍♂️ Take a quick 5-minute walk.",
    "🧘‍♀️ Stretch your body to reduce stress.",
    "🍎 Snack on fruits instead of junk today."
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];
  const toast = document.getElementById("tip-toast");

  toast.innerText = "💡 " + tip;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 8000); // stays for 8 seconds
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById("bmi-weight").value);
  const heightCm = parseFloat(document.getElementById("bmi-height").value);
  const resultEl = document.getElementById("bmi-result");

  if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
    resultEl.innerHTML = "❌ Please enter valid weight and height.";
    resultEl.style.color = "crimson";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const roundedBMI = bmi.toFixed(1);

  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 24.9) category = "Normal weight";
  else if (bmi < 29.9) category = "Overweight";
  else category = "Obese";

  resultEl.innerHTML = `💡 Your BMI is <strong>${roundedBMI}</strong> (${category})`;
  resultEl.style.color = "#4CAF50";
}

function saveGoalDeadline() {
  const deadlineInput = document.getElementById("goal-deadline").value;
  if (!deadlineInput) {
    alert("❌ Please select a valid date.");
    return;
  }

  const deadline = new Date(deadlineInput);
  localStorage.setItem("goalDeadline", deadline.toISOString());
  alert("✅ Deadline set!");
  displayCountdown();
}

function displayCountdown() {
  const countdownEl = document.getElementById("countdown-display");
  const setterEl = document.getElementById("deadline-setter");

  const stored = localStorage.getItem("goalDeadline");
  if (!stored) {
    countdownEl.innerHTML = "⏳ No deadline set yet. Set one below!";
    setterEl.style.display = "block";
    return;
  }

  const deadline = new Date(stored);
  const now = new Date();
  const diff = deadline - now;

  if (diff <= 0) {
    countdownEl.innerHTML = "🎉 Goal deadline has passed!";
    setterEl.style.display = "block";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);

  countdownEl.innerHTML = `⏱️ ${days}d ${hours}h ${mins}m remaining`;
  setterEl.style.display = "none";

  // Refresh countdown every 30 seconds
  setTimeout(displayCountdown, 30000);
}
function addFoodLog() {
  const name = document.getElementById("food-name").value.trim();
  const calories = parseInt(document.getElementById("food-calories").value);
  const today = new Date().toISOString().split("T")[0];

  if (!name || isNaN(calories) || calories <= 0) {
    alert("❌ Please enter a valid food name and calorie amount.");
    return;
  }

  const allLogs = JSON.parse(localStorage.getItem("foodLogs")) || {};
  if (!allLogs[today]) allLogs[today] = [];

  allLogs[today].push({ name, calories });
  localStorage.setItem("foodLogs", JSON.stringify(allLogs));

  document.getElementById("food-name").value = "";
  document.getElementById("food-calories").value = "";

  renderFoodLogs();
}

function renderFoodLogs() {
  const today = new Date().toISOString().split("T")[0];
  const logList = document.getElementById("calorie-log-list");
  const summary = document.getElementById("calorie-summary");

  const allLogs = JSON.parse(localStorage.getItem("foodLogs")) || {};
  const logs = allLogs[today] || [];

  if (logs.length === 0) {
    logList.innerHTML = "<p>🍽 No food logged yet. Start adding your meals!</p>";
    summary.innerHTML = "";
    return;
  }

  let total = 0;
  logList.innerHTML = "<ul>";
  logs.forEach(entry => {
    total += entry.calories;
    logList.innerHTML += `<li>${entry.name} - ${entry.calories} kcal</li>`;
  });
  logList.innerHTML += "</ul>";

  const goal = 2000; // change this if you allow user-specific targets

  const diff = goal - total;
  let feedback = "";

  if (total < goal) {
    feedback = `🟢 You're under your target by ${diff} kcal. Keep it up!`;
    summary.style.color = "#388e3c";
  } else if (total === goal) {
    feedback = `✅ Perfect! You hit your target exactly.`;
    summary.style.color = "#2e7d32";
  } else {
    feedback = `⚠️ You exceeded your target by ${Math.abs(diff)} kcal. Watch out!`;
    summary.style.color = "#e53935";
  }

  summary.innerHTML = `🔢 Total: ${total} kcal<br>${feedback}`;
}






