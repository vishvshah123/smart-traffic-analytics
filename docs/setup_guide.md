# Setup & Execution Guide

Follow these steps to run the Smart Traffic Analytics System.

## Prerequisites
1. **Node.js** (for Backend & Frontend)
2. **Python 3.8+** (for Kafka Producer & Spark)
3. **MongoDB** (running locally on port 27017)
4. **Apache Kafka** (Zookeeper & Kafka Server)
5. **Apache Spark** (with PySpark)

---

## Step 1: Backend Setup
1. Open a terminal in `backend/`
2. Run `npm install`
3. Start the server: `npm run start` or `node server.js`
4. Verify: `http://localhost:5000/api/traffic`

## Step 2: Kafka Setup
1. Start Zookeeper:
   ```bash
   zookeeper-server-start.sh config/zookeeper.properties
   ```
2. Start Kafka Server:
   ```bash
   kafka-server-start.sh config/server.properties
   ```
3. Create the topic:
   ```bash
   kafka-topics.sh --create --topic traffic_data --bootstrap-server localhost:9092
   ```

## Step 3: Run Traffic Simulator (Producer)
1. Open a terminal in `kafka-stream/`
2. Install dependencies: `pip install kafka-python`
3. Run the producer: `python producer.py`

## Step 4: Run Spark Streaming (Processor)
1. Open a terminal in `spark-jobs/`
2. Install dependencies: `pip install pyspark pymongo`
3. Run the spark job:
   ```bash
   spark-submit --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0 traffic_processor.py
   ```

## Step 5: Frontend Setup
1. Open a terminal in `frontend/`
2. Run `npm install`
3. Start the dashboard: `npm run dev`
4. Open `http://localhost:5173` in your browser.

---

## Hadoop & Hive Commands (For Viva/Lab)
1. Upload data to HDFS:
   ```bash
   hdfs dfs -mkdir -p /user/hadoop/traffic_data
   hdfs dfs -put traffic_sample.csv /user/hadoop/traffic_data/
   ```
2. Run Hive Shell:
   ```bash
   hive -f hive_setup.sql
   ```
