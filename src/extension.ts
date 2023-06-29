import * as vscode from 'vscode';
import { Configuration, OpenAIApi } from "openai";

const API_KEY_STORAGE_KEY = 'quickGPT.apiKey';
export function activate(context: vscode.ExtensionContext) {
  console.log('"Quick GPT" extension is now active!');
  let openApiKey: string | undefined | any = context.secrets.get(API_KEY_STORAGE_KEY);
  if (!openApiKey) {
    vscode.window
      .showInputBox({
        prompt: 'Enter your OpenAI API key',
        ignoreFocusOut: true,
      })
      .then((apiKeyInput) => {
        if (!apiKeyInput) {
          vscode.window.showErrorMessage(
            'No OpenAI API key provided. The extension will not function without an API key.'
          );
          return;
        }
        openApiKey = apiKeyInput;
        context.secrets.store(API_KEY_STORAGE_KEY, openApiKey);
      });
  }
  // Code explanation command
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
  

  // Code error finding command
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

async function showGPTResults(codeSnippet: string, type: string, key:string) {
  vscode.window.showInformationMessage('key-'+key);
  // const openAi = new OpenAIApi(
  //   new Configuration({
  //     apiKey: openApiKey,
  //   })
  // );
// return;
  // try {
    
  //   if (type==='error'){
  //     codeSnippet = 'Please identify error of given code and resolve it \n' + codeSnippet;
  //   }else if(type==='explain'){
  //     codeSnippet = 'Please explain the given code \n' + codeSnippet;
  //   }

  //   const configuration = new Configuration({
  //     apiKey: key,
  //   });
  //   const openai = new OpenAIApi(configuration);
  //   const response:any = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: codeSnippet,
  //     max_tokens: 2500,
  //     temperature: 0,
  //   });

  //   let result:any = '';
  //   if (response.data.choices.length) {
  //     result = response.data.choices[0].text;
  //   }
  //   vscode.window.showInformationMessage(result);
  //   return;
  //   if (result) {
  //     const outputChannel = vscode.window.createOutputChannel('Quick GPT');
  //     outputChannel.appendLine(`Search results:\n`);
  //     outputChannel.appendLine(result);
  //     outputChannel.show();
  //   } else {
  //     vscode.window.showInformationMessage('No search results found for the selected code snippet.');
  //   }
  // } catch (error: any) {
  //   console.error('Error occurred during code search:', error);
  //   vscode.window.showErrorMessage('An error occurred during code search. Please try again.');
  // }
}

export function deactivate() {}
