import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";


const ProductCategories = () =>
{

    
    return (<div  style = {{marginTop: "1rem"}}> 
        <Card
            style={{
                width: '18rem'
            }}
            >
            <CardBody>
                <CardTitle tag="h5">
                    Category Name
                </CardTitle>

                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    Category Code 
                </CardSubtitle>

                <hr></hr>
                <CardTitle tag="h5">
                    Date Created
                </CardTitle>

                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                wadawdawd 
                </CardSubtitle>

                <CardTitle tag="h5">
                    Date Modified
                </CardTitle>

                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    jbhjuhnbhs 
                </CardSubtitle>
            </CardBody>
            FOTO NESE DO KETE 
            {/* <img
                alt="Card cap"
                src="https://picsum.photos/318/180"
                width="100%"
            /> */}
        </Card>
    </div>)
}

export default ProductCategories;