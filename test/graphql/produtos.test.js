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

it('Deve adicionar produto com sucesso', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withHeaders("Authorization", token)
        .withGraphQLQuery(`mutation AddProduct($name: String, $categories: [CategoryInput], $description: String, $price: Float, $specialPrice: Float, $photos: [String], $popular: Boolean, $quantity: Float, $visible: Boolean, $location: String, $additionalDetails: [String]) {
  addProduct(name: $name, categories: $categories, description: $description, price: $price, specialPrice: $specialPrice, photos: $photos, popular: $popular, quantity: $quantity, visible: $visible, location: $location, additionalDetails: $additionalDetails) {
    additionalDetails
    categories {
      name
      photo
    }
    description
    location
    name
    photos
    popular
    price
    quantity
    specialPrice
    visible
  }
}`)
        .withGraphQLVariables({
            "name": "teste",
            "categories": [
                {
                    "name": "categoriaTeste",
                    "photo": "teste.jpg"
                }
            ],
            "description": "categoria testada",
            "price": 1.50,
            "specialPrice": 1.60,
            "photos": "teste",
            "popular": true,
            "quantity": 5,
            "visible": true,
            "location": "Manaus",
            "additionalDetails": "teste"
        })
        .expectStatus(200);
});

it('Deve editar produto com sucesso', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withHeaders("Authorization", token)
        .withGraphQLQuery(`
            mutation EditProduct($editProductId: ID!) {
  editProduct(id: $editProductId) {
    description
  }
}`)
        .withGraphQLVariables({
            "name": "teste2",
            "description": "teste",
            "editProductId": 1
          })
        .expectStatus(200);
});

it('Deve deletar produto com sucesso', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withHeaders("Authorization", token)
        .withGraphQLQuery(`
            mutation DeleteProduct($deleteProductId: ID!) {
                deleteProduct(id: $deleteProductId) {
                    additionalDetails
  }
}`)
        .withGraphQLVariables({
            "deleteProductId": 1
          })
        .expectStatus(200);
});