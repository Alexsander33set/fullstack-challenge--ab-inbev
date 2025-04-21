
## Question

In reviewing the provided CSV file, can you identify and suggest any modifications that might enhance the web page's performance or optimize memory usage? What about for large number of rows? Please provide a thorough justification for each recommendation.


## Response


1. Develop the tables to be precise in data management. Is important to have your data organized e documented. We can imagine that to have duplicated data on such a large scale, there are more loose ends...
2. **Use a structured database instead of raw CSV files**
   Normally, CSV files are generated to export reports, but nor for using in production. Starting to use databases like SQLite, connect on a ORM or  integrating or accessing the database directly can increase the performance e maintainability.
3. **Clean the dataset early**
   As commented in 1. , the CSV files have a lot of non relevant data since are not priced and usable. It's almost obligatory to make a data cleaning & filtering **Early**.
4. **Define clear functional goals and filtering criteria**
   In order to enhance the project, refine the ideia giving a clear acceptance criteria.
5. **Enable compression and host on scalable infrastructure**
   For the application, host in a reliable place and activate `gzip` for data compression. The system currently only shows 5 VMs, but if you need more or even all of them, compression could help reduce latency if this starts to be a problem.