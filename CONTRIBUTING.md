# Contributing

[fork]: /fork
[pr]: /compare
[style]: https://standardjs.com/
[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

## Submitting a pull request

1. [Fork][fork] and clone the repository.
1. Configure and install the dependencies: `npx lerna bootstrap`.
1. Create a new branch: `git checkout -b feat-branch-name`.
1. Start developer playground with editor and watcher with the command `yarn dev`.
1. Find editor initializer code in the `./packages/development/src/pages/dev/index.tsx`
1. Make your changes in the plugins, marks, tools, editor, or add and start using your own plugin.
1. Push to your fork and [submit a pull request][pr].
1. Pat yourself on the back and wait for your pull request to be reviewed and merged.

[//]: # "1. Make sure the tests pass on your machine: `yarn test`, note: these tests also apply the linter, so there's no need to lint separately."
[//]: # '1. Make your change, add tests, and make sure the tests still pass.'

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the [style guide][style] which is using standard. Any linting errors should be shown when running `yarn test`.
- Write and update tests.
- Keep your changes as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Work in Progress pull requests are also welcome to get feedback early on, or if there is something blocked you. For such make sure to attach `WIP` badge to it.

## Reviewing Pull Requests

We welcome everyone to review Pull Requests, it is a great way to learn, network and support each other.

### DOs

- be kind and respectful to others
- use inline comments to explain your suggestions
- use inline suggestions to propose changes

### DON'Ts

- do not be rude, disrespectful or aggressive
- do not repeat feedback, this creates more noise than value (check the existing conversation), use GitHub reactions if you agree/disagree with a comment
- do not blindly approve pull requests to improve your GitHub contributors graph
