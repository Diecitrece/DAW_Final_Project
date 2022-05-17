const calculateBookRating = (book) => {
  let sum = 0;
  book.reviews.map((review) => {
    sum += Number(review.rating);
  });

  let res = sum / book.reviews.length;
  return res;
};
export default calculateBookRating;
