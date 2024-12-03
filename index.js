const fs = require('fs');
const { hasJsonStructure } = require('nzfunc');

class nzconfig {
	config;

	constructor(options = { config: '/home/user/config.json' }) {
		try {
			this.config = options.config;
			let contents = fs.readFileSync(this.config);
			if (hasJsonStructure(contents.toString()) === true) {
				options = JSON.parse(contents);
			} else {
				throw new Error('The file does not have a JSON structure!');
			}
		} catch (e) {
			console.log(`Could not read config file: ${e}`);
		}

		let keys = Object.keys(options);
		for (let i = 0, l = keys.length; i < l; i++) {
			this[keys[i]] = options[keys[i]];
		}
	}

	writeConfigFile() {
		try {
			let config = {};
			let keys = Object.keys(this);
			for (let i = 0, l = keys.length; i < l; i++) {
				if (keys[i] !== 'config') config[keys[i]] = this[keys[i]];
			}
			fs.writeFileSync(this.config, JSON.stringify(config));
		} catch(e) {
			console.log(e);
		}
	}

}

module.exports = nzconfig;
