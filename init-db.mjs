import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function initDb() {
    console.log('Initializing database...');
    console.log('Using URL:', process.env.DATABASE_URL ? 'URL found' : 'URL NOT FOUND');

    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT,
                price DECIMAL(10,2),
                duration INTEGER,
                category TEXT
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                full_name TEXT,
                role TEXT DEFAULT 'USER',
                password TEXT
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS appointments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                service_id INTEGER REFERENCES services(id),
                appointment_date TIMESTAMP NOT NULL,
                status TEXT DEFAULT 'PENDING'
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS clinical_progress (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                treatment_name TEXT NOT NULL,
                progress_percent INTEGER DEFAULT 0,
                status TEXT,
                last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert some sample services if empty
        const servicesCount = await pool.query('SELECT count(*) FROM services');
        if (parseInt(servicesCount.rows[0].count) === 0) {
            await pool.query(`
                INSERT INTO services (name, description, price, duration, category) VALUES
                ('Aesthetic Dermotherapy', 'Non-invasive skin rejuvenation and health treatments.', 150.00, 60, 'Dermatology'),
                ('Paramedical Dermopigmentation', 'Medical tattooing for scar camouflage and restoration.', 250.00, 120, 'Pigmentation'),
                ('Scar Revision', 'Specialized therapy for surgical and traumatic scar improvement.', 200.00, 90, 'Reconstruction');
            `);
            console.log('Sample services inserted.');
        }

        // Insert default users (Admin & Client)
        const usersCount = await pool.query('SELECT count(*) FROM users');
        if (parseInt(usersCount.rows[0].count) <= 2) { // 2 are already there, add more
            await pool.query(`
                INSERT INTO users (email, full_name, role, password) VALUES
                ('admin@rim.com', 'System Admin', 'ADMIN', 'admin123'),
                ('client@rim.com', 'John Client', 'CLIENT', 'client123'),
                ('alice@rim.com', 'Alice Smith', 'CLIENT', 'client123'),
                ('robert@rim.com', 'Robert Fox', 'CLIENT', 'client123'),
                ('maria@rim.com', 'Maria Garcia', 'CLIENT', 'client123')
                ON CONFLICT (email) DO NOTHING;
            `);
            console.log('Users populated.');
        }

        // Add some appointments
        const apptCount = await pool.query('SELECT count(*) FROM appointments');
        if (parseInt(apptCount.rows[0].count) <= 10) {
            await pool.query(`
                INSERT INTO appointments (user_id, service_id, appointment_date, status)
                SELECT u.id, s.id, NOW() + (random() * interval '30 days') - (random() * interval '15 days'), 
                CASE WHEN random() > 0.5 THEN 'CONFIRMED' ELSE 'PENDING' END
                FROM users u, services s
                WHERE u.role = 'CLIENT'
                CROSS JOIN generate_series(1, 5)
                LIMIT 30;
            `);
            console.log('Mass appointments inserted.');
        }

        // Add clinical progress
        const progressCount = await pool.query('SELECT count(*) FROM clinical_progress');
        if (parseInt(progressCount.rows[0].count) <= 3) {
            await pool.query(`
                INSERT INTO clinical_progress (user_id, treatment_name, progress_percent, status)
                SELECT id, 'Scar Revision', floor(random() * 100), 'Active' FROM users WHERE role = 'CLIENT'
                UNION ALL
                SELECT id, 'Aesthetic Dermotherapy', floor(random() * 100), 'Active' FROM users WHERE role = 'CLIENT';
            `);
            console.log('Extended clinical progress data inserted.');
        }

        console.log('Database initialization complete.');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await pool.end();
    }
}

initDb();
