import { pool } from '../config/_db.js';

export const TickeModel = { 

 async createTicket({ title, description, user_id }) {
   
    const query = `
      INSERT INTO tickets (title, description, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, description, user_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async getAllTickets (role,id) {
    
    var query= ''
      if(role==='admin'||role==='support'){
         query = `SELECT * FROM tickets;`
          const { rows } = await pool.query(query)
          return rows

      }
      else{
       
         query = `SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC;`
         const { rows } = await pool.query(query, [id]);
          return rows;

      }
         
   

  },
/*
async update(id, data) {
    const { title, description, status } = data;
    const query = `
      UPDATE tickets
      SET title = $1, description = $2, status = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [title, description, status, id, user_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
  */
/*
async findByUser(user_id) {
    const query = `SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC;`;
    const { rows } = await pool.query(query, [user_id]);
    return rows;
  },

  */
async findById(id) {
    const query = `SELECT * FROM tickets WHERE id = $1;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  async updateTicket(role,id, data) {
    console.log("inofo role",role)
    if(role==='support'){
        const { status } = data;
       const query = `
      UPDATE tickets
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [status, id];
    const { rows } = await pool.query(query, values);
    return rows[0];

    }
    const { title, description, status } = data;
    console.log("info du model",title,description,status)
    const query = `
      UPDATE tickets
      SET title = $1, description = $2, status = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [title, description, status, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },


   async deleteTicket(id) {
    const query = `DELETE FROM tickets WHERE id = $1;`;
     const { rowCount }  = await pool.query(query, [id]);

     console.log("etat de supression",rowCount)
    return rowCount > 0;
    
  },

  async updateStatus(id, status) {

    const query = `
      UPDATE tickets
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [status, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  


};