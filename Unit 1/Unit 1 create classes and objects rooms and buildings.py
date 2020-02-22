
# Define a ClassRoom object
class ClassRoom:

    #A classroom is identified by its floor, its number, its capacity (i.e. number of
    #people it sits, a contact and its booking status
    def __init__(self,floor,number,capacity,isfree,contact):
        self.floor=floor
        self.number=number
        self.capacity=capacity
        self.isfree=isfree
        self.contact = contact

    # display the booking status of a classroom
    def show_booking_status(self):
        if self.isfree==0:
            print("Room "+str(self.number)+ " on floor " + str(self.floor)+ " is free.")
        else:
            print("Room "+str(self.number)+ " on floor " + str(self.floor)+ " is busy.")

    # book a classroom
    def booking(self,book):
        if book == "book":
            self.isfree=1
        elif book== "free":
            self.isfree=0
        else:
            print("please refer to the booking manual for the correct syntax")
    
#Define a building
class Building:
    def __init__(self,name,school,classrooms):
    #A building is identified by its name, its school, the rooms it has
        self.name=name
        self.school=school
        self.classrooms=classrooms

#create an instance of the object
M01R02 = ClassRoom(1,2,20,0,"Richalot")
M01R01 = ClassRoom(1,1,10,0,"Wainwright")

Library = Building("M","Senior School",[M01R02,M01R01])

#display the booking status of the classroom
M01R02.show_booking_status()

#book the classroom
M01R02.booking("book")

#display the booking status of the classroom
M01R02.show_booking_status()

#free/cancel booking
M01R02.booking("free")

#display the booking status of the classroom
M01R02.show_booking_status()
M01R02.booking("yes")

#display capacity of a room
print(M01R02.capacity)

print(M01R01.contact)

#print the properties of the obect and their values
print(vars(M01R02))

#Print the classroom and their properties in Library
for x in Library.classrooms:
    print(vars(x))

# Print the capacity of the library
libcapacity=0
for y in Library.classrooms:
    libcapacity = libcapacity + (y.capacity)
    print("room " + str(y.number)+ " has a capacity of " +str(y.capacity))
print(libcapacity)

for y in Library.classrooms:
    print("To book room "+ str(y.number) + ", contact " + str(y.contact))