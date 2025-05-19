- Note the current repository you are in is the github repository called `robwil/cursor-issues`.
- Configure the `gh` CLI by setting `GH_HOST=github.com` and setting the default repo to `robwil/cursor-issues`.
- Check the open issues of the Github repository `robwil/cursor-issues`.
- If there is none open with the "WIP" label, then a) Get the oldest one and b) Add the "WIP" label to it.
    - If there are none available, you can stop here!
- Create a new Git branch locally to begin working on the issue, using the format `gh-issue-<issue num>`
- Analyze the description, and implement each task mentioned on it.
- After implementing each task of the issue:
    1. edit the issue in Github to mark that task as completed. To mark it as complete, check it with an `x` inside the `[ ]` of the task. When editing the body of the task, if using `gh`, use the following syntax: `echo -e "<issue-content-with-multilines>" | gh issue edit <issue-number> --body-file -`.
    2. commit the changes with a useful commit message summarizing the task just performed
- When all the tasks of the issue are completed:
    1. push the newly created branch
    2. remove the "WIP" label from the issue. If you can't remove it via the MCP tool `update_issue` call, then do it via `gh`.
    3. open a pull request for the branch, and make sure the PR description summarizes all tasks performed and references the original Github issue number
