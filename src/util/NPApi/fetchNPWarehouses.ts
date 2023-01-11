const fetchNPWarehouses = async (cityName:string, warehouseID: string) => {
  const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "post",
    body: JSON.stringify({
      apiKey: "f3401e72e113e9462440a2940de36237",
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "50",
        Page: "1",
        WarehouseId : +warehouseID
      },
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const resData = await res.json();
  
  return resData.data.map((warehouse:any) => warehouse.Description);
};

export default fetchNPWarehouses;
