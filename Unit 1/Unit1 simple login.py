# list of usernames and passwords
credentials = {'jrichalot': 'mypassword','pwallas':'gowestham','gparker':'redpants'}

#store username input by user
username= input('what is your username? ') 

#check username v. dictionary keys 
if username in credentials.keys():
    #if the username is valid prompt for a password
    password = input('what is your password? ')
    #check the password
    if password == credentials[username]:
        print ("You're in!")
    else:
        print("wrong password")
else:
    print("Username is not valid")
