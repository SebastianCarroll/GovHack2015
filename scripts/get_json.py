import urllib, json, sys
#url="https://data.gov.au/api/3/action/package_show?id=75a87672-2c84-4b62-ab02-00fb71289c22"
url=sys.argv[1]
print url
response = urllib.urlopen(url);
data = json.loads(response.read())
print data

