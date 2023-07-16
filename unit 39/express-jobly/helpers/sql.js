const { BadRequestError } = require("../expressError");

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // Generate SQL SET clause with parameterized placeholders
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

function getSqlWhereCompanyFilters(filter) {
  const { name, minEmployees, maxEmployees } = filter;

  let sqlFilter = "";
  if (name || minEmployees || maxEmployees) {
    if (minEmployees && maxEmployees && minEmployees > maxEmployees) {
      throw new BadRequestError(
        `minEmployees cannot be greater than maxEmployees`
      );
    }

    // Generate SQL WHERE clause based on filter parameters
    let nameSql = name ? `name ILIKE '%${name}%'` : "";
    let minSql = minEmployees
      ? `${nameSql ? "AND " : ""}num_employees >= ${minEmployees}`
      : "";
    let maxSql = maxEmployees
      ? `${nameSql || minSql ? "AND " : ""}num_employees <= ${maxEmployees}`
      : "";

    sqlFilter = `
        WHERE
          ${nameSql} ${minSql} ${maxSql}
      `;
  }

  return sqlFilter;
}

function getSqlWhereJobFilters(filter) {
  const { title, minSalary, hasEquity } = filter;

  let sqlFilter = "";
  if (title || minSalary || hasEquity) {
    // Generate SQL WHERE clause based on filter parameters
    let titleSql = title ? `title ILIKE '%${title}%'` : "";
    let minSalarySql = minSalary
      ? `${titleSql ? "AND " : ""}salary >= ${minSalary}`
      : "";
    let hasEquitySql = hasEquity
      ? `${titleSql || minSalarySql ? "AND " : ""}equity > 0`
      : "";

    sqlFilter = `
        WHERE
          ${titleSql} ${minSalarySql} ${hasEquitySql}
      `;
  }

  return sqlFilter;
}

module.exports = {
  sqlForPartialUpdate,
  getSqlWhereCompanyFilters,
  getSqlWhereJobFilters,
};
