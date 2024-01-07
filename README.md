# Email validator

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

A small project to validate email addresses.
An email address is considered valid if it meets the following criteria:
- It contains exactly one `@` character.
- The part before the `@` character contains one or more characters, consisting of letters, numbers, dots (`.`), underscores (`_`) and dashes (`-`).
- The part after the `@` character contains one or more parts, separated by dots (`.`), consisting of letters, numbers, underscores (`_`) and dashes (`-`).
- The last part after the last dot (`.`) contains at least two characters and at most six characters.
- The domain can be found using a DNS lookup.

It is used to demonstrate how to write unit tests using typescript for a project.

## Installation

```
pnpm install
```

You can also use `npm` or `yarn` to install the dependencies.

## Usage

```
pnpm dev
```

## Testing

```
pnpm test
```

## About me

I am Tony, a Lead Developer based in France. I am passionate about cloud computing, DevOps, and software development in general.
And also I like writing clean code and unit tests.

You can find me on [X](https://twitter.com/TonyTangdev)

## License

This project is licensed under the [MIT License](LICENSE).
