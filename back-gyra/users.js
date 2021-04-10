const users = [];

const addUser = ({ id, name }) => {
  const existingUser = users.find((user) => user.name.trim().toLowerCase() === name.trim().toLowerCase());
  if (existingUser) return { error: 'Username is taken' }
  const user = { id, name };
  users.push(user);
  return { user };

}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
  return index;

}

const getUser = (id) => users.find(user => user.id === id);

module.exports = { addUser, removeUser, getUser };