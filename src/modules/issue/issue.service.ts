import { pool } from "../../db/dbIndex";
import { TCreateIssuePayload, TIssueType } from "../../types/typeIndex";

class IssuesService {
  // create issue
  async createIssueIntoDB(issue: TCreateIssuePayload) {
    const { title, description, type, reporter_id } = issue;

    const result = await pool.query(
      `
        INSERT INTO issues (title, description, type, reporter_id)
        VALUES ($1,$2,$3,$4)
        RETURNING *
            `,
      [title, description, type, reporter_id],
    );

    return result.rows[0];
  }

  async getSingleIssueFromDB(issueId: string) {
    const issueResult = await pool.query(
      `
        SELECT * FROM issues
        WHERE id = $1
            `,
      [issueId],
    );

    const issue = issueResult.rows[0];
    if (!issue) {
      throw new Error("Issue not found");
    }

    const reporterResult = await pool.query(
      `
           SELECT id,name,role FROM users
           WHERE id = $1 
            `,
      [issue.reporter_id],
    );

    issue.reporter = reporterResult.rows[0];
    delete issue.reporter_id;

    return issue;
  }
  async getSingleIssueFromDb(issueId: string) {
    const issueResult = await pool.query(
      `
    SELECT i.id, i.title, i.description, i.type, i.status,

      json_build_object(
        'id', u.id,
        'name', u.name,
        'role', u.role
      ) AS reporter,

      i.created_at,
      i.updated_at

    FROM issues i

    JOIN users u
    ON i.reporter_id = u.id

    WHERE i.id = $1
        `,[issueId],
    );

    const issue = issueResult.rows[0];

    return issue;
  }

  async getAllIssueFromDb(sort?: string) {
    const result = await pool.query(
      `
    SELECT i.id, i.title, i.description, i.type, i.status,

      json_build_object(
        'id', u.id,
        'name', u.name,
        'role', u.role
      ) AS reporter,

      i.created_at,
      i.updated_at

    FROM issues i

    JOIN users u
    ON i.reporter_id = u.id

    ORDER BY created_at ${sort === "oldest" ? "ASC" : "DESC"}
            `
    );

    return result.rows;
  }

  async patchIssue (id: string, title: string, description: string, type: TIssueType)  {
    const result = await pool.query(`
        UPDATE issues
        SET title = $1, description = $2, type = $3
        WHERE id = $4
        RETURNING *
        `,[title, description, type, id]);

    return result.rows[0];
  }

  async removeIssue (deleteId: string) {
    const result = await pool.query(`
        DELETE FROM issues
        WHERE id = $1
        `,[deleteId]);
        // console.log("Deleted: ", result);
    return result.rowCount;
  }

}

export default new IssuesService();
