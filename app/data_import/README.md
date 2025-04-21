# Explanation

This folder was created for extracting CSV data into an SQLite database. To run the process, create a virtual Python environment and install the `pandas` library. After execution, manually move the generated `vms.db` file to the `./app` directory so it can be used by the application.

Windows:

```powershell
python -m venv venv

.\venv\Scripts\activate

pip install -r requirements.txt
python import_vm_data.py
```

Linux:

```bash
python3 -m venv venv

source ./venv/bin/activate

pip install -r requirements.txt
python3 import_vm_data.py
```
