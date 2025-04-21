# Decision-Making Rationale

### Use of SQL (SQLite)

Among the required technologies, SQL was explicitly listed. Instead of working with the CSV files directly in memory, I opted to import them into a **SQLite database**

### Ignoring VMs Without Price

As requested, “VM sizes without a listed price are not available”. The discrepancy in the number of records (356 in `Exam Pricesheet` and 2240 in `Exam rightsizing`) certainly took some work...

### `armSkuName` como ID (Primary Key)

The `armSkuName` field is more consistent and standardized across both CSVs

### Keeping Tables Separated + Using Views

While merging both datasets into a single table could have offered faster querying in high-volume scenarios, I chose to **keep both source tables separated** and **combine them through a SQL view**.  
This approach mimics a real-world database structure (where pricing and specifications may come from different sources), and makes the system easier to scale or extend in the future.  
With more time or context, more performance-driven decisions (like table flattening or indexing strategies) could be implemented.
With greater context and time, better measures can be taken.
