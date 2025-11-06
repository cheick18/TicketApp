import { pool } from '../config/_db.js';
import bcrypt from 'bcrypt'
const saltRounds = 10;


export const UserModel = {

async createUser (username, email, password, role ) {

     const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (username, email, password, role )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [username, email, hashedPassword, role];

    const { rows } = await pool.query(query, values);
     return rows[0];

},

async findByEmail(email) {
    const query = `
      SELECT * FROM users
      WHERE email = $1;
    `;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },


async getUsers () {
 const result = await pool.query('SELECT * FROM users');
  return result.rows;

},

 async getUserById(id) {
    
      const query = `SELECT * FROM users WHERE id = $1`;
      const { rows } = await pool.query(query, [id]);
      return rows[0] || null; 
    
  },


 async deleteUser(id) {
    const { rowCount } = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return rowCount > 0; 
  },


async updateUser(id, { username, email }) {
   const query = `
    UPDATE users
    SET 
      username = COALESCE($1, username),
      email = COALESCE($2, email)
    WHERE id = $3
    RETURNING *;
  `;
    const values = [username, email, id];
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  },


};