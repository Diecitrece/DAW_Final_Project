# Book requests

- Get
    
    ```jsx
    try {
      if (req.query.id) {
        logger.info("REQUEST GET Request by id = " + req.query.id);
        return res.status(200).json(await Request.findById(req.query.id));
      }else if (req.query.idUsuario) {
        logger.info("REQUEST GET Request by idUsuario = " + req.query.idUsuario);
        return res.status(200).json(await Request.find({"idUsuario":req.query.idUsuario}));
      }else {
        logger.info("REQUEST GET Request and find all");
        return res.status(200).json(await Request.find({}));
      }
    } catch (error) {
      logger.error("ERROR GET Request: " + error);
      return res.status(400).json({ success: false });
    }
    ```
    
    A book request can be obtained by passing:
    
    - ID
        
        ```jsx
        api/requests?id=anyRequestID
        ```
        
        - Possible responses:
            - Code 200 → Request object
            - Code 400
    - idUsuario
        
        ```jsx
        api/requests?idUsuario=anyUserID
        ```
        
        - Possible responses:
            - Code 200 → Request object
            - Code 400
    - Get all book requests
        
        ```jsx
        api/requests
        ```
        
        - Possible responses.
            - Code 200 → Array of requests
            - Code 400
- Post
    
    ```jsx
    try {
      if (req.body.name) {
        const request = new Request(req.body);
        logger.info("REQUEST POST Request by name = " + req.body.name);
        return res.status(200).json(await request.save());
      }
      logger.error("REQUEST POST Request name empty: ");
      return res.status(400).json({ success: false });
    } catch (error) {
      logger.error("ERROR POST Request: " + err);
      return res.status(500).json({ message: err.message });
    }
    ```
    
    A book request can be created by passing an entire request object:
    
    ```jsx
    {
    	"idUsuario": "anyUserID",
    	"name": "anyBookName",
    	"author": "anyBookAuthor",
    	"description": "anyBookOverview"
    }
    ```
    
    To this endpoint:
    
    ```jsx
    api/requests
    ```
    
    - Possible responses
        - Code 200 → Created request
        - Code 400 → Empty
        - Code 500
- Update
    
    ```jsx
    try {
      if (req.body._id) {
        const request = new Request(req.body);
        logger.info("REQUEST PUT Request by id = " + req.body._id);
        await Request.findOneAndUpdate({ _id: req.body._id }, request);
        return res
          .status(200)
          .json(await Request.findOne({ _id: req.body._id }));
      }
      logger.error("REQUEST PUT Request id empty: ");
      return res.status(400).json({ success: false });
    } catch (error) {
      logger.error("ERROR PUT Request: " + err);
      return res.status(500).json({ message: err.message });
    }
    ```
    
    A book request can be updated by passing an entire request object:
    
    ```jsx
    {
    	"_id": "anyRequestID"
    	"idUsuario": "anyUserID",
    	"name": "anyBookName",
    	"author": "anyBookAuthor",
    	"description": "anyBookOverview"
    }
    ```
    
    To this endpoint (use PUT method):
    
    ```jsx
    api/requests
    ```
    
    - Possible responses:
        - Code 200 → Updated book request
        - Code 400
        - Code 500
- Delete
    
    ```jsx
    try {
      logger.info("REQUEST DELETE Request by id = " + req.body._id);
      return res
        .status(200)
        .json(await Request.deleteOne({ _id: req.body._id }));
    } catch (error) {
      logger.error("ERROR DELETE Request: " + err);
      return res.status(400).json({ success: false });
    }
    ```
    
    A book request can be deleted by passing an ID:
    
    ```jsx
    {
    	"_id":"anyRequestID"
    }
    ```
    
    To this endpoint:
    
    ```jsx
    api/requests
    ```
    
    - Possible responses:
        - Code 200 → Deleted book request
        - Code 400