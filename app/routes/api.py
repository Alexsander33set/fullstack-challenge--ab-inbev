from flask import Blueprint, request, jsonify
import sqlite3
import os

api = Blueprint('api', __name__)

@api.route("/api/vms", methods=["GET"])
def get_matching_vms():
    try:
        ram_mb = int(request.args.get("ram", 0))
        vcpu = int(request.args.get("vcpu", 0))
        os_choice = request.args.get("os", "").capitalize()

        if not os_choice or ram_mb <= 0 or vcpu <= 0:
            return jsonify({"error": "Invalid parameters."}), 400

        conn = sqlite3.connect("vms.db")
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        query = """
        SELECT * FROM vm_combined
        WHERE memoryInMB >= ?
          AND numberOfCores >= ?
          AND os = ?
        ORDER BY unitPricePerUnit ASC
        LIMIT 5
        """

        cursor.execute(query, (ram_mb, vcpu, os_choice))
        rows = cursor.fetchall()
        conn.close()

        vms = [dict(row) for row in rows]
        return jsonify(vms), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
