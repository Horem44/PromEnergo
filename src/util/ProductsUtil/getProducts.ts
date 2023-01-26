interface productsData {
    id: number,
    title: string,
    price: string,
    imgUrl: string,
    category: string,
    createdAt: string,
    updatedAt: string
}

type getProducts = (page: number, filterParams: string) => Promise<{ data: {}; count: number; error: any } | { data: any; count: any; error: null } | void>

const getProducts:getProducts = (page:number, filterParams: string) => {
    return fetch("http://localhost:8080/products/" + page + filterParams)
        .then((response) => {
            return response.json();
        })
        .then((prodsData) => {
            if(prodsData.error){
                return {count: 0, data: {}, error: prodsData.error};
            }

            let totalAmountOfProducts = prodsData.products.count;
            let products = prodsData.products.rows;

            return {count: totalAmountOfProducts, data: products, error: null};
        })
        .catch((err) => {
            console.log(err);
        });
}

export default getProducts;
