# Smart Traffic Analytics System 🚦

A real-time Big Data project for monitoring urban traffic, detecting congestion, and visualizing live analytics using the Kafka-Spark-MongoDB stack.

## 🌟 Project Overview
This project simulates real-time vehicle traffic data from multiple city areas, streams it through **Apache Kafka**, processes it using **PySpark Structured Streaming**, and stores the results in **MongoDB**. A modern **React** dashboard provides live visualizations and congestion alerts.

### Key Features
- **Real-Time Data Ingestion**: High-throughput streaming using Kafka.
- **Live Processing**: PySpark logic for speed analysis and congestion detection.
- **Dynamic Dashboard**: Real-time charts (Area, Bar, Table) using Recharts.
- **Scalable Storage**: MongoDB for serving layer and HDFS for archival.
- **Batch Analytics**: Hive integration for historical trend analysis.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Recharts, Lucide React.
- **Backend**: Node.js, Express.js, Mongoose.
- **Big Data**: Apache Kafka, Apache Spark (PySpark), Hadoop HDFS, Apache Hive.
- **Database**: MongoDB.
- **Language**: JavaScript, Python, SQL.

---

## 📁 Folder Structure
```text
smart-traffic-analytics/
├── frontend/             # React dashboard
├── backend/              # Node.js REST API
├── kafka-stream/         # Python Traffic Simulator (Producer)
├── spark-jobs/           # PySpark Streaming (Processor)
├── database-scripts/     # MongoDB schemas & configurations
├── hdfs-hive/            # Hive DDLs & HDFS commands
├── docs/                 # Architecture, Setup & Viva Prep
└── datasets/             # Sample datasets for batch testing
```

---

## 🚀 Getting Started
Please refer to the [Setup Guide](./docs/setup_guide.md) for detailed instructions on running each component.

---

## 📊 Dashboard Preview
- **Vehicle Count**: Total traffic volume across the city.
- **Area-wise Distribution**: Comparison of traffic density between areas.
- **Speed Trends**: Line/Area chart showing average speed patterns.
- **Critical Alerts**: Real-time notifications for congestion zones (Speed < 20 km/h).

---

## 📝 Resume Points (ATS Friendly)
- Developed a **Real-Time Big Data Pipeline** using **Apache Kafka** and **PySpark** to process 1000+ traffic records per minute.
- Implemented **Structured Streaming** logic for live congestion detection, reducing notification latency by 80%.
- Designed a **High-Performance Dashboard** with **React** and **Recharts**, visualizing multi-dimensional traffic metrics.
- Integrated a **Polyglot Persistence Layer** using **MongoDB** for real-time serving and **HDFS/Hive** for historical batch analytics.

---

## 🎓 Viva Prep
Check out the [Viva Q&A](./docs/viva_qna.md) for commonly asked questions on Kafka, Spark, and Big Data concepts.

---

**Developed for College Mini Project - Big Data Analytics Subject.**
