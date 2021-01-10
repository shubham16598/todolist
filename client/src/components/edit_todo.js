import React , { Component } from 'react';
import axios from 'axios';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
    
  } from 'reactstrap';

  import { connect } from 'react-redux'
  import {getItem,getItems, updateItem} from '../actions/itemActions'

class EditTodo extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            modal : true,
            _id : '',
            name : '',
            priority: '',
            completed: false,
            date : new Date().toLocaleDateString()
        }
    }

    componentDidMount() {
        axios.get('/api/items/'+this.props.match.params.id)
            .then(res => {
                console.log("Mounted data :",res.data)
                this.setState({  
                    _id : res.data._id,               
                    name: res.data.name,
                    priority: res.data.priority,
                    completed: res.data.completed
                })

                console.log("Single Item state :",this.state)
            })
            .catch( err => console.log(err));
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
   

    onChangeTodoPriority = (e) => {
        this.setState({
            priority: e.target.value
        });
    }

    // onChangeTodoCompleted = (e) => {
    //     this.setState({
    //         completed: !this.state.completed
    //     });
    // }

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {    
            _id : this.state._id, 
            name: this.state.name,
            priority: this.state.priority,
            completed: this.state.completed
        };
        
        this.props.updateItem(this.props.match.params.id,obj)
        console.log("Data for update :",obj)

        this.toggle();
        this.props.history.push('/');
      
    }

    render() {
        return (
            <div>
                <Modal isOpen = {this.state.modal}
                toggle = {this.toggle}
                >

                <ModalHeader toggle = {this.toggle}>
                    Update Shopping List &nbsp; <i class="fa fa-pencil" aria-hidden="true"></i>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit = {this.onSubmit}>
                        <FormGroup>
                            <Label for = "item">Item</Label>
                            <Input type = "text"
                            className="form-control"
                            name = "name"
                            id = "item"
                            value = {this.state.name}
                            onChange = {this.onChange}/>
                            <br/>

                            <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priority"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.priority === "Low"}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priority"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.priority === "Medium"}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priority"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.priority === "High"}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>


                            <Button color = "dark"
                            style = {{marginTop : "2rem"}} block>Update Item</Button>
                           
                        </FormGroup>
                    </Form>
                </ModalBody>
                    
                </Modal>
            
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item : state.item
})

export default  connect(mapStateToProps, {getItem,getItems,updateItem})(EditTodo)