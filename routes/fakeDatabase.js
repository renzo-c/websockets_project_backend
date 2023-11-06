/**
 * Due to my time constraints, I only simulated a database connection
 * variable "messages" would be the table and the functions represent
 * the common methods provided by a library or implemented by the user
 * to access the database
 */
let messages = [];

const getMessages = () => {
  return messages;
};

const addMessage = (message) => {
  messages.push(message);
  return messages;
};

const removeMessage = (messageId) => {
  messages = messages.filter((m) => m.messageId !== messageId);
  return messages;
};

const dbModel = {
  getMessages,
  addMessage,
  removeMessage,
};

module.exports = { db: dbModel };
