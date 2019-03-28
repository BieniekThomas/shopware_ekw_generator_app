const replace = require('replace-in-file'); 	// Replace Strings in Files
const makeOtherCase = require('./makeOtherCase');
const appRoot = require('app-root-path');

function replaceStrings(ekwName, description) {

	const directoryName = ekwName;

	// @todo @KHH bitte richtige Namen vergeben
	const plugin_name = makeOtherCase.makeOtherCase(ekwName);
	const element_template = directoryName + '_two';
	const element_name = directoryName + '_three';
	const element_cls = directoryName + '_four';
	const element_desc = description;
	const link = directoryName + '_six';
	const author = directoryName + '_seven';
	const plugin_mod_name = directoryName + '_eight';
	const desc_de = description;
	const desc_en = description + '_eng';

	// replace strings options
	const pluginNameOptions = {
		files: [
			'./_Shopware_Plugins/' + directoryName + '/**/*.php',
			'./_Shopware_Plugins/' + directoryName + '/**/*.xml',
			'./_Shopware_Plugins/' + directoryName + '/**/*.js',
			'./_Shopware_Plugins/' + directoryName + '/**/*.tpl',
			'./_Shopware_Plugins/' + directoryName + '/**/*.less',
		],
		//Replacement to make (string or regex)
		from: [
			/\[::plugin_name::\]/g,
			/\[::element_template::\]/g,
			/\[::element_name::\]/g,
			/\[::element_cls::\]/g,
			/\[::element_desc::\]/g,
			/\[::link::\]/g,
			/\[::author::\]/g,
			/\[::plugin_mod_name::\]/g,
			/\[::desc_de::\]/g,
			/\[::desc_en::\]/g
		],
		to: [
			plugin_name,
			element_template,
			element_name,
			element_cls,
			element_desc,
			link,
			author,
			plugin_mod_name,
			desc_de,
			desc_en
		],
	};

	// replace Strings
	process.chdir(appRoot.toString());
	try {
		replace.sync(pluginNameOptions);
	}
	catch (error) {
		console.error('Error occurred:', error);
	}
}

module.exports = replaceStrings;
