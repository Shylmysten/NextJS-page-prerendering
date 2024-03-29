import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {

    const [sales, setSales] = useState(props.sales);
    //const [isLoading, setIsLoading] = useState(false);

    //useEffect(() => {
    //    setIsLoading(true);
    //    fetch('https://nextjs-course-6f9e0-default-rtdb.firebaseio.com/sales.json'
    //    ).then(response => response.json())
    //    .then(data => {
    //        const transFormedSalesData = [];

    //        for (const key in data) {
    //            transFormedSalesData.push({ 
    //                id: key, 
    //                username: data[key].username, 
    //                volume: data[key].volume 
    //            });
    //        }

    //        setSales(transFormedSalesData);
    //        setIsLoading(false);
    //    });

    //}, []);

    //if(isLoading) {
    //    return <p>Loading...</p>
    //}

    const fetcher = (url) => 
    fetch('https://nextjs-course-6f9e0-default-rtdb.firebaseio.com/sales.json')
    .then(response => response.json()
    .then(data => {
        const transFormedSalesData = [];

            for (const key in data) {
                transFormedSalesData.push({ 
                    id: key, 
                    username: data[key].username, 
                    volume: data[key].volume 
                });
            }
            return transFormedSalesData;
    }));

    const { data, error} = useSWR('https://nextjs-course-6f9e0-default-rtdb.firebaseio.com/sales.json', fetcher);

    useEffect(() => {  
        if(data) {
            setSales(data);
        }
    }, [data]);


    if(error) {
        return <p>Failed to load.</p>
    }

    if(!data && !sales) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {sales.map((sale) => ( 
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
        const response = await fetch('https://nextjs-course-6f9e0-default-rtdb.firebaseio.com/sales.json')
        const data = await response.json()

            const transFormedSalesData = [];

            for (const key in data) {
                transFormedSalesData.push({ 
                    id: key, 
                    username: data[key].username, 
                    volume: data[key].volume 
                });
            }
            return { props: { sales: transFormedSalesData }, revalidate: 10 };
       
}

export default LastSalesPage;