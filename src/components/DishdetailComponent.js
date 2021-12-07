import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const DishDetail = (props) => {
    return (
        <div className="container">

            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{ props.dish?.name }</BreadcrumbItem>
                </Breadcrumb>

                <div className="col-12">
                    <h3>{ props.dish?.name }</h3>
                    <hr/>
                </div>
            </div>

            <div className="row">
                
                <RenderDish dish={props.dish} />
            
                <RenderComments comments={props.comments} />

            </div>
        </div>
    )
}

function RenderDish({dish}) {

    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.description}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText> {dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments}) {

    if (comments != null) {
        let commentData = comments.map((data) => {
            return (
                <ul key={data.id} className="list-unstyled">
                    <li>{data.comment}</li>
                    <li>-- {data.author}, {new Intl.DateTimeFormat("en-US", { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(data.date)))}</li>
                </ul>
            )
        });

        return (
            <div className="col-12 col-md-5 m-1">

                <div>
                    <h4>Comments</h4>
                    {commentData}
                </div>
            </div>
        )

    } else {
        return (
            <div></div>
        )
    }
}

export default DishDetail;