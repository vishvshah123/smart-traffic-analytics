import json
import time
import random
from datetime import datetime
from kafka import KafkaProducer

# Configuration
KAFKA_TOPIC = 'traffic_data'
KAFKA_SERVER = 'localhost:9092'

# Initialize Kafka Producer
try:
    producer = KafkaProducer(
        bootstrap_servers=[KAFKA_SERVER],
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    print(f"✅ Connected to Kafka at {KAFKA_SERVER}")
except Exception as e:
    print(f"❌ Kafka Connection Error: {e}")
    print("Tip: Make sure Zookeeper and Kafka server are running.")
    exit(1)

# Areas in Mumbai for simulation
AREAS = ["Andheri", "Bandra", "Dadar", "Borivali", "Colaba", "Kurla", "Vashi", "Thane"]
VEHICLE_TYPES = ["Car", "Bike", "Truck", "Bus", "Auto-Rickshaw"]

def generate_traffic_data():
    vehicle_id = f"V{random.randint(100, 999)}"
    area = random.choice(AREAS)
    vehicle_type = random.choice(VEHICLE_TYPES)
    
    # Simulate realistic speeds (km/h)
    # Most traffic is between 20 and 60, but some areas might be congested (< 20)
    speed = random.randint(5, 80)
    
    timestamp = datetime.now().isoformat()
    
    return {
        "vehicle_id": vehicle_id,
        "area": area,
        "vehicle_type": vehicle_type,
        "speed": speed,
        "timestamp": timestamp
    }

if __name__ == "__main__":
    print(f"🚀 Starting Traffic Simulator. Sending data to topic: {KAFKA_TOPIC}...")
    try:
        while True:
            data = generate_traffic_data()
            producer.send(KAFKA_TOPIC, data)
            print(f"Sent: {data}")
            
            # Send data every 1-3 seconds
            time.sleep(random.uniform(1, 3))
    except KeyboardInterrupt:
        print("Stopping Simulator...")
    finally:
        producer.close()
