(function() {
  var gulp, notify, rename, stylus;

  gulp = require("gulp");

  rename = require("gulp-rename");

  notify = require("gulp-notify");

  stylus = require("gulp-stylus");

  module.exports = function() {
    return gulp.src("public/stylesheets/styl/vendor.styl").pipe(stylus({
      set: ["include css", "linenos"]
    })).on("error", notify.onError({
      message: "<%= error.message %>",
      title: "Stylus Error"
    })).pipe(gulp.dest("public/stylesheets"));
  };

}).call(this);
