"""
This script imports data from two CSV files, processes the data, and stores it in an SQLite database.
It also creates a combined SQL VIEW for easier querying of the data.
"""

import sqlite3
import pandas as pd # To handle and process CSV data.
import os

# File paths
BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "vms.db")
PRICESHEET_CSV = os.path.join(BASE_DIR, "Exam Pricesheet.csv")
RIGHTSIZING_CSV = os.path.join(BASE_DIR, "Exam rightsizing.csv")

# Read CSV files
df_pricesheet = pd.read_csv(PRICESHEET_CSV, sep=";")
df_rightsizing = pd.read_csv(RIGHTSIZING_CSV, sep=";")

# Remove duplicated columns
df_rightsizing = df_rightsizing.drop_duplicates(subset="armSkuName")

# Filter only VMs with a price
df_pricesheet = df_pricesheet[df_pricesheet["unitPricePerUnit"].notnull()]

# Connect to the SQLite database
conn = sqlite3.connect(DB_PATH)

# Save DataFrames as tables (keeping all fields)
df_pricesheet.to_sql("pricesheet", conn, if_exists="replace", index=False)
df_rightsizing.to_sql("rightsizing", conn, if_exists="replace", index=False)

# Create a combined VIEW with all fields from both tables
cursor = conn.cursor()
cursor.execute("DROP VIEW IF EXISTS vm_combined")
cursor.execute("""
CREATE VIEW vm_combined AS
SELECT p.*, r.*
FROM pricesheet p
JOIN rightsizing r ON p.armSkuName = r.armSkuName
WHERE p.unitPricePerUnit IS NOT NULL
""")

# Get Done
conn.commit()
conn.close()
print(f"✅ Database created at: {DB_PATH}")
