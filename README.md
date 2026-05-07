# 🥗 NutriQuest – Gamified Nutrition Tracker

A comprehensive, interactive nutrition management application that gamifies the process of tracking health metrics, meal planning, and fitness goals. Built with vanilla JavaScript, HTML, and CSS for a seamless user experience.

---

## 🎯 Overview

**NutriQuest** is a web-based nutrition and fitness tracking platform that combines practical health management with engaging gamification elements. Users can track their calories, manage meal plans, monitor progress, and unlock achievements through daily health challenges.

### Key Features:
- 🔐 **User Authentication** – Secure sign-up, login, and password reset functionality
- 🍽️ **AI-Powered Meal Plans** – Generate personalized meal plans based on dietary preferences
- 📊 **Progress Tracking** – Visual charts tracking weight and calorie intake
- 🎮 **Gamification** – Earn points and badges for consistent health habits
- 🏥 **BMI Calculator** – Calculate and categorize body mass index
- 💪 **Challenges** – Join community challenges for motivation
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile devices
- 🎯 **Goal Deadline Countdown** – Track time remaining to reach your fitness goals
- 💬 **Nutritionist Feedback** – Send messages to nutritionists for guidance

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [File Structure](#-file-structure)
- [API Integration](#-api-integration)
- [Authentication](#-authentication)
- [Gamification System](#-gamification-system)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Data Storage** | Browser LocalStorage |
| **Charts** | Chart.js Library |
| **APIs** | Gemini AI (Optional for meal plans) |
| **Styling** | CSS Grid, Flexbox |

### Language Composition:
- JavaScript: **52.6%**
- HTML: **24.6%**
- CSS: **22.8%**

---

## ✨ Features

### 1. **Authentication System**
- User registration with strong password validation
- Secure login/logout functionality
- Password reset with token-based verification
- Email validation

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)

### 2. **Dashboard**
- Welcome message with personalized greeting
- Quick overview of daily calorie targets
- Macronutrient breakdown (Carbs, Fats, Protein)
- Goal weight display
- Streak counter with daily motivation
- Health tip of the day
- Quick access buttons to main features

### 3. **Profile Management**
- Update personal information (age, weight, goal weight)
- Set dietary preferences (vegetarian, vegan, low-carb, etc.)
- Enable/disable daily health reminders
- Auto-save functionality with localStorage

### 4. **Meal Planning**
- AI-generated meal plans based on:
  - Dietary preferences
  - Current weight
  - Goal weight
  - Age
- Macronutrient visualization with pie charts
- Request nutritionist approval
- Earn 10 points per generated meal plan

### 5. **Calorie Tracker**
- Log individual food items with calories
- Daily calorie summary
- Visual feedback (under/over target)
- Target calorie goal: 2000 kcal (customizable)
- Food log persistence across sessions

### 6. **Progress Tracking**
- Dual-axis chart displaying:
  - Weight changes over time
  - Goal weight line reference
  - Calorie intake trends
- Progress summary with key metrics:
  - Starting weight
  - Current weight
  - Total weight lost
  - 7-day average calories
- Historical data storage

### 7. **BMI Calculator**
- Calculate BMI based on weight (kg) and height (cm)
- Automatic categorization:
  - Underweight (BMI < 18.5)
  - Normal weight (18.5 - 24.9)
  - Overweight (25 - 29.9)
  - Obese (> 30)

### 8. **Challenge System**
- Pre-loaded community challenges:
  - "Lose 2 kg in 2 Weeks"
  - "100,000 Steps in 7 Days"
  - "No Sugar for 3 Days"
- Limited capacity per challenge
- Join/track challenge participation
- Earn badges upon completion

### 9. **Rewards & Gamification**
- Point system for activities:
  - 10 points: Generate meal plan
  - 20 points: Update progress
  - Additional badges for streaks and milestones
- Visible badges on rewards page
- Progress bar visualization
- Unlockable achievements

### 10. **Goal Deadline Tracking**
- Set custom deadline for fitness goals
- Real-time countdown display (days, hours, minutes)
- Motivational messaging
- Refresh every 30 seconds

### 11. **Health Reminders**
- Customizable daily health tips
- Toast notifications (8-second display)
- Randomized tips from database
- 24-hour reminder cycle

---

## 💻 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required (runs on client-side)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/omartamerr/Nutrition-Software-.git
   cd Nutrition-Software-
   ```

2. **Open in Browser**
   - Simply open `Main.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # or
     npx http-server
     ```

3. **Access the Application**
   - Navigate to `http://localhost:8000/Main.html`

---

## 🚀 Usage

### Getting Started

1. **Create Account**
   - Click "Sign Up"
   - Enter full name, email, and strong password
   - Submit to register

2. **Log In**
   - Enter registered email and password
   - Click "Log In"

3. **Update Profile**
   - Navigate to "Profile"
   - Enter age, current weight, goal weight, and dietary preferences
   - Enable daily health tips if desired
   - Click "Save Changes"

### Daily Workflow

1. **Track Meals**
   - Go to "Calorie Tracker"
   - Enter food name and calories
   - Click "Add"
   - View daily summary

2. **Generate Meal Plan**
   - Navigate to "Meal Plans"
   - Enter dietary preferences
   - Click "Generate Meal Plan"
   - View AI-generated plan with nutrition chart

3. **Log Progress**
   - Go to "Progress"
   - Enter today's weight and total calories
   - Click "Update"
   - View progress chart

4. **Calculate BMI**
   - Navigate to "BMI"
   - Enter weight and height
   - Click "Calculate BMI"
   - View category and recommendations

5. **View Rewards**
   - Click "Rewards" in navigation
   - See accumulated points and unlocked badges

---

## 📁 File Structure

```
Nutrition-Software-/
├── Main.html              # Main application page
├── rewards.html           # Rewards and badges page
├── script.js              # Core application logic (21.4 KB)
├── styles.css             # Complete styling (9.9 KB)
├── main.cpp               # Backend placeholder (empty)
├── Backend/               # Backend directory (empty)
└── README.md              # Documentation (this file)
```

### File Descriptions

| File | Purpose | Size |
|------|---------|------|
| `Main.html` | Primary HTML structure, forms, and dashboard | 8.7 KB |
| `rewards.html` | Dedicated rewards page for badges and achievements | 1.9 KB |
| `script.js` | All JavaScript logic for app functionality | 21.4 KB |
| `styles.css` | Responsive CSS styling and themes | 9.9 KB |

---

## 🔌 API Integration

### Gemini AI Integration (Optional)

The app supports AI-powered meal plan generation via Gemini API:

```javascript
// Endpoint: http://localhost:3000/generate
// Method: POST
// Payload: { prompt: "meal plan details" }
```

**Setup Instructions:**
1. Create Backend server with Gemini API integration
2. Deploy on `localhost:3000`
3. Configure CORS headers
4. Pass API key securely

---

## 🔐 Authentication

### LocalStorage Schema

```javascript
// Users Database
{
  "users": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "SecurePass123!",
      "resetToken": "ABC12345"  // For password recovery
    }
  ],
  
  // Current Session
  "loggedInUser": {
    "name": "John Doe",
    "email": "john@example.com",
    "age": "28",
    "weight": "75",
    "goal": "70",
    "prefs": "balanced"
  },
  
  // User Statistics
  "userStats": {
    "points": 150,
    "badges": ["first-plan", "tracker"],
    "weightLogs": [
      { "date": "2026-05-07", "weight": 75, "calories": 1800 }
    ]
  },
  
  // Food Logs (by date)
  "foodLogs": {
    "2026-05-07": [
      { "name": "Apple", "calories": 95 }
    ]
  }
}
```

---

## 🎮 Gamification System

### Point Structure

| Action | Points |
|--------|--------|
| Generate meal plan | 10 |
| Update progress | 20 |
| Join challenge | 5 |
| Maintain streak | Variable |

### Badge System

| Badge | Requirement |
|-------|-------------|
| first-plan | Generate first meal plan |
| tracker | Update progress once |
| (Future) | Challenge completions |

---

## 🎨 Design Features

### Color Scheme
- **Primary Green**: `#4CAF50` (Health, growth)
- **Dark Green**: `#2e7d32` (Accent, emphasis)
- **Light Green**: `#e8f5e9` (Background)
- **Danger Red**: `#f44336` (Warnings)
- **Orange**: `#f57c00` (Streaks, highlights)

### Responsive Breakpoints
- **Desktop**: Full layout
- **Tablet (≤768px)**: Single column, adjusted spacing
- **Mobile (≤600px)**: Compact grid, smaller font sizes

---

## 🔮 Future Enhancements

- [ ] Backend API integration with database persistence
- [ ] User profile photos and avatars
- [ ] Social sharing of achievements
- [ ] Integration with fitness trackers (Fitbit, Apple Health)
- [ ] Advanced analytics and reports
- [ ] Prescription diet templates
- [ ] Nutritionist messaging and consultation scheduling
- [ ] Mobile app (React Native/Flutter)
- [ ] Export data to PDF
- [ ] Machine learning meal recommendations
- [ ] Social leaderboards for challenges
- [ ] Integration with recipe APIs

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Omar Tamer** - [GitHub Profile](https://github.com/omartamerr)

---

## 📧 Support & Contact

For questions, bug reports, or feature requests:
- Open an [GitHub Issue](https://github.com/omartamerr/Nutrition-Software-/issues)
- Contact the maintainer via GitHub

---

## 🏆 Acknowledgments

- Chart.js for beautiful data visualization
- Gemini API for AI-powered meal planning
- Community for feedback and support

---

## ⚠️ Disclaimer

This application is for personal health tracking only and should not replace professional medical or nutritional advice. Consult with healthcare professionals before making significant dietary changes.

---

**Last Updated:** May 7, 2026  
**Version:** 1.0.0

---

### Quick Links
- 🌐 [Live Demo](#) (Coming soon)
- 📖 [User Guide](#-usage)
- 🐛 [Report Issues](https://github.com/omartamerr/Nutrition-Software-/issues)
- ⭐ [Star this repo](https://github.com/omartamerr/Nutrition-Software-)
