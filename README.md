<div align="center">
  <a href="https://github.com/canalplus">
    <img src="media/gitlab-noir.png" alt="canal logo" width="500" height="150">
  </a>
</div>

<h1 align="center">Refined gitlab by Canal+</h1>

> Browser extension that adds useful features on gitlab interface for Canal+ team

# Install

# Features

- `highlight-who-thumb` - Show who thumbups in the merge request dashboard.
- `sort-WIP-state` - Sort the (Work in progress) state by letting them on the bottom.
- `replaceMrUrl` - This is a special use case, but basically, it replace an url in a merge request to under the form `https://host.com/nameofthebranch/index.html`
- `copyMR` - Permit to copy quickly the MR number of the Merge request panel
- `displayRecordBundleSize` - In our CI, we are getting the bundlesize of the our current build, this feature is here to display the size of the build.
- `changeCountLabel` - Display the change count as label on the MR page.
- `commute` - Display the commute of T2 and 126 bus (Issy to Versailles and Issy to StCloud)

# Disable features

We let you the possibility to disable feature, if it doesnt fit your specific need, to do that, simply click on the extension logo specify which features you want to unenable.

Format in the textArea should be of the following form:

`nameofthefeaturetodisable,nameofthefeaturetodisable,...`

Feature name:

- `displayUserWhoThumbMR`
- `sortWipState`
- `replaceMrUrl`
- `copyMR`
- `displayRecordBundleSize`
- `changeCountLabel`

# Contribute

Feel free to create an issue with your idea!

# Related

- Inspired by [Refined GitHub](https://github.com/sindresorhus/refined-github) - sindresorhus

# License

MIT License
