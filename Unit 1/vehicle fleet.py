# import modules to generate and manage timestamps
import datetime
import time

# all "hire events" will be stored in that list
myLog = []

# class constructors for cars
class Cars():
    def __init__(self,rego,dateinservice):
        self.rego = rego
        self.dateinservice = dateinservice

# class constructor for drivers
class Driver():
    def __init__(self,firstname, lastname,licencenumber):
        self.firstname = firstname
        self.lastname = lastname
        self.licencenumber = licencenumber

# class constructors for Hire events i.e. whenever a car is hirerd bu a driver
class HireEvent():
    def __init__(self,car,driver):
        self.car = car
        self.driver = driver
        self.date = time.time()
        # Hire envents self append to the log
        myLog.append(self)

    # method of the HireEvent class to disply the parameters of the hireEven i.e. who hired which car and when
    def displaystatus(self):
        print(self.car.rego)
        print(self.driver.firstname+" " +self.driver.lastname)

        # timestamp needs to be formatted as follows
        print(datetime.datetime.fromtimestamp(self.date).strftime('%Y-%m-%d %H:%M:%S'))

# create cars
car1 = Cars("913 WQM",2018)
car2 = Cars("914 WQM",2018)
car3 = Cars("915 WQM",2018)

# create drivers
driver1 = Driver("Jerome", "Richalot", "123456")
driver2 = Driver("Isaac","Fydler", "654321")

# fleet = [car1,car2,car3]

# create HireEvents
hire1 = HireEvent(car1, driver1)
hire2 = HireEvent(car2, driver2)

# print log of HireEvents
for x in myLog:
    x.displaystatus()
