<h1 align="center">Sololearn-Explode </h1>


[![NPM Version](https://img.shields.io/npm/v/sololearn-explode.svg?style=flat-square)](https://www.npmjs.com/package/sololearn-explode)
[![NPM Downloads](https://img.shields.io/npm/dm/sololearn-explode.svg?style=flat-square)](https://www.npmjs.com/package/sololearn-explode)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## Contents
* [`sololearn` v2.4.2](#sololearn-v242)
    * [Contents](#contents)
    * [Installation](#installation)
    * [Usage](#usage)
    * [Note](#note)
    * [Methods](#methods)
        * [`basicInfo(sololearn_id)`](#basicInfosololearn_id)
        * [`userBadges(sololearn_id)`](#userBadgessololearn_id)
        * [`userCompletedCourses(sololearn_id)`](#userCompletedCoursessololearn_id)
        * [`codeUpvotes(sololearn_id)`](#codeUpvotessololearn_id)
        * [`allCodesLinks(sololearn_id)`](#allCodesLinkssololearn_id)
        * [`allCoursesXp(sololearn_id)`](#allCoursesXpsololearn_id)
        * [`plagroundCodes(section,language)`](#plagroundCodessectionlanguage)
    * [Errors](#errors)
    * [Types](#types)
        * sololearn_id
        * section
        * language

## Installation
```
$ npm install sololearn-explode
```

## Usage
```js
const sololearnExplode = require('sololearn-explode');

mainFuc();
async function mainFuc() {
    const user_basic_info = await sololearnExplode.basicInfo(13710268); // Returns object
    console.log(user_basic_info);
}
```
## Note
`Every Method Returns Promise after resolving you get an object`

## Methods
### `basicInfo(sololearn_id)`
The `sololearn_id` argument should be a `number` and it returns `Promise` with basic user information.
### `userBadges(sololearn_id)`
This method one argument `sololearn_id` and again should be a number returns `Promise` with  array of user badges.

### `userCompletedCourses(sololearn_id)`
Again same takes on argument `sololearn_id`  should be a number returns `Promise` with  array of user completed courses.
### `codeUpvotes(sololearn_id)`
Yup again same as above return object with `Promise` user all codes title with total upvotes.

### `allCodesLinks(sololearn_id)`
returns object with code title and code link.

### `allCoursesXp(sololearn_id)`
returns user Xp per course again its object.

### `plagroundCodes(section,language)`
Oh finally last one this method takes two args first `section` and second `language` both should be `String` reffer [Types](#types) for valid arguments.
This method returns array of objects every object contains every info about code.

## Errors
Errors You May Face
* `Error: invalid sololearn id`: You are passing invalid sololearn id should be in range of greather than 6 number and less than 10 numbers.  
* `Error: Invalid Sololearn Id Provided`: You are passing valid in range sololearn_id but its invalid or that user not exist.
* `Error: Got Invalid Responce`: This may be happens due to maybe sololearn blocking your requests in that plz consider opening `issue`.
* `Undefined error`: if you face any error which is not defined here plz open issue for that.


## Types
`List Of Valid Arguments `

    * sololearn_id
        * your_sololearn_id
    * section
        * trending
        * mostrecent
        * mostpopular
    * language 
        * web
        * kt
        * cpp
        * c
        * cs
        * java
        * py
        * php
        * rb
        * swift
        * all

<!-- Markdown link & img dfn's -->
[contributors-shield]: https://img.shields.io/github/contributors/PrasadBroo/sololearn-explode.svg?style=flat-square
[contributors-url]: https://github.com/PrasadBroo/sololearn-explode/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PrasadBroo/sololearn-explode.svg?style=flat-square
[forks-url]: https://github.com/PrasadBroo/sololearn-explode/network/members
[stars-shield]: https://img.shields.io/github/stars/PrasadBroo/sololearn-explode.svg?style=flat-square
[stars-url]: https://github.com/PrasadBroo/sololearn-explode/stargazers
[issues-shield]: https://img.shields.io/github/issues/PrasadBroo/sololearn-explode.svg?style=flat-square
[issues-url]: https://github.com/PrasadBroo/sololearn-explode/issues
[license-shield]: https://img.shields.io/github/license/PrasadBroo/sololearn-explode.svg?style=flat-square
[license-url]: https://github.com/PrasadBroo/sololearn-explode/blob/master/LICENSE.txt
