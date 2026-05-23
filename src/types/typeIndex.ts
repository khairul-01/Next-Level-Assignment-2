// Users table
export const user_role = ["contributor", "maintainer"] as const;

export type TRole = typeof user_role[number]

export type TUser = {
    id: number,
    name: string,
    email: string,
    password: string,
    role: TRole,
    created_at: Date,
    updated_at: Date
}

export type TCreateUserPayload = Omit <TUser, "id" | "created_at" | "updated_at">;

export type TUserResponse = Omit<TUser, "password">;

// Issue table
export const issue_type = ["bugs", "feature_request"] as const;

export const issue_status = ["open", "in_progress", "resolve"] as const;

export type TIssueType = typeof issue_type[number];

export type TIssueStatus = typeof issue_status[number];

export type TIssue = {
    id: number,
    title: string,
    description: string,
    type: TIssueType,
    status: TIssueStatus,
    reporter_id: number,
    created_at: Date,
    updated_at: Date
}

export type TCreateIssuePayload = Omit<
TIssue, "id"|"status"|"created_at"|"updated_at"
>