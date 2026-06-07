import urllib.request
import re

url = "https://unpkg.com/@fabric-msft/svg-icons/"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0'
})

try:
    with urllib.request.urlopen(req, timeout=10) as response:
        content = response.read().decode('utf-8')
        
    print("Fetched package index page. Searching for svg files...")
    # Find all links in the page
    links = re.findall(r'href="([^"]+)"', content)
    for link in links:
        if 'svg' in link or 'fabric' in link or 'brand' in link:
            print("Found candidate link:", link)
except Exception as e:
    print("Error:", e)
