# coding: utf-8
import requests
import json

IMAGE_INFO_URL = r"https://api.imgur.com/3/image/"
HEADERS = {"authorization":"Client-ID 00595d523609a70"}

top_r = requests.get(r'https://api.imgur.com/3/gallery/hot/viral/0.json', headers=HEADERS)
top_j = json.loads(top_r.text)

i = 0
j = 0
while j < 20:
    print(i)
    if top_j['data'][i]['is_album'] == True:
        cover_hash = top_j['data'][i]['cover']
        image_info_r = requests.get(IMAGE_INFO_URL + cover_hash, headers=HEADERS)
        image_info_j = json.loads(image_info_r.text)['data']
    else:
        image_info_j = top_j['data'][i]
        print("else path")
    if image_info_j['size'] < 200*1024:
        # image = requests.get(image_info_j['link'], headers=HEADERS)
        # print("saving image")
        # fw = open("test_save/" + image_info_j['data']['link'].split('/')[-1], 'w')
        # fw.write(image.content)
        print("Writing url to file")
        fw = open("images.txt", "a")
        fw.write(image_info_j['link']+"\n")
        fw.close()
        j += 1
    else:
        print("image too large")
        print(image_info_j['id'], image_info_j['size'])
    i += 1
