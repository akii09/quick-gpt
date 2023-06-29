import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
  console.log('"Quick GPT" extension is now active!');
// Code explanation command
  let disposeExplanation = vscode.commands.registerCommand('extension.explain_quickGPT', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.document.getText(editor.selection);
      if (selection) {
        showGPTResults(selection, 'explain');
      } else {
        vscode.window.showInformationMessage('Please select some code before using Quick GPT.');
      }
    } else {
      vscode.window.showInformationMessage('Please open a file before using Quick GPT.');
    }
  });

//   Code error finding command
let disposeErrorFinder = vscode.commands.registerCommand('extension.error_quickGPT', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.document.getText(editor.selection);
      if (selection) {
        showGPTResults(selection, 'error');
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

async function showGPTResults(codeSnippet: string, type: string) {
  // TODO: Implement GPT code search logic here
  
  // Example implementation:
//   let result = '';
//   if(type==='explain'){
// 	result = `This is the explanation for the selected code snippet: ${codeSnippet}`;
//   }else if(type==='error'){
// 	result = `No errors found for the selected code snippet: ${codeSnippet}`;
//   }

  const apiUrl = 'https://api.github.com/search/code';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: codeSnippet,
        sort: 'best',
        order: 'desc'
      }
    });

    const items = response.data.items;
    if (items.length > 0) {
      const outputChannel = vscode.window.createOutputChannel('Quick GPT');
      outputChannel.appendLine(`Search results for "${codeSnippet}":`);

      items.forEach((item: any) => {
        const fileName = item.name;
        const repositoryName = item.repository.full_name;
        const fileUrl = item.html_url;

        outputChannel.appendLine(`- ${fileName} (${repositoryName})`);
        outputChannel.appendLine(`  ${fileUrl}`);
      });

      outputChannel.show();
    } else {
      vscode.window.showInformationMessage('No search results found for the selected code snippet.');
    }
  } catch (error) {
    console.error('Error occurred during code search:', error);
    vscode.window.showErrorMessage('An error occurred during code search. Please try again.');
  }

//   vscode.window.showInformationMessage(result);
	// const terminal = vscode.window.createTerminal('Quick GPT');
	// terminal.show();
	// terminal.sendText(result);
	// const outputChannel = vscode.window.createOutputChannel('Quick GPT');
	// outputChannel.appendLine(result);
	// outputChannel.show();
}

export function deactivate() {}
