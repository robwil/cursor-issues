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

4. Ensure required labels exist:
   ```bash
   # Create WIP label if it doesn't exist
   gh api repos/robwil/cursor-issues/labels -f name="WIP" -f color="FF0000" -f description="Work in progress" || true
   
   # Create ready-for-review label if it doesn't exist
   gh api repos/robwil/cursor-issues/labels -f name="ready-for-review" -f color="0E8A16" -f description="PR created and ready for review" || true
   ```

## Issue Management
1. Check for open issues with the "WIP" label:
   ```bash
   gh issue list --label WIP
   ```

2. If there are issues with the "WIP" label, select the oldest one to work on.

3. If no issues have the "WIP" label:
   - Get the oldest open issue that doesn't have the "ready-for-review" label:
     ```bash
     gh issue list --limit 10 --state open --json number,title,labels --jq '.[] | select(.labels | map(.name) | index("ready-for-review") | not) | [.number, .title] | @tsv' | sort -n | head -1
     ```
   - If an issue is found, add the "WIP" label to it:
     ```bash
     gh issue edit <issue-number> --add-label "WIP"
     ```
   - If there are no eligible open issues, **STOP HERE**

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
   - Push your branch to GitHub: 
     ```bash
     git push -u origin gh-issue-<issue-number>
     ```
   
   - Create a pull request:
     ```bash
     # Create a file with the PR description 
     cat > pr-body.txt << EOF
     This PR implements all tasks from issue #<issue-number>:
     
     - Task 1 description
     - Task 2 description
     
     Closes #<issue-number>
     EOF
     
     # Create the PR using the file
     gh pr create --title "Fix issue #<issue-number>" --body-file pr-body.txt
     ```
   
   - Update issue labels:
     ```bash
     # Remove the WIP label
     gh issue edit <issue-number> --remove-label WIP
     
     # Add the ready-for-review label
     gh issue edit <issue-number> --add-label "ready-for-review"
     ```

## Troubleshooting
- If the `gh` command fails with authentication errors, try: `gh auth status` and `gh auth login`
- If you receive "repository not found" errors, check that you're using the correct repository name
- If issue operations fail, verify that issues are enabled for the repository
- If you get a "label not found" error, ensure you've run the setup steps to create the required labels
