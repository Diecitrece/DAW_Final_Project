# Reviews reports

- Get
    
    ```jsx
    try {
      const { idReview } = req.body;
      if (!idReview) {
        let reports = [];
        const books = await Books.find();
        books.map((book) => {
          book.reviews.map((review) => {
            review.reports.map((report) => {
              reports.push({ bookName: book.name, report });
            });
          });
        });
        return res.status(200).json(reports);
      }
      logger.info("REQUEST GET Reviews idReview: ", idReview);
      const OidReview = mongoose.Types.ObjectId(idReview);
      const book = await Books.find({ "reviews.idReview": OidReview });
      let review = book[0].reviews.find((i) => {
        return i.idReview.toString() === idReview;
      });
      if (!review) return res.status(404).send("Review not found");
      logger.info("REQUEST GET Reviews: ", review);
      return res.status(200).json(review.reports);
    } catch (error) {
      logger.error("ERROR GET Reviews: ", error);
      return res.status(400).json({ success: false });
    }
    ```
    
    A review report can be obtained by passing it’s review’s ID:
    
    ```jsx
    {
    	"idReview":"anyReviewID"
    }
    ```
    
    To this endpoint:
    
    ```jsx
    api/reports
    ```
    
    - Possible responses:
        - Code 200 → Review object
        - Code 400
    
    All reports can be obtained without passing anything:
    
    ```jsx
    api/reports
    ```
    
    - Possible responses:
        - Code 200 → Array of reports
        - Code 400
- Post
    
    ```jsx
    try {
      const { idReview, report } = req.body;
      logger.info("REQUEST POST Reviews idReview: ", idReview);
      const OidReview = mongoose.Types.ObjectId(idReview);
      const book = await Books.find({ "reviews.idReview": OidReview }).lean();
      let review = book[0].reviews.find((i) => {
        return i.idReview.toString() === idReview;
      });
      if (!review) return res.status(404).send("Review not found");
      review.reports.push(report);
      await Books.findOneAndReplace({ _id: book[0]._id }, book[0]);
      logger.info("REQUEST POST Reviews: ", review);
      return res.status(200).json(review);
    } catch (error) {
      logger.error("ERROR POST Reviews: ", error);
      return res.status(400).json({ error });
    }
    ```
    
    A review report can be created by passing a review ID and an entire report object:
    
    ```jsx
    {
    	"idReview": "anyReviewID",
    	"report": {
    		"descriptionOptions": {
    			"offensive": true/false,
    			"irrealInfo": true/false
    		},
    		"description": "anyReportDescription"
    	}
    }
    ```
    
    <aside>
    💡 Being the descriptionOptions toggleable booleans
    
    </aside>
    
    - Possible responses:
        - Code 200 → Review object
        - Code 400
- Delete
    
    ```jsx
    try {
      const { idReview } = req.body;
      logger.info("REQUEST DELETE Reviews idReview: ", idReview);
      const OidReview = mongoose.Types.ObjectId(idReview);
      const book = await Books.find({ "reviews.idReview": OidReview }).lean();
      let review = book[0].reviews.find((i) => {
        return i.idReview.toString() === idReview;
      });
      if (!review) return res.status(404).send("Review not found");
      review.reports = [];
      await Books.findOneAndReplace({ _id: book[0]._id }, book[0]);
      logger.info("REQUEST DELETE Reviews: ", review);
      return res.status(200).json(review.reports);
    } catch (error) {
      logger.error("ERROR DELETE Reviews: ", error);
      return res.status(400).json({ error });
    }
    ```
    
    A review report can be deleted only if all the reports of a review are deleted
    
    This is mainly justified by the nature of the review object, as if It is reported is because will be deleted, but if there is no reason to report that review, every report assigned to it will be cleansed. That’s what this endpoint does.
    
    All reports of a review will be cleansed by passing a review ID:
    
    ```jsx
    {
    	"idReview": "anyReviewID"
    }
    ```
    
    To this endpoint:
    
    ```jsx
    api/reports
    ```
    
    - Possible responses:
        - Code 200 → Deleted reports array
        - Code 404 → Review not found
        - Code 400