
# coding: utf-8

# In[1]:


mystring = "test"


# In[3]:


#:o( Strings are imutable
mystring[0] = "T"


# In[9]:


# the "+" operator will concatenate strings
print((mystring[0].upper())+mystring[1:])


# In[10]:


# mystring is unaffected by the previous line
print(mystring)


# In[12]:


# the whole variable is now replaced by a new value
mystring = mystring[0].upper()+mystring[1:]
print(mystring)


# In[19]:


# Strings have a replace() method
mystring = mystring.replace("e","a")
print(mystring)


# In[20]:


# the "+" operator will concatenate strings
mystring = mystring + "e"
print(mystring)

