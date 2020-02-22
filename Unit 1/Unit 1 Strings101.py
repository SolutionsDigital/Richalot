
# coding: utf-8

# In[31]:


mystring = 'test'


# In[32]:


print(mystring)


# In[33]:


print(len(mystring))


# In[34]:


#print the first character of mystring
print(mystring[0])


# In[45]:


#print the first two characters of mystring
#starts before the character indexed 0 and "t" stops before the character indexed 2 "s"
print(mystring[0:2])


# In[35]:


# print (slice) from the nth character to the nth character
#starts before the character indexed 1 and "e" stops before the character indexed 3 "t"
print(mystring[1:3])


# In[37]:


# print (slice) from the nth character to the end 
#starts before the character indexed 1 and "e" stops after the character indexed 4 "t"
print(mystring[1:len(mystring)])


# In[38]:


# that's the same though
print(mystring[1:])


# In[39]:


#it works the other way around too
print(mystring[:2])


# In[40]:


# print the last letter of mystring
# Oops "Out of range" error, remember index starts at 0
# so this is effectively trying to print the 5th letter of "test", which does not exist! 
print(mystring[len(mystring)])


# In[41]:


# print the last letter of mystring... take 2
print(mystring[len(mystring)-1])


# In[42]:


#print the last two letters of mystring
#start before index 2 and finish before index 4
print(mystring[len(mystring)-2:len(mystring)])


# In[46]:


#Use negative value to start slicing from the right ;o)
#print the last two letters of mystring

print(mystring[-2:])


# In[28]:


print(a.replace('e','i'))

