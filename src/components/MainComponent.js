import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';

import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}



const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
  });

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
    }
    
    render() {
        const HomePage = () => {
            return (
                <Home dish={ this.props.dishes?.dishes?.filter((dish) => dish.featured)[0]} 
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={ this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={ this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        }

        const DishWithId = ({match}) => {
            let dishId = parseInt(match.params.dishId, 10);

            return (
            <DishDetail dish={this.props.dishes?.dishes?.filter((dish) => dish.id === dishId)[0]} 
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.filter((comment) => comment.dishId === dishId)} 
                addComment={this.props.addComment}
            />)
        }

        const AboutPage = () => {
            return (
                <About leaders={this.props.leaders}/>
            )
        }

        return (
            
            <div className="App">
                <Header/>

                <Switch>
                    <Route path="/home" component={HomePage}></Route>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}></Route>
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}></Route>
                    <Route exact path="/aboutus" component={AboutPage}></Route>
                    
                    <Redirect to="/home" />
                </Switch>

                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
