import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
import time, os
from dotenv import load_dotenv

company_reviews = []

load_dotenv()
usr = os.environ.get('usr')
pwd = os.environ.get('pwd')

#api 호출 세팅
user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
headers = {'Content-type': 'application/json', 'Accept': 'text/plain', 'User-Agent':user_agent}
login_data = {'user':{'email':usr, 'password':pwd, 'remember_me':'true'}}
base_url = 'https://www.jobplanet.co.kr'
URL = 'https://www.jobplanet.co.kr/users/sign_in'

links = []

def login_and_request(requestURL):
    login_response = requests.post(URL, json = login_data, headers = headers)
    login_result = login_response.content.decode('utf-8')

    if 'true' in login_result:
        req_header = {
            'authority': 'www.jobplanet.co.kr',
            'method': 'GET',
            'path': f'{requestURL}',
            'scheme': 'https',
            'accept': 'text/html, application/xhtml+xml, application/xml',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        }
        with requests.Session() as s:
            res = s.get(requestURL, cookies=login_response.cookies, headers=req_header)
            soup = bs(res.content.decode('utf-8'), 'html.parser')
            companies = soup.find_all('a', {'class': 'llogo'})

            for company in companies:
                href = str(company.attrs['href'])
                print(href.find('info'))
                href = href.replace('info', 'reviews')
                print(href)
                links.append(base_url + href)
                #함수 호출
                get_information(login_response.cookies)
                links.clear()



def get_information(cookie):
    with requests.Session() as s:
        page = 1
        for link in links:
            path = f'{link}page=400'
            print(path)
            req_header = {
                'authority': 'www.jobplanet.co.kr',
                'method': 'GET',
                'path': f'{path}',
                'scheme': 'https',
                'accept': 'text/html, application/xhtml+xml, application/xml',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            }
            res = s.get(path, cookies=cookie, headers=req_header)
            soup = bs(res.content.decode('utf-8'), 'html.parser')
            companyName = soup.find('h1').text
            print(companyName, " started..")
            reviews = soup.find_all('div', {'class': 'content_wrap'})
            endPoint = soup.find_all('article', {'class': 'no_result'})
            if endPoint is None:
                break

            for review in reviews:
                review.find_all_next('')





def main():
    requestURL = input("주소 입력: ")
    login_and_request(requestURL)
    print(links)

if __name__ == "__main__":
    main()

#테스트 입력 코드
#https://www.jobplanet.co.kr/companies?industry_id=700&_rs_act=industries&_rs_con=gnb&_rs_element=category