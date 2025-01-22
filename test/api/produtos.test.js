// test.js
const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
beforeEach(async () => {
    token = await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')

})

it('API - adicionar produto com sucesso', async () => {
    await spec()
        .post('/api/addProduct')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "teste",
            "price": 1.5,
            "quantity": 10,
            "categories": "Bags",
            "description": "teste",
            "photos": "teste.jpg",
            "popular": true,
            "visible": true,
            "location": "teste",
            "additionalDetails": "teste",
            "specialPrice": 1.60
          })
        .expectStatus(502)
        
});

it('API - editar produto com sucesso', async () => {
    await spec()
        .put('/api/editProduct/{1}')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "any",
            "price": "any",
            "quantity": "any",
            "categories": "any",
            "description": "any",
            "photos": "any",
            "popular": "any",
            "visible": "any",
            "location": "any",
            "additionalDetails": "any",
            "specialPrice": "any"
          })
        .expectStatus(502)
        
});

it('API - deletar produto com sucesso', async () => {
    await spec()
        .delete('/api/editProduct/{1}')
        .withHeaders("Authorization", token)
        .expectStatus(502)
        
});

