

#################################################################
#                                                               #
# What doe the deal() function and the roll_die() functions do  #
# differently when populating their respective lists            #
#                                                               #
#################################################################

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


# myDice is instantiated for the purpose of this example only
myDice = [3,2,5]

def roll_die(l,x):
    l[x]=random.randint(1,6)
    
    return l

#Rolling the sencond dice for the purpose of this example
print("Dice: " + str(roll_die(myDice,1)))