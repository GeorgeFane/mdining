import requests
from lxml.html import fromstring
from datetime import datetime, time
from pytz import timezone

from pprint import pprint
from typing import List
import asyncio
import aiohttp

tz = timezone('America/Detroit')
now = datetime.now(tz).time()

base_url = 'https://dining.umich.edu/menus-locations/dining-halls/'
locations = {
    'Bursley': [42.296425432803574, -83.72128815297978],
    'East Quad': [42.273373698959155, -83.73512203696706],
    'Markley': [42.28094281885792, -83.72894833705446],
    'Mosher-Jordan': [42.280526209863766, -83.73137037874659],
    'North Quad': [42.28106990189085, -83.74016402005164],
    'South Quad': [42.27436553095215, -83.74215214765097],
    'Twigs at Oxford': [42.27573739576655, -83.72485454639236],
}
halls = locations.keys()


def parseTime(string: str):
    return datetime.strptime(string, '%I:%M %p').time()


def isOpen(start: str, end: str) -> bool:
    return parseTime(start) <= now and now <= parseTime(end)


def getTimes(tree) -> List[dict]:
    pairs = [
        pair.replace('\xa0', ' ').split(' ‑ ')
        for pair in tree.xpath('//span[@class="calhours-times"]/text()')
    ]
    return [
        {
            'Open': start,
            'Close': end,
            'isOpen': isOpen(start, end),
        }
        for start, end in pairs
    ]


def getMeals(tree) -> List[str]:
    return tree.xpath('//span[@class="calhours-title"]/text()')


def getCourses(tree) -> List[str]:
    meals = [
        div.xpath('.//div[@class="item-name"]/text()')
        for div in tree.xpath('//div[@class="courses"]')
    ]
    return [
        [
            food.strip()
            for food in foods
        ] for foods in meals
    ]


def fetch_async(halls: List[str]) -> List[List[dict]]:
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    future = asyncio.ensure_future(fetch_all(halls))
    return loop.run_until_complete(future)


async def fetch_all(halls: List[str]) -> List[List[dict]]:
    tasks = []
    async with aiohttp.ClientSession() as session:
        for hall in halls:
            task = asyncio.ensure_future(fetch(hall, session))
            tasks.append(task)
        return await asyncio.gather(*tasks)


async def fetch(
    hall: str,
    session: aiohttp.ClientSession
) -> List[dict]:
    url = base_url + hall.replace(' ', '-')
    print(url)
    async with session.get(url) as response:
        r = await response.read()
        tree = fromstring(r)

        lat, lng = locations[hall]
        return [{
            'Hall': hall,
            'Meal': meal,
            **time,
            'Courses': courses,
            'lat': lat,
            'lng': lng,
        } for meal, time, courses in zip(
            getMeals(tree), getTimes(tree), getCourses(tree)
        )]


def main() -> List[dict]:
    return [
        x
        for row in fetch_async(halls)
        for x in row
    ]        


def mdining(request):
    # For more information about CORS and CORS preflight requests, see:
    # https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return ({'data': main()}, 200, headers)


# pprint(main(), indent=4)
