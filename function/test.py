import requests
from pprint import pprint

url = 'https://us-central1-georgefane.cloudfunctions.net/mdining'
data = requests.get(url).json()
pprint(data, indent=4)
