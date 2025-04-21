# 💼 Fullstack Challenge – AB InBev

Technical challenge proposed by AB InBev for the Full Stack Developer position.

## 🧠 Overview

This project is a full stack web application designed to determine the **most cost-effective virtual machine (VM)** configuration that meets or exceeds the user's minimum requirements (RAM, vCPU, and operating system).

The system processes two provided CSV files as input data:

- `Exam pricesheet.csv`: contains VM names and pricing.
- `Exam rightsizing.csv`: contains technical specifications of VM sizes.

## ⚙️ Tech Stack

- Python
- Flask
- SQL - `sqlite3`
- HTML, CSS, and JavaScript
- Jinja2

## 🗂️ How to Run

This repository contains two Python projects: the main project, which runs the backend and frontend, and another project dedicated to generating the SQLite3 database. To run the main application:


### Windows

```powershell
# Go to application folder
cd .\app

# Create and activate a virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
flask run
```

### Linux

```bash
# Go to application folder
cd ./app

# Create and activate a virtual environment
python3 -m venv venv
. venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
flask run
```

(Optional) You can define a different port for the application by following these steps:
1. Locate the `.env.sample` file in the project directory.
For more details on how to run the `./data_import` project to generate the sqlite3 database, refer to the `README.md` file inside the `data_import` folder.
3. Open the `.env` file in a text editor and set your preferred port by modifying the `PORT` variable (e.g., `PORT=8000`).
4. Save the file and restart the application to apply the changes.

For more details of how to run the `./data_import` project to generate the sqlite3 database, take a look into the file.
