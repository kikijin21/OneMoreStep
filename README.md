# Project Name:OneMoreStep

## Project Overview:
OneMoreStep is an indoor navigation solution based on NFC technology and software applications designed to help business users serve the visually impaired and solve the “last step” of indoor navigation. Our system enhances the safety and independence of the visually impaired by providing route planning, location guidance, and voice announcements through NFC tags, voice buttons, and interactive web presentations.

---

## Functions
- **NFC Scanning**: Records the user's location via NFC tag.
- **Path planning function**: generates the shortest path and dynamically draws a map based on the user's starting point and destination.
- **Voice broadcasting function**: Provide users with real-time direction guidance and travel distance description.
- **Interactive demo**: Demonstrate the core functions of the project through webpage animation to simulate the actual use of the scene.

---

## System Requirements
- Python 3.9 or higher.
- Flask 2.0 or higher.
- Browser (the latest version of Chrome or Firefox is recommended)

## Installation Steps
1. **Clone the project code**:
   Run the following command to clone the repository:
   ```bash
   git clone https://github.com/your-repository/cs50_final_project.git
2. **Go to the project directory**:
   ```bash
   cd cs50_final_project
   ```
3. **Install dependencies**:
   Make sure Python and pip are installed. Run:
   ```bash
   pip install -r requirements.txt
   ```
4. **Initialize the database**:
   Open a Python shell and execute:
   ```python
   from app import db
   db.create_all()
   exit()
   ```
5. **Run the project**:
   Start the Flask application:
   ```bash
   python app.py
   ```
6. **Access the project**:
   Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

---

## Usage
### User registration and login:
-Select “Sign Up” in the navigation bar to register a new account.
-Login to the system with the registered username and password.
### Function Demo:
-Select “Solution” on the homepage to enter the interactive demo page.
-Click “Plan Route” to start route planning after setting the start and end points.
-Follow the route prompts, watch the map update and listen to the voice announcement.

---

## Video Presentation
Watch the project presentation on YouTube:
[OneMoreStep Video Presentation](https://youtu.be/ExAUGvoHFJ0)

---

## Frequently Asked Questions (FAQ)
### Q1: What should I do if the page is blank while the project is running?
-Ensure that the Flask service has been started correctly and check your terminal for error output.
-Clear your browser cache and try again.
### Q2: What should I do if the voice broadcasting function does not work properly?
-Make sure the browser you are using supports the Web Speech API (Chrome is recommended).

---

## Author Information
**Name**: Yunqi Jin
**Email**: [yjin1@fas.harvard.edu] / [yunqi_jin@brown.edu]
**Institution**: Brown University & Harvard University (Cross-registered)
**Course**: CS50
