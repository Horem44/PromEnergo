interface productsData {
    id: number,
    title: string,
    price: string,
    imgUrl: string,
    category: string,
    createdAt: string,
    updatedAt: string
}

type getProducts = (page: number, filterParams: string) => Promise<void | {count: number, data: productsData}>

const getProducts:getProducts = (page:number, filterParams: string) => {
    return fetch("http://localhost:8080/products/" + page + filterParams, {credentials: "include"})
        .then((response) => {
            return response.json();
        })
        .then((prodsData) => {
            let totalAmountOfProducts = prodsData.count;
            let products = prodsData.rows;
            return {count: totalAmountOfProducts, data: products};
        })
        .catch((err) => {
            console.log(err);
        });
}

export default getProducts;
