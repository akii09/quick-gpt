import * as vscode from 'vscode';
import { Configuration, OpenAIApi } from 'openai';

export function activate(context: vscode.ExtensionContext) {
  // console.log('"Quick GPT" extension is now active!');

  const config = vscode.workspace.getConfiguration();
  const openApiKey: string | undefined = config.get('quickGPT.apiKey');

  if (!openApiKey) {
    vscode.window.showErrorMessage('No OpenAI API key provided. The extension will not function without an API key.');
    return;
  }

  let disposeExplanation = vscode.commands.registerCommand('extension.explain_quickGPT', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.document.getText(editor.selection);
      if (selection) {
        showGPTResults(selection, 'explain', openApiKey);
      } else {
        vscode.window.showInformationMessage('Please select some code before using Quick GPT.');
      }
    } else {
      vscode.window.showInformationMessage('Please open a file before using Quick GPT.');
    }
  });

  let disposeErrorFinder = vscode.commands.registerCommand('extension.error_quickGPT', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.document.getText(editor.selection);
      if (selection) {
        showGPTResults(selection, 'error', openApiKey);
      } else {
        vscode.window.showInformationMessage('Please select some code before using Quick GPT.');
      }
    } else {
      vscode.window.showInformationMessage('Please open a file before using Quick GPT.');
    }
  });

  context.subscriptions.push(disposeExplanation);
  context.subscriptions.push(disposeErrorFinder);
}

async function showGPTResults(codeSnippet: string, type: string, apiKey: string) {
  const outputChannel = vscode.window.createOutputChannel('Quick GPT');
  outputChannel.show();
  outputChannel.appendLine('Searching for code...');

  try {
    if (type === 'error') {
      codeSnippet = 'Please identify the error of the given code and resolve it\n' + codeSnippet;
    } else if (type === 'explain') {
      codeSnippet = 'Please explain the given code briefly\n' + codeSnippet;
    }

    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response: any = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: codeSnippet,
      max_tokens: 2500,
      temperature: 0,
    });

    let result: any = '';
    if (response.data.choices.length) {
      result = response.data.choices[0].text;
    }

    if (result) {
      const outputChannel = vscode.window.createOutputChannel('Quick GPT');
      outputChannel.appendLine('Search results:');
      outputChannel.appendLine(result);
      outputChannel.show();
    } else {
      vscode.window.showInformationMessage('No search results found for the selected code snippet.');
    }
  } catch (error: any) {
    console.error('Error occurred during code search:', error);
    vscode.window.showErrorMessage('An error occurred during code search. Please try again.');
  }
}

export function deactivate() {}
