import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem,
Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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

                <CommentForm></CommentForm>
            </div>
        )

    } else {
        return (
            <div></div>
        )
    }
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false 
        }
    }
    
    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

    toggleModal = this.toggleModal.bind(this);

    render() {
        return (
            <>
                <div>
                    <Button type="submit" value="Submit Comment" className="btn-outline-secondary"
                    onClick={this.toggleModal }>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                </div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => alert(JSON.stringify(values)) } className='col-12'>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                className='form-control'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                className='form-control' 
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}/>

                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    component="li"
                                /> 
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                
                                <Control.textarea model=".comment" id="comment" name="comment" 
                                className='form-control'
                                rows="6" />                                
                            </Row>
                            
                            <Row className="form-group">
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default DishDetail;