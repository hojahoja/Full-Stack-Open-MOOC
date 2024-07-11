const dummy = (blogs) => (blogs ? 1 : 1);
const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

module.exports = { dummy, totalLikes };
