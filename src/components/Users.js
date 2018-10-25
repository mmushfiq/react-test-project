import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, removeLastUser, removeSelectedUser, incrementAutoId } from '../actions/action-creators'
import { Table, Button, Modal, Input, notification } from 'antd';

class Users extends Component {

    state = {
        loading: false,
        visible: false,
        user: {
            id: null,
            name: null,
            age: null
        }
    }

    showModal = () => {
        this.setState({ visible: true, });
    }

    handleOk = () => {
        this.setState({ loading: true });
        const id = this.props.autoId;
        const user = { ...this.state.user, id: id };
        this.props.dispatchAddUser(user);
        this.props.dispatchIncrementAutoId(id + 1);
        this.setState({ loading: false, visible: false });
        notification['success']({
            message: 'Add User',
            description: 'New user added!',
            duration: 1,
        });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleLastUserRemove = () => {
        this.props.dispatchRemoveLastUser();
        notification['info']({
            message: 'Remove User',
            description: 'Lastest user removed!',
            duration: 1,
        });

    }

    handleSelectedUserRemove = (id) => {
        this.props.dispatchRemoveSelectedUser(id);
        notification['warning']({
            message: 'Remove User',
            description: 'User['+id+'] removed!',
            duration: 1,
        });
    }

    handleInputChange = (value, input) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [input]: value
            }
        }));
    }


    render() {
        const { visible, loading } = this.state;
        const dataSource = this.props.users;
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: 'Action',
                key: 'action',
                render: (user) => (
                    <Button type='danger' onClick={(id) => this.handleSelectedUserRemove(user.id)}>Remove</Button>
                ),
            }];

        return (
            <div style={{ width: "600px", marginTop: "30px", marginLeft: "30px" }}>
                <div>
                    <Button type="primary" onClick={this.showModal}>Add User</Button>
                    <Modal
                        visible={visible}
                        title="Add User"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>Submit</Button>,
                        ]}
                    >
                        <Input placeholder="Name" onChange={(e, input) => this.handleInputChange(e.target.value, "name")} style={{marginBottom:'10px'}}/>
                        <Input placeholder="Age" onChange={(e, input) => this.handleInputChange(e.target.value, "age")} />
                    </Modal>
                    <span>     </span>
                    <Button type="primary" onClick={this.handleLastUserRemove}>Remove User</Button>
                </div>
                <br /><br />
                <Table dataSource={dataSource} columns={columns} />
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.usersStore.users,
        autoId: state.usersStore.autoId
    };
}

const mapDispatchToProps = (dispatch) => ({
    dispatchAddUser(user) {
        dispatch(addUser(user));
    },
    dispatchRemoveLastUser() {
        dispatch(removeLastUser());
    },
    dispatchRemoveSelectedUser(id) {
        dispatch(removeSelectedUser(id));
    },
    dispatchIncrementAutoId(autoId) {
        dispatch(incrementAutoId(autoId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Users)