import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Container
  } from 'reactstrap';
  import { connect } from 'react-redux'
  import {addItem} from '../actions/itemActions'

class ItemModal extends Component {
    state = {
        modal : false,
        name : '',
        todo_priority: '',
        todo_completed: false
        
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
        this.setState({ todo_priority: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitteed:');
        
        const newItem = {
          
            name: this.state.name,
            priority: this.state.todo_priority,
            completed: this.state.todo_completed
        }

        this.props.addItem(newItem)

        this.toggle();
    }
    render() {
        return (
            <Container>
                <Button 
                className = "mb-2"
                color = "dark"
                onClick = {this.toggle}>Add Item</Button>

                <Modal isOpen = {this.state.modal}
                toggle = {this.toggle}
                >

                <ModalHeader toggle = {this.toggle}>
                    Add to Shopping List
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit = {this.onSubmit}>
                        <FormGroup>
                            <Label for = "item">Item</Label>
                            <Input type = "text"
                            name = "name"
                            id = "item"
                            placeholder = "Add Item"
                            onChange = {this.onChange}/>
                            <br/>

                            <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priority"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.todo_priority === "Low"}
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
                                    checked={this.state.todo_priority === "Medium"}
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
                                    checked={this.state.todo_priority === "High"}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>


                            <Button color = "dark"
                            style = {{marginTop : "2rem"}} block>Add Item</Button>
                           
                        </FormGroup>
                    </Form>
                </ModalBody>
                    
                </Modal>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    item : state.item
})

export default connect(mapStateToProps, {addItem})(ItemModal)
