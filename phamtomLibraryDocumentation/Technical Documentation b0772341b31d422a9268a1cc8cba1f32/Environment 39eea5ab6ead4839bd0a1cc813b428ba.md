# Environment

Inside our project we include a file named env_template, which looks like this:

```jsx
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
```

Those are the variables you will need to put on your .env file, and are completely private.

- GOOGLE_CLIENT_ID
    - It’s the ID google provides to your account, and allows your app to use google’s oAuth
- GOOGLE_CLIENT_SECRET
    - The secret key that complements the GOOGLE_CLIENT_ID. That’s trully private
- MONGODB_URI
    - Your database’s URL: where all your data will be stored
    - If you wanted for example to store it on your local mongoDB database you would put something like this:
        
        ```jsx
        mongodb://localhost:27017/phamtomLibrary
        ```
        
    - You would put a mongoDB Atlas URI there.