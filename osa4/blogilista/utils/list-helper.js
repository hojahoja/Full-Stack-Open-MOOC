const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);
const mostLikes = (blogs) => {
  const mostLiked = blogs.reduce((acc, blog) => (acc.likes > blog.likes ? acc : blog), {
    title: null,
    likes: 0,
  });
  return mostLiked.title ? mostLiked : undefined;
};

module.exports = { totalLikes, mostLikes };
