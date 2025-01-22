const { reporter, flow,spec } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'lojaebac-api';
  pf.config.projectName = 'Loja EBAC API';
  pf.config.version = '1.0.1';
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

it('API - adicionar categotria com sucesso', async () => {
  let token;
  token = await spec()
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')

  await flow("Cadastro categoria")
    .post('http://lojaebac.ebaconline.art.br/api/addCategory')
    .withHeaders("Authorization", token)
    .withJson({
      "name": "Testes50",
      "photo": "teste2.jpg"
    })
    .expectStatus(200)
});
