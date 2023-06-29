# Quick GPT Extension

The Quick GPT extension provides code explanation and error finding capabilities using OpenAI's GPT-3 language model.

## Features

- **Code Explanation**: Get a brief explanation of selected code snippets.
- **Code Error Finding**: Identify errors in selected code snippets and receive suggestions for resolving them.

## Requirements

To use this extension, you need to provide an OpenAI API key. Follow the instructions below to set up the API key:

1. Get an API key from OpenAI by signing up for an account at [https://www.openai.com](https://www.openai.com).
2. Configure the API key in Visual Studio Code settings:
   - Open the VS Code settings by going to File > Preferences > Settings or using the shortcut `Ctrl + ,`.
   - Search for "Quick GPT" and find the "Quick GPT: Api Key" setting.
   - Enter your OpenAI API key in the input field.
   - Save the settings.

## Usage

1. Open a code file in Visual Studio Code.
2. Select the code snippet you want to analyze or find errors in.
3. Use one of the following commands:

   - **Explain Code**: Right-click on the selected code and choose "Explain Code" from the context menu, or use the shortcut `Ctrl + Shift + P` and search for "Explain Code".
   - **Find Code Errors**: Right-click on the selected code and choose "Find Code Errors" from the context menu, or use the shortcut `Ctrl + Shift + P` and search for "Find Code Errors".

4. The results will be displayed in the "Quick GPT" output channel. If there are any search results, they will be shown in the output channel. Otherwise, a message will be displayed indicating no results were found.

## Extension Settings

This extension provides the following settings:

- `quickGPT.apiKey`: The API key for OpenAI. Set this value to authenticate with the OpenAI API.

## Known Issues

- No known issues at the moment.

## Contributions

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please create an issue in the [GitHub repository](https://github.com/your-username/quick-gpt-extension).

## License

This extension is licensed under the [MIT License](LICENSE).

