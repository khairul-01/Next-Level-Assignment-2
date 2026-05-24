import { pool } from "../../db/dbIndex.js";
import { TCreateUserPayload } from "../../types/typeIndex.js";
import bcrypt from "bcrypt";

class AuthService {
    // Create user
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
    };
    // Validate user
    async validateUser(email: string, password: string) {
        const userData = await pool.query(`
        SELECT id, name, email, password, role, created_at, updated_at
        FROM users WHERE email = $1
        `,[email]);
        // console.log("user data", userData.rows[0].password);
        const {password: passwordHash,...user} = userData.rows[0]
        if(!userData.rows.length) {
            return null;
        }

        const matchPassword = await bcrypt.compare(password, passwordHash)
        // console.log(matchPassword)
        return matchPassword ? user: null;
    }
}

export default new AuthService;