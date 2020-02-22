import random

# Deck is a traditional deck of cards with four suits represented as a list
deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]*4

# the deal function takes a list (deck) as a function and returns a list (hand)
# a hand has two cards
def deal(deck):
    hand = []
    for i in range(2):
        #Shuffle the deck
	    random.shuffle(deck)
        # pop() with no argument returns the last element of the list (hence the shuffling above)
        # that is the same thing as picking the top card on the deck
	    card = deck.pop()
	    if card == 11:card = "J"
	    if card == 12:card = "Q"
	    if card == 13:card = "K"
	    if card == 14:card = "A"
        #Append the new card to the hand
	    hand.append(card)
    return hand

# print a hand
print("Cards: " + str((deal(deck))))

#Dice is an empty list
Dice = []

# the roll_dice function takes a list as a parameter and populates it
def roll_dice(dice):
    mydice = []
    for j in range(3):
        # use randint to generate a random function between 1 and 6
        # that is the same thing as rolling a die
        die = random.randint(1, 6)
        mydice.append(die)
    return mydice

# Print the value of the dice
print("Dice: "+ str((roll_dice(Dice))))
