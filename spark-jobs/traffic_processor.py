import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, when
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, TimestampType
from pymongo import MongoClient

# Configuration
KAFKA_TOPIC = 'traffic_data'
KAFKA_SERVER = 'localhost:9092'
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "traffic_db"
COLLECTION_NAME = "traffics"

# Define Schema for incoming Kafka JSON
traffic_schema = StructType([
    StructField("vehicle_id", StringType(), True),
    StructField("area", StringType(), True),
    StructField("vehicle_type", StringType(), True),
    StructField("speed", IntegerType(), True),
    StructField("timestamp", StringType(), True)
])

# Initialize MongoDB Client
mongo_client = MongoClient(MONGO_URI)
db = mongo_client[DB_NAME]
collection = db[COLLECTION_NAME]

def save_to_mongodb(df, batch_id):
    """
    Function to save Spark DataFrame batch to MongoDB
    """
    # Convert batch to list of dicts
    records = df.toJSON().map(lambda j: json.loads(j)).collect()
    if records:
        collection.insert_many(records)
        print(f"✅ Batch {batch_id}: Inserted {len(records)} records into MongoDB.")

def process_stream():
    # Initialize Spark Session with Kafka support
    # Note: spark-sql-kafka-0-10_2.12 package is required
    spark = SparkSession.builder \
        .appName("SmartTrafficAnalytics") \
        .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("ERROR")

    # Read from Kafka
    raw_df = spark.readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", KAFKA_SERVER) \
        .option("subscribe", KAFKA_TOPIC) \
        .option("startingOffsets", "latest") \
        .load()

    # Parse JSON data
    traffic_df = raw_df.selectExpr("CAST(value AS STRING)") \
        .select(from_json(col("value"), traffic_schema).alias("data")) \
        .select("data.*")

    # Transformation: Add Congestion Flag (Logic: Speed < 20 km/h)
    processed_df = traffic_df.withColumn(
        "is_congestion", 
        when(col("speed") < 20, True).otherwise(False)
    )

    # Output to Console (for debugging)
    query_console = processed_df.writeStream \
        .outputMode("append") \
        .format("console") \
        .start()

    # Output to MongoDB using foreachBatch
    import json # Import inside for serialization
    
    def write_mongo(batch_df, batch_id):
        # Using foreachBatch for flexibility
        if not batch_df.isEmpty():
            # Convert to Pandas then to dict is often easiest for small/medium batches
            data_list = [row.asDict() for row in batch_df.collect()]
            collection.insert_many(data_list)
            print(f"✅ Batch {batch_id}: Processed and saved {len(data_list)} records.")

    query_mongo = processed_df.writeStream \
        .foreachBatch(write_mongo) \
        .start()

    query_console.awaitTermination()
    query_mongo.awaitTermination()

if __name__ == "__main__":
    print("🚀 Starting PySpark Streaming Engine...")
    process_stream()
