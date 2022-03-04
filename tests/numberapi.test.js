const supertest = require('supertest');
const { deleteOne } = require('../../reittiBackend/models/user');
const app = require('../app');

const api = supertest(app);

describe('GET /api/sumandcheck', () => {
    it('missing query returns http 400 error AND json response', async() => {
        await api
            .get('/api/sumandcheck')
            .expect(400)
            .expect('Content-Type', /json/)

    });

    it('string in query results 400 AND json response', async() => {
        await api
            .get('/api/sumandcheck?numbers=foobar')
            .expect(400)
            .expect('Content-Type', /json/)
    })

    it('?numbers=2,5,6,8 responds json: {result:21,isPrime:false}', async() => {

        const correctResponse = { result: 21, isPrime: false }

        const res = await api.get('/api/sumandcheck?numbers=2,5,6,8')
            .expect('Content-Type', /json/)

        expect(res.body).toMatchObject(correctResponse)
    })

});

describe('GET /api/checkprime', () => {
    it('missing query returns http 400 error AND json response', async() => {
        await api
            .get('/api/checkprime')
            .expect(400)
            .expect('Content-Type', /json/)

    });

    it('string in query results 400 AND json response', async() => {
        await api
            .get('/api/checkprime')
            .expect(400)
            .expect('Content-Type', /json/)
    })

    it('multiple numbers in query results 400 AND json response', async() => {
        await api
            .get('/api/checkprime?number=44,55,66')
            .expect(400)
            .expect('Content-Type', /json/)
    })


    it('?number=83 responds json: {isPrime:true}', async() => {

        const correctResponse = { isPrime: true }

        const res = await api.get('/api/checkprime?number=83')
            .expect('Content-Type', /json/)

        expect(res.body).toMatchObject(correctResponse)
    })

    it('?number=43 responds json: {isPrime:true}', async() => {

        const correctResponse = { isPrime: true }

        const res = await api.get('/api/checkprime?number=43')
            .expect('Content-Type', /json/)

        expect(res.body).toMatchObject(correctResponse)
    })

    it('?number=40 responds json: {isPrime:false}', async() => {

        const correctResponse = { isPrime: false }

        const res = await api.get('/api/checkprime?number=40')
            .expect('Content-Type', /json/)

        expect(res.body).toMatchObject(correctResponse)
    })

});