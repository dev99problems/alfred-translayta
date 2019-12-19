# alfred-translayta

> **Translate** with Google Translate in Alfred (*en-ru* / *ru-en*). **Save** to favorites. Finally **learn** unhandy words.

Alfred Translayta is a workflow for Alfred, which let's you easily get translation for en-ru, ru-en pairs, add words to favorites and have convenient way to review and memorize them later.

## Features
* **auto language detection** — `Simply start typing, no need to set translate direction.`
* **autocorrection** of user input. `Mistype something? No need to retype.`
* **add/delete/edit** words to your list of **favorites**. `Save words. Learn them even when you are offline.`
* **favorites in "learning mode"**. `Open your favorites without translations. Get translation of each word on demand.`
* **auto save** of your  favorites list **into a file**. `Add words to favorites and have them backuped in a separate file.`

## Prerequisites
You need [Node.js 8+](https://nodejs.org) and Alfred 3 or 4 with the paid [Powerpack](https://www.alfredapp.com/powerpack/) upgrade.

## Install
```
$ npm install --global alfred-translayta
```

## Usage
Open Alfred, press `t` and enter word or phrase you want to translate in russian or english.
Or instead press `Cmd+Shift+K` and get directly to main workflow window.

**How to use:**
* **for translation**: 
  - open Alfred and type `t` or press `Cmd+Shift+K`
  - start typing to get translations.
* **to get previous translation from cache**: 
  - open Alfred and type `t` and press twice `spacebar`. 
  - OR press `Cmd+Shift+K` and press `spacebar`
* **access to favorites**: 
  - open Alfred and type `t  .` 
  - OR `Cmd+Shift+K` and type `.`
* **show favorites without translations**: 
  - open Alfred and type `t  ..` 
  - OR `Cmd+Shift+K` and type `..`
  - by pressing `Alt` button you can see translations of selected word

**List of default HotKeys:**

`Cmd+Shift+K` — open workflow main window

`Cmd+Shift+J` — open favorites list (shortcut for `Cmd+Shift+K` + and entered `.`)


## How it is different
There are a lot of more popular alfred workflows for translation.
I really like 2 of them:
* [alfred-translate](https://github.com/podgorniy/alfred-translate) — ideological inspiration (`python` + `yandex translate`). The problem for me here is all `yandex` services are restricted in Ukraine. Plus some unfixed `python` errors after a few translations while using VPN.
* [alfred-polyglot](https://github.com/nikersify/alfred-polyglot) — technical inpiration (`node` + `google translate`). **Alfred-polyglot** is really cool, you can translate to any language or set default translation pair, but the translations are restricted to only 1 option and really often it was not a best fit.

> The best code is no code at all

**Why another solution?** It was an idea to mix both solutions and to get the best features of each: auto lang. detection, multiple options for translation and of course `favorites list`.

Moreover, `favorites` was the main feature I needed so bad. There are plenty of difficult words for me, which I translate over and over and still can't remember their meaning. Instead I would really like to have a place for all these words, which I could access even when my laptop is offline. So here it is!

## Testimonials

### Tech
Inspired by [alfred-translate](https://github.com/podgorniy/alfred-translate) and [alfred-polyglot](https://github.com/nikersify/alfred-polyglot).
Based on [Alfy](https://github.com/sindresorhus/alfy) and [google-translate-api](https://github.com/vitalets/google-translate-api) 

### Visual
All icons are taken from [flaticon.com](https://www.flaticon.com/) and thanks to all authors listed below:

Icon | Author
-----| -----
![globe](/icons/globe.png) | [Icongeek26](https://www.flaticon.com/authors/icongeek26)
![question](/icons/question.png) | [Darius Dan](https://www.flaticon.com/authors/darius-dan)
![history](/icons/history.png) | [Freepik](https://www.flaticon.com/authors/freepik)
![bookmark](/icons/bookmark.png) | [Freepik](https://www.flaticon.com/authors/freepik)
![edit](/icons/edit.png) | [Kiranshastry](https://www.flaticon.com/authors/kiranshastry)
![remove](/icons/remove.png) | [Darius Dan](https://www.flaticon.com/authors/darius-dan)
![save-changes](/icons/save-changes.png) | [inipagistudio](https://www.flaticon.com/authors/inipagistudio)
