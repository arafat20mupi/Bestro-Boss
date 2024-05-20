import { useState } from "react";
import orderCover from "../../assets/shop/banner2.jpg"
import Cover from "../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useManu from "../../Hooks/UseManu";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Order = () => {
    const categories = [ 'salad' , 'pizza' , 'soup' , 'dessert' , 'drinks']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [manu] = useManu()
    
    const dessert = manu.filter((manu) => manu.category === "dessert")
    const drinks = manu.filter((manu) => manu.category === "drinks")
    const salad = manu.filter((manu) => manu.category === "salad")
    const pizza = manu.filter((manu) => manu.category === "pizza")
    const soup = manu.filter((manu) => manu.category === "soup")


    return (
        <div>
            <Helmet>
                <title>
                    Bistro | Order
                </title>
            </Helmet>
            < Cover img={orderCover} title={"Order Food"} ></Cover>
            <Tabs defaultIndex={tabIndex} onSubmit={(index) => setTabIndex(index) }>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel >
                    <OrderTab
                        items={salad}
                    ></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab
                        items={pizza}
                    ></OrderTab>
                </TabPanel>

                <TabPanel>
                <OrderTab 
                    items={soup}
                    ></OrderTab>
                </TabPanel>

                <TabPanel>
                <OrderTab 
                    items={dessert}
                    ></OrderTab>
                </TabPanel>

                <TabPanel>
                <OrderTab 
                    items={drinks}
                    ></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;