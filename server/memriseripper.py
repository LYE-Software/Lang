import requests
from bs4 import BeautifulSoup

def get_memrise_sheet(url):
    # set the user agent to a browser
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'}
    # set the session cookie
    cookies = {'sessionid_2': 'ozrbrtsr64378j7lhjfmu9qgrmb1tgzpo'}
    # get the page
    page = requests.get(url, headers=headers, cookies=cookies)

    entries = []

    page = page.text
    soup = BeautifulSoup(page, 'html.parser')
    contents = soup.find('div', {'class': 'things'})

    for content in contents:
        # skip if it doesnt have the class "thing"
        if not content.has_attr('class') or content['class'][0] != 'thing':
            continue
        term = content.contents[2].text
        definition = content.contents[3].text
        entries.append((term, definition))

    output = ""
    for entry in entries:
        output += "[\"" + entry[1] + "\",\"" + entry[0] + "\"]\n"
    output = output[:-1]

    return output

print(get_memrise_sheet("https://app.memrise.com/course/5826751/daccord-3-l2p2/"))