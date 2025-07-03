// this file is written in common JS, wheras most tutorials
// for 11ty are in ecmescript, keep this in mind, easy gotcha :)

module.exports = (conf) => {

    // raw copy robots.txt to <output>
    conf.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });
    // raw copy site assets to <output>
    conf.addPassthroughCopy({ 'src/_includes/assets/': '/assets/' });

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
