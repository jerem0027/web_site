'use strict';

const fs = require('fs');

let m_handlebars = null;

const read = function(filepath, options) {
    return fs.readFileSync(filepath, 'utf8');
};

const read_liner = function (filepath, options) {
    return fs.readFileSync(filepath, 'utf8').replace('\n','');
};

const loadpartial = function(filepath, partialname, options) {
    return m_handlebars.registerPartial(partialname, fs.readFileSync(filepath, 'utf8'));
};


exports.register = function (handlebars) {
    handlebars.registerHelper('read', read);
    handlebars.registerHelper('read_liner', read_liner);
    handlebars.registerHelper('loadpartial', loadpartial);

    m_handlebars = handlebars;
};