import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    Button,
    Input,
    ModalFooter,
    Modal,
    ModalBody,
    ModalHeader
    
} from 'reactstrap';
import {
    setToken
} from '../../../action/actions';
import PerpustakaanServices from "../../../services/services"
import DataTable from 'react-data-table-component';


class KatalogPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : [],
            modalCreate: false,
            modalEdit: false,
            modalDelete: false,
            id: "",
            title: "",
            publisher: "",
            author: "",
            isbn: "",
            description: "",
        }
    }

    toggleCreate = () => {
        this.setState({
            modalCreate: !this.state.modalCreate
        });
    }

    toggleEdit = (id,title,author,isbn,publisher,description) => {
        this.setState({
            modalEdit: !this.state.modalEdit,
            id:id,
            title:title,
            author:author,
            isbn:isbn,
            publisher:publisher,
            description:description,
        });
    }

    toggleDelete = (id) => {
        this.setState({
            modalDelete: !this.state.modalDelete,
            id:id
        });
    }

    componentDidMount(){
        this.getBook()
    }

    getBook = () => {
        const headers = {
            headers : {
                'Authorization': this.props.state.perpustakaan.token
            }
        }
        PerpustakaanServices.getBook(headers)
        .then(res => {
            if (res.data.message === "OPERTATION SUCCESS") {
                console.log(res.data.data);
                this.setState({data : res.data.data})
            }

        })
        .catch(err => {
            console.log(err);
        })
    }

    getBookById = (id) => {
        const headers = {
            headers : {
                'Authorization': this.props.state.perpustakaan.token
            }
        }
        PerpustakaanServices.getBookById(id,headers)
        .then(res => {
            console.log(res.data.data);

        })
        .catch(err => {
            console.log(err);
        })
    }

    onCreate = () => {
        const payload = {
            author: this.state.author,
            title: this.state.title,
            isbn: this.state.isbn,
            publisher: this.state.publisher,
            description: this.state.description,
        }

        const headers = {
            headers : {
                'Authorization': this.props.state.perpustakaan.token
            }
        }

        PerpustakaanServices.createBook(payload,headers)
        .then(res => {
            if(res.data.message === "SAVE SUCCESS"){
                this.setState({modalCreate:false})
                this.getBook()
            }
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    onUpdate = () => {
        const payload = {
            author: this.state.author,
            description: this.state.description,
            isbn: this.state.isbn,
            publisher: this.state.publisher,
            title:this.state.title
        }
        console.log(payload);
        const headers = {
            headers : {
                'Authorization': this.props.state.perpustakaan.token
            }
        }

        PerpustakaanServices.updateBook(this.state.id, payload, headers)
        .then(res => {
            console.log(res.data);
            if(res.data.message === "UPDATE SUCCES"){
                this.setState({modalEdit:false})
                this.getBook()
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    onDelete = () => {
        const headers = {
            headers : {
                'Authorization': this.props.state.perpustakaan.token
            }
        }
        PerpustakaanServices.deleteBook(this.state.id,headers)
        .then(res => {
            if(res.data.message === "DELETE SUCCESS"){
                this.setState({modalDelete:false})
                this.getBook()
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    render = () => {
        const columns = [
            {
                name: 'No',
                cell: (row, index) => index +1,
            },
            {
                name: 'Judul',
                selector: row => (row.title !== null ? row.title: '-'),
            },
            {
                name: 'ISBN',
                selector: row => (row.isbn !== null ? row.isbn: '-'),
            },
            {
                name: 'Penulis',
                selector: row => (row.author !== null ? row.author: '-'),
            },
            {
                name: 'Penerbit',
                selector: row =>(row.publisher !== null ? row.publisher: '-'),
            },
            {
                name: 'Deskripsi',
                selector: row =>(row.description !== null ? row.description: '-'),
            },
            {
                name: 'Action',
                cell: row => (
                    <Row>
                        <Col>
                            <Button
                                color="warning"
                                onClick={() => this.toggleEdit(row.id, row.title, row.author, row.publisher, row.isbn, row.description )}
                            >  
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => this.toggleDelete(row.id)}
                            >  
                                Hapus
                            </Button>
                        </Col>
                        
                    </Row> 
                  )
            }
        ];

        return(
            <Row className="mt-5">
                <Col>
                    <Button className='btn-info' onClick={this.toggleCreate}>Tambah</Button>
                    <DataTable
                        columns={columns}
                        data={this.state.data}
                    />
                </Col>
                <Modal isOpen={this.state.modalCreate} toggle={this.toggleCreate} className="modal-dialog-centered">
                    <ModalHeader>
                        <h4>Tambah Data Buku</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs={12} className="text-center">
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='Judul'
                                    onChange={(e) => this.setState({title: e.target.value})}
                                    value={this.state.title}
                                />
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='Pengarang'
                                    onChange={(e) => this.setState({author: e.target.value})}
                                    value={this.state.author}
                                />
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='ISBN'
                                    onChange={(e) => this.setState({isbn: e.target.value})}
                                    value={this.state.isbn}
                                    />
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='Penerbit'
                                    onChange={(e) => this.setState({publisher: e.target.value})}
                                    value={this.state.publisher}
                                />
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='Deskripsi'
                                    onChange={(e) => this.setState({description: e.target.value})}
                                    value={this.state.description}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.onCreate()} className="btn-info">Tambah</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className="modal-dialog-centered">
                    <ModalHeader>
                        <h4>Edit Data Buku</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs={12} className="text-center">
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='Judul'
                                    onChange={(e) => this.setState({title: e.target.value})}
                                    value={this.state.title}
                                />
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='Pengarang'
                                    onChange={(e) => this.setState({author: e.target.value})}
                                    value={this.state.author}
                                />
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='ISBN'
                                    onChange={(e) => this.setState({isbn: e.target.value})}
                                    value={this.state.isbn}
                                    />
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='Penerbit'
                                    onChange={(e) => this.setState({publisher: e.target.value})}
                                    value={this.state.publisher}
                                />
                                <Input 
                                    type="text"
                                    className='mt-2'
                                    placeholder='Deskripsi'
                                    onChange={(e) => this.setState({description: e.target.value})}
                                    value={this.state.description}
                                />
                            </Col>
                        </Row>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => this.onUpdate()} className="btn-warning">Edit</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalDelete} toggle={this.toggleDelete} className="modal-dialog-centered">
                    <ModalBody>
                        <Row>
                            <Col xs={12} className="text-center">
                               <h5>Apakah anda yakin akan menghapus data ini?</h5>

                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.onDelete()} className="btn-danger">Hapus</Button>
                    </ModalFooter>
                </Modal>
            </Row>

            
        )
    } 
}

const mapStateToProps=(state)=>({state:state})
const mapDispatchToProps=(dispatch)=>{
    return{
        setToken : (data) => dispatch(setToken(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(KatalogPage)