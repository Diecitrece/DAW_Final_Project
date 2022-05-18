# Books

- Get
    
    ```jsx
    try {
      if (req.query.id) {
        logger.info("REQUEST GET Book by id = " + req.query.id);
        return res.status(200).json(await Books.findById(req.query.id));
      }
      if (req.query.name) {
        logger.info("REQUEST GET Book by name = " + req.query.name);
        return res.status(200).json(
          await Books.find({
            name: { $regex: req.query.name, $options: "i" },
          })
        );
      }
      if (req.query.ISBN) {
        logger.info("REQUEST GET Book by ISBN = " + req.query.ISBN);
        return res
          .status(200)
          .json(await Books.find({ ISBN: { $regex: req.query.ISBN } }));
      }
      logger.info("REQUEST GET Book and find all");
      return res.status(200).json(await Books.find({}));
    } catch (error) {
      logger.error("ERROR GET Book: " + error);
      return res.status(400).json({ success: false });
    }
    ```
    
    A book can be obtained by:
    
    - ID
        
        ```jsx
        api/books?id=anyBookID
        ```
        
        - Possible responses:
            - Code 200 → Book Object
            - Code 400
    - Name
        
        ```jsx
        /api/books?name=anyBookName
        ```
        
        - Possible responses:
            - Code 200 → Book Object
            - Code 400
    - ISBN
        
        ```jsx
        /api/books?ISBN=anyBookISBN
        ```
        
        - Possible responses:
            - Code 200 → Book Object
            - Code 400
    - Obtain all books
        
        ```jsx
        /api/books
        ```
        
        - Possible responses:
            - Code 200 → Array of Books
            - Code 400
- Post
    
    ```jsx
    const book = new Books(req.body);
      logger.info("REQUEST POST Book: " + book);
      const haveBook = await Books.find({ ISBN: { $regex: book.ISBN } });
      if (haveBook == "") {
        logger.info("REQUEST POST, Create new Book: " + book);
        return res.status(200).json(await book.save());
      }
      logger.info("REQUEST POST, Book already exists");
      return res
        .status(400)
        .json({ success: false, message: "ISBN already exists" });
      return;
    } catch (error) {
      logger.error("ERROR POST Book: " + error);
      return res.status(400).json({ success: false });
    }
    ```
    
    A book can be created by passing an entire book object:
    
    ```jsx
    {
    	"name": "anyBookName",
    	"ISBN": "anyBookISBN",
    	"author": "anyAuthor",
    	"description": "anyOverview",
    	"reviews": []
    }
    ```
    
    To this endpoint:
    
    ```jsx
    api/books
    ```
    
    - Possible responses:
        - Code 200 → Created book object
        - Code 400
        - Code 400 → “Book already exists”
- Update
    
    ```jsx
    try {
      await Books.findByIdAndUpdate(req.body._id, req.body);
      logger.info("REQUEST PUT Book by id = " + req.body._id);
      return res.status(200).json(await Books.findOne({ _id: req.body._id }));
    } catch (error) {
      logger.error("ERROR PUT Book: " + error);
      return res.status(400).json({ success: false });
    }
    ```
    
    A book can be updated by passing an ID and an entire book object:
    
    ```jsx
    {
    	"_id": "anyBookID"
    	"name": "anyBookName",
    	"ISBN": "anyBookISBN",
    	"author": "anyAuthor",
    	"description": "anyOverview",
    	"reviews": []
    }
    ```
    
    To this endpoint (with the PUT method):
    
    ```jsx
    api/books
    ```
    
    - Possible responses:
        - Code 200 → Updated book object
        - Code 400
- Delete
    
    ```jsx
    try {
      logger.info("REQUEST DELETE Book: " + req.body);
      return res
        .status(200)
        .json(await Books.deleteOne({ _id: req.body._id }));
    } catch (error) {
      logger.error("ERROR DELETE Book: " + error);
      return res.status(400).json({ success: false });
    }
    ```
    
    A book can be deleted by passing an ID:
    
    ```jsx
    {
    	"_id":anyBookID
    }
    ```
    
    To this endpoint:
    
    ```jsx
    api/books
    ```
    
    - Possible responses:
        - Code 200 → Deleted book object
        - Code 400