import urllib.request
import json

request = "https://maps.googleapis.com/maps/api/staticmap?center=48.8584,2.2945&zoom=14&size=800x600&sensor=false&key=AIzaSyCHaDQboqSLTeOsiZkyHnbR6aTWVFK_IhY"

#Send the request and read the response into the response variable
response = urllib.request.urlopen(request).read()

print(response)    
    
