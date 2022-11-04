import requests
from bs4 import BeautifulSoup

def get_page(url):
    # set the user agent to a browser
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'}
    # get the page
    page = requests.get(url, headers=headers)
    return page.text

def get_terms_definitions(page):
    entries = []

    page = get_page(page)
    soup = BeautifulSoup(page, 'html.parser')
    contents = soup.find('div', {'class': 'SetPageTerms-termsList'})

    for content in contents:
        # if its not a div with the class SetPageTerms-term, skip
        if content.name != 'div' or 'SetPageTerms-term' not in content['class']:
            continue
        container = content.find('div').find('div').find('div').find('div')
        term = container.contents[0].text
        definition = container.contents[1].text
        entries.append((term, definition))
    
    return entries


entries = get_terms_definitions("https://quizlet.com/334794591/organelles-and-organelle-function-flash-cards/")

output = ""
for entry in entries:
    output += "[\"" + entry[0] + "\",\"" + entry[1] + "\"]\n"
output = output[:-1]

print(output)