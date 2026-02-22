import { query } from '@/lib/db';

export const resolvers = {
    Query: {
        services: async () => {
            try {
                const result = await query('SELECT * FROM services');
                return result.rows;
            } catch (e) {
                console.error(e);
                return [
                    { id: '1', name: 'Aesthetic Dermotherapy', description: 'Advanced skin care', price: 150, duration: 60, category: 'Dermatology' },
                    { id: '2', name: 'Paramedical Dermopigmentation', description: 'Medical tattooing', price: 250, duration: 120, category: 'Pigmentation' },
                ];
            }
        },
        service: async (_: unknown, { id }: { id: string }) => {
            const result = await query('SELECT * FROM services WHERE id = $1', [id]);
            return result.rows[0];
        },
        appointments: async (_: unknown, { userId }: { userId: string }) => {
            const result = await query('SELECT * FROM appointments WHERE user_id = $1 ORDER BY appointment_date DESC', [userId]);
            return result.rows;
        },
        allAppointments: async () => {
            const result = await query('SELECT * FROM appointments ORDER BY appointment_date DESC');
            return result.rows;
        },
        allUsers: async () => {
            const result = await query('SELECT * FROM users ORDER BY id DESC');
            return result.rows.map((user: any) => ({
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                role: user.role
            }));
        },
        clinicalProgress: async (_: unknown, { userId }: { userId: string }) => {
            const result = await query('SELECT * FROM clinical_progress WHERE user_id = $1 ORDER BY last_update DESC', [userId]);
            return result.rows.map((cp: any) => ({
                id: cp.id,
                userId: cp.user_id,
                treatmentName: cp.treatment_name,
                progressPercent: cp.progress_percent,
                status: cp.status,
                lastUpdate: cp.last_update.toISOString()
            }));
        },
        adminStats: async () => {
            const userCount = await query('SELECT count(*) FROM users WHERE role = $1', ['CLIENT']);
            const apptCount = await query('SELECT count(*) FROM appointments WHERE status = $1', ['CONFIRMED']);

            return {
                totalUsers: parseInt(userCount.rows[0].count),
                activeAppointments: parseInt(apptCount.rows[0].count),
                revenueMonth: 12450.00, // Mock for now
                retentionRate: 94.2
            };
        }
    },
    Appointment: {
        service: async (parent: any) => {
            const result = await query('SELECT * FROM services WHERE id = $1', [parent.serviceId || parent.service_id]);
            return result.rows[0];
        },
        user: async (parent: any) => {
            const result = await query('SELECT * FROM users WHERE id = $1', [parent.userId || parent.user_id]);
            const user = result.rows[0];
            return user ? {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                role: user.role
            } : null;
        },
        date: (parent: any) => (parent.appointment_date || parent.date).toISOString()
    },
    Mutation: {
        bookAppointment: async (_: unknown, { serviceId, date }: { serviceId: string, date: string }) => {
            // Mock for now
            return { id: 'new-id', serviceId, date, status: 'PENDING' };
        },

        updateAppointmentStatus: async (_: unknown, { id, status }: { id: string, status: string }) => {
            const result = await query('UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
            return result.rows[0];
        },

        deleteAppointment: async (_: unknown, { id }: { id: string }) => {
            await query('DELETE FROM appointments WHERE id = $1', [id]);
            return true;
        },

        toggleUserStatus: async (_: unknown, { id, role }: { id: string, role: string }) => {
            const result = await query('UPDATE users SET role = $1 WHERE id = $2 RETURNING *', [role, id]);
            const user = result.rows[0];
            return {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                role: user.role
            };
        },

        login: async (_: unknown, { email, password }: { email: string, password: string }) => {
            const result = await query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (!user) {
                throw new Error('User not found');
            }

            if (user.password !== password) {
                throw new Error('Invalid password');
            }

            // CamelCase conversion for GraphQL
            return {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                role: user.role
            };
        }
    }
};
