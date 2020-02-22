
# import the random module
import random


# generate a random value between 1 and 6 for each of the three die
# store the three values in a list
playerDie1 = random.randint(1,6)
playerDie2 = random.randint(1,6)
playerDie3 = random.randint(1,6)
playerDice = [playerDie1, playerDie2, playerDie3]

# Display the value of each of die
print(playerDice)
playerTotal = 0

# add up the value of each of the player die and display the total
for x in playerDice:
    playerTotal=playerTotal+x
print("Player's total: "+ str(playerTotal))

# generate a random value between 1 and 6 for each of the three die
# store the three values in a list
computerDie1 = random.randint(1,6)
computerDie2 = random.randint(1,6)
computerDie3 = random.randint(1,6)
computerDice = [computerDie1, computerDie2, computerDie3]

# add up the value of each of the computer die and display the total
print(computerDice)
computerTotal = 0

for y in computerDice:
    computerTotal=computerTotal+y
print("computer's total: "+ str(computerTotal))


# If the total of the player dice is more than 12 the player looses
if playerTotal > 12:
    print("Busted. You lose")

# If the total of the player dice is less than 12 the player is offered to play again
else:
    answer = input("Would you like to keep playing? (Y/N)")

# If the player answers Y ask the which die they want to play
    if answer == "Y":
        play1 = input("Which die would you like to throw again?")

# Play the die the user has chosen
# Replace the old value for that die with the new value in the list       
        if play1 == "1":
            die1 = random.randint(1,6)
            playerDice[0]=die1
                
        elif play1 == "2":
            die2 = random.randint(1,6)
            playerDice[1]=die2
        else:
            die3 = random.randint(1,6)
            playerDice[2]=die3

# Add up the value of each of the player die and display the total     
    playerTotal = 0
    for x in playerDice:
        playerTotal=playerTotal+x

# Assess the result
# If the total of the player dice is more than 12, the player has lost
# display the value of each die
# display the player total
# display the looser message

if playerTotal > 12:
    print(playerDice)    
    print("Player's total: "+ str(playerTotal))
    print("Busted. You lose")

# If the total of the computer dice is more than 12, the computer has lost
# display the value of each die
# display the player total
# display the computer total
# display the winner message          

elif computerTotal > 12:
    print(playerDice)    
    print("Player's total: "+ str(playerTotal))
    print("Computer's total: "+ str(computerTotal))
    print("Computer busted. You win!")

# If the total of the player dice is equal to 12, the player has won
# display the value of each die
# display the player total
# display the computer total
# display the winner message          
    
elif playerTotal == 12:
    print(playerDice)    
    print("Player's total: "+ str(playerTotal))
    print("Computer's total: "+ str(computerTotal))
    print("You win!")

# If the total of the computer dice is less than 12 AND the player total is more than the computer total, the player has won
# display the value of each die
# display the player total
# display the computer total
# display the winner message     
    
elif computerTotal < 12 and playerTotal > computerTotal:
    print(playerDice)    
    print("Player's total: "+ str(playerTotal))
    print("Computer's total: "+ str(computerTotal))
    print("You win!")

# If the total of the computer dice is less than 12 AND the player total is less than the computer total, the player has lost
# display the value of each die
# display the player total
# display the computer total
# display the loser message     

else:
    print(playerDice)    
    print("Player's total: "+ str(playerTotal))
    print("Computer's total: "+ str(computerTotal))
    print("You lose!")

