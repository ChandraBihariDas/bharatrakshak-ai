# 🇮🇳 BharatRakshak AI

> Predict. Alert. Rescue.

An AI-powered disaster early warning, emergency response, and rescue coordination platform designed for India.

BharatRakshak AI helps citizens, rescue teams, and government authorities prepare for, respond to, and recover from disasters such as floods, cyclones, landslides, heatwaves, and earthquakes through real-time monitoring, intelligent alerts, and AI-assisted decision-making.

---

## 🚀 Vision

India faces recurring natural disasters that affect millions of people every year.

BharatRakshak AI aims to provide a unified disaster management platform that can:

- Predict disaster risks before they escalate
- Alert vulnerable communities in real time
- Coordinate rescue operations efficiently
- Assist authorities with actionable intelligence
- Improve situational awareness during emergencies

---

## ✨ Core Features

### 🌊 Disaster Risk Prediction
Predict potential disaster events using environmental and historical data.

- Flood Risk Prediction
- Cyclone Monitoring
- Heatwave Detection
- Landslide Risk Assessment

---

### 🚨 Emergency SOS System

Citizens can quickly submit emergency requests.

Features:

- GPS-enabled SOS reporting
- Priority-based rescue queue
- Emergency contact support
- Real-time request tracking

---

### 🛰️ Damage Detection

AI-assisted image analysis for disaster assessment.

Capabilities:

- Building damage detection
- Infrastructure assessment
- Severity classification
- Rapid response recommendations

---

### 🗺️ Disaster Command Dashboard

A unified operational dashboard for authorities and rescue teams.

Features:

- Live disaster map
- Active alerts
- Resource monitoring
- Rescue coordination
- Incident tracking

---

### 🌐 Multilingual Alert System

Generate alerts in multiple Indian languages.

Supports:

- Hindi
- English
- Bengali
- Tamil
- Telugu
- Marathi
- Kannada
- More languages coming soon

---

## 🏗️ System Architecture

```text
Frontend (Next.js)
        │
        ▼
Backend API (Express.js)
        │
        ▼
AI Services (FastAPI)
        │
 ┌──────┴──────┐
 ▼             ▼
YOLOv8      XGBoost
Damage      Prediction
Detection   Models
        │
        ▼
MongoDB Atlas
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons

### Backend

- Express.js
- Node.js
- JWT Authentication

### AI Services

- FastAPI
- Python
- YOLOv8
- XGBoost
- Scikit-learn

### Database

- MongoDB Atlas

### Deployment

- Vercel (Frontend)
- Render / Railway (Backend)
- FastAPI AI Service
- MongoDB Atlas

---

## 📂 Project Structure

```text
bharatrakshak-ai/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
│
├── ai-service/
│   ├── models/
│   ├── routes/
│   └── app.py
│
└── docs/
```

---

## 👥 User Roles

### Citizen

- Receive alerts
- Submit SOS requests
- Track emergency reports

### Responder

- Manage rescue missions
- View assigned incidents
- Update field operations

### Authority

- Monitor disasters
- Issue alerts
- Allocate resources
- Coordinate emergency response

---

## 🎯 Current Progress

```text
Frontend Setup         ██████████ 100%
Landing Page           ████████░░ 80%
Dashboard UI           ░░░░░░░░░░ 0%
SOS Module             ░░░░░░░░░░ 0%
Prediction Module      ░░░░░░░░░░ 0%
Damage Detection UI    ░░░░░░░░░░ 0%
Backend                ░░░░░░░░░░ 0%
FastAPI                ░░░░░░░░░░ 0%
AI Models              ░░░░░░░░░░ 0%
```

---

## 🎬 Planned Modules

- [ ] Disaster Prediction Engine
- [ ] SOS Management System
- [ ] Damage Detection AI
- [ ] Rescue Coordination Dashboard
- [ ] Role-Based Authentication
- [ ] Live India Disaster Map
- [ ] Multilingual Alerts
- [ ] Resource Allocation Engine

---

## 🏆 Hackathon Goal

Build a scalable disaster intelligence platform capable of assisting:

- Citizens
- Emergency Responders
- Government Authorities

during disaster preparedness, response, and recovery operations.

---

## 📜 License

MIT License

---

## ❤️ Built For India

**BharatRakshak AI**  
*Predict. Alert. Rescue.*
