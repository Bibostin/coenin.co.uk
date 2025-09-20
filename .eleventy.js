// this file is written in common JS, wheras most tutorials
// for 11ty are in ecmescript, I think it looked nastier so
// didn't use it. Keep this in mind, easy gotcha :)

module.exports = (conf) => {

    // raw copy robots.txt to <output>
    conf.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });

    // raw copy site assets to <output>
    conf.addPassthroughCopy({ 'src/_includes/assets/': '/assets/' });

    // ignore pages that have been archived when building
    conf.ignores.add('src/archived');

    // ignore the guestbook when building
    conf.ignores.add('src/directory/embers/guestbook');

    // define a function that can be used to make a front matter value
    // mandatory within a given template. raises a build error if found
    // to not be present.
    // usage: {{ <val> | require_val('<val_name>') }}
    conf.addFilter("require_string", function(value, name="No name passed!") {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error(`Missing required string value: ${name}`);
        }
        return value;
    });

    // process all templates / html files through nunjucks
    // where <input> dir is ./src and <output> is ./dest
	return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
		dir: {
			input: 'src',
			output: 'dest',
		},
	};
};
