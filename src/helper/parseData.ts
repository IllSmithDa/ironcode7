/* eslint-disable no-useless-escape */

import { listOfMatches } from "./Matches";

export const parseConcepts = (htmlString: string, elementId: string) => {
  const element = document.getElementById(elementId);
  let newText = htmlString;
  listOfMatches.forEach((item) => {
    if (newText?.indexOf(item.keyword as string) !== -1) {
      const reStatement = new RegExp(`\\b${item.keyword}\\b`, 'gi')
      newText = newText?.replace(reStatement, `<font color="${item.color}">${item.keyword}</font>`) as string;
    }
  })

  newText = newText?.replace(/\$/g, `<font color="#00BFFF">$</font>`) as string;
  newText = newText?.replace(/\<bits\/stdc\+\+\.h\>/g, `&#60;<font color="#22AA22">${`bits/stdc++.h`}</font>&#62;`) as string;
  newText = newText?.replace(/\#include/g, `<font color="#00BFFF">${'#include'}</font>`) as string;
  newText = newText?.replace(/Integer/g, `<font color="#00BFFF">${`Integer`}</font>`) as string;
  newText = newText?.replace(/Intl/g, `<font color="#00BFFF">Intl</font>`) as string;
  newText = newText?.replace(/Int\s/g, `<font color="#00BFFF">${`Int `}</font>`) as string;
  newText = newText?.replace(/println!/g, `<font color="#00BFFF">${`println!`}</font>`) as string;
  newText = newText?.replace(/\/\*\nmulti \nline \ncomment\n\*\//g, `<font color="#22AA22">${`\/\*\nmulti \nline \ncomment\n\*\/`}</font>`) as string;
  newText = newText?.replace(/\"\"\"\nmulti \nline \ncomment\n\"\"\"/g, `<font color="#22AA22">${`\"\"\"\nmulti \nline \ncomment\n\"\"\"`}</font>`) as string;
  newText = newText?.replace(/\=begin\nmulti \nline \ncomment\n\=end/g, `<font color="#22AA22">${`\=begin\nmulti \nline \ncomment\n\=end`}</font>`) as string;
  newText = newText?.replace(/\%\{\nmulti \nline \ncomment\n\%\}/g, `<font color="#22AA22">${`\%\{\nmulti \nline \ncomment\n\%\}`}</font>`) as string;
  // comment matching
  const doubleQuotes = newText?.match(/["'][a-zA-Z0-9\\\n-\s\/!_\:\,\{\}\%!"!?]*["?'?]/g)
  doubleQuotes?.forEach((stringVal) => {
    const regexp = new RegExp(stringVal, "gi");
    newText = newText?.replace(regexp, `<font color="#E42217">${stringVal}</font>`)
  })

  const comments = newText?.match(/(\/\/[a-zA-Z0-9\s]+\n)|(\#[a-zA-Z0-9\s]+\n)|(\"\"\"[a-zA-Z0-9\n\s]+\"\"\")|(\%[a-zA-Z0-9\s]+\n)/g);
  comments?.forEach((stringVal) => {
    const regexp = new RegExp(stringVal, "g");
    newText = newText?.replace(regexp, `<font color="#22AA22">${stringVal}</font>`);
    // console.log(newText);
  })
  
  const cplusImports = newText?.match(/\<[a-zA-Z0-9\s\.\+]+\>/g);
  cplusImports?.forEach((stringVal) => {
    const regexp = new RegExp(stringVal, "g");
    newText = newText?.replace(regexp, `&#60;<font color="#22AA22">${stringVal.replace(">", "").replace("<", "")}</font>&#62;`);
    // console.log(newText);
  })
  

  // newText = newText?.replace(/\/\/ indent to indicate block of code/g, `<font color="#11BB22">// indent to indicate block of code</font>`) as string;
  // newText = newText?.replace(/\/\/ command line/g, `<font color="#11BB22">// command line</font>`) as string;
  newText = newText?.replace(/\(/g, `<font color="#A52A2A">(</font>`) as string;
  newText = newText?.replace(/\)/g, `<font color="#A52A2A">)</font>`) as string;
  newText = newText?.replace(/\[/g, `<font color="#D4A017">[</font>`) as string;
  newText = newText?.replace(/\]/g, `<font color="#D4A017">]</font>`) as string;  

  if (element) element.innerHTML = newText as string;
};



/* eslint-disable no-useless-escape */
/*
import { listOfMatches } from "./Matches";

export const parseConcepts = (htmlString: string, elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Utility function to escape HTML characters
  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  let newText = escapeHtml(htmlString);

  // Utility function to safely replace patterns
  const replacePattern = (pattern: string, replacement: string) => {
    const regex = new RegExp(pattern, 'gi');
    newText = newText.replace(regex, replacement);
  };

  // Replace keywords based on the list of matches
  listOfMatches.forEach((item) => {
    replacePattern(`\\b${item.keyword}\\b`, `<font color="${item.color}">${item.keyword}</font>`);
  });

  // Specific replacements with safe patterns
  const replacements = [
    { pattern: '\\$', replacement: `<font color="#00BFFF">$</font>` },
    { pattern: '&lt;bits\\/stdc\\+\\+\\.h&gt;', replacement: `&lt;<font color="#22AA22">bits/stdc++.h</font>&gt;` },
    { pattern: '#include', replacement: `<font color="#00BFFF">#include</font>` },
    { pattern: 'Integer', replacement: `<font color="#00BFFF">Integer</font>` },
    { pattern: 'Intl', replacement: `<font color="#00BFFF">Intl</font>` },
    { pattern: 'Int\\s', replacement: `<font color="#00BFFF">Int </font>` },
    { pattern: 'println!', replacement: `<font color="#00BFFF">println!</font>` },
    { pattern: '\\(', replacement: `<font color="#A52A2A">(</font>` },
    { pattern: '\\)', replacement: `<font color="#A52A2A">)</font>` },
    { pattern: '\\[', replacement: `<font color="#D4A017">[</font>` },
    { pattern: '\\]', replacement: `<font color="#D4A017">]</font>` },
  ];

  replacements.forEach(({ pattern, replacement }) => {
    newText = newText.replace(new RegExp(pattern, 'g'), replacement);
  });

  // Replace multi-line comments and quoted strings
  const multilineComments = [
    /\/\*\nmulti \nline \ncomment\n\*\//g,
    /\"\"\"\nmulti \nline \ncomment\n\"\"\"/g,
    /\=begin\nmulti \nline \ncomment\n\=end/g,
    /\%\{\nmulti \nline \ncomment\n\%\}/g
  ];

  multilineComments.forEach((pattern) => {
    const comment = pattern.source.replace(/\\/g, '');
    newText = newText.replace(pattern, `<font color="#22AA22">${comment}</font>`);
  });

  // Replace single-line comments and quoted strings
  const patterns = [
    { pattern: /(["'][a-zA-Z0-9\\\n-\s\/!_\:\,\{\}\%!"!?]*["?'?])/g, color: "#E42217" },  // Strings
    { pattern: /(\/\/[^\n]*\n)|(\#[^\n]*\n)|(\"\"\"[^\n]*\"\"\")|(\%[^\n]*\n)/g, color: "#22AA22" }, // Comments
    { pattern: /&lt;([a-zA-Z0-9\s\.\\+]+)&gt;/g, color: "#22AA22" }  // C++ Imports
  ];

  patterns.forEach(({ pattern, color }) => {
    const matches = newText.match(pattern);
    matches?.forEach((stringVal) => {
      // Escape double quotes to prevent issues with HTML rendering
      const escapedStringVal = stringVal.replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      const regexSafeString = escapedStringVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex special characters
      const regex = new RegExp(regexSafeString, "g");
      newText = newText.replace(regex, `<font color="${color}">${escapedStringVal}</font>`);
    });
  });

  // Finally, set the innerHTML once, safely
  element.innerHTML = newText;
};
*/