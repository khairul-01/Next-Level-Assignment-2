import { pool } from "../../db/dbIndex";
import { TCreateUserPayload } from "../../types/typeIndex";
import bcrypt from "bcrypt";

class AuthService {
    async createUser (user: TCreateUserPayload) {
        const {name, email, password, role} = user;
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("password Hash ",hashPassword);

        const result = await pool.query(`
        INSERT INTO users (name, email, password, role)
        VALUES ($1,$2,$3,$4)
        RETURNING id, name, email, role, created_at, updated_at
        `,[name, email, hashPassword, role]);
        // console.log(result.rows[0])
        return result.rows[0];
    }
}

export default new AuthService;