import os, csv
folderGroup = ["0327", "0328"]

for folder in folderGroup:
    path = "./" + folder
    file_list = os.listdir(path)
    for file in file_list:
        if(file.find(".csv") <0):
            continue
        print("현재파일: " + folder + "/"+file)
        csvFile = open(folder + "/" + file, 'r', newline='', encoding='utf-8-sig')
        csvReader = csv.reader(csvFile)
        csvData = list(csvReader)
        for index, read in enumerate(csvData):
            if read[2].find("현직원") > 0:
                read[2] = "현직원"
            elif read[2].find("전직원") > 0:
                read[2] = "전직원"

        csvFile = open(folder + "/updated/" + file, 'w', newline='', encoding='utf-8-sig')
        csvWriter = csv.writer(csvFile)
        for res in csvData:
            csvWriter.writerow(res)
        csvFile.close()

        print(file + " 업데이트 및 저장 완료")




