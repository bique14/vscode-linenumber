const vscode = require('vscode')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const commands = [
		vscode.commands.registerCommand('extension.insertLineNumber', insertLine)
	]

	commands.forEach(function (command) {
		context.subscriptions.push(command)
	})
}

function insertLine() {
	const editor = vscode.window.activeTextEditor
	const line = editor.selection.active.line
	const textObject = editor.document.lineAt(line)

	const check = 'console.log('
	const { lineNumber, text } = textObject
	const index = text.match(/\(/).index

	if (text.includes(check)) {
		editor.edit(
			edit => editor.selections.forEach(
				selection => {
					edit.insert(new vscode.Position(lineNumber, index + 1), `${lineNumber + 1},`)
				}
			)
		)
		vscode.window.showInformationMessage(`Insert line ${lineNumber + 1}!`)
	} else {
		vscode.window.showInformationMessage(`Line ${lineNumber + 1} is exist or not a console log.`)
	}
}


exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
