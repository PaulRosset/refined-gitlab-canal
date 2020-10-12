<div align="center">
  <a href="https://github.com/canalplus">
    <img src="src/gitlab-logo.png" alt="canal logo" width="500" height="150">
  </a>
</div>

<h1 align="center">Refined gitlab by Canal+</h1>

> Browser extension that adds useful features on gitlab interface for Canal+ team

# Install

[Chrome extension](https://chrome.google.com/webstore/detail/refined-gitlab-by-canal%20/ikaokifbikfffdgfkbhogdibaddhjfad)

# Features

- `highlight-who-thumb` - Show who thumbups in the merge request dashboard.
- `sort-WIP-state` - Sort the (Work in progress) state by letting them on the bottom.
- `replaceMrUrl` - This is a special use case, but basically, it replace an url in a merge request to under the form `https://host.com/nameofthebranch/index.html`
- `copyMR` - Permit to copy quickly the MR/Issues number of the Merge request panel and the issues panel
- `displayRecordBundleSize` - In our CI, we are getting the bundlesize of the our current build, this feature is here to display the size of the build.
- `changeCountLabel` - Display the change count as label on the MR page.
- `applyPrettier` - You can use Prettier formatter inside GitLab for the Issue and Merge request creation.
- `displayUnresolvedThreads` - Display the count of unresolved threads of a MR on the MR list page

# Disable features

We let you the possibility to disable feature, if it doesnt fit your specific need, to do that, simply click on the extension logo and specify which features you want to unenable in the **textarea**.

Format in the textArea should be of the following form:

`nameofthefeaturetodisable,nameofthefeaturetodisable,...`

Feature name:

- `displayUserWhoThumbMR`
- `sortWipDraftState`
- `replaceMrUrl`
- `copyMR`
- `displayRecordBundleSize`
- `changeCountLabel`
- `applyPrettier`
- `displayUnresolvedThreads`

# Contribute

Feel free to create an issue with your idea!

# Related

- Inspired by [Refined GitHub](https://github.com/sindresorhus/refined-github) - sindresorhus

# License

MIT License
