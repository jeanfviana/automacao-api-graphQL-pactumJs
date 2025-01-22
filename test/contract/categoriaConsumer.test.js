const { reporter, flow, handler, mock, spec } = require('pactum');
const pf = require('pactum-flow-plugin');
const { like } = require('pactum-matchers');


function addFlowReporter() {
    pf.config.url = 'http://localhost:8080'; // pactum flow server url
    pf.config.projectId = 'lojaebac-front';
    pf.config.projectName = 'Loja EBAC Front';
    pf.config.version = '1.0.2';
    pf.config.username = 'scanner';
    pf.config.password = 'scanner';
    reporter.add(pf.reporter);
}

// global before
before(async () => {
    addFlowReporter();

});

// global after
after(async () => {
    await reporter.end();
});

handler.addInteractionHandler('Categoria Response', () => {
    return {
        provider: 'lojaebac-api',
        flow: 'Cadastro',
        request: {
            method: 'POST',
            path: '/api/addCategory',
            body: {
                "name": "TestesJean",
                "photo": "testeJean.jpg"
            }
        },
        response: {
            status: 200,
            body: {
                "success": true,
                "message": "category added",
                "data": {
                    "_id": "67912faa02ca0c46f92bf542",
                    "name": "Testes",
                    "photo": "teste.jpg",
                }
            }
        }
    }
})

it('Front - adicionar categotria com sucesso', async () => {
    let token;
    token = await spec()
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')

    await flow("Cadastro")
        .useInteraction('Categoria Response')
        .post('http://lojaebac.ebaconline.art.br/api/addCategory')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "Testes",
            "photo": "teste.jpg"
        })
        .expectStatus(200)
});
