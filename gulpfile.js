var gulp = require('gulp'),
	htmllint = require('gulp-htmllint'),
	fancyLog = require('fancy-log'),
	colors = require('ansi-colors');

gulp.task('htmllint', function() {
	return gulp.src('./*.html')
		.pipe(htmllint({}, htmllintReporter));
});

function htmllintReporter(filepath, issues) {
	if (issues.length > 0) {
		issues.forEach(function (issue) {
			fancyLog(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
		});

		process.exitCode = 1;
	}
}