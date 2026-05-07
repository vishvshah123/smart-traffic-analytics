# Viva Preparation - Smart Traffic Analytics System

This document contains essential questions and answers for the project viva.

## Apache Kafka
**Q1: What is Apache Kafka and why is it used in this project?**
**A:** Kafka is a distributed event streaming platform. In this project, it acts as a buffer/broker between the traffic simulator (producer) and the Spark processing engine (consumer). It ensures data is not lost if the consumer is slow or down.

**Q2: What are Producers and Consumers?**
**A:** Producers are applications that send data to Kafka topics (our Python simulator). Consumers are applications that read data from these topics (our Spark Streaming job).

**Q3: What is a Topic in Kafka?**
**A:** A topic is a category or feed name to which records are published. We use `traffic_data` as our topic.

---

## Apache Spark / PySpark
**Q1: What is Spark Streaming?**
**A:** Spark Streaming is an extension of the core Spark API that enables scalable, high-throughput, fault-tolerant stream processing of live data streams.

**Q2: What is a DStream vs. Structured Streaming?**
**A:** DStream (Discretized Stream) is the older RDD-based API. We used **Structured Streaming**, which is built on the Spark SQL engine and treats the stream as an unbounded table.

**Q3: How do you handle congestion detection in Spark?**
**A:** We use a simple transformation logic: if the `speed` attribute in the incoming JSON is less than 20 km/h, we flag the record as `is_congestion = True`.

---

## MongoDB
**Q1: Why use MongoDB instead of MySQL for this project?**
**A:** MongoDB is a NoSQL database that stores data in JSON-like documents. Since traffic data can be semi-structured and we need high write speeds for real-time data, MongoDB is more suitable than traditional RDBMS.

**Q2: How does the backend communicate with MongoDB?**
**A:** We use the `mongoose` library in Node.js to define schemas and perform CRUD operations.

---

## Hadoop & HDFS
**Q1: What is HDFS?**
**A:** Hadoop Distributed File System (HDFS) is a distributed file system designed to run on commodity hardware. It provides high-throughput access to application data.

**Q2: How is HDFS used in this project?**
**A:** While MongoDB stores real-time metrics, HDFS is used for long-term "Cold Storage" of raw traffic records for historical batch analysis using Hive.

---

## System Architecture
**Q1: Explain the data flow in your project.**
**A:** 
1. **Simulator** generates JSON data.
2. **Kafka Producer** pushes it to a topic.
3. **PySpark** subscribes to the topic, processes the data, and detects congestion.
4. **Processed data** is saved in **MongoDB** (for real-time) and **HDFS** (for batch).
5. **Node.js API** fetches data from MongoDB.
6. **React Dashboard** visualizes the data using charts.
