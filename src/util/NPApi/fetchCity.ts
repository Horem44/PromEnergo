const fetchCity = async (cityName: string) => {
    const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "post",
        body: JSON.stringify({
            apiKey: "f3401e72e113e9462440a2940de36237",
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

    if(resData.data[0] === undefined) {
        return [];
    }

    return resData.data[0].Addresses.map((address: any) => address.Present);
};

export default fetchCity;