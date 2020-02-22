
# coding: utf-8

# In[1]:


import random


# In[2]:


# the roll_die() function takes a list and a die index as its parameter and returns list in which 
# a ramdom value for the die passed as a parametre has been substituted
# ex. 
# dice = [1,1,1]
# roll_die(dice, 1) <-- rolling the first die of the dice list (see management of 0 index in input() function)
# dice = [2,1,1]

def roll_die(l,x):
    l[x]=random.randint(1,6)
    
    return l

def print_scores(pl,cl):
    print(pl)
    print(sum(pl))
    
    print(cl)
    print(sum(cl))
    


# In[6]:


# dice are part of an array and can be access by their index value, which is an int.
# the dice have to exist before you can play so the array has to be instantiated
# the array is instantiated with the first roll

playerDice = [random.randint(1,6),random.randint(1,6),random.randint(1,6)]
computerDice = [random.randint(1,6),random.randint(1,6),random.randint(1,6)]

print_scores(playerDice, computerDice)


# In[7]:


# a round will only take place if none of the two players are over 12

if sum(computerDice) <= 12 and sum(playerDice) <= 12:
    print("GAME ON")
    
    # the game has two rounds
    # for each round both the player and the computer are allowed to roll one die
    play_round = 0

    # a round starts when either of the players decide to roll a die 
    while play_round <2:
        
        want_to_play = input("Would you like to roll a die? y/n")

        if want_to_play == "y":
             # the input is converted to an int as index values of a list have to be integers
            # -1 as lists are 0 indexed
            play1 = int(input("which die would you like to roll?")) - 1
            print_scores(roll_die(playerDice,play1), computerDice)
        else:
            print("Player happy with their total and not rolling any die")


        # the computer only decides to play again if his total is <11 
        if sum(computerDice)<11:
            print(computerDice)
            comp1 = computerDice.index(min(computerDice))
            print('Computer rolled die: ' + str(comp1+1))
            print_scores(playerDice, roll_die(computerDice,comp1))
        else:
            print("Computer happy with its total and not rolling any die")

        #end of the round
        play_round = play_round +1      

        #Print round scores
        print("ROUND " + str(play_round)+ " SCORES")
        print_scores(playerDice,computerDice)
        
else:
    print("Game over")


# In[12]:


#Get a result

print("FINAL SCORES")
print_scores(playerDice,computerDice)

if sum(playerDice) > sum(computerDice):
    print("YOU WIN")
elif sum(playerDice) == sum(computerDice):
    print("IT's A DRAW")
else:
    print("YOU LOSE")

