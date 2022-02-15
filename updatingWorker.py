import threading
import json
import os
import mysql.connector

# Functions
# 2 set time interval to be called 
def setInterval(func, time):
    e = threading.Event()
    while not e.wait(time):
        func()

# 3 reads the dump file and execute queries
def readExecuteDumps():
    global files_list
    global files_runned

    # 3.1 list of files already read
    log_file = open('dump_logs.json', 'r')
    data = json.load(log_file)

    # 3.2 list of all files
    files_list = listFilesInDirectory()

    # 3.3 list remaining files to run
    remainingFiles(data)

    # 3.4 insert into database new updates
    saveLog()
    files_list = []
    files_runned = []
    data = ""

# 3.2 list all the dump files
def listFilesInDirectory():
    files = []
    path = "./dumps"
    for diretorio, subpastas, arquivos in os.walk(path):
        for arquivo in arquivos:
            files.append(arquivo)
    return files

# 3.3 remove from the list the already runned files
def remainingFiles(data):
    global files_list
    for file in files_list[:]:
        for file2 in data['logs'][:]:
            if file == file2:
                files_list.remove(file)
                files_runned.append(file)

# 3.4 save in the log and log file the dumps already updated
def saveLog():
    workerdb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="library_worker"
    )
    mycursor = workerdb.cursor()
    while len(files_list):
        dump = open('./dumps/' + files_list[0], 'r')
        for line in dump: 
            sql = line
        print('query = ' + sql)
        mycursor.execute(sql)
        files_runned.append(files_list[0])
        files_list.remove(files_list[0])
    workerdb.commit()
    updateLogFile()

# 4 update the log file (dump_logs.json)
def updateLogFile(): 
    data = { "logs" : files_runned }
    with open('dump_logs.json', 'w', encoding='utf8') as f:
        json.dump(data, f, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ':'))
    
# 1 global var for files_list
files_list = []
files_runned = []

# 2 start
setInterval(readExecuteDumps, 1)



