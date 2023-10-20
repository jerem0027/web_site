const fs = require('fs');
const path = require('path');

// Get Args
let args = process.argv.slice(2);

let template_file = args[0];
let data_file = args[1];
let dest_file = args[2];

if (!dest_file) {
  console.log(
    'node process_template.js template_file ressource_file dest_file'
  );
  process.exit();
}

if (!fs.existsSync(template_file)) {
  console.error('file ' + template_file + ' does not exist');
  process.exit();
}

if (!fs.existsSync(data_file)) {
  console.error('file ' + json_ressource_file + ' does not exist');
  process.exit();
}
const file_name = dest_file.split('/');
process.stdout.write(file_name[file_name.length - 1]);

const helpers = require('./custom-helpers');
const Handlebars = require('./handlebars');
const yaml = require('./js-yaml');

// Get Register Helper
helpers.registerHelpers(Handlebars);
require('./handlebars_helpers').register(Handlebars);
process.stdout.write('.');

// get current path
let curpath = process.cwd();

// Get Template
let template = fs.readFileSync(template_file, { encoding: 'utf8' });
process.stdout.write('.');

// Get data from Yaml
let yaml_data = yaml.load(fs.readFileSync(data_file, { encoding: 'utf8' }));

process.chdir(path.dirname(template_file));
process.stdout.write('.');

let handletemplate = Handlebars.compile(template);
let final_file = handletemplate(yaml_data);
process.chdir(curpath);
fs.writeFileSync(dest_file, final_file, { encoding: 'utf8' });

console.log('\x1b[0;32mDONE\x1b[0m');
