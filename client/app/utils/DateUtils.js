function formatCommentDate(timestamp) {
    return "Yesterday " + new Date(timestamp).toDateString() + " " + new Date(timestamp).toTimeString();
}

module.exports = {
    formatCommentDate: formatCommentDate
};