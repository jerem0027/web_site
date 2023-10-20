'use strict';

exports.nodupkeys = {};
exports.global_vars = {};
exports.outputs = {};

exports.registerHelpers = function (Handlebars) {
  Handlebars.registerHelper('ifeq', function (a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });

  Handlebars.registerHelper('ifcontains', function (s1, s2, opts) {
    if (s1 && s2 && s1.indexOf(s2) >= 0) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });

  Handlebars.registerHelper({
    notexist: function (v1) {
      return !v1;
    },
    contains: function (v1, v2) {
      return v1 && v2 && v1.indexOf(v2) >= 0;
    },
    notcontains: function (v1, v2) {
      return v1 && v2 && v1.indexOf(v2) < 0;
    },
    collcontains: function (coll, element) {
      return coll.includes(element);
    },
    eq: function (v1, v2) {
      return v1 === v2;
    },
    ne: function (v1, v2) {
      return v1 !== v2;
    },
    lt: function (v1, v2) {
      return v1 < v2;
    },
    gt: function (v1, v2) {
      return v1 > v2;
    },
    lte: function (v1, v2) {
      return v1 <= v2;
    },
    gte: function (v1, v2) {
      return v1 >= v2;
    },
    and: function () {
      return Array.prototype.slice.call(arguments).every(Boolean);
    },
    or: function () {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
  });

  Handlebars.registerHelper(
    'setVariable',
    function (varName, varValue, options) {
      options.data.root[varName] = varValue;
    }
  );

  Handlebars.registerHelper('tolower', function (value) {
    let res = '';
    if (value) res = value;
    res = res.toLowerCase();
    return res;
  });

  Handlebars.registerHelper('toupper', function (value) {
    let res = '';
    if (value) res = value;
    res = res.toUpperCase();
    return res;
  });

  Handlebars.registerHelper(
    'filterarraybyenv',
    function (listitemswithenvs, env, opts) {
      if (!listitemswithenvs) return null;

      let result = [];

      for (const item of listitemswithenvs) {
        if (!item.env || item.env == env) {
          result.push(item);
        }
      }

      return result;
    }
  );
};
