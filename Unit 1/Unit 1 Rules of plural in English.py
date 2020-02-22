#Create list of exceptions
#sample from https://www.thoughtco.com/irregular-plural-nouns-in-english-1692634
#utimately, this should read a file

exceptionList = {
"addendum":"Addenda",
"aircraft":"Aircraft",
"alumna":"Alumnae",
"alumnus":"Alumni",
"analysis":"Analyses",
"antenna":"Antennae",
"antithesis":"antitheses",
"apex":"Apices",
"appendix":"Appendices",
"axis":"Axes",
"bacillus":"Bacilli",
"bacterium":"Bacteria",
"basis":"Bases",
"beau":"Beaux",
"bison":"Bison",
"bureau":"Bureaux",
"cactus":"Cacti",
"château":"Châteaux",
"child":"Children",
"codex":"Codices",
"concerto":"Concerti",
"corpus":"Corpora",
"crisis":"Crises",
"criterion":"Criteria",
"curriculum":"Curricula",
	}

#List of last letters to be considered
considerLastLetter = ['s','h','x','z','o']

#List of consonants that are no problem in final position
noProblemConsonantsList = ['q','w','r','t','p','d','g','j','k','l','v','b','n','m']

#List of vowels. cf "case of the final "y"
vowelsList = ['e','u','i','o','a']

#grb user input

singWord = input("Enter a word in the singular: ")

if singWord in exceptionList.keys():
    plurWord = exceptionList[singWord]

# words like "fix", "pass", "path"
elif singWord[-1] in considerLastLetter:
    plurWord = singWord+'es'

# words like wolf
elif singWord[-1] == 'f':
    plurWord = singWord[:len(singWord)-1]+'ves'

# words like "wife"
elif singWord[-2:] == 'fe':
    plurWord = singWord[:len(singWord) - 2] + 'ves'

elif singWord[-1] == 'y' and singWord[-2] not in vowelsList:
    plurWord = singWord[:len(singWord)-1]+'ies'

else:
    plurWord = singWord + "s"

print(plurWord)





