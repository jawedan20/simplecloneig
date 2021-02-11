import React, {Component} from 'react'
import M from "materialize-css";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios'
import {parseJwt} from './Navbar';


class Modal extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            comment:'',
            parentid : null,
            reply : false,
            getusername:'',
        }
        this.handleComment = this.handleComment.bind(this)
    }

    componentDidMount(){
       
        this.setState({comment:''})
        const options = {
            onOpenStart: () => {
              console.log("Open Start");
            },
            onOpenEnd: () => {
              console.log("Open End");
            },
            onCloseStart: () => {
              console.log("Close Start");
              console.log(this.modalRef.scrollHeight )
              console.log(this.modalRef.clientHeight )
            },
            onCloseEnd: () => {
              console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
          };
          M.Modal.init(this.Modal, options);
    }

    handleCommentContent(event){
        this.setState({comment:event.target.value})
    }
    
    handleComment(parent = null){

        let {contentType,obj_id} = this.props
        let {content} = this.state
        const user = parseJwt(localStorage.getItem('token')).user_id

        if(content !== ''){
            axios({
                method:'POST',
                url:'http://127.0.0.1:8000/comment/create/',
                headers:{
                    "Authorization": 'Bearer ' + localStorage.getItem('token')
                  },
                data:{
                    user: user,
                    content_type:contentType,
                    obj_id:obj_id,
                    content:content,
                    parent : parent,
                }
    
            })
            .then(res => {
                this.setState({comment:'',parentid:null,getusername:'',reply:false})
        
            })
            .catch(e => {console.log(e);})
        } 
        
        

    }
    handleReplies = (parent_id,username) => this.setState({parentid:parent_id,getusername:username,reply:true})


    handlecancle = ()=> this.setState({parentid:null,getusername:'',reply:false})

    render(){

        // console.log(this.props.comments.user);
        const comments = this.props.comments
        return (
            <div ref={ Modal => { this.Modal = Modal;}} id={`modal_id${this.props.id}`} className="modal bottom-sheet">
                <div className="modal-content" ref={node => this.modalRef = node}>
                    <h4>Comment</h4>

                    <div className="row post-row">
                    
                        <ul className="collection">
                            {comments ? (
                                comments.map((item) => {
                                    return (                           
                                    <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                                        <img loading='lazy' src={`http://127.0.0.1:8000${item.user.profil}`} className="circle" alt="...."/>
                                        <span className="title">{item.user.nickname}</span>
                                        <p>{item.content}</p>
                                        <a className="secondary-content btn" onClick={()=>{this.handleReplies(item.id,item.user.nickname)}}><i className="material-icons">send</i></a>
                                        {item.replies.length > 0 ? (<p>view replies {item.replies.length} </p>) : ( null)}
                                    </li>
                                    )
                                })
                            ) : (null)}
                           
                        </ul>
                    </div>
                    {/* style={{position:'fixed',bottom:0,left:0,}} need fix position */}
                    <div className="row post-row" >
                        <div className="col s3 l2 offset-l1">
                            <Avatar  className="avatar" alt="foto" src={this.props.profil} height="45" width="45" />
                        </div>
                        <div className="col s6 l5 post-btn-container" >
                            {this.state.reply ? (<p onClick={() => {this.handlecancle()}}>your replies {this.state.getusername} click to cancle</p>) : (null)}
                            <input
                                ref={node => {this.refComment = node}}
                                value={this.state.comment}
                                onChange={(event) => {this.handleCommentContent(event)}}
                                placeholder={`Add a comment To post. ${this.props.username}` }
                            />        
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => {this.handleComment(this.state.parentid)}}>
                    Send 
                    </a>
                    <a className="modal-close waves-effect waves-green btn-flat" >
                    cancel 
                    </a>
                </div>
        </div>
        )
    }
    
}

export default Modal