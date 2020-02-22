import urllib.request
import json

#define the URL the API resides at
endpoint = "https://maps.googleapis.com/maps/api/directions/json?"
#Your API key
api_key = "AIzaSyCHaDQboqSLTeOsiZkyHnbR6aTWVFK_IhY"

#get user input (format the string replacin spaces by "+"
origin= input("Where are you ?: ").replace(' ','+')
destination = input("Where do you want to go?: ").replace(' ','+')

#build the second part of the thhp request (first part is the endpoint of the API)
nav_request = "origin={}&destination={}&key={}".format(origin, destination,api_key)

#Assemble everything
request = endpoint+nav_request

#Send the request and read the response into the response variable
response = urllib.request.urlopen(request).read()


#parse the json response into directions as a dict.
directions = json.loads(response)


#Extract what you need from the dictionary
for x in directions["routes"][0]["legs"]:
    print(x["duration"]["text"])
    print(x["duration"]["value"])
    
    
