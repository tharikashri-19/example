from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root123",     # change if needed
    database="natpac_travel"
)

cursor = db.cursor()

@app.route("/saveTrip", methods=["POST"])
def save_trip():
    data = request.json

    query = """
    INSERT INTO trips (latitude, longitude, mode, purpose, cost)
    VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        data["latitude"],
        data["longitude"],
        data["mode"],
        data["purpose"],
        data["cost"]
    )

    cursor.execute(query, values)
    db.commit()

    return jsonify({"status": "saved"})

@app.route("/trips", methods=["GET"])
def trips():
    cursor.execute("SELECT * FROM trips")
    return jsonify(cursor.fetchall())

if __name__ == "__main__":
    app.run(debug=True)
