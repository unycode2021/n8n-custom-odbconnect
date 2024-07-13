Sure! Here's a README format for setting up an ODBC DSN on a Windows 64-bit architecture:

---

# Setting Up an ODBC DSN on Windows 64-bit

This guide provides step-by-step instructions to set up an ODBC Data Source Name (DSN) on a Windows 64-bit system.

## Prerequisites

- Administrator privileges on the Windows machine.
- The appropriate ODBC driver for your database installed on the machine.

## Steps

### Step 1: Open ODBC Data Source Administrator

1. Press `Win + R` to open the Run dialog.
2. Type `odbcad32` and press `Enter`. This will open the ODBC Data Source Administrator (64-bit).

### Step 2: Add a New DSN

1. In the ODBC Data Source Administrator window, go to the `System DSN` or `User DSN` tab depending on the scope you want for the DSN.
2. Click the `Add...` button to create a new DSN.

### Step 3: Select the Driver

1. In the `Create New Data Source` window, you will see a list of installed ODBC drivers.
2. Select the driver for your database (e.g., `SQL Server`, `MySQL`, `PostgreSQL`) and click `Finish`.

### Step 4: Configure the Data Source

1. The driver-specific setup window will appear. Fill in the necessary details:
   - **Data Source Name**: Enter a name for the DSN.
   - **Description**: Optionally, enter a description.
   - **Server**: Specify the database server's address.
   - **Database**: Select or enter the database name (if applicable).
   - **User**: Enter the database username.
   - **Password**: Enter the database password.

2. Depending on the driver, there may be additional configuration options. Fill these in as required.

### Step 5: Test the Connection

1. After configuring the DSN, look for a `Test Connection` button in the setup window.
2. Click `Test Connection` to ensure the DSN can successfully connect to the database.
3. If the test is successful, click `OK` to save the DSN.

### Step 6: Save and Close

1. Click `OK` in the ODBC Data Source Administrator window to save your changes and close the application.

## Verification

1. To verify the DSN, you can use an ODBC-enabled application or tool (e.g., Excel, Access, custom applications) to connect to the database using the newly created DSN.

---

This guide covers the essential steps to set up an ODBC DSN on a Windows 64-bit system. For specific database drivers, refer to the corresponding documentation for detailed configuration options.

### This node uses node-odbc to connect to DSN ###
# This can only be used on a self-hosted n8n instance
1. Clone this repo and run npm i
2. Install n8n 
```bash
       npm install -g n8n 
```
2. then find the custom nodes folder for your n8n instance
---
- On Windows ~/.n8n/custom if its not there run:
```bash
       mkdir custom
       cd custom
```
3. Add this repo to custom then run:
```bash
       npm run build
       npm link n8n-custom-odbconnect
       n8n start
```
4. Now you can use the node in n8n
5. Add a Node and Search for ODBConnect
6. Add the name of the DSN you created
7. Add credentials if source requires Auth
8. Add the query you want to run