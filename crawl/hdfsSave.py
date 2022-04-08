from hdfs import InsecureClient


import pandas as pd
import os
client_hdfs = InsecureClient('http://localhost:9870', timeout=1)

def writeFile(path, data, option = 'csv', index= False, header = True, encType = 'utf-8-sig'):
    try:
        if option == 'csv':
            with client_hdfs.write(path, encoding = encType, overwrite=True) as writer:
                data.to_csv(writer, index = index, header = header, encoding = encType)
        return True
    except Exception as ex:
        print(ex)
        return False

def createDir(path):
    originPath = "/".join(path.split('/')[:-1])
    targetPath = path.split('/')[-1]
    fileList = client_hdfs.list(originPath)
    print(fileList)
    if targetPath not in fileList :
        client_hdfs.makedirs(path, permission=None)

def main():
    print(client_hdfs.list("/user"))


if __name__ == "__main__":
    main()