import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        }
    }

    render() {
        const HomePage = () => {
            return (
                <Home dish={ this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={ this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={ this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        }

        const DishWithId = ({match}) => {
            let dishId = parseInt(match.params.dishId, 10);

            return (
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === dishId)[0]}
                comments={this.state.comments.filter((comment) => comment.dishId === dishId)}
            />
            )
        }

        const AboutPage = () => {
            return (
                <About leaders={this.state.leaders}/>
            )
        }

        return (
            
            <div className="App">
                <Header/>

                <Switch>
                    <Route path="/home" component={HomePage}></Route>
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}></Route>
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={Contact}></Route>
                    <Route exact path="/aboutus" component={AboutPage}></Route>
                    
                    <Redirect to="/home" />
                </Switch>

                <Footer />
            </div>
        );
    }

    // onDishSelect(dishId) {
    //     this.setState({
    //         selectedDish: dishId
    //     })
    // }
}

export default Main;
