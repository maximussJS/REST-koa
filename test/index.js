import axios from 'axios'
import { expect } from 'chai'

describe('REST Testing', () => {
    describe('POST /user ', () => {
        it('Should return 201 status', () => {
            axios
                .post(process.env.APP_URL + '/user', {
                    name: 'Max',
                    age: 18,
                })
                .then(res => expect(res.status).to.equal(201))
                .catch(err => console.error('POST /user Error : ', err))
        })
    })
    describe('GET /user/Max', () => {
        it('Should return User Object', () => {
            axios
                .post(process.env.APP_URL + '/user/Max')
                .then(res => expect(res.body.age).to.equal(18))
                .catch(err => console.error('POST /user Error : ', err))
        })
    })
    describe('GET /user ', () => {
        it('Should return Array of User Objects', () => {
            axios
                .get(process.env.APP_URL + '/user')
                .then(res => expect(typeof res.body).to.equal('object'))
                .catch(err => console.error('GET /user Error : ', err))
        })
    })
})
