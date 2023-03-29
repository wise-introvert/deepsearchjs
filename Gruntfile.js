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
    bump: {
      options: {
        files: ["package.json"],
        commit: true,
        commitMessage: "build: update build version to %VERSION%",
        commitFiles: ["-a"],
        createTag: true,
        tagName: "%VERSION%",
        tagMessage: "v%VERSION%",
        push: false,
        gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d",
        globalReplace: false,
        prereleaseName: false,
        metadata: "",
        regExp: false,
      },
    },
  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-bump");
  grunt.loadNpmTasks("grunt-git");

  grunt.registerTask("release", "bump:patch");
  grunt.registerTask("release:minor", "bump:minor");
  grunt.registerTask("release:major", "bump:major");
  // Default tasks.
  grunt.registerTask("default", ["ts:build", "uglify"]);
};
