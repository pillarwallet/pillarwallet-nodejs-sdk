#!/bin/bash
set -euo pipefail

applicationName=$1
package=$2

MESSAGE="{
    \"content\": \"A new version of $applicationName is available for use.\", 
    \"embeds\": [ 
        { 
            \"title\": \"$CIRCLE_PROJECT_REPONAME\",
            \"url\": \"https://circleci.com/workflow-run/$CIRCLE_WORKFLOW_WORKSPACE_ID\",
            \"description\": \"artifact published: $package\",
            \"color\": 3394662
        }
    ]
}"

curl -d "$MESSAGE" -H "Content-Type: application/json" "$DISCORD_WEBHOOK_URL"