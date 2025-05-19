# GitHub Issue Processing Workflow

> ## ⚠️ CRITICAL WORKFLOW REQUIREMENTS ⚠️
> 
> 1. **COMMIT EACH TASK INDIVIDUALLY** - Do not combine multiple tasks in one commit
> 2. **USE PROPER GIT AUTHOR CONFIG** - All commits must use:
>    ```bash
>    git -c user.name="Cursor AI" -c user.email="agent@cursor.tools" commit -m "Task: Description"
>    ```
> 3. **UPDATE ISSUE AFTER EACH TASK** - Mark each task complete in the issue before moving to the next
> 4. **FOLLOW THE EXACT SEQUENCE** - Do not skip any steps in this workflow

---

Follow these steps in order:

## 1️⃣ Setup
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

---

## 2️⃣ Issue Management
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

---

## 3️⃣ Implementation
1. Create a new Git branch to work on the issue:
   ```bash
   git checkout -b gh-issue-<issue-number>
   ```

2. Read the issue description:
   ```bash
   gh issue view <issue-number> --json body,title,number
   ```
   
   **YOU MUST** check the issue body for any task list (items prefixed with "- [ ]") and implement each task in order. 
   If no task list exists, break down the issue into logical tasks yourself.

3. **⚠️ IMPORTANT**: After completing **EACH INDIVIDUAL TASK** (not the entire issue at once):

   **STEP 3A**: Update the issue to mark the task as completed:
   ```bash
   # Get the issue content with body
   gh issue view <issue-number> --json body,title,number
   
   # Then update the issue, marking ONLY the completed task with [x] 
   # For example, if the body was:
   #   - [ ] Task 1
   #   - [ ] Task 2
   # After completing Task 1, update it to:
   #   - [x] Task 1
   #   - [ ] Task 2
   
   # Create a file with the updated issue body
   cat > issue-body.txt << EOF
   <Copy the current body here and update the appropriate task>
   EOF
   
   # Update the issue body
   gh issue edit <issue-number> --body-file issue-body.txt
   ```
   
   **STEP 3B**: Commit your changes with a descriptive message for the **SPECIFIC TASK**:
   ```bash
   # Stage your changes
   git add <changed-files>
   
   # Commit with the AI agent identity using explicit author name and email
   git -c user.name="Cursor AI" -c user.email="agent@cursor.tools" commit -m "Task: Description of the specific task just completed"
   ```
   
   > **CRITICAL REMINDERS**:
   > - YOU MUST make a separate commit for each task
   > - The commits MUST be tagged with `-c user.name` and `-c user.email` as specified above
   > - DO NOT combine multiple tasks into a single commit

---

## 4️⃣ Completion and Pull Request
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
     
     Note: Commits in this PR were made by an AI agent.
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

---

## 5️⃣ Cleanup
1. Optional: Remove any temporary files created during the workflow:
   ```bash
   # Remove temporary files if they exist
   rm -f issue-body.txt pr-body.txt
   ```

2. After creating the pull request, always return to the master branch:
   ```bash
   git checkout master
   ```

---

## Troubleshooting
- If `gh issue view` doesn't show the full issue body, try using `--json body` flag to get the complete content
- If the `gh` command fails with authentication errors, try: `gh auth status` and `gh auth login`
- If you receive "repository not found" errors, check that you're using the correct repository name
- If issue operations fail, verify that issues are enabled for the repository
- If you get a "label not found" error, ensure you've run the setup steps to create the required labels
