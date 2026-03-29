# Changeset and versioning rules

- All changes must be documented via a changeset
- Run `pnpm changeset` after making changes to create a new changeset file in `.changeset/`
- The changeset CLI will prompt for:
  1. A summary of the change (1-2 sentences)
  2. The type of change (patch, minor, major)
  3. Describe the changes in bullet points
- Run `pnpm changeset:version` to apply the version updates based on the changesets and generate a changelog
