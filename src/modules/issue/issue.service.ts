import { pool } from "../../db/dbIndex";
import { TCreateIssuePayload } from "../../types/typeIndex";

class IssuesService {
    // create issue
    async createIssueIntoDB (issue: TCreateIssuePayload) {
        const {title, description, type, reporter_id} = issue;

        const result = await pool.query(`
        INSERT INTO issues (title, description, type, reporter_id)
        VALUES ($1,$2,$3,$4)
        RETURNING *
            `,[title, description, type, reporter_id]);
        
        return result.rows[0];
    }
}

export default new IssuesService;