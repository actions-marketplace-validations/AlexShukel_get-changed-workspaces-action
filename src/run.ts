import path from "path";

import { setOutput } from "@actions/core";
import minimatch from "minimatch";

import { getChangedFiles } from "./getChangedFiles";
import { getRootDirectory } from "./getRootDirectory";
import { getWorkspaces } from "./getWorkspaces";

export const run = async () => {
    const output: string[] = [];
    const gitRoot = await getRootDirectory();
    const changedFiles = (await getChangedFiles()).map((file) => path.join(gitRoot, file));
    const workspaces = await getWorkspaces();

    workspaces.forEach((workspace, name) => {
        if (minimatch.match(changedFiles, path.join(process.cwd(), workspace, "**")).length > 0) {
            output.push(name);
        }
    });

    setOutput("changed_workspaces", output);
};
