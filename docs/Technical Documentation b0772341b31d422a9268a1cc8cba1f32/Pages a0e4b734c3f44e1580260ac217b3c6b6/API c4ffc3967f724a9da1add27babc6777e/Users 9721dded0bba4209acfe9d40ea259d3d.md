# Users

The User’s API is partially made with nextAuth, which creates the users based on their google accounts.

- Get
    
    ```jsx
    if (req.query.id) {
      logger.info("REQUEST GET User by id = " + req.query.id);
      return res.status(200).json(await Users.findById(req.query.id));
    }
    if (req.query.name) {
      logger.info("REQUEST GET User by name = " + req.query.name);
      return res.status(200).json(
        await Users.find({
          name: { $regex: req.query.name, $options: "i" },
        })
      );
    }
    logger.info("REQUEST GET User and find all");
    return res.status(200).json(await Users.find({}));
    } catch (error) {
    logger.error("ERROR GET User: " + error);
    return res.status(400).json({ success: false });
    }
    ```
    
    ---
    
    A user can be obtained by… 
    
    - ID
        
        ```jsx
        api/users?id=anyUserID
        ```
        
        - Posible responses
            - Code 200 → User Object
            - Code 400
    
    - Name
        
        ```jsx
        api/users?name=anyUserName
        ```
        
        - Posible responses
            - Code 200 → User Object
            - Code 400
    - Obtain all users
        
        ```jsx
        api/users
        ```
        
        - Posible responses
            - Code 200 → Array of Users
            - Code 400
    
- Post
    
    This is the part where nextAuth makes all the work
    
    ```jsx
    NextAuth(req, res, {
        session: {
          jwt: true,
        },
        providers: [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ],
        adapter: MongoDBAdapter(clientPromise),
        callbacks: {
          async signIn({ user, account, profile, email, credentials }) {
            if (!user?.role) {
              user.role = "Client";
              user.banned = false;
            }
            return true;
          },
          async jwt(token, user, account, profile, isNewUser) {
            if (account?.accessToken) {
              token.accessToken = account.accessToken;
            }
            if (user?.role) {
              token.role = user.role;
            }
            if (user?.banned) {
              token.banned = user.banned;
            }
            return token;
          },
          async session(session, token) {
            if (token?.accessToken) {
              session.accessToken = token.accessToken;
            }
            if (token?.role) {
              session.user.role = token.role;
            }
            if (token?.banned) {
              token.banned = user.banned;
            }
            return session;
          },
        },
      });
    ```
    
    Here we only add the role and banned fields
    
- Update
    
    The only way you can change a User is changing it’s state from banned to not banned
    
    ```jsx
    try {
            if (req.body.id) {
              logger.info("REQUEST POST User by id = " + req.body.id);
              let user = await Users.findOne({ _id: req.body.id });
              await Users.updateOne(
                { _id: req.body.id },
                { banned: user.banned ? false : true }
              );
              user.banned = user.banned ? false : true;
              await user.save();
    
              return res.status(200).json(user);
            }
          } catch (error) {
            logger.error("ERROR POST User: " + error);
            return res.status(400).json({ success: false });
          }
    ```
    
    You can update the user by passing its ID in the body:
    
    ```jsx
    {
    	"id":"anyUserID"
    }
    ```
    
    To this endpoint:
    
    ```jsx
    api/users
    ```
    
    - Possible responses:
        - Code 200 → User object
        - Code 400
- Delete
    
    ```jsx
    try {
            logger.info("REQUEST DELETE Users: " + req.body);
            return res
              .status(200)
              .json(await Users.deleteOne({ _id: req.body._id }));
          } catch (error) {
            logger.error("ERROR DELETE Users: " + error);
            return res.status(400).json({ success: false });
          }
    ```
    
    You can delete the user by passing its ID:
    
    ```jsx
    {
    	"_id":anyUserID
    }
    ```
    
    To this endpoint:
    
    ```jsx
    api/users
    ```
    
    - Possible responses:
        - Code 200
        - Code 400