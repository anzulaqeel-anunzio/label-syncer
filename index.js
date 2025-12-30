// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel

/*
 * Developed for Anunzio International by Anzul Aqeel
 * Contact +971545822608 or +971585515742
 */

const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
    try {
        const token = core.getInput('token');
        const configFile = core.getInput('config_file');
        const deleteUnmatched = core.getInput('delete_unmatched') === 'true';

        console.log(`Reading config from ${configFile}`);
        if (!fs.existsSync(configFile)) {
            throw new Error(`Config file not found: ${configFile}`);
        }

        const configContent = fs.readFileSync(configFile, 'utf8');
        const desiredLabels = JSON.parse(configContent);
        // desiredLabels is array of { name, color, description }

        const octokit = github.getOctokit(token);
        const { owner, repo } = github.context.repo;

        // Get existing labels
        const { data: currentLabels } = await octokit.rest.issues.listLabelsForRepo({
            owner,
            repo
        });

        // 1. Create or Update
        for (const label of desiredLabels) {
            const existing = currentLabels.find(l => l.name === label.name);

            if (existing) {
                // Update if changed
                if (existing.color !== label.color || existing.description !== label.description) {
                    console.log(`Updating label: ${label.name}`);
                    await octokit.rest.issues.updateLabel({
                        owner,
                        repo,
                        name: label.name,
                        color: label.color,
                        description: label.description
                    });
                }
            } else {
                console.log(`Creating label: ${label.name}`);
                await octokit.rest.issues.createLabel({
                    owner,
                    repo,
                    name: label.name,
                    color: label.color,
                    description: label.description
                });
            }
        }

        // 2. Delete
        if (deleteUnmatched) {
            for (const existing of currentLabels) {
                const defined = desiredLabels.find(d => d.name === existing.name);
                if (!defined) {
                    console.log(`Deleting extra label: ${existing.name}`);
                    await octokit.rest.issues.deleteLabel({
                        owner,
                        repo,
                        name: existing.name
                    });
                }
            }
        }

        console.log('Label sync complete.');

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel
