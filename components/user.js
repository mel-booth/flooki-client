var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer

const url = require('./requestUrl')

function user (state, dispatch) {
  console.log("user view");
  return yo `
  <div class="homediv">
    ${header(state, dispatch)}
    <p>hello I am me</p>
    ${renderEntries(state, dispatch)}
    ${footer(dispatch)}
  </div>
  `
}

// REPETITION

function renderEntries (state, dispatch) {
  console.log({state});
  return yo `
    <div class='entries'>
      ${state.myEntries.map( (entry) => {
        return renderEntry(entry, state, dispatch)
      } )}
    </div>
  `
}

function renderEntry(entry, state, dispatch) {
  console.log("state is", state);
  return yo`
  <div class='entry'>
    ${entryHeader(entry, state, dispatch)}
    <img src=${entry.image_url}></img>
  </div>
  `
}

function entryHeader(entry, state, dispatch) {
  var timeDateEntry = entry.entry_created_at // In prep for date/time reformatting
  return yo`
    <div class='image-header'>
        <h2>Added at: ${timeDateEntry} </h2>
    </div>
  `
}

module.exports = user
