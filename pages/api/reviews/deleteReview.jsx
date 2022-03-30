import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";

export default async (req, res) => {
    const { method } = req;
    if (method === "DELETE") {
        try {
            const { body } = req;
            const { idBook, idReview } = body;

            console.log(idBook);
            console.log(idReview);

            await dbConnect();

            const book = await Books.findById(idBook);

            //delete review if it exists

            book.reviews.forEach((review) => {
                console.log(review);

                if (review.idReview == idReview) {
                    //delete review from array of reviews in book
                    book.reviews.splice(book.reviews.indexOf(review), 1);
                }
            });

            await book.save();

            res.status(200).json(book);
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
}