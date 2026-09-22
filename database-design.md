Users
- user_id (PK)
- username
- email

Workspaces
- workspace_id (PK)
- workname

workspace_members
- user_id (FK → Users.user_id)
- workspace_id (FK → Workspaces.workspace_id)
- (user_id, workspace_id) uniquely identifies membership

Projects
- project_id (PK)
- project_name
- workspace_id (FK → Workspaces.workspace_id)