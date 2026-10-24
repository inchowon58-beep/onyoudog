export function pickRandomReviews(reviews, count) {
  if (!Array.isArray(reviews) || reviews.length === 0) return [];
  const copy = [...reviews];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}
