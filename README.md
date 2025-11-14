# 🕵️‍♂️ Phishing & Packet Analysis Training Platform
🕵️‍♂️
📌 Overview

The Phishing & Packet Analysis Training Platform is an interactive cybersecurity training environment designed to help users analyze phishing attacks and inspect network packets safely.
It simulates real-world phishing scenarios and network captures, enabling learners to detect, dissect, and understand malicious behaviors — all within a controlled and ethical sandbox.

DEMO WEBPAGE : https://phishing-packet-analysis-training-p-dusky.vercel.app/

🚀 Features

🧠 Interactive Training Labs: Realistic phishing and network traffic scenarios for hands-on learning.

📨 Phishing Simulation: Analyze sample phishing emails, attachments, and fake login pages.

📡 Packet Capture Analysis: Study .pcap files using built-in tools or Wireshark integration.

🔍 IOC Detection: Identify Indicators of Compromise such as malicious domains, IPs, and payloads.

🧾 Report & Scoring System: Submit analysis results and receive instant automated feedback.

💾 Lab Storage & History: Save progress, completed labs, and analysis reports.

👩‍🏫 Instructor Tools: Create and manage new labs, upload PCAPs, and evaluate student performance.

🔐 Secure & Isolated: All activities are sandboxed and strictly for educational use only.

🧩 Tech Stack

Frontend: HTML, CSS, JavaScript (React / TailwindCSS)

Backend: Python (Flask / FastAPI) or Node.js (Express)

Database: SQLite / PostgreSQL / MySQL

Networking Tools: Wireshark / Tshark / Scapy

Deployment: Docker & Docker Compose

⚙️ Key Modules
Module	Description
📨 Phishing Analyzer	Analyze email headers, links, and attachments for phishing indicators
📡 Packet Inspector	Visualize and interpret captured network traffic
🧰 IOC Extractor	Extract IPs, URLs, hashes, and domains automatically
🧾 Report Generator	Create detailed reports on findings
👩‍💻 Admin Panel	Manage users, upload labs, and review submissions
🧱 Installation
1️⃣ Clone the repository
git clone https://github.com/<your-username>/phishing-packet-training.git
cd phishing-packet-training

2️⃣ Set up environment
cp .env.example .env

3️⃣ Run using Docker (recommended)
docker compose up --build


Open your browser at http://localhost:3000

🧪 Usage

Login to the platform (or register as a new user).

Choose a Phishing or Packet Analysis lab from the dashboard.

Open .eml or .pcap files provided.

Identify suspicious patterns (domains, payloads, credentials).

Submit your analysis report in the “Submit Findings” section.

View your score and instructor feedback.

🧰 Example Labs
Lab	Description	Difficulty
🧑‍💻 Phishing Email - Credential Theft	Analyze a fake login page hidden in an email	🟢 Beginner
🧩 Packet Capture - Malware Beaconing	Identify C2 traffic in a network capture	🟡 Intermediate
🕸 DNS Tunneling Detection	Analyze data exfiltration via DNS requests	🔴 Advanced
🧑‍🏫 For Instructors

Add new labs in /labs/phishing/ or /labs/packet-analysis/.

Each lab folder must include:

README.md (instructions)

pcap.pcap (traffic capture)

sample_email.eml (if applicable)

meta.json (metadata)

Use the web UI or API to import new labs:

curl -X POST http://localhost:8000/api/labs/import -F "path=./labs/phishing/lab-01"

🧩 Contributing

Fork the repository

Create your feature branch:

git checkout -b feature/add-new-lab


Commit changes:

git commit -m "Added new phishing lab"


Push to the branch:

git push origin feature/add-new-lab


Open a Pull Request 🚀

⚠️ Disclaimer

This project is intended strictly for educational and defensive cybersecurity training.
Do not use phishing materials, scripts, or packet captures from this platform in real-world environments.
Always operate in isolated, offline lab environments.

📜 License

Licensed under the MIT License — see LICENSE
 for details.

📞 Contact

👤 Maintainer: rayenchu shravan kumar
🌐 GitHub: github.com/

