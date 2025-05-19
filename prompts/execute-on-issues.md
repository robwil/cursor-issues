# GitHub Issue Processing Workflow

Follow these steps in order:

## Setup
1. Configure the GitHub CLI by running:
   ```bash
   export GH_HOST=github.com
   ```

2. Verify that you're in the correct repository and set it as the default:
   ```bash
   gh repo set-default robwil/cursor-issues
   ```

3. If GitHub issues are not enabled for this repository, enable them:
   ```bash
   gh api --method PATCH repos/robwil/cursor-issues -f has_issues=true
   ```

## Issue Management
1. Check for open issues with the "WIP" label:
   ```bash
   gh issue list --label WIP
   ```

2. If no issues have the "WIP" label:
   - Get the oldest open issue: `gh issue list --limit 1 --state open`
   - If the "WIP" label doesn't exist, create it: 
     ```bash
     gh api repos/robwil/cursor-issues/labels -f name="WIP" -f color="FF0000" -f description="Work in progress"
     ```
   - Add the "WIP" label to the oldest issue: `gh issue edit <issue-number> --add-label "WIP"`
   - If there are no open issues, **STOP HERE**

## Implementation
1. Create a new Git branch to work on the issue:
   ```bash
   git checkout -b gh-issue-<issue-number>
   ```

2. Read the issue description and implement each task in order.

3. After completing each task:
   - Update the issue to mark the task as completed:
     ```bash
     # First view the issue to get the content
     gh issue view <issue-number>
     # Then update the issue, marking the completed task with [x]
     echo -e "Issue title\n\n- [x] Completed task\n- [ ] Pending task" | gh issue edit <issue-number> --body-file -
     ```
   - Commit your changes with a descriptive message:
     ```bash
     git add <changed-files>
     git commit -m "Task: Description of what was done"
     ```

## Completion and Pull Request
1. When all tasks are completed:
   - Push your branch to GitHub: `git push -u origin gh-issue-<issue-number>`
   - Remove the "WIP" label: `gh issue edit <issue-number> --remove-label WIP`
   - Create a pull request:
     ```bash
     gh pr create --title "Fix issue #<issue-number>" --body "This PR implements all tasks from issue #<issue-number>:\n\n- Task 1 description\n- Task 2 description\n\nCloses #<issue-number>"
     ```

## Troubleshooting
- If the `gh` command fails with authentication errors, try: `gh auth status` and `gh auth login`
- If you receive "repository not found" errors, check that you're using the correct repository name
- If issue operations fail, verify that issues are enabled for the repository
