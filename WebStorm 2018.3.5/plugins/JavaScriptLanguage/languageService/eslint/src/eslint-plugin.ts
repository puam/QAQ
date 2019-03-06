class ESLintResponse {
    request_seq: number;
    command: string;
    body?: any;
    error?: string;
}

export interface EslintPluginState extends PluginState {
    readonly eslintPackagePath: string;
    readonly additionalRootDirectory?: string;
    readonly filterSource: boolean | null;
}

interface ESLintRequest {
    /**
     * Unique id of the message
     */
    readonly seq: number;

    /**
     * Message type (usually it is "request")
     */
    readonly type: string;

    /**
     * Id of the command
     */
    readonly command: string;

    /**
     * Additional arguments
     */
    readonly arguments: RequestArguments;
}

interface RequestArguments {
    /**
     * .eslintignore file path
     */
    readonly ignoreFilePath: string;
    /**
     * Absolute path for the file to check
     */
    readonly fileName: string;

    /**
     * Absolute config path
     */
    readonly configPath: string | null;
    readonly content: string;
    readonly extraOptions: string | null;
}

export class ESLintPlugin implements LanguagePlugin {
    private static readonly GetErrors: string = "GetErrors";
    private static readonly FixErrors: string = "FixErrors";
    private readonly filterSource: boolean | null;
    private readonly additionalRulesDirectory?: string;
    private readonly options: any;
    private readonly cliEngine: any;
    private readonly basicPath: string;

    constructor(state: EslintPluginState) {
        this.filterSource = state.filterSource;
        this.additionalRulesDirectory = state.additionalRootDirectory;
        this.basicPath = ESLintPlugin.normalizePath(state.eslintPackagePath);
        this.options = require(this.basicPath + "lib/options");
        this.cliEngine = require(this.basicPath + "lib/cli-engine");
    }

    onMessage(p: string, writer: MessageWriter): void {
        const request: ESLintRequest = JSON.parse(p);
        let response: ESLintResponse = new ESLintResponse();
        response.request_seq = request.seq;
        response.command = request.command;
        try {
            let body: any;
            if (request.command === ESLintPlugin.GetErrors) {
                body = this.getErrors(request.arguments);
            } else if (request.command === ESLintPlugin.FixErrors) {
                body = this.fixErrors(request.arguments);
            }
            if (this.filterSource == null || this.filterSource) {
                ESLintPlugin.filterSourceOut(body);
            }
            response.body = body;
        } catch (e) {
            response.error = e.toString() + "\n\n" + e.stack
        }
        writer.write(JSON.stringify(response));
    }

    private static filterSourceOut(body: any) {
        for (let i = 0; i < body.length; i++) {
            let elem = body[i];
            if (elem != null) {
                if (elem.source != null) elem.source = "";
                if (elem.messages != null) {
                    for (let j = 0; j < elem.messages.length; j++) {
                        let message = elem.messages[j];
                        if (message.source != null) message.source = "";
                    }
                }
            }
        }
    }

    private getErrors(getErrorsArguments: RequestArguments): any {
        return this.invokeESLint(getErrorsArguments)
    }

    private fixErrors(fixErrorsArguments: RequestArguments): any {
        return this.invokeESLint(fixErrorsArguments, {fix: true})
    }

    private invokeESLint(requestArguments: RequestArguments, additionalOptions: {} = {}) {
        let args = this.createArguments(requestArguments);
        const parsedOptions = {...this.options.parse(args), ...additionalOptions};
        parsedOptions.ignorePath = requestArguments.ignoreFilePath;
        parsedOptions.ignore = true;
        const cliEngine = new this.cliEngine(ESLintPlugin.translateOptions(parsedOptions));
        if (cliEngine.isPathIgnored(requestArguments.fileName)) {
            return {results: []};
        }
        return cliEngine.executeOnText(requestArguments.content, requestArguments.fileName, true);
    }

    private createArguments(getErrorsArguments: any) {
        let args = "";
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
    }

    private static normalizePath(eslintPackagePath: string) {
        if (eslintPackagePath.charAt(eslintPackagePath.length - 1) !== '/' &&
            eslintPackagePath.charAt(eslintPackagePath.length - 1) !== '\\') {
            eslintPackagePath = eslintPackagePath + '/';
        }
        return eslintPackagePath.split("\\").join("/");
    }

    // taken from private part of eslint, we need it here
    /**
     * Translates the CLI options into the options expected by the CLIEngine.
     * @param {Object} cliOptions The CLI options to translate.
     * @returns {CLIEngineOptions} The options object for the CLIEngine.
     * @private
     */
    private static translateOptions(cliOptions: any): any {
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
    }
}
