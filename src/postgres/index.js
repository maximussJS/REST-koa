import { Pool } from 'pg'
import { join } from 'path'
import { config } from 'dotenv'

config({
    path: join(__dirname, '..', '..', '.env'),
})

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_NAME,
    port: parseInt(process.env.PG_PORT) || 5432,
})

pool.on('end', () => console.log('Disconnected from Postgres'))
pool.on('error', error => console.error('Postgres Error : ', error))

pool.connect()
    .then(cli => {
        console.log('Postgres connected')
        pool.query(
            'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY ,login VARCHAR(20) NOT NULL, name VARCHAR(20) NOT NULL, password VARCHAR(250) NOT NULL, age INTEGER NOT NULL);'
        ).then(res => {
            console.log('User Table Created : ', res)
            cli.release()
        })
    })
    .catch(e => {
        console.error('Postgres Connection Error : ', e)
        process.exit(1)
    })

export const createUser = async (name, age) => {
    await pool.query(`INSERT INTO users(name, age) VALUES('${name}', '${age}') RETURNING id;`)
}

export const getAllUsers = async () => await pool.query('SELECT * FROM users;')

export const getUserByLogin = async login => await pool.query(`SELECT * FROM users WHERE login='${login}';`)

export const getUserByName = async name => await pool.query(`SELECT * FROM users WHERE name='${name}';`)

export const updateUserAgeById = async (id, age) => await pool.query(`UPDATE users SET age='${age}' WHERE id='${id}';`)

export const updateUserNameById = async (id, name) => await pool.query(`UPDATE users SET name='${name}' WHERE id='${id}';`)

export const deleteUserById = async id => await pool.query(`DELETE FROM users WHERE id='${id}'`)
