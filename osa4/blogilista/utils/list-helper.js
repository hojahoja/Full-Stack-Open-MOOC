const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);
const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((acc, blog) => (acc.likes > blog.likes ? acc : blog), {
    title: null,
    likes: 0,
  });
  return mostLiked.title ? mostLiked : null;
};

/* Creates an object which tells you how many times an author has occurred on the given list of blogs.
topAuthor value gives you an object with most common author.
option changes the function to seek how much of the given value the author has, if the value exists.
*/
const authorOccurrence = (blogs, option) => {
  const authoredBlogs = blogs.reduce(
    (acc, blog) => {
      if (acc[blog.author] === undefined) {
        acc[blog.author] = 0;
      }
      if (blog[option] !== undefined) {
        acc[blog.author] += blog[option];
      } else {
        acc[blog.author] += 1;
      }
      if (acc[blog.author] >= acc.topAuthor.occurrences) {
        acc.topAuthor.author = blog.author;
        acc.topAuthor.occurrences = acc[blog.author];
      }
      return acc;
    },
    { topAuthor: { author: undefined, occurrences: 0 } }
  );

  return authoredBlogs;
};

const mostBlogs = (blogs) => {
  const topAuthor = authorOccurrence(blogs).topAuthor;
  return topAuthor.author ? { author: topAuthor.author, blogs: topAuthor.occurrences } : null;
};
const mostLikes = (blogs) => {
  const topAuthor = authorOccurrence(blogs, "likes").topAuthor;
  return topAuthor.author ? { author: topAuthor.author, likes: topAuthor.occurrences } : null;
};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
