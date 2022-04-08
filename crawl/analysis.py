import csv
import nltk
from konlpy.tag import Okt
from wordList import *
from pyspark.sql import SparkSession
import os, sys
import pandas as pd
os.environ['SPARK_HOME'] = "/Users/hakjoo/spark-3.1.3-bin-hadoop3.2/"

#스파크 설정
my_spark = SparkSession \
     .builder \
     .appName("goodjob") \
     .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/goodjob.coll") \
     .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/goodjob.coll") \
     .config('spark.jars.packages', 'org.mongodb.spark:mongo-spark-connector_2.12:3.0.1') \
     .getOrCreate()

def analysis_save():
    path = sys.path[0] + "/testList/"
    fileList = os.listdir(path)
    t = Okt()
    for file in fileList:
        f = open(path + file, 'r')
        reader = csv.reader(f)
        positive = ""
        negative = ""

        job_group = []
        try:
            for line in reader:

                if line[0].find("회사명") >= 0:
                    continue
                idx = -1
                for i in range(0, len(job_group)):
                    if job_group[i][1].find(line[1]) >= 0:
                        idx = i
                if idx == -1:
                    job_group.append([line[0], line[1], line[6], line[7], 1])
                else:
                    job_group[idx][2] += line[6]
                    job_group[idx][3] += line[7]
                    job_group[idx][4] += 1
            for job in job_group:
                if job[1].find('\n') >= 0 or job[1].find('20') >= 0 or job[4] < 20:
                    continue
                company = {
                    'company_name': job[0], 'work_group': job[1], 'review_num': job[4], 'post_welfare': 0, 'post_pay': 0, 'post_culture': 0, 'post_task': 0, 'post_commute': 0, 'neg_welfare': 0, 'neg_pay': 0, 'neg_culture': 0, 'neg_task': 0,'neg_commute': 0,
                }
                print(job[0], ' ', job[1], ' 분석 시작')
                tokens_ko = t.nouns(job[2])
                tokens_ko = [each_word for each_word in tokens_ko
                             if each_word not in delete_word_list]
                ko_p = nltk.Text(tokens_ko)

                for text in ko_p.vocab().most_common(50):
                    if text[0] in p_welfare:
                        company['post_welfare'] += int(text[1])
                    elif text[0] in p_pay:
                        company['post_pay'] += int(text[1])
                    elif text[0] in p_culture:
                        company['post_culture'] += int(text[1])
                    elif text[0] in p_task:
                        company['post_task'] += int(text[1])
                    elif text[0] in p_commute:
                        company['post_commute'] += int(text[1])

                tokens_ko = t.nouns(job[3])
                tokens_ko = [each_word for each_word in tokens_ko
                             if each_word not in delete_word_list]
                ko_p = nltk.Text(tokens_ko)
                for text in ko_p.vocab().most_common(50):
                    if text[0] in w_welfare:
                        company['neg_welfare'] += int(text[1])
                    elif text[0] in w_pay:
                        company['neg_pay'] += int(text[1])
                    elif text[0] in w_culture:
                        company['neg_culture'] += int(text[1])
                    elif text[0] in w_task:
                        company['neg_task'] += int(text[1])
                    elif text[0] in w_commute:
                        company['neg_commute'] += int(text[1])
                print(company)
                saveData = my_spark.createDataFrame(pd.DataFrame(company, index=[0]))
                saveData.write.format("mongo").mode("append").save()
        except UnicodeDecodeError:
            pass
# tokens_ko_p = t.nouns(positive)
# tokens_ko_p = [each_word for each_word in tokens_ko_p
#                 if each_word not in delete_word_list]
# ko_p = nltk.Text(tokens_ko_p)
# for text in ko_p.vocab().most_common(50):
#     print(text.index('업무'))
#
#
#
# test = {'company_name': '롯데제과(주)', 'work_group': '생산관리/품질관리', 'review_num': 1, 'post_welfare': 1, 'post_pay': 0, 'post_culture': 0, 'post_task': 1, 'post_commute': 0, 'neg_welfare': 0, 'neg_pay': 0, 'neg_culture': 0, 'neg_task': 0, 'neg_commute': 0}
# data = my_spark.createDataFrame(pd.DataFrame(test, index=[0]))
# data.write.format("mongo").mode("append").save()

def main():
    analysis_save()

if __name__ == "__main__":
    main()






#
# print("----------------------------------")
# tokens_ko_p = t.morphs(negative)
# tokens_ko_p = [each_word for each_word in tokens_ko_p
#                 if each_word not in delete_word_list]
# ko_p = nltk.Text(tokens_ko_p)
# print(ko_p.vocab().most_common(100))
