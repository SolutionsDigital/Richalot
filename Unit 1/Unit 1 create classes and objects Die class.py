import random

# create a class constructor
class Die:
    def __init__(self, colour, value):
        # dice have a value and a colour for the purpose of our game
        self.colour = colour
        self.value = value

    # this function shows the value of the die
    def show_value(self):
        print("the value of this die is " + str(self.value))
    
    # this function rolls the die
    def roll(self):
        self.value = random.randint(1,6)

#Create an instance of the Die class
die1 = Die("red",random.randint(1,6))

#Show the value of the die created above
die1.show_value()

#Roll the die
die1.roll()

#Show the value of the die rolled above
die1.show_value()
