const fetchCity = async (cityName: string) => {
    const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "post",
        body: JSON.stringify({
            apiKey: "a83607d74aba6443db7efb9f3365c683",
            modelName: "Address",
            calledMethod: "searchSettlements",
            methodProperties: {
                CityName: cityName,
                Limit: "20",
                Page: "1",
            },
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const resData = await res.json();
    console.log(resData);

    if(resData.data[0] === undefined) {
        return [];
    }
    console.log(resData);
    return resData.data[0].Addresses.map((address: any) => address.Present);
};

export default fetchCity;