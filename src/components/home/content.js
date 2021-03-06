import React ,{ useState,useEffect,lazy,Suspense,memo,useCallback,useRef } from "react";
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { like_post_with,unlike_post_with } from '../../action/auth'

import Avatar from "@material-ui/core/Avatar";
import axios from 'axios'
import Cookies from 'js-cookie'

import '../../content.css'

const Modal = lazy(()=> import('./comment/modal'))


// menganti react-intersection-observer dengan observer API non npm

const Content = memo((props) => {
    const history = useHistory()
    if(props.user === null) history.push('/login')
    const [state,setState] = useState({
                                        likes : props.like,
                                        buttonLikeClass:'small material-icons icon red-text',
                                        buttonNotClass:'small material-icons icon',
                                        })


    const handleProfilRedirect = Userid => history.push(`/profile/${Userid}`)
    
    useEffect(() => console.log('re-render'),[])
    // lazy loading
    const preloadingImg = img => {
        const src = img.getAttribute('data-src')
        if(!src) return
        img.src = src
    }
    
    const handleLikeButton = (postId) => {
        const data = {
            post:postId,
            user:props.user.user_id
        }

        axios.post('http://127.0.0.1:8000/api/like/',
        data,
        {headers : {
                    "Authorization": 'Bearer ' + Cookies.get('access')
                    }
        })
        
            .then(res => {
                const prev = localStorage.getItem('like').split(",").map(Number)
                // jiga ga ada id berarti menghapus
                res.data.id === undefined ? setState(prev => {
                                            return {...prev , 
                                                    buttonLikeClass :'small material-icons icon',
                                                    buttonNotClass :'small material-icons icon',
                                                    likes : prev.likes - 1
                                                }})
                                                : setState(prev => {
                                                    return {...prev , 
                                                        buttonLikeClass :'small material-icons icon red-text',
                                                        buttonNotClass :'small material-icons icon red-text',
                                                        likes : prev.likes + 1
                                                }})  
                res.data.id === undefined ? props.unlike_post_with(prev,props.postId).split(",").map(Number) : props.like_post_with(prev,props.postId)
                
            })
            .catch(e => {console.log(e.request)})
    }
    const observer = useRef(null)
    const post = useCallback ( node => {   
    // loading tidak di exe
   
    // kalau udh pernah ada yang terakhir disconnect 
    if (observer.current) observer.current.disconnect()
    // bikin baru observer baru
        observer.current = new IntersectionObserver(entries => {
      // kalau ada observer terlihat maka fecth baru 
      if (entries[0].isIntersecting ) {
          preloadingImg(entries[0].target.firstChild)
      }})
      // kalo ada node inisialisasi dengan observer

    if (node) observer.current.observe(node)
  },[])

    const has_like = localStorage.getItem('like').split(",").map(Number).includes(props.postId)
    const urlProfil = `http://127.0.0.1:8000${props.avatar}`;

    return (

        <div className="box">
            <div className="head">             
                <Avatar 
                        className="avatar" 
                        alt="foto" 
                        src={urlProfil} 
                />        
                <h6 onClick={()=> {handleProfilRedirect(props.username)}}>{props.username}</h6>
            </div>
            {/* membuat post image menjadi loading lazy alias diloading jika post an dilayar */}
            <div ref={post}>
                <img src='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA4DASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQT/xAAlEAABAgQEBwAAAAAAAAAAAAABAgMABAYRBRIhMRM0NXGBkbL/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABoRAAICAwAAAAAAAAAAAAAAAAECABIDERP/2gAMAwEAAhEDEQA/AAaWpluWZM5OKYmV3HACX0hYJ1JIzaWNt/Rg+qMQcUzKsmWQXGhYvFGVat9DY7RHhvTF90fKoFq7nfAh57axkmKrjqBP/9k=' className="contentImage" data-src={props.imageUrl} alt="foto" />
            </div>

            <div className="icon__box">
                <p>{state.likes}</p> 
                    <a onClick={()=>{handleLikeButton(props.postId)}}><i className={ has_like ? state.buttonLikeClass : state.buttonNotClass }>favorite</i></a>
            <div>

                {/* comment  */}
                <a className="modal-trigger"  href={`#modal_id${props.id}`}><i className="small material-icons icon ">comment</i></a>
                    {/* lazy loading modal dengan react */}
                            
                    <Suspense fallback={<div></div>}>
                        <Modal 
                            key ={props.id}
                            id = {props.id}
                            postId= {props.postId}
                            username = {props.username}
                            profil = {urlProfil}
                            contentType={props.contentType}
                            obj_id = {props.postId}
                        />
                    </Suspense>
                
            </div>
                    {/* feature */}
                <i className="small material-icons icon ">near_me</i>
            </div>
                <h6 className="caption">
                 <b>{props.username}</b> {props.captions}
                </h6>
            
            </div>
        
    )
})

const mapStateToProps = state => {
    return {
        user:state.auth.user,
    }
}
export default connect(mapStateToProps,
    {
        like_post_with,
        unlike_post_with
    }
    )(Content);