import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
import time, os, csv
from dotenv import load_dotenv

company_reviews = [['회사명', '직군', '현재상태', '지역', '작성날짜', '요약', '장점', '단점', '경영진에게']]

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
    login_response = requests.post(URL, json=login_data, headers=headers)
    login_result = login_response.content.decode('utf-8')

    if 'true' in login_result:
        page = 0
        while(True):
            page = page + 1
            print('현재 페이지: ', page)
            path = f'{requestURL}?page={page}',
            req_header = {
                'authority': 'www.jobplanet.co.kr',
                'method': 'GET',
                'path': f'{requestURL}?page={page}',
                'scheme': 'https',
                'accept': 'text/html, application/xhtml+xml, application/xml',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            }
            with requests.Session() as s:
                res = s.get(requestURL, params={'page': f'{page}'}, cookies=login_response.cookies, headers=req_header)
                soup = bs(res.content.decode('utf-8'), 'html.parser')
                endPoint = soup.find('article', {'class': 'no_result no_result_show'})
                if endPoint is not None:
                    break
                companies = soup.find_all('a', {'class': 'llogo'})
                for company in companies:
                    href = str(company.attrs['href'])
                    if href.find('landing') > 2:
                        href = href.replace('landing', 'reviews')
                    href = href.replace('info', 'reviews')
                    if href.find('_search_action') > 0:
                        href = href[0:href.find('_search_action')]
                    links.append(base_url + href)
                    get_information(login_response.cookies)
                    links.clear()



def get_information(cookie):
    with requests.Session() as s:
        for link in links:
            page = 0 #page 1로 시작
            while(True):
                page = page + 1
                path = f'{link}page={page}'
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
                endPoint = soup.find('article', {'class': 'no_result'})
                #등록된 기업 리뷰가 없을 때 break
                if endPoint is not None:
                    break
                user_info = soup.find_all('span', {'class': 'txt1'}) #4개씩 묶음
                summery = soup.find_all('h2', {'class': 'us_label'}) # 1개씩 묶음
                content = soup.find_all('dd', {'class' : 'df1'}) #3개씩 묶음

                if int(len(user_info)) % 4 == 0: # 4개로 나누어 떨어지지 않으면 데이터 저장이 꼬임.
                    print(companyName,' ', page, ' 페이지, ')
                    for idx in range (0, int(len(user_info)/4)):
                        try:
                            company_reviews.append([companyName, user_info[idx * 4].text,
                                user_info[idx * 4 + 1].text, user_info[idx * 4 + 2].text,
                                user_info[idx * 4 + 3].text, summery[idx].text[13:-6], #앞 뒤로 쓸 데 없이 발생하는 문자 삭제
                                content[idx * 3].text, content[idx * 3 + 1].text,
                                content[idx * 3 + 2].text])
                        except:
                            continue
            f = open(f'0322/{companyName}.csv', 'w', encoding='utf-8-sig', newline='')
            csvWriter = csv.writer(f)
            for res in company_reviews:
                csvWriter.writerow(res)
            f.close()
            print(companyName, ' ', len(company_reviews), ' 데이터 저장 완료.')
            company_reviews.clear()
            company_reviews.append(['회사명', '직군', '현재상태', '지역', '작성날짜', '요약', '장점', '단점', '경영진에게'])


def main():
    requestURL = input("주소 입력: ")
    login_and_request(requestURL)


if __name__ == "__main__":
    main()

#테스트 입력 코드
#https://www.jobplanet.co.kr/search/companies/%EC%9D%BC%ED%95%98%EA%B8%B0%20%EC%A2%8B%EC%9D%80%20%EC%A4%91%EC%86%8C%EA%B8%B0%EC%97%85?
#https://www.jobplanet.co.kr/companies?industry_id=700&