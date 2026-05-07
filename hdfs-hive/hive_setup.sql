-- Hive DDL for Traffic Analytics

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS traffic_analytics;
USE traffic_analytics;

-- 2. Create External Table for HDFS data
-- Assuming data is stored as CSV or Parquet in HDFS
CREATE EXTERNAL TABLE IF NOT EXISTS traffic_raw (
    vehicle_id STRING,
    area STRING,
    vehicle_type STRING,
    speed INT,
    timestamp STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/user/hadoop/traffic_data/';

-- 3. Sample Analytical Queries for Viva

-- A. Average Speed by Area
SELECT area, AVG(speed) as avg_speed 
FROM traffic_raw 
GROUP BY area;

-- B. Count vehicles by Type
SELECT vehicle_type, COUNT(*) as total 
FROM traffic_raw 
GROUP BY vehicle_type;

-- C. Find peak traffic hours (extracting hour from timestamp)
-- Assuming timestamp format like '2026-05-07T10:30:00'
SELECT SUBSTR(timestamp, 12, 2) as hour, COUNT(*) as count 
FROM traffic_raw 
GROUP BY SUBSTR(timestamp, 12, 2)
ORDER BY count DESC;
