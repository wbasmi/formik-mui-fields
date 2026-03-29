---
name: create-version-changeset
description: Create a changeset for versioning and changelog generation.
---

To create a changeset for versioning and changelog generation, follow these steps:

1. **Run the changeset command**: Run the following command in your terminal:
   ```
   pnpm changeset
   ```
2. **Provide change details**: The changeset CLI will prompt you to provide the following details about the change:
   - A summary of the change (1-2 sentences)
   - The type of change (patch, minor, major)
   - A description of the changes in bullet points
3. **Save the changeset**: After providing the necessary information, the changeset will be saved as a new file in the `.changeset/` directory of your project.
4. **Apply version updates**: Run the following command:
   ```
   pnpm changeset:version
   ```
   This will update the version numbers in your `package.json` files according to the types of changes you specified and generate a changelog that summarizes the changes made in each version.
