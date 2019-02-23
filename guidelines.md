# Here is a very short list of guidelines you want to follow
- Coding standards by the author of NPM (Isaac Shlueter's) https://docs.npmjs.com/misc/coding-style
- StandardJs https://standardjs.com/

# Tools You may want to use
- StandardJs https://standardjs.com/
- Clang-Format
- Prettier

# Your Github Repo structure
- Master Branch (at least 3 reviewers required in order to merge !)
- Dev branch (used as the main development branch)
- Entity Branches (Branches used for regular stories implementation)

# Project Structure
- routes
  - api
    - handler_0.js
    - handler_1.js
    - handler_2.js
    - ....
- models
  - model_0.js
  - model_1.js
  - model_2.js
  - ....
- config
  - keys (https://www.npmjs.com/package/config)
- package.json
- index.js
