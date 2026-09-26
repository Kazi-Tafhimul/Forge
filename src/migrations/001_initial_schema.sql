CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE workspaces (
    workspace_id INTEGER PRIMARY KEY,
    workname TEXT NOT NULL
);

CREATE TABLE workspace_members (
    user_id INTEGER,
    workspace_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id),
    PRIMARY KEY (user_id, workspace_id)
);

CREATE TABLE projects (
    project_id INTEGER PRIMARY KEY,
    project_name TEXT NOT NULL,
    workspace_id INTEGER,
    FOREIGN KEY (workspace_id)
        REFERENCES workspaces(workspace_id)
);

CREATE INDEX idx_projects_workspace_id
ON projects(workspace_id);