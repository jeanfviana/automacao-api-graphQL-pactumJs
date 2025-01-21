// test.js
const { spec } = require('pactum');

let token;
beforeEach(async () => {
  token = await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
        mutation AuthUser($email: String, $password: String) {
            authUser(email: $email, password: $password) {
              success
              token
            }
          }
    `)
    .withGraphQLVariables({
      "email": "admin@admin.com",
      "password": "admin123"
    })
    .returns('data.authUser.token')

})

it('Deve adicionar catergoria com sucesso', async () => {
  await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withHeaders("Authorization", token)
    .withGraphQLQuery(`
    mutation AddCategory($name: String, $photo: String) {
      addCategory(name: $name, photo: $photo) {
        name
        photo
     }
}`)
    .withGraphQLVariables({
      "name": "Bag",
      "photo": "https://www.zipmaster.com/wpcontent/uploads/2022/04/Reusable-Cloth-Shopping-Bags-RainbowPack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp"
    })
    .expectStatus(200);
});

it('Deve editar catergoria com sucesso', async () => {
  await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withHeaders("Authorization", token)
    .withGraphQLQuery(`
    mutation EditCategory($editCategoryId: ID!, $name: String, $photo: String) {
      editCategory(id: $editCategoryId, name: $name, photo: $photo) {
        name
        photo
  }
}`)
    .withGraphQLVariables({
      "name": "Bags",
      "photo": "alteracao.jpg"
    })
    .expectStatus(200);
});


it('Deve deletar catergoria com sucesso', async () => {
  await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withHeaders("Authorization", token)
    .withGraphQLQuery(`
    mutation DeleteCategory($deleteCategoryId: ID!) {
      deleteCategory(id: $deleteCategoryId) {
        name
        photo
  }
}`)
    .expectStatus(200);
});