import React, { Component } from 'react';
import { Switch, Route,Redirect ,withRouter} from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import RenderLeader  from './AboutComponent';
import {connect} from 'react-redux';
import  Header from'./HeaderComponent';
import  Footer from'./FooterComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import { addComment } from '../redux/ActionCreators';
import { DISHES } from '../shared/dishes';
;
const mapStateToProps=state =>{
  return {dish:state.dishes,
  comments:state.comments,
  promotions:state.promotions,
  leaders:state.leaders,

  dishes:state.dishes
}
  
}
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});
class Main extends Component {

  constructor(props) {
    super(props);

  }


  render() {
    const HomePage = () => {
      return(
        <Home 
        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        
    />
        
      );
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            addComment={this.props.addComment}/>
      );
    };
    return (
    
      <div>
        <Header/>
         <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/aboutus' component={() =><About leaders={this.props.leaders} />  } />
              <Route exact path='/contactus' component={Contact} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Redirect to="/home" />
          </Switch>
       
         
       
       
        <Footer/>
      </div>
     
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));