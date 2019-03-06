"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var ESLintResponse = /** @class */ (function () {
    function ESLintResponse() {
    }
    return ESLintResponse;
}());
var ESLintPlugin = /** @class */ (function () {
    function ESLintPlugin(state) {
        this.filterSource = state.filterSource;
        this.additionalRulesDirectory = state.additionalRootDirectory;
        this.basicPath = ESLintPlugin.normalizePath(state.eslintPackagePath);
        this.options = require(this.basicPath + "lib/options");
        this.cliEngine = require(this.basicPath + "lib/cli-engine");
    }
    ESLintPlugin.prototype.onMessage = function (p, writer) {
        var request = JSON.parse(p);
        var response = new ESLintResponse();
        response.request_seq = request.seq;
        response.command = request.command;
        try {
            var body = void 0;
            if (request.command === ESLintPlugin.GetErrors) {
                body = this.getErrors(request.arguments);
            }
            else if (request.command === ESLintPlugin.FixErrors) {
                body = this.fixErrors(request.arguments);
            }
            if (this.filterSource == null || this.filterSource) {
                ESLintPlugin.filterSourceOut(body);
            }
            response.body = body;
        }
        catch (e) {
            response.error = e.toString() + "\n\n" + e.stack;
        }
        writer.write(JSON.stringify(response));
    };
    ESLintPlugin.filterSourceOut = function (body) {
        for (var i = 0; i < body.length; i++) {
            var elem = body[i];
            if (elem != null) {
                if (elem.source != null)
                    elem.source = "";
                if (elem.messages != null) {
                    for (var j = 0; j < elem.messages.length; j++) {
                        var message = elem.messages[j];
                        if (message.source != null)
                            message.source = "";
                    }
                }
            }
        }
    };
    ESLintPlugin.prototype.getErrors = function (getErrorsArguments) {
        return this.invokeESLint(getErrorsArguments);
    };
    ESLintPlugin.prototype.fixErrors = function (fixErrorsArguments) {
        return this.invokeESLint(fixErrorsArguments, { fix: true });
    };
    ESLintPlugin.prototype.invokeESLint = function (requestArguments, additionalOptions) {
        if (additionalOptions === void 0) { additionalOptions = {}; }
        var args = this.createArguments(requestArguments);
        var parsedOptions = __assign({}, this.options.parse(args), additionalOptions);
        parsedOptions.ignorePath = requestArguments.ignoreFilePath;
        parsedOptions.ignore = true;
        var cliEngine = new this.cliEngine(ESLintPlugin.translateOptions(parsedOptions));
        if (cliEngine.isPathIgnored(requestArguments.fileName)) {
            return { results: [] };
        }
        return cliEngine.executeOnText(requestArguments.content, requestArguments.fileName, true);
    };
    ESLintPlugin.prototype.createArguments = function (getErrorsArguments) {
        var args = "";
        if (getErrorsArguments.configPath != null) {
            args += "-c \"" + getErrorsArguments.configPath + "\"";
        }
        if (getErrorsArguments.extraOptions != null && getErrorsArguments.extraOptions.length > 0) {
            args += " " + getErrorsArguments.extraOptions;
        }
        if (this.additionalRulesDirectory != null && this.additionalRulesDirectory.length > 0) {
            args += " --rulesdir=\"" + this.additionalRulesDirectory + "\"";
        }
        return args;
    };
    ESLintPlugin.normalizePath = function (eslintPackagePath) {
        if (eslintPackagePath.charAt(eslintPackagePath.length - 1) !== '/' &&
            eslintPackagePath.charAt(eslintPackagePath.length - 1) !== '\\') {
            eslintPackagePath = eslintPackagePath + '/';
        }
        return eslintPackagePath.split("\\").join("/");
    };
    // taken from private part of eslint, we need it here
    /**
     * Translates the CLI options into the options expected by the CLIEngine.
     * @param {Object} cliOptions The CLI options to translate.
     * @returns {CLIEngineOptions} The options object for the CLIEngine.
     * @private
     */
    ESLintPlugin.translateOptions = function (cliOptions) {
        return {
            envs: cliOptions.env,
            extensions: cliOptions.ext,
            rules: cliOptions.rule,
            plugins: cliOptions.plugin,
            globals: cliOptions.global,
            ignore: cliOptions.ignore,
            ignorePath: cliOptions.ignorePath,
            ignorePattern: cliOptions.ignorePattern,
            configFile: cliOptions.config,
            rulePaths: cliOptions.rulesdir,
            useEslintrc: cliOptions.eslintrc,
            parser: cliOptions.parser,
            parserOptions: cliOptions.parserOptions,
            cache: cliOptions.cache,
            cacheFile: cliOptions.cacheFile,
            cacheLocation: cliOptions.cacheLocation,
            fix: cliOptions.fix,
            allowInlineConfig: cliOptions.inlineConfig
        };
    };
    ESLintPlugin.GetErrors = "GetErrors";
    ESLintPlugin.FixErrors = "FixErrors";
    return ESLintPlugin;
}());
exports.ESLintPlugin = ESLintPlugin;
//# sourceMappingURL=eslint-plugin.js.map