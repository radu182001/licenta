const escapeSqlString = (value) => value.replace(/'/g, "''");

module.exports = {
  escapeSqlString,
};
