# ChatGPTScripts
TamperMonkey scripts to customize ChatGPT's UI/UX

## Usage:
- Install TamperMonkey in your browser: https://www.tampermonkey.net
- Download any of these scripts and install it in TamperMonkey (there's only one script for now)

## Scripts:
- CollapseChat: Provides buttons to collapse/expand all responses from chatGPT, and icons to collapse/expand individual responses.

## Limitations

- ChatGPT content is loaded via AJAX and I have yet to figure out how to have a script run automatically after each AJAX request completes. 
 
    Due to this limitation the scripts need to be triggered manually, by the user clicking anywhere on the page after the content has loaded. This also means that after selecting another chat via the menu side, the page must be refreshed for the same process to work (i.e. refresh the page, then click on it to activate this script). 

    This is very hacky and it sucks, but it works. If there's a way to hook into the AJAX request completion, I haven't found it yet but I'm still looking. You're welcome to fix it :-)
