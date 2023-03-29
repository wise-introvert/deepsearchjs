module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    ts: {
      default: {
        tsconfig: "./tsconfig-build.json",
      },
      build: {
        src: ["src/index.ts", "!node_modules/**/*.ts"],
        // Avoid compiling TypeScript files in node_modules
        options: {
          module: "commonjs",
          fast: "never",
          declaration: true,
        },
        outDir: "dist",
      },
    },
    uglify: {
      dist: {
        files: {
          "dist/index.js": "dist/index.js",
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default tasks.
  grunt.registerTask("default", ["ts:build", "uglify"]);
};
