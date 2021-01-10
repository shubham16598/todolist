import React, { Component } from 'react'
import {Container} from 'reactstrap'
import {connect} from 'react-redux'
import {getItems, deleteItem, updateItem} from '../actions/itemActions'
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EditTodo from './edit_todo'
import '../App.css'


class TodoList extends Component {
  state = {
    modal : false,
    name : '',
    priority: '',
    completed: false
  }

  toggle = () => {
      this.setState({
          modal : !this.state.modal
      })
  }

  onChange = (e) => {
    this.setState({
       [e.target.name] : e.target.value
    })
  }

  onChangeTodoPriority = e => {
    this.setState({ priority: e.target.value });
  }

  
  componentDidMount(){
    this.props.getItems();
  }

  onDeleteClick = (id)  => {
    this.props.deleteItem(id);
  }


  render(){
    const {items} = this.props.item;
    return(
      <Router>
        <Container>

            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Remove</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Edit</th>
                   
                </tr>
            </thead>
            <tbody>

                {items.map(({_id,name, priority, completed}) => (

                <tr  key = {_id}>
                    <td className = "remove-btn text-danger"
                    onClick = {this.onDeleteClick.bind(this,_id)}>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </td>

                    <td className = "text-dark">{name}</td>

                    <td className = "text-dark">{priority}</td>

                    
                    <td className = "text-primary">
                    <Link onClick = {this.toggle} to={"/edit/"+_id}><i class="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Route path='/edit/:id' component={EditTodo} />
                    </td>

                </tr>
                ))}
            </tbody>

          </table>
            
        </Container>
      </Router>

    )
  }                     
}

TodoList.protoType = {
  getItems : PropTypes.func.isRequired,
  item : PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
  item : state.item
})

export default connect(mapStateToProps, {getItems, deleteItem,updateItem})(TodoList)
