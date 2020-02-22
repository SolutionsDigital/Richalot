# COde to be read in conjunction with
# https://www.youtube.com/watch?v=WOwi0h_-dfA&list=PLBZBJbE_rGRWeh5mIBhD-hhDwSEDxogDg&index=10

class Robot:
    def __init__(self, name, colour, weight):
        self.name = name
        self.colour = colour
        self.weight = weight

    def introduce_self(self):
        print("My name is " + self.name)

r1 = Robot("Tom", "red", 20)
r2 = Robot("Jerry", "blue", 40)

class Person:
    def __init__(self, name, personality, isSitting, robotOwned):
        self.name = name
        self.personality = personality
        self.isSitting = isSitting
        self.robotOwned = robotOwned

    def sitDown(self):
        self.isSitting = True

    def standUp(self):
        self.isSitting = False

p1 = Person("Alice", "aggressive", False,r2)
p2 = Person("Becky", "talkative", True, r1)

p1.robotOwned.introduce_self()
print(p1.robotOwned.name)
