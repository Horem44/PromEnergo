import React, { useEffect, useState } from "react";
import classes from "./DeliveryInfo.module.css";
import fetchCity from "../../../util/NPApi/fetchCity";
import fetchNPWarehouses from "../../../util/NPApi/fetchNPWarehouses";
import { userInfoData } from "../../../util/validators/userInfoValidator";
import {authActions} from "../../../Store/auth-slice";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

interface DeliveryInfo {
  deliveryCity: string;
  warehouse: string;
}

let currentUser: DeliveryInfo & userInfoData;

const DeliveryInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cityInput, setCityInput] = useState<string>("");
  const [cityList, setCityList] = useState<string[]>([]);
  const [warehouseList, setWarehouseList] = useState<string[]>([]);
  const [warehouseInput, setWarehouseInput] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/users/single", { credentials: "include" })
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        if(user.isNotAuth){
          dispatch(authActions.logout());
          history.push('/login');
        }

        currentUser = user;
        setCityInput(currentUser.deliveryCity);
        setWarehouseInput(currentUser.warehouse);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeCityInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCityInput(e.currentTarget.value);
  };

  const changeWarehouseInputHandler = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setWarehouseInput(e.currentTarget.value);
  };

  useEffect(() => {
    const debouncingTimer = setTimeout(async () => {
      if(!cityInput.split(",")[0].split(".")[1]){
        return;
      }

      const city = cityInput.split(",")[0].split(".")[1].trim();
      const warehouses = await fetchNPWarehouses(city, warehouseInput);
      setWarehouseList(warehouses);
    }, 500);

    return () => {
      clearTimeout(debouncingTimer);
    };
  }, [warehouseInput]);

  useEffect(() => {
    const debouncingTimer = setTimeout(async () => {
      console.log(cityInput);
      const cityListData = await fetchCity(cityInput);
      setCityList(cityListData);
    }, 500);

    return () => {
      clearTimeout(debouncingTimer);
    };
  }, [cityInput]);

  const deliveryInfoFormSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const deliveryInfo: DeliveryInfo = {
      deliveryCity: cityInput,
      warehouse: warehouseInput,
    };

    fetch('http://localhost:8080/users/update/delivery', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(deliveryInfo)
    })
        .then(res => {
          setIsLoading(true);
          return res.json();
        })
        .then(user => {
          currentUser = user;
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
  }

  return (
    <div className={classes.delivery_info_container}>
      <form className={classes.delivery_info_form} onSubmit={deliveryInfoFormSubmitHandler}>
        {!isLoading && (
          <>
            <label
              htmlFor="delivery_city"
              className={classes.delivery_info_label}
            >
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

            <label
              htmlFor="delivery_dep"
              className={classes.delivery_info_label}
            >
              Відділення Нової Пошти
            </label>

            <input
              className={classes.delivery_info_input}
              onChange={changeWarehouseInputHandler}
              value={warehouseInput}
              list="warehouseList"
            />

            <datalist id="warehouseList">
              {warehouseList.map((warehouse) => (
                <option key={Math.random()} value={warehouse} />
              ))}
            </datalist>

            <button type="submit" className={classes.delivery_info_btn}>
              Зберегти зміни
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default DeliveryInfo;