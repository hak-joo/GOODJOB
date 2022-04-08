# import csv
# import nltk
# import pyspark.shell
# from konlpy.tag import Okt
# from wordList import *
# from pyspark.sql import SparkSession
# import os, sys
# import pandas as pd
# os.environ['SPARK_HOME'] = "/Users/hakjoo/spark-3.1.3-bin-hadoop3.2/"
#
# #스파크 설정
# my_spark = SparkSession \
#     .builder \
#     .appName("goodjob") \
#     .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/goodjob.coll") \
#     .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/goodjob.coll") \
#     .config('spark.jars.packages', 'org.mongodb.spark:mongo-spark-connector_2.12:3.0.1') \
#     .config('spark.jars.packages', 'org.mongodb.spark:mongo-java-driver-3.8.2') \
#     .getOrCreate()
#
# #mongo-java-driver-3.8.2.jar
# my_spark.read.format("com.mongodb.spark.sql.DefaultSource").load()


from pyspark import SparkContext, SparkConf
conf = SparkConf().set("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1")
sc = SparkContext(conf=conf)

from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("myApp") \
    .config("spark.mongodb.input.uri", "mongodb://127.0.0.1:27017/goodjob.coll") \
    .config("spark.mongodb.output.uri", "mongodb://127.0.0.1:27017/goodjob.coll") \
    .getOrCreate()

df = spark.read.format("com.mongodb.spark.sql.DefaultSource").option("uri", "mongodb://127.0.0.1:27017").option("database", "goodjob").option("collection", "coll").load()
df.printSchema()