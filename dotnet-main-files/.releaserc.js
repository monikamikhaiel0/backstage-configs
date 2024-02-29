const { GIT_BRANCH: branch } = process.env;

const FILE_NAMES = {
    test2: "CHANGELOG.md",
    test1: "CHANGELOG-DEV.md"
};
const getFileName = branch => {
    var trimmedBranch = branch.replace("refs/heads/", "");
    return FILE_NAMES[trimmedBranch]
};
// this is the actual configuration for the semantic release 
module.exports = {
    "branches": [
        { "name": "test2" },
        { "name": "test1" }
        // these are the branches that we may have a release from 
        // if you will be working on any other branches and need to build from
        // and push to ECR need to add it here 
    ],
    "plugins": [
    
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        ["@semantic-release/changelog", {
            "changelogFile": getFileName(branch),
        }],
        ["@semantic-release/github", {
            "assets": [getFileName(branch)]
        }],
        
        ["@semantic-release/git", {
            "assets": [getFileName(branch)],
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }]
    ]
};
