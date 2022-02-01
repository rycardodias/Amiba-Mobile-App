const structure =
{
    "users": [
        { accessor: "name", Header: "Nome" },
        { accessor: "fiscalNumber", Header: "NIF" },
        { accessor: "email", Header: "Email" },
        { accessor: "telephone", Header: "Telefone" },
        { accessor: "mobilePhone", Header: "Telemóvel" },
        { accessor: "locale", Header: "Localidade" },
        { accessor: "zipcode", Header: "Código-Postal" },
        { accessor: "address", Header: "Morada" },
        { accessor: "permission", Header: "Permissão" },
    ],
    "animals": [
        { accessor: "race", Header: "Raça" },
        { accessor: "identifier", Header: "Identificador" },
        { accessor: "Exploration.name", Header: "Exploração" },
        { accessor: "gender", Header: "Genero" },
        { accessor: "birthDate", Header: "Data Nascimento" },
        { accessor: "weight", Header: "Peso Vivo" },
        { accessor: "slaughterDate", Header: "Data Abate" },
        { accessor: "slaughterWeight", Header: "Peso Carcaça" },
        { accessor: "slaughterLocal", Header: "Local Abate" },
    ],
    "animalProducts": [
        { accessor: "AnimalId", Header: "Animal", },
        { accessor: "Product.name", Header: "Produto", },
        { accessor: "quantity", Header: "Quantidade" },
        { accessor: "quantityAvailable", Header: "Quantidade Disponivel" },
        { accessor: "weight", Header: "Peso" },
    ],
    "eggsBatchs": [
        { accessor: "id", Header: "Identificador" },
        { accessor: "name", Header: "Nome" },
        { accessor: "Exploration.name", Header: "Exploração" },
        { accessor: "quantity", Header: "Quantidade" },
        { accessor: "quantityAvailable", Header: "Quantidade Disponivel" },

    ],
    "eggsBatchProducts": [
        { accessor: "EggsBatchId", Header: "Lote" },
        { accessor: "Product.name", Header: "Produto" },
        { accessor: "quantity", Header: "Quantidade" },
        { accessor: "quantityAvailable", Header: "Quantidade Disponivel" },
    ],
    "eggsBatchLines": [
        { accessor: "id", Header: "identificador" },
        { accessor: "EggsBatch.name", Header: "Lote" },
        { accessor: "quantity", Header: "Quantidade" },
        { accessor: "quantityAvailable", Header: "Quantidade Disponivel" },
    ],

    "explorations": [
        { accessor: "name", Header: "Exploração" },
        { accessor: "type", Header: "Tipo Exploração" },
        { accessor: "Organization.name", Header: "Organização" },
        { accessor: "telephone", Header: "Telefone" },
        { accessor: "mobilePhone", Header: "Telemovel" },
        { accessor: "locale", Header: "Localidade" },
        { accessor: "zipcode", Header: "Código-Postal" },
        { accessor: "address", Header: "Morada" },
        { accessor: "fiscalNumber", Header: "NIF" },
        { accessor: "gpsLocalization", Header: "Localização GPS" },
    ],
    "certifications": [
        { accessor: "Exploration.name", Header: "Exploração" },
        { accessor: "certificationCode", Header: "Código" },
        { accessor: "initialDate", Header: "Dana Início" },
        { accessor: "finalDate", Header: "Data Fim" },
        { accessor: "description", Header: "Descrição" },
    ],
    "orders": [
        { accessor: "id", Header: "Identificador" },
        { accessor: "total", Header: "Total" },
        { accessor: "totalVAT", Header: "Total IVA" },
        { accessor: "User.name", Header: "Utilizador" },
        { accessor: "fiscalNumber", Header: "NIF" },
        { accessor: "observation", Header: "Observação" },
        { accessor: "OrderHistory.state", Header: "Estado" },
    ],
    "orders:id:total:totalVAT": [
        { accessor: "id", Header: "Identificador" },
        { accessor: "total", Header: "Total" },
        { accessor: "totalVAT", Header: "Total IVA" },
    ],
    "orderLines": [
        { accessor: "id", Header: "Identificador" },
        { accessor: "Product.name", Header: "Produto" },
        { accessor: "quantity", Header: "Quantidade" },
        { accessor: "total", Header: "Total" },
        { accessor: "totalVAT", Header: "Total IVA" },
    ],
    "orderHistory": [
        { accessor: "id", Header: "Identificador" },
        { accessor: "Order.id", Header: "Encomenda" },
        { accessor: "state", Header: "Estado" },
    ],
    "organizations": [
        { accessor: "name", Header: "Organização" },
        { accessor: "type", Header: "Tipo Organização" },
        { accessor: "User.name", Header: "Responsável" },
        { accessor: "fiscalNumber", Header: "NIF" },
        { accessor: "telephone", Header: "Telefone" },
        { accessor: "mobilePhone", Header: "Telemovel" },
        // { accessor: "zipcode", Header: "Código-Postal" },
        // { accessor: "locale", Header: "Localidade" },
        // { accessor: "address", Header: "Morada" },

    ],
    "products": [
        { accessor: "type", Header: "Tipo Produto" },
        { accessor: "tax", Header: "Taxa" },
        { accessor: "name", Header: "Nome" },
        { accessor: "description", Header: "Descrição" },
        { accessor: "price", Header: "Preço" },
        { accessor: "unit", Header: "Unidade" },
    ],
    "restaurants": [
        { accessor: "name", Header: "Nome" },
        { accessor: "description", Header: "Descrição" },
        { accessor: "User.name", Header: "Responsável" },
        { accessor: "telephone", Header: "Telefone" },
        { accessor: "mobilePhone", Header: "Telemovel" },
        { accessor: "locale", Header: "Localidade" },
        { accessor: "zipcode", Header: "Código-Postal" },
        { accessor: "address", Header: "Morada" },
        { accessor: "fiscalNumber", Header: "NIF" },
    ],
    "menus": [
        { accessor: "name", Header: "Nome" },
        { accessor: "description", Header: "Descrição" },
        { accessor: "Restaurant.name", Header: "Restaurante" },
        { accessor: "active", Header: "Ativo" },
    ]
}

const updateParams = {
    "animals": ["id"],
    "animalProducts": ["AnimalId", "ProductId"],
    "eggsBatchs": ["id"],
    "eggsBatchProducts": ["ProductId", "EggsBatchId"],
    "eggsBatchLines": ["id"],
    "explorations": ["id"],
    "certifications": ["id"],
    "orders": ["id"],
    "orders:id:total:totalVAT": ["id"],
    "orderLines": ["id"],
    "orderHistory": ["id"],
    "organizations": ["id"],
    "products": ["id"],
    "restaurants": ["id"],
    "menus": ["id"],


}


export { structure, updateParams }