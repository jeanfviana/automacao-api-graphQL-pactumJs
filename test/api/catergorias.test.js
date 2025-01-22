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

it('API - adicionar categotria com sucesso', async () => {
    await spec()
        .post('/api/addCategory')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "Testes",
            "photo": "teste.jpg"
        })
        .expectStatus(200)
        });

it('API - editar categoria com sucesso', async () => {
    await spec()
        .put('/api/editCategory/6790f1fd466399ca3e78c3ea')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "teste2",
            "photo": "teste3.jpg"
          }
        )
        .expectStatus(200)

});

it('API - deletar categoria com sucesso', async () => {
    await spec()
        .delete('/api/deleteCategory/1')
        .withHeaders("Authorization", token)
        .expectStatus(200)

});

