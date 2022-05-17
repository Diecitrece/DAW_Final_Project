export default function reviewConverter(reviewAverage) {
  let reviewTotal = "";
  let half_stars = 0;
  let rounded = Math.floor(reviewAverage);
  if (reviewAverage > rounded) half_stars++;
  let stars = rounded;
  for (let i = 0; i < stars; i++) {
    reviewTotal += '<i class="fas fa-star"></i>';
  }
  for (let i = 0; i < half_stars; i++) {
    reviewTotal += '<i class="fas fa-star-half-alt"></i>';
  }
  return reviewTotal;
}
