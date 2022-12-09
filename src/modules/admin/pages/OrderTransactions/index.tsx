import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
import Loader from "../../../../main/components/Loader";


const OrderTransactions = () =>
{

    const [orderTransactions, setOrderTransactions] = useState<any>([]);
    const [loading , setLoading] = useState<boolean>(true);

    const fetchOrderTransactions = async () =>
    {
        const res = await (await axios.get("/SalesTransaction/get-all")).data;
        if(res.result)
        {
            setOrderTransactions(res.data);
            setLoading(false);
        }
    }

    useEffect(()=>
    {
        fetchOrderTransactions();
    },[])
    
    return(
        <>
        {loading ? (<Loader/>) : (
         <Container style={{marginTop: "2rem", backgroundColor: "white", width: "50%", borderRadius: "1rem" }} > 
            <Row style = {{padding: "1rem", borderBottom:"1px solid grey"}}>
                <Col md = "4"> 
                    Total
                </Col>
                <Col md = "4"> 
                    Bank Account
                </Col>
                <Col md = "4" style = {{textAlign: "center"}}>
                    Products
                </Col>
            </Row>
            {orderTransactions && orderTransactions.map((order:any, index: number) =>
            {
                return(
                    <Row key = {order.id} 
                    style = {{
                        borderBottom: (index+1) != orderTransactions.length ? "1px solid grey" : "", 

                    }}>
                        <Col md = "4" style = {{display: "flex", alignItems: "center", margin:"auto"}}> 
                            {order.total} EUR
                        </Col>
                        <Col md = "4" style = {{display: "flex", alignItems: "center", margin:"auto"}}> 
                            {order.bankAccountName}
                        </Col>
                        <Col md = "4" style = {{display: "flex", alignItems: "center", margin:"auto"}}> 
                            <ul>
                                {order.productSale.map( (product: any) =>
                                    {
                                        return(
                                            <> 
                                                <li> 
                                                    <div style={{display: "flex", flexDirection: "column"}}>
                                                        Product: {product.productName} 
                                                        Quantity: {product.quantityToSale}
                                                    </div>
                                                </li>
                                            </>
                                        )
                                    })
                                }
                            </ul >
                        </Col>
                    </Row>
                )
            })}
            </Container>
        ) }
        
        </>
       
    )
}

export default OrderTransactions;