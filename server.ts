import express, { Request, Response } from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000; 

// PostgreSQL connection details (replace with your actual DB details)
const db = new pg.Client({
    user : ".........",
    host  : "localhost",
    database : "creditsea",
    password : "...........",
    port : 5432,
  
  });
  
  db.connect();
// Middleware to parse JSON
app.use(bodyParser.json());

// ====================== API Endpoints ======================


app.get("/", (req, res) =>{
    res.send("Engine started.....");
})

// 1. Get all loan requests for a specific user

app.get('/users/:id/loan_requests', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const result = await db.query('SELECT * FROM loan_requests WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Create a new loan request for a specific user
app.post('/users/:id/loan_requests', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const { name, loan_amount, tenure, employment_status, employment_address, loan_reason } = req.body;

    try {
        const userResult = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);

        if (userResult.rows.length === 0) {
            await db.query(
                'INSERT INTO users (user_id, name) VALUES ($1, $2)', 
                [userId, name]
            );
        }
        const loanResult = await db.query(
            `INSERT INTO loan_requests (user_id, loan_amount, tenure, employment_status, employment_address, loan_reason) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [userId, loan_amount, tenure, employment_status, employment_address, loan_reason]
        );
        res.status(201).json(loanResult.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 3. Get all loan requests (for Admins and Verifiers)
app.get('/loan_requests', async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM loan_requests');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 4. Update the status of a loan request (for Admins/Verifiers)
app.put('/loan_requests/:loan_id', async (req: Request, res: Response) => {
    const loanId = parseInt(req.params.loan_id);
    const { status } = req.body; 

    try {
        const result = await db.query(
            'UPDATE loan_requests SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE loan_id = $2 RETURNING *',
            [status, loanId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 5. Get loan statistics for the Admin Dashboard

app.get('/analytics/loans', async (req: Request, res: Response) => {
    try {
        const result = await db.query(`
            SELECT 
                COUNT(*) AS total_loans, 
                SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved_loans,
                SUM(CASE WHEN status = 'Disbursed' THEN 1 ELSE 0 END) AS disbursed_loans,
                SUM(CASE WHEN status = 'Disbursed' THEN loan_amount ELSE 0 END) AS total_disbursed
            FROM loan_requests
        `);
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
