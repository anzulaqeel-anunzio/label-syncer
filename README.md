# Label Syncer

Keep labels consistent across all your repositories! This GitHub Action synchronizes labels from a JSON configuration file to your repository.

## Features

-   **Declarative Config**: Define labels in a simple JSON file.
-   **Auto-Create/Update**: Creates missing labels and updates existing ones (color/description).
-   **Delete Option**: Optionally delete labels not in the config.

## Usage

Create a workflow file (e.g., `.github/workflows/sync-labels.yml`):

```yaml
name: Sync Labels
on: [push]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Label Syncer
        uses: ./
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          config_file: '.github/labels.json'
          delete_unmatched: 'false'
```

## Configuration Format (`labels.json`)

```json
[
  {
    "name": "bug",
    "color": "d73a4a",
    "description": "Something isn't working"
  },
  {
    "name": "feature",
    "color": "a2eeef",
    "description": "New feature or request"
  }
]
```

## Inputs

| Input | Description | Default |
| :--- | :--- | :--- |
| `token` | GITHUB_TOKEN | `${{ github.token }}` |
| `config_file` | Path to JSON config | `.github/labels.json` |
| `delete_unmatched` | Delete extra labels? | `false` |

## Contact

Developed for Anunzio International by Anzul Aqeel.
Contact +971545822608 or +971585515742.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---
### 🔗 Part of the "Ultimate Utility Toolkit"
This tool is part of the **[Anunzio International Utility Toolkit](https://github.com/anzulaqeel/ultimate-utility-toolkit)**.
Check out the full collection of **180+ developer tools, scripts, and templates** in the master repository.

Developed for Anunzio International by Anzul Aqeel.
