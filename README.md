# alfred-translayta

<a src="https://www.npmjs.com/package/alfred-translayta"><img src="https://img.shields.io/npm/v/alfred-translayta?color=yellow" /></a>


> **Translate** with Google Translate in Alfred (*en-uk* / *uk-en*). **Save** to favorites. Finally, **learn** the words.

![](screenshots/dir.jpg)

Alfred Translayta is an Alfred workflow, which lets you easily translate 🇬🇧 to 🇺🇦, 🇺🇦 to 🇬🇧 pairs, add words to favorites and have convenient way to review and memorize them later.

## Features
### Translation
* Auto translate direction
* Auto-correction of misspelled words 
* Get last translation details from the cache
* Translate selected text in OS

### Favorites 
* Add/Edit/Delete into favorites
* Switch to learning mode
* Search in normal/learning mode 
* Auto save favorites to a file on disk

## Prerequisites
You need [Node.js 14+](https://nodejs.org) and Alfred 3 or 4 with the paid [Powerpack](https://www.alfredapp.com/powerpack/) upgrade.

## Install
```
$ npm install --global alfred-translayta
```

## Usage

Open Alfred and type `t` **or** press `Cmd+Shift+K` and:
* **to get translation**:  
  - start typing words or phrases in English or Ukrainian
* **to get previous translation from cache**: 
  - press `spacebar`
* **access the favorites**: 
  - type `.`
* **show favorites without translations(aka "learning mode")**: 
  - type `..`
  - by pressing `Alt` button you can see translations of selected word

## HotKeys

`Cmd+Shift+K` — to open workflow main window

`Cmd+Shift+J` — to open favorites list (shortcut for `Cmd+Shift+K` + and entered `.`)


## Screenshots

**Auto** detection of **translation direction**

![](screenshots/direction.jpg)

**Auto correction** of misspelled words

![](screenshots/autocorrection.jpg)

**Learning Mode**

![](screenshots/learning-mode.mov)

## Testimonials

**Visual** 
All icons are taken from [flaticon.com](https://www.flaticon.com/), so many kudos and thanks to [the authors](/icons/testimonials.md)

