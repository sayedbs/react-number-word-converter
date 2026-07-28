
#🧩 Project Name
**React Number Word Converter**

A React utility plugin that converts numeric values into Bangla (Bengali) words, e.g.:

10005 → "দশ হাজার পাঁচ"

123456 -> " এক লাখ তেইশ হাজার চার শো ছাপ্পান্ন "

---

## 🎯 Purpose
This AI agent assists with:
- Improving, debugging, and optimizing number-to-Bangla word conversion logic.
- Extending functionality (e.g., Bangla numerals, fractions, formatting).
- Maintaining React component code.
- Preparing and publishing this library to **npm**.

---

## ⚙️ Core Functions
1. **Convert Numbers → Bangla Words**
   - Follow Indian numeric grouping: thousand, lakh, crore.
   - Example:  
     - `100 → "এক শত"`  
     - `12000 → "বারো হাজার"`  
     - `10005 → "দশ হাজার পাঁচ"`
2. **Optional Extensions**
   - Support Bangla digits (`০১২৩৪৫৬৭৮৯`)
   - Decimal support (e.g. `10.5 → "দশ দশমিক পাঁচ"`)
   - TypeScript definitions
   - Unit tests (Jest)
   - Demo playground (React app)

---

## 🧠 AI Agent Guidelines
When acting as the AI for this project:

1. **Coding Rules**
   - Write clean, well-commented, production-ready code.
   - Use ES modules (`import/export`).
   - Follow React best practices and functional components.
   - Prefer pure functions over complex classes.
   - Use Tailwind for styling (if UI needed).
   - Always output complete files — not snippets only.

2. **Documentation**
   - All major files (JS, TS, React, etc.) should include short doc-comments.
   - Auto-generate or update README sections when APIs change.
   - Use Markdown syntax for documentation updates.

3. **Testing**
   - When asked, generate Jest test files.
   - Focus on input → expected output examples.

4. **Publishing**
   - Prepare scripts for `npm publish`.
   - Generate correct `package.json`, `README.md`, and TypeScript types if requested.

---

## 🧰 Example Commands

### 💬 Command 1 — Extend Logic
> “Add support for Bangla digits (০-৯) in both input and output.”

### 💬 Command 2 — Create Demo
> “Generate a small React demo app that shows input box + Bangla word output in real time.”

### 💬 Command 3 — Optimize
> “Refactor the converter function for performance and readability.”

### 💬 Command 4 — Test
> “Generate Jest test cases for `numberToBanglaWords()` including edge cases.”

### 💬 Command 5 — Publish Setup
> “Create npm-ready folder with `package.json`, README.md, and build configuration using Rollup.”

---

## 📁 Suggested File Structure
react-bangla-number/
├── src/
│ ├── numberToBanglaWords.js
│ ├── BanglaNumber.jsx
│ └── index.js
├── tests/
│ └── numberToBanglaWords.test.js
├── package.json
├── README.md
└── AI_INSTRUCTIONS.md ← (this file)



---

## 🧭 AI Tone and Behavior
- Be concise, factual, and helpful.
- Explain code changes clearly.
- When unsure, suggest multiple approaches.
- Use clear Bengali examples when illustrating conversions.

---

## 🧩 End of File
> This markdown defines the AI agent’s development scope and behavioral rules for the **React Number Word Converter** project.
> Any new command or request will follow these principles automatically.


