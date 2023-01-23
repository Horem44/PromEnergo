import React, { useEffect, useState } from "react";
import classes from "./DeliveryInfo.module.css";
import fetchCity from "../../../util/NPApi/fetchCity";
import fetchNPWarehouses from "../../../util/NPApi/fetchNPWarehouses";

const DeliveryInfo = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [cityList, setCityList] = useState<string[]>([]);
  const [warehouseList, setWarehouseList] = useState<string[]>([]);
  const [warehouseInput, setWarehouseInput] = useState<string>("");

  const changeCityInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCityInput(e.currentTarget.value);
  };

  const changeWarehouseInputHandler = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setWarehouseInput(e.currentTarget.value);
    const city = cityInput.split(',')[0].split('.')[1].trim();
    const warehouses = await fetchNPWarehouses(city, warehouseInput);
    setWarehouseList(warehouses);
  };

  useEffect(() => {
    const debouncingTimer = setTimeout(async () => {
      console.log(cityInput);
      const cityListData = await fetchCity(cityInput);
      setCityList(cityListData);
    }, 800);

    return () => {
      clearTimeout(debouncingTimer);
    };
  }, [cityInput]);

  return (
    <div className={classes.delivery_info_container}>
      <form className={classes.delivery_info_form}>
        <label htmlFor="delivery_city" className={classes.delivery_info_label}>
          Місто
        </label>
        <input
          onChange={changeCityInputHandler}
          type="text"
          id="delivery_city"
          value={cityInput}
          list="cityList"
          className={classes.delivery_info_input}
        />

        <datalist id="cityList">
          {cityList.map((city) => (
            <option key={Math.random()} value={city} />
          ))}
        </datalist>

        <label htmlFor="delivery_dep" className={classes.delivery_info_label}>
          Відділення Нової Пошти
        </label>

        <input
          className={classes.delivery_info_input}
          onChange={changeWarehouseInputHandler}
          value={warehouseInput}
          list='warehouseList'
        />

        <datalist id="warehouseList">
          {warehouseList.map((warehouse) => (
              <option key={Math.random()} value={warehouse} />
          ))}
        </datalist>

        <button type="submit" className={classes.delivery_info_btn}>
          Зберегти зміни
        </button>
      </form>
    </div>
  );
};

export default DeliveryInfo;